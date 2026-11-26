// Game Night offline support.
// The app, word list and icons are cached on install. Pages: network first so updates arrive, cache when offline.
// Fonts from Google are cached the first time they load, so each look keeps its fonts offline.
const CACHE = "game-night-d93737d996";
const FILES = ["./", "index.html", "words.txt", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("game-night-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    })));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith("/words.txt")) { // big and rarely changes: cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
    return;
  }
  e.respondWith(fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true })
      .then(r => r || (req.mode === "navigate" ? caches.match("index.html") : Response.error()))));
});
