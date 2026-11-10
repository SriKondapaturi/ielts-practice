/* Boot */
(function () {
  document.addEventListener("attempts-changed", () => { const h = (location.hash || "#home").replace("#", ""); if (h === "home" || h === "progress") IELTS.render(); });
  // Keep the browser awake during tests on mobile where supported
  let lock = null;
  async function keepAwake() { try { if ("wakeLock" in navigator && !lock) { lock = await navigator.wakeLock.request("screen"); lock.addEventListener("release", () => { lock = null; }); } } catch (e) { } }
  document.addEventListener("click", keepAwake, { once: true });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") keepAwake(); });
  IELTS.render();
})();

// offline cache (https or localhost only)
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) { window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js?v=202611100158").catch(() => { }); }); }
// One-click repair: opening the site with ?reset=1 clears the offline cache and the service worker, then reloads clean
if (location.search.includes("reset=1")) {
  (async () => {
    try { if ("serviceWorker" in navigator) for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister(); } catch (e) { }
    try { if (window.caches) for (const k of await caches.keys()) await caches.delete(k); } catch (e) { }
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) { }
    location.replace(location.pathname + "#home");
  })();
}
