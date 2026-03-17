const CACHE_NAME = 'video-pwa-v1';
const urlsToCache = [
    '/my-video-/',
    '/my-video-/index.html',
    '/my-video-/style.css',
    '/my-video-/script.js',
    '/my-video-/manifest.json',
    '/my-video-/icon-192.png',
    '/my-video-/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            })
        ))
    );
});
