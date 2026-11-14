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
    case 'ALREADY_REGISTERED': return 'Questo nome è già iscritto. Se non sei stato tu, avvisa subito l’organizzatrice.';
    case 'DRAW_STARTED': return 'L’estrazione è già stata avviata: le iscrizioni sono chiuse.';
    case 'NOT_STARTED': return 'L’estrazione non è ancora partita. Torna quando l’organizzatrice la avvia!';
    case 'NOT_REGISTERED': return 'Questo nome non si è iscritto.';
    case 'WRONG_PIN': return `PIN non corretto. Tentativi rimasti: ${result.attempts_left}.`;
    case 'WRONG_CODE': return 'Codice organizzatrice non corretto.';
    case 'LOCKED': return `Troppi tentativi. Riprova tra ${Math.ceil((result.retry_in || 900) / 60)} minuti.`;
    case 'INVALID_PIN': return 'Il PIN deve avere 4 cifre.';
    case 'NOT_ALL_REGISTERED': return 'Non si sono ancora iscritti tutti.';
    case 'ALREADY_STARTED': return 'L’estrazione è già stata avviata.';
    case 'NOT_FOUND': return 'Nome non trovato.';
    case 'NETWORK': return 'Connessione assente. Controlla la rete e riprova.';
    default: return 'Qualcosa è andato storto. Riprova tra un attimo.';
  }
}
