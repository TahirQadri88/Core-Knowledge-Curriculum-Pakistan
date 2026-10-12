/* Ilm Track service worker: cache the app shell for offline use. */
const CACHE = "ckledger-v23";
const SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.startsWith("/api/")) return; // family sync: always the network, never the cache
  if (url.origin === location.origin) {
    // app files: cache first, refresh in background
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; }).catch(() => hit);
      return hit || net;
    }));
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    // fonts: cache after first load so the app looks right offline
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
