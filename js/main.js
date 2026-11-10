/* Boot */
(function () {
  document.addEventListener("attempts-changed", () => { const h = (location.hash || "#home").replace("#", ""); if (h === "home" || h === "progress") IELTS.render(); });
  // Keep the browser awake during tests on mobile where supported
  let lock = null;
  async function keepAwake() { try { if ("wakeLock" in navigator && !lock) { lock = await navigator.wakeLock.request("screen"); lock.addEventListener("release", () => { lock = null; }); } } catch (e) { } }
  document.addEventListener("click", keepAwake, { once: true });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") keepAwake(); });
  IELTS.render();
  // after a sign-in that was started from a results page, return there
  IELTS.dbReady.then(() => { const r = sessionStorage.getItem("ielts_return"); if (r && IELTS.userId) { sessionStorage.removeItem("ielts_return"); try { const o = JSON.parse(r); IELTS.go(o.route, o.params); } catch (e) { } } });
})();

// Remove any service worker and caches left from earlier versions (they could stall page loads on some laptops)
if ("serviceWorker" in navigator) { navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister())).catch(() => { }); }
if (window.caches) { caches.keys().then(ks => ks.forEach(k => caches.delete(k))).catch(() => { }); }
if (location.search.includes("reset=1")) { try { speechSynthesis.cancel(); } catch (e) { } location.replace(location.pathname + "#home"); }
