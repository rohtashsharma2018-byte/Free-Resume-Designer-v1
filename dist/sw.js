const CACHE_NAME = 'resume-designer-static-v2';
const DYNAMIC_CACHE_NAME = 'resume-designer-dynamic-v2';

// Files to cache immediately upon service worker installation
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-svg.svg',
  '/icon-maskable.png'
];

// Install Event: pre-cache static core materials
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching offline shell app assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clear old cache versions when a new app is launched
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: handle offline fallbacks with dynamic network-first caching
self.addEventListener('fetch', (event) => {
  // Only cache GET internal requests; ignore external/POST requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Ignore API requests or live previews since they shouldn't be statically cached
  if (url.pathname.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If the fetch succeeded, cache a clone of the response dynamically
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fetch failed (network completely offline). Try to find the item in any of our caches.
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If the resource is an HTML page (navigation fallback) and not cached, return the root index.html
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/');
          }
        });
      })
  );
});
