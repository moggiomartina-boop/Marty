// Crea oltre-la-reazione.html: l'intera app in un solo file, apribile dal disco senza server.
// (In questa versione non sono attivi installazione e uso offline, che richiedono un indirizzo web.)
const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, '..', 'dist');
let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const b64 = (s) => Buffer.from(s).toString('base64');
const files = Object.fromEntries(fs.readdirSync(path.join(dist, 'assets')).filter((f) => f.endsWith('.js')).map((f) => [f, fs.readFileSync(path.join(dist, 'assets', f), 'utf8')]));
const dataUrl = (name) => {
  let src = files[name];
  for (const other of Object.keys(files)) if (other !== name && src.includes(other)) src = src.split('./' + other).join(dataUrl(other));
  return 'data:text/javascript;base64,' + b64(src);
};
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/([^"]+)"[^>]*>/g, (_, f) => `<style>${fs.readFileSync(path.join(dist, f), 'utf8')}</style>`);
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '').replace(/<link rel="manifest"[^>]*>/, '');
let entry = '';
html = html.replace(/<script type="module"[^>]*src="\.\/assets\/([^"]+)"[^>]*><\/script>/, (_, f) => ((entry = f), ''));
html = html.replace('</body>', `<script type="module" src="${dataUrl(entry)}"></script></body>`);
const png = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(dist, 'icons', f)).toString('base64');
html = html
  .replace('href="./icons/icon.svg"', `href="data:image/svg+xml;base64,${b64(fs.readFileSync(path.join(dist, 'icons', 'icon.svg'), 'utf8'))}"`)
  .replace('href="./icons/favicon-32.png"', `href="${png('favicon-32.png')}"`)
  .replace('href="./icons/apple-touch-icon.png"', `href="${png('apple-touch-icon.png')}"`);
fs.writeFileSync(path.join(__dirname, '..', 'oltre-la-reazione.html'), html);
console.log('oltre-la-reazione.html:', Math.round(html.length / 1024), 'KB');
