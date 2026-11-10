/* Retired. Any browser that still has an old worker gets this one, which removes itself and stops intercepting. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => { e.waitUntil((async () => { try { for (const k of await caches.keys()) await caches.delete(k); } catch (err) { } await self.registration.unregister(); })()); });
