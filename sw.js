const CACHE_NAME = "bt-a1000-pwa-test-v1";

self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          "./",
          "./index.html"
        ]);
      })
  );

  self.skipWaiting();
});


self.addEventListener("activate", event => {

  event.waitUntil(
    self.clients.claim()
  );

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(cached => {

        if (cached) {
          return cached;
        }

        return fetch(event.request);
      })

  );

});