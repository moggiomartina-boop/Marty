/**
 * Sceglie il servizio: Supabase se configurato (VITE_SUPABASE_URL +
 * VITE_SUPABASE_ANON_KEY), altrimenti la modalità demo locale.
 */
import { createSupabaseService } from './supabaseService.js';
import { createLocalService } from './localService.js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const drawService = url && key ? createSupabaseService(url, key) : createLocalService();

/** Messaggi d'errore leggibili per gli utenti. */
export function errorMessage(result) {
  switch (result?.error) {
    case 'ALREADY_CLAIMED': return 'Questo nome ha già pescato. Se sei tu, puoi rivederlo con il tuo PIN.';
    case 'WRONG_PIN': return `PIN non corretto. Tentativi rimasti: ${result.attempts_left}.`;
    case 'LOCKED': return `Troppi tentativi. Riprova tra ${Math.ceil((result.retry_in || 900) / 60)} minuti.`;
    case 'INVALID_PIN': return 'Il PIN deve avere 4 cifre.';
    case 'NOT_CLAIMED': return 'Questo nome non ha ancora pescato.';
    case 'NOT_FOUND': return 'Nome non trovato.';
    case 'NETWORK': return 'Connessione assente. Controlla la rete e riprova.';
    default: return 'Qualcosa è andato storto. Riprova tra un attimo.';
  }
}
