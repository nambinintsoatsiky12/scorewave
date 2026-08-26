/* ScoreWave — Service Worker (PWA)
   - App shell en cache : l'appli s'ouvre même hors ligne
   - Données ESPN : réseau d'abord (fraîcheur), cache en secours */
const CACHE = "scorewave-v1";
const ASSETS = [
  "./",
  "index.html",
  "app.js",
  "extras.js",
  "detail.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // API ESPN : réseau d'abord, cache (2 min) en secours si hors ligne
  if (url.hostname === "site.api.espn.com") {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Fichiers de l'appli : cache d'abord, mise à jour en arrière-plan
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        const net = fetch(e.request)
          .then(res => {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
            return res;
          })
          .catch(() => cached);
        return cached || net;
      })
    );
  }
});
