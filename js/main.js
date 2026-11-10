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
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) { window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js?v=202611100134").catch(() => { }); }); }
