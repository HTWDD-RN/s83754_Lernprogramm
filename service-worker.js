// Name des Cache-Speichers
const CACHE_NAME = 'quiz-learning-app-cache-v1';

// Liste der Ressourcen, die offline zwischengespeichert werden sollen
const urlsToCache = [
    '/',
    '/styles.css',
    '/manifest.json',
    '/QuizModel.js',
    '/QuizView.js',
    '/QuizPresenter.js',
    '/main.js'
];

// Wird beim Installieren des Service Workers aufgerufen – hier werden die Ressourcen gecacht
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache)) // Ressourcen zwischenspeichern
            .catch(error => console.error('Failed to open cache:', error))
    );
});

// Interzeptiert Netzwerk-Anfragen und gibt die gecachte Version zurück (wenn vorhanden)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request)) // Fallback auf Netzwerk, falls nicht im Cache
            .catch(error => console.error('Failed to fetch:', error))
    );
});

// Entfernt veraltete Caches beim Aktivieren eines neuen Service Workers
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME]; // Nur dieser Cache bleibt erhalten
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Alte Caches löschen
                    }
                })
            ))
            .catch(error => console.error('Failed to activate:', error))
    );
});
