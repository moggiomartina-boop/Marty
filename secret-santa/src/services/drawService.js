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
export function errorMessage(result, name = '') {
  switch (result?.error) {
    case 'EMAIL_MISMATCH': return `Questa email non è quella registrata per ${name || 'questo nome'}. Ricontrollala.`;
    case 'INVALID_CODE': return 'Codice non valido o scaduto. Ricontrollalo o fattene inviare uno nuovo.';
    case 'RATE_LIMIT': return 'Troppe richieste ravvicinate. Aspetta un minuto e riprova.';
    case 'SEND_FAILED': return 'Non sono riuscito a inviare l’email. Riprova tra poco o avvisa l’organizzatrice.';
    case 'NOT_PARTICIPANT': return 'Questa email non è nella lista dei partecipanti.';
    case 'NETWORK': return 'Connessione assente. Controlla la rete e riprova.';
    default: return 'Qualcosa è andato storto. Riprova tra un attimo.';
  }
}
