const CACHE_NAME = "loan-app-v1";

self.addEventListener("install", (event) => {
  console.log("install event");
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll([
          "/",
          "/index.html",
          "/manifest.json",
          "/function.js",
          "/script.js",
          "assets/icon.png",
          "assets/screenshot1.png",
          "assets/screenshot2.png",
          "assets/orangewall.png",
          "assets/bootstrap-5.3.3-dist/css/bootstrap.min.css",
          "assets/bootstrap-5.3.3-dist/js/bootstrap.bundle.js",
        ]);

        console.log("Assets added to cache");
      } catch (error) {
        console.log("Cache addAll failed: " + error);
      }
    })(),
  );
});

self.addEventListener("fetch", function (event) {
  if (!(event.request.url.indexOf("http") === 0)) return;

  event.respondWith(
    (async function () {
      try {
        var res = await fetch(event.request);
        var cache = await caches.open(CACHE_NAME);
        cache.put(event.request.url, res.clone());
        return res;
      } catch (error) {
        return caches.match(event.request);
      }
    })(),
  );
});

self.addEventListener('activate', function(event) {

    event.waitUntil(

        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('loan-app-') && cacheName !== CACHE_NAME;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
