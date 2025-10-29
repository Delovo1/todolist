// Версия кэша (меняй при обновлениях кода)
const CACHE_NAME = "todo-cache-v4";

// Файлы, которые кэшируются при установке
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// -----------------------------
// Установка service worker
// -----------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// -----------------------------
// Активация и очистка старых кэшей
// -----------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// -----------------------------
// Логика загрузки (Network First, Cache Fallback)
// -----------------------------
self.addEventListener("fetch", (event) => {
  // Только GET-запросы обрабатываем
  if (event.request.method !== "GET") return;

  // Игнорируем запросы на chrome-extension или devtools
  if (event.request.url.startsWith("chrome-extension")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Если сеть доступна — обновляем кэш
        const clone = response.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Если офлайн — используем кэш
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          // Если файла нет в кэше — отдаём index.html (PWA fallback)
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
  );
});
