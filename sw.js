const CACHE_NAME = 'video-pwa-v1';
const urlsToCache = [
    '/ashraf-video/',
    '/ashraf-video/index.html',
    '/ashraf-video/style.css',
    '/ashraf-video/script.js',
    '/ashraf-video/manifest.json',
    '/ashraf-video/icon-192.png',
    '/ashraf-video/icon-512.png'
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
