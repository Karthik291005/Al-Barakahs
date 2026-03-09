const CACHE = 'albarakah-v1';
const ASSETS = [
  './',
  './index.html',
  './order.html',
  './cart.html',
  './contact.html',
  './shared.css',
  './manifest.json',
  './logo.jpg.jpeg',
  './googlepay.jpg',
  './phonepe.jpg',
  './paytm.jpg',
  './bhim.jpg',
  './scanner.jpg.jpeg',
  './watermelonbowl.jpg',
  './muskmelonbowl.jpg',
  './bananabowl.jpg',
  './papayabowl.jpg',
  './sweetlime.jpg',
  './pineapplebowl.jpg',
  './strawberrybowl.jpg',
  './applebowl.jpg',
  './kiwibowl.jpg',
  './hydrationbowl.jpg',
  './digesteasebowl.jpg',
  './fitfuelbowl.jpg',
  './bloodbuilderbowl.jpg',
  './glowupbowl.jpg',
  './immunityshieldbowl.jpg',
  'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Poppins:wght@300;400;500;600;700;800&display=swap'
];

// Install — cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});s