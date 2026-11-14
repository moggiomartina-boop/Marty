/**
 * MODALITÀ DEMO (nessun backend configurato).
 *
 * Replica la stessa API e le stesse regole del backend, ma salva tutto nel
 * localStorage di QUESTO browser. Va bene per provare l'esperienza o per una
 * festa in cui ci si passa UN SOLO telefono, ma NON è sicura:
 *  - chi apre gli strumenti per sviluppatori può leggere le coppie;
 *  - ogni dispositivo avrebbe un'estrazione diversa;
 *  - cancellando i dati del sito l'estrazione si perde.
 * Per l'uso reale configura Supabase (vedi README).
 */
import { createDerangement } from '../lib/derangement.js';
import { PARTICIPANTS } from '../lib/participants.js';

const KEY = 'secret-santa-demo-v1';
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* storage non disponibile */ }
  return { draw: null, claims: {} };
}

function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignora */ }
}

/** Hash del PIN (SHA-256 se disponibile, altrimenti FNV-1a: è solo una demo). */
async function hashPin(name, pin) {
  const text = `${name}:${pin}:secret-santa`;
  if (globalThis.crypto?.subtle) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let h = 0x811c9dc5;
  for (const ch of text) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16);
}

export function createLocalService() {
  return {
    mode: 'demo',
    async getStatus() {
      const { claims } = load();
      return PARTICIPANTS.map((name) => ({ name, claimed: Boolean(claims[name]) }));
    },
    async claim(name, pin) {
      await wait(250);
      if (!/^\d{4}$/.test(pin)) return { ok: false, error: 'INVALID_PIN' };
      if (!PARTICIPANTS.includes(name)) return { ok: false, error: 'NOT_FOUND' };
      const state = load();
      // l'estrazione globale si crea una sola volta e poi non cambia più
      if (!state.draw) state.draw = createDerangement(PARTICIPANTS);
      if (state.claims[name]) return { ok: false, error: 'ALREADY_CLAIMED' };
      state.claims[name] = { pinHash: await hashPin(name, pin), attempts: 0, lockedUntil: 0 };
      save(state);
      return { ok: true, receiver: state.draw[name] };
    },
    async reveal(name, pin) {
      await wait(250);
      const state = load();
      const claim = state.claims[name];
      if (!claim || !state.draw) return { ok: false, error: 'NOT_CLAIMED' };
      if (claim.lockedUntil > Date.now()) {
        return { ok: false, error: 'LOCKED', retry_in: Math.ceil((claim.lockedUntil - Date.now()) / 1000) };
      }
      if ((await hashPin(name, pin)) !== claim.pinHash) {
        claim.attempts += 1;
        if (claim.attempts >= MAX_TRIES) {
          claim.attempts = 0;
          claim.lockedUntil = Date.now() + LOCK_MS;
          save(state);
          return { ok: false, error: 'LOCKED', retry_in: LOCK_MS / 1000 };
        }
        save(state);
        return { ok: false, error: 'WRONG_PIN', attempts_left: MAX_TRIES - claim.attempts };
      }
      claim.attempts = 0;
      save(state);
      return { ok: true, receiver: state.draw[name] };
    },
    /** Solo demo: azzera l'estrazione su questo dispositivo. */
    reset() {
      try { localStorage.removeItem(KEY); } catch { /* ignora */ }
    },
  };
}
