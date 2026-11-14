/**
 * MODALITÀ DEMO (nessun backend configurato).
 *
 * Stessa API e stesse regole del backend, ma tutto resta nel localStorage di
 * QUESTO browser e nessuna email viene inviata: il "codice" viene mostrato a
 * schermo. Serve solo per provare l'esperienza. NON è sicura:
 *  - chiunque può pescare per chiunque (il codice è visibile);
 *  - dagli strumenti per sviluppatori si leggono le coppie;
 *  - ogni dispositivo avrebbe un'estrazione diversa.
 * Per l'uso reale configura Supabase (vedi README).
 */
import { createDerangement } from '../lib/derangement.js';
import { PARTICIPANTS } from '../lib/participants.js';

const KEY = 'secret-santa-demo-v2';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* storage non disponibile */ }
  return { draw: null, claimed: {} };
}
function save(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignora */ }
}

const pendingCodes = new Map(); // email → codice (solo in memoria)

export function createLocalService() {
  return {
    mode: 'demo',
    async getStatus() {
      const { claimed } = load();
      return PARTICIPANTS.map((name) => ({ name, claimed: Boolean(claimed[name]) }));
    },
    async checkEmail(name, email) {
      await wait(200);
      return /^\S+@\S+\.\S+$/.test(email.trim()) ? { ok: true } : { ok: false, error: 'EMAIL_MISMATCH' };
    },
    async sendCode(email) {
      await wait(300);
      const code = String(100000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 900000));
      pendingCodes.set(email.trim().toLowerCase(), code);
      return { ok: true, demoCode: code };
    },
    async reveal(name, email, code) {
      await wait(250);
      if (pendingCodes.get(email.trim().toLowerCase()) !== code) return { ok: false, error: 'INVALID_CODE' };
      pendingCodes.delete(email.trim().toLowerCase());
      const state = load();
      if (!state.draw) state.draw = createDerangement(PARTICIPANTS); // una volta sola
      const firstTime = !state.claimed[name];
      state.claimed[name] = true;
      save(state);
      return { ok: true, giver: name, receiver: state.draw[name], first_time: firstTime };
    },
    /** Solo demo: azzera l'estrazione su questo dispositivo. */
    reset() {
      try { localStorage.removeItem(KEY); } catch { /* ignora */ }
    },
  };
}
