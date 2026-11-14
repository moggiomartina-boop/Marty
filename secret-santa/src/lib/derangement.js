/**
 * Generazione di un "derangement" uniforme: una permutazione senza punti fissi.
 * Ogni persona riceve esattamente un destinatario, nessuno pesca sé stesso
 * e ognuno viene pescato una sola volta.
 *
 * Algoritmo: Fisher–Yates con numeri casuali crittografici + rejection sampling.
 * Scartare le permutazioni con punti fissi mantiene la distribuzione uniforme
 * su tutti i derangement possibili (con 8 persone ne serve in media ~2,7).
 *
 * Usato dalla modalità demo e dallo script di verifica. In produzione la stessa
 * logica gira lato server (vedi supabase/migrations/001_secret_santa.sql).
 */

/** Intero casuale uniforme in [0, max) senza bias da modulo. */
function randomInt(max) {
  const cryptoObj = globalThis.crypto;
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x;
  do {
    cryptoObj.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * @param {string[]} names
 * @returns {Record<string, string>} mappa donatore → destinatario
 */
export function createDerangement(names) {
  if (names.length < 2) throw new Error('Servono almeno 2 partecipanti');
  if (new Set(names).size !== names.length) throw new Error('Nomi duplicati');
  let receivers;
  do {
    receivers = shuffle(names);
  } while (receivers.some((r, i) => r === names[i]));
  return Object.fromEntries(names.map((n, i) => [n, receivers[i]]));
}

/** Controlla che una mappa rispetti tutte le regole del Secret Santa. */
export function isValidDraw(names, map) {
  const givers = Object.keys(map);
  const receivers = Object.values(map);
  return (
    givers.length === names.length &&
    names.every((n) => n in map) &&
    givers.every((g) => map[g] !== g) &&
    new Set(receivers).size === names.length &&
    receivers.every((r) => names.includes(r))
  );
}
