/**
 * MODALITÀ DEMO (nessun backend configurato).
 *
 * Stessa API e stesse regole del backend, ma tutto resta nel localStorage di
 * QUESTO browser. Serve per provare l'esperienza; NON è sicura (dagli strumenti
 * per sviluppatori si leggono le coppie) e ogni dispositivo ha la sua estrazione.
 * Codice organizzatrice della demo: "natale".
 * Per l'uso reale configura Supabase (vedi README).
 */
import { createDerangement } from '../lib/derangement.js';
import { PARTICIPANTS } from '../lib/participants.js';

const KEY = 'secret-santa-demo-v3';
export const DEMO_ORGANIZER_CODE = 'natale';
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* storage non disponibile */ }
  return { draw: null, people: {} };
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

const checkCode = (code) => (code === DEMO_ORGANIZER_CODE ? null : { ok: false, error: 'WRONG_CODE' });

export function createLocalService() {
  return {
    mode: 'demo',
    async getStatus() {
      const { draw, people } = load();
      return {
        phase: draw ? 'drawn' : 'registration',
        participants: PARTICIPANTS.map((name) => ({
          name,
          registered: Boolean(people[name]?.pinHash),
          revealed: Boolean(people[name]?.revealed),
        })),
      };
    },
    async register(name, pin) {
      await wait(250);
      if (!/^\d{4}$/.test(pin)) return { ok: false, error: 'INVALID_PIN' };
      const state = load();
      if (state.draw) return { ok: false, error: 'DRAW_STARTED' };
      if (state.people[name]?.pinHash) return { ok: false, error: 'ALREADY_REGISTERED' };
      state.people[name] = { pinHash: await hashPin(name, pin), attempts: 0, lockedUntil: 0 };
      save(state);
      return { ok: true };
    },
    async reveal(name, pin) {
      await wait(250);
      const state = load();
      if (!state.draw) return { ok: false, error: 'NOT_STARTED' };
      const p = state.people[name];
      if (!p?.pinHash) return { ok: false, error: 'NOT_REGISTERED' };
      if (p.lockedUntil > Date.now()) {
        return { ok: false, error: 'LOCKED', retry_in: Math.ceil((p.lockedUntil - Date.now()) / 1000) };
      }
      if ((await hashPin(name, pin)) !== p.pinHash) {
        p.attempts += 1;
        if (p.attempts >= MAX_TRIES) {
          p.attempts = 0;
          p.lockedUntil = Date.now() + LOCK_MS;
          save(state);
          return { ok: false, error: 'LOCKED', retry_in: LOCK_MS / 1000 };
        }
        save(state);
        return { ok: false, error: 'WRONG_PIN', attempts_left: MAX_TRIES - p.attempts };
      }
      const firstTime = !p.revealed;
      p.attempts = 0;
      p.revealed = true;
      save(state);
      return { ok: true, receiver: state.draw[name], first_time: firstTime };
    },
    organizer: {
      async login(code) { await wait(200); return checkCode(code) || { ok: true }; },
      async release(code, name) {
        await wait(200);
        const err = checkCode(code); if (err) return err;
        const state = load();
        if (state.draw) return { ok: false, error: 'DRAW_STARTED' };
        delete state.people[name];
        save(state);
        return { ok: true };
      },
      async start(code) {
        await wait(300);
        const err = checkCode(code); if (err) return err;
        const state = load();
        if (state.draw) return { ok: false, error: 'ALREADY_STARTED' };
        if (!PARTICIPANTS.every((n) => state.people[n]?.pinHash)) return { ok: false, error: 'NOT_ALL_REGISTERED' };
        state.draw = createDerangement(PARTICIPANTS); // una volta sola
        save(state);
        return { ok: true };
      },
      async reset(code) {
        await wait(200);
        const err = checkCode(code); if (err) return err;
        try { localStorage.removeItem(KEY); } catch { /* ignora */ }
        return { ok: true };
      },
    },
  };
}
