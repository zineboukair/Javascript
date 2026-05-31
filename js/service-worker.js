// service-worker.js
const CACHE_NAME = 'carbonely-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/css/main.css',
  '/js/app.js',
  '/js/utils/darkMode.js',
  '/assets/logo.png'
];

// Installer le cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

// Activer le SW
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Intercepter les requêtes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
