// Genera le icone PNG dell'app a partire da scripts/icon.svg (usa il Chromium di Playwright).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const svg = fs.readFileSync(path.join(__dirname, 'icon.svg'), 'utf8');
  const b = await chromium.launch();
  const p = await b.newPage();
  const out = path.join(__dirname, '..', 'public', 'icons');
  // size, nome, margine interno (le icone "maskable" hanno un'area sicura)
  for (const [size, name, pad] of [
    [192, 'icon-192.png', 0],
    [512, 'icon-512.png', 0],
    [512, 'icon-maskable-512.png', 0.1],
    [180, 'apple-touch-icon.png', 0],
    [32, 'favicon-32.png', 0],
  ]) {
    await p.setViewportSize({ width: size, height: size });
    const inner = Math.round(size * (1 - pad * 2));
    await p.setContent(
      `<html><body style="margin:0;background:#14363f;display:grid;place-items:center;width:${size}px;height:${size}px">` +
        `<div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`,
    );
    await p.screenshot({ path: path.join(out, name) });
  }
  fs.copyFileSync(path.join(__dirname, 'icon.svg'), path.join(out, 'icon.svg'));
  await b.close();
  console.log('Icone generate in public/icons');
})();
