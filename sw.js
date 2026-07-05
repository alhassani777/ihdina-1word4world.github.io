// إهدنا — Service Worker: عمل دون اتصال (Offline-first)
const CACHE = 'ihdina-v3';
const CORE = [
  './', './index.html', './css/style.css',
  './js/main.js', './js/i18n.js', './js/projects.js',
  './assets/logo-full.png', './assets/logo-mark.png',
  './assets/icon-192.png', './assets/icon-512.png',
  './manifest.json',
  './platform/index.html', './platform/tafsir.html', './platform/reactor.html',
  './platform/sira.html', './platform/laws.html', './platform/projects.html',
  './platform/languages.html',
  './platform/css/style.css', './platform/js/core.js',
  './platform/data/blocks.js', './platform/data/laws.js', './platform/data/sira.js',
  './platform/data/projects_dir.js', './platform/data/languages.js',
  './platform/assets/logo-mark.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(CORE.map(u => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// شبكة أولاً ثم الكاش (يضمن التحديثات مع العمل دون اتصال)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
