/**
 * Verifica statistica dell'algoritmo di estrazione (modalità demo).
 * Uso: npm run verify:draw
 */
import { createDerangement, isValidDraw } from '../src/lib/derangement.js';
import { PARTICIPANTS } from '../src/lib/participants.js';

const RUNS = 50_000;
const counts = new Map();
for (let k = 0; k < RUNS; k++) {
  const map = createDerangement(PARTICIPANTS);
  if (!isValidDraw(PARTICIPANTS, map)) {
    console.error('✗ Estrazione non valida:', map);
    process.exit(1);
  }
  for (const [g, r] of Object.entries(map)) {
    const key = `${g}→${r}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
}
const values = [...counts.values()];
const expected = RUNS / (PARTICIPANTS.length - 1);
const maxDev = Math.max(...values.map((v) => Math.abs(v - expected) / expected));
console.log(`✓ ${RUNS} estrazioni valide (nessuno pesca sé stesso, nessun duplicato)`);
console.log(`✓ Coppie possibili osservate: ${counts.size}/${PARTICIPANTS.length * (PARTICIPANTS.length - 1)}`);
console.log(`✓ Frequenza attesa per coppia ≈ ${expected.toFixed(0)}, scarto massimo ${(maxDev * 100).toFixed(2)}%`);
if (counts.size !== 56 || maxDev > 0.05) process.exit(1);
