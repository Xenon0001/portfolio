// Service Worker for Xenon.py Portfolio
const CACHE_NAME = 'xenon-portfolio-v1.0.0';
const STATIC_CACHE = 'xenon-static-v1.0.0';
const DYNAMIC_CACHE = 'xenon-dynamic-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/search.js',
  '/data/projects.json',
  '/data/blog.json',
  '/assets/img/photo_perfil_l.jpg',
  '/assets/img/ges-preview.png',
  '/assets/img/demo_storitic.webp',
  '/assets/img/storetic-preview.png',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (except for specific CDNs)
  if (url.origin !== location.origin && 
      !url.hostname.includes('unsplash.com') && 
      !url.hostname.includes('github.com') &&
      !url.hostname.includes('fontawesome.com')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // For HTML files, try network first to get fresh content
          if (request.destination === 'document') {
            fetchAndCache(request);
          }
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetchAndCache(request);
      })
      .catch(() => {
        // Offline fallback
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
        
        // Return offline image placeholder for images
        if (request.destination === 'image') {
          return new Response(
            `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#1a2332"/>
              <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#4a5568" font-family="Arial, sans-serif" font-size="14">
                Sin conexión
              </text>
            </svg>`,
            {
              headers: { 'Content-Type': 'image/svg+xml' }
            }
          );
        }
      })
  );
});

// Helper function to fetch and cache resources
function fetchAndCache(request) {
  return fetch(request)
    .then((response) => {
      // Don't cache non-successful responses
      if (!response.ok) return response;

      // Determine which cache to use
      const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
      
      // Clone response before caching
      const responseClone = response.clone();
      
      caches.open(cacheName)
        .then((cache) => {
          cache.put(request, responseClone);
        })
        .catch((error) => {
          console.warn('⚠️ Service Worker: Failed to cache:', request.url, error);
        });

      return response;
    });
}

// Check if request is for a static asset
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.json', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.includes(ext));
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form when back online
function syncContactForm() {
  return self.registration.showNotification('Formulario sincronizado', {
    body: 'Tu mensaje ha sido enviado correctamente',
    icon: '/assets/img/icons/icon-192x192.png',
    badge: '/assets/img/icons/icon-72x72.png'
  });
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización en el portafolio',
    icon: '/assets/img/icons/icon-192x192.png',
    badge: '/assets/img/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver ahora',
        icon: '/assets/img/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/assets/img/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Xenon.py Portfolio', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync for content updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

// Update cached content
function updateContent() {
  return caches.open(DYNAMIC_CACHE)
    .then((cache) => {
      return cache.addAll([
        '/data/projects.json',
        '/data/blog.json'
      ]);
    });
}

// Cleanup old dynamic cache entries
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});