/*
 * Service worker di "Oltre la reazione".
 * Rende l'app disponibile offline. Non tocca i dati personali:
 * diario e piano restano in localStorage, mai nella cache né in rete.
 */
const CACHE = 'oltre-v4';

self.addEventListener('install', (event) => {
  // Precarica la pagina e le risorse principali elencate nell'HTML.
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const res = await fetch('./', { cache: 'reload' });
      await cache.put('./', res.clone());
      const html = await res.text();
      const assets = [...html.matchAll(/(?:src|href)="\.?\/?((?:assets|icons)\/[^"]+|manifest\.webmanifest)"/g)].map((m) => './' + m[1]);
      const icons = ['./icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];
      await cache.addAll([...new Set([...assets, ...icons])]);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  // Pagina: prima la rete (per ricevere gli aggiornamenti), poi la cache se offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          caches.open(CACHE).then((c) => c.put('./', res.clone()));
          return res;
        })
        .catch(() => caches.match('./', { ignoreVary: true })),
    );
    return;
  }
  // Risorse con nome versionato: prima la cache, poi la rete.
  event.respondWith(
    caches.match(req, { ignoreVary: true }).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone()));
          return res;
        }),
    ),
  );
});
