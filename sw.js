/* Retired. Any browser that still has an old worker gets this one, which removes itself and stops intercepting. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => { e.waitUntil((async () => { for (const k of await caches.keys()) await caches.delete(k); await self.registration.unregister(); const cs = await self.clients.matchAll({ type: "window" }); cs.forEach(c => c.navigate(c.url)); })()); });
