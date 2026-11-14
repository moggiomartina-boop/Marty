/**
 * Crea un unico file HTML autonomo (JS, CSS e icona incorporati) da dist/.
 * Uso: npm run build:single  →  secret-santa.html
 * Senza variabili Supabase il file funziona in MODALITÀ DEMO (un solo dispositivo).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
let html = readFileSync(join(dist, 'index.html'), 'utf8');

html = html.replace(/<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/, (_, src) => {
  const js = readFileSync(join(dist, src), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script type="module">${js}</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/, (_, href) =>
  `<style>${readFileSync(join(dist, href), 'utf8')}</style>`);
const icon = `data:image/svg+xml;base64,${readFileSync(join(dist, 'favicon.svg')).toString('base64')}`;
html = html.replaceAll('./favicon.svg', icon);

if (/src="\.\/assets|href="\.\/assets/.test(html)) throw new Error('Risorse non incorporate');
writeFileSync('secret-santa.html', html);
console.log(`✓ secret-santa.html (${(html.length / 1024).toFixed(0)} KB)`);
