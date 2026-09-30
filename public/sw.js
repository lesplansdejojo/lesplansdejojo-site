// Service worker : permet d'installer l'app et de la consulter hors ligne.
const V = 'jojo-v2'
const FICHIERS = ['/', '/logo.png', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(FICHIERS)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((n) => n !== V).map((n) => caches.delete(n)))))
  self.clients.claim()
})

// Réseau d'abord, cache en secours (les codes restent visibles sans connexion)
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r.ok) {
          const cp = r.clone()
          caches.open(V).then((c) => c.put(e.request, cp))
        }
        return r
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('/'))),
  )
})
