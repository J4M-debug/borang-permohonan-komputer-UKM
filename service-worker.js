const CACHE_NAME = "pinjaman-komputer-cache-v1";
const urlsToCache = [
    "/index.html",
    "/styles.css",
    "/manifest.json",
    "/service-worker.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener("push", event => {
    const options = {
        body: event.data ? event.data.text() : "Permohonan pinjaman komputer UKM",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png"
    };
    event.waitUntil(
        self.registration.showNotification("Notifikasi Pinjaman Komputer", options)
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("/index.html")
    );
});
