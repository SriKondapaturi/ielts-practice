/* Core: utilities, storage, timer, routing, marking helpers */
window.IELTS = (function () {
  const EXAM_DATE = new Date("2026-12-29T09:00:00");
  const DEFAULT_TARGETS = { listening: 8, reading: 8, writing: 7.5, speaking: 7.5 };
  // Per-account targets live in settings.targets (synced); until set, the defaults apply
  const TARGETS = { get listening() { return (settings.targets || DEFAULT_TARGETS).listening; }, get reading() { return (settings.targets || DEFAULT_TARGETS).reading; }, get writing() { return (settings.targets || DEFAULT_TARGETS).writing; }, get speaking() { return (settings.targets || DEFAULT_TARGETS).speaking; } };
  const targetsText = () => `Listening ${TARGETS.listening.toFixed(1)}, Reading ${TARGETS.reading.toFixed(1)}, Writing ${TARGETS.writing.toFixed(1)}, Speaking ${TARGETS.speaking.toFixed(1)}`;
  const overallTarget = () => { const v = (TARGETS.listening + TARGETS.reading + TARGETS.writing + TARGETS.speaking) / 4; return Math.round(v * 2) / 2; };
  const CANDIDATE = "Neha Priyanka";

  // ---------- DOM helpers ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };
  function toast(msg, ms = 2600) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), ms); }
  function modal(html, buttons) {
    return new Promise(resolve => {
      const root = $("#modal-root");
      const bg = el(`<div class="modal-bg"><div class="modal">${html}<div class="acts"></div></div></div>`);
      const acts = $(".acts", bg);
      (buttons || [{ label: "OK", value: true, cls: "primary" }]).forEach(b => {
        const btn = el(`<button class="btn ${b.cls || ""}">${esc(b.label)}</button>`);
        btn.onclick = () => { root.innerHTML = ""; resolve(b.value); };
        acts.appendChild(btn);
      });
      root.innerHTML = ""; root.appendChild(bg);
    });
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); toast("Copied to clipboard"); return true; }
    catch (e) {
      await modal(`<h2>Copy this text</h2><p class="muted">Your browser blocked automatic copying. Select all and copy manually.</p><textarea class="copybox" style="height:220px">${esc(text)}</textarea>`);
      return false;
    }
  }
  const fmtTime = s => { s = Math.max(0, Math.round(s)); const m = Math.floor(s / 60), r = s % 60; return `${m}:${String(r).padStart(2, "0")}`; };
  const fmtDate = d => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];
  const wordCount = t => (t || "").trim().split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length;

  // ---------- Storage (localStorage + optional shared db) ----------
  const LS_KEY = "ielts_attempts_v1", SET_KEY = "ielts_settings_v1";
  let attempts = [];
  try { attempts = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch (e) { attempts = []; }
  let settings = { realisticPauses: true, ttsRate: 0.95, name: CANDIDATE, autoNext: true };
  try { Object.assign(settings, JSON.parse(localStorage.getItem(SET_KEY) || "{}")); } catch (e) { }
  function saveSettings() { try { localStorage.setItem(SET_KEY, JSON.stringify(settings)); } catch (e) { } (async () => { try { await dbReady; if (sb && userId) await sb.from("settings").upsert({ user_id: userId, data: JSON.parse(JSON.stringify(settings)) }); else if (db && userId) await userCol().doc("settings").set({ kind: "settings", settings: JSON.parse(JSON.stringify(settings)) }); } catch (e) { } })(); }
  function persistLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(attempts)); } catch (e) { } }

  // ---------- Backend: Supabase (self-hosted) or claude.ai artifact capabilities ----------
  const cfg = window.APP_CONFIG || {};
  // No cross-tab navigator.locks: with the default lock, a second open tab (or a hung one) can block sign-in checks for ever and leave the page blank
const sb = (cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase) ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { lock: async (_name, _timeout, fn) => await fn() } }) : null;
  const backendMode = sb ? "supabase" : (window.claude && window.claude.use ? "claude" : "local");
  let db = null, userId = null, authUser = null, syncState = sb ? "pending" : "local"; // pending | local | synced | signed-out | error
  const userCol = () => db.collection("data/users/" + userId);
  function mergeRemote(remote) {
    const byId = Object.fromEntries(attempts.map(a => [a.id, a])); let changed = false;
    remote.forEach(a => { if (a && a.id && !byId[a.id]) { attempts.push(a); changed = true; } else if (a && a.id && byId[a.id] && a.band != null && byId[a.id].band == null) { Object.assign(byId[a.id], a); changed = true; } });
    if (changed) { attempts.sort((x, y) => x.date - y.date); persistLocal(); }
    return new Set(remote.map(a => a.id));
  }
  const withTimeout = (p, ms, label) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(label || "timeout")), ms))]);
  const dbReady = (async () => {
    try {
      if (backendMode === "supabase") {
        const { data: { session } } = await withTimeout(sb.auth.getSession(), 6000, "auth timeout");
        if (!session) { syncState = "signed-out"; document.dispatchEvent(new CustomEvent("attempts-changed")); return; }
        authUser = session.user; userId = session.user.id; sessionStorage.removeItem("ielts_signin_reload");
        const { data: rows, error } = await withTimeout(sb.from("attempts").select("data").eq("user_id", userId), 10000, "load timeout");
        if (error) throw error;
        const remoteIds = mergeRemote((rows || []).map(r => r.data));
        const { data: srow } = await sb.from("settings").select("data").eq("user_id", userId).maybeSingle();
        if (srow && srow.data) { Object.assign(settings, srow.data); saveSettingsLocal(); }
        // first sign-in of a new account: take the name given at sign-up (pending locally or stored with the account) and save it to the account's settings
        if (!srow || !srow.data || !srow.data.name) { const pending = localStorage.getItem("ielts_pending_name") || (session.user.user_metadata && session.user.user_metadata.name) || ""; if (pending) { settings.name = pending; saveSettingsLocal(); try { await sb.from("settings").upsert({ user_id: userId, data: JSON.parse(JSON.stringify(settings)) }); } catch (e) { } } }
        localStorage.removeItem("ielts_pending_name");
        for (const a of attempts) if (!remoteIds.has(a.id)) { try { await sb.from("attempts").upsert({ id: a.id, user_id: userId, data: a, module: a.module, date: new Date(a.date).toISOString() }); } catch (e) { } }
        syncState = "synced"; document.dispatchEvent(new CustomEvent("attempts-changed")); return;
      }
      if (backendMode !== "claude") { syncState = "local"; return; }
      const user = await window.claude.use("user");
      if (user) { try { userId = await user.id(); } catch (e) { } }
      db = await window.claude.use("db");
      if (!db || !userId) { syncState = "signed-out"; return; }
      const snap = await Promise.race([userCol().get(), new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 10000))]);
      const remote = snap.docs.filter(d => d.exists).map(d => d.data()).filter(d => d && d.kind === "attempt");
      const settingsDoc = snap.docs.find(d => d.id === "settings" && d.exists);
      if (settingsDoc) { const sd = settingsDoc.data(); if (sd && sd.settings) { Object.assign(settings, sd.settings); saveSettingsLocal(); } }
      const remoteIds = mergeRemote(remote);
      for (const a of attempts) if (!remoteIds.has(a.id)) { try { await userCol().doc(a.id).set(a); } catch (e) { } }
      syncState = "synced";
      document.dispatchEvent(new CustomEvent("attempts-changed"));
    } catch (e) { syncState = (sb || (db && userId)) ? "error" : "local"; document.dispatchEvent(new CustomEvent("attempts-changed")); }
  })();
  // Reload only on a real change of signed-in user (never on token refreshes or the initial session, which would loop)
  if (sb) sb.auth.onAuthStateChange((event, session) => {
    const newId = session && session.user ? session.user.id : null;
    dbReady.then(() => {
      if (event === "SIGNED_IN" && newId && !userId) { if (!sessionStorage.getItem("ielts_signin_reload")) { sessionStorage.setItem("ielts_signin_reload", "1"); location.reload(); } return; }
      if (event === "SIGNED_OUT" && userId) { sessionStorage.removeItem("ielts_signin_reload"); location.reload(); }
    });
  });
  function saveSettingsLocal() { try { localStorage.setItem(SET_KEY, JSON.stringify(settings)); } catch (e) { } }
  async function saveAttempt(a) {
    a.id = a.id || uid(); a.date = a.date || Date.now(); a.kind = "attempt";
    const i = attempts.findIndex(x => x.id === a.id); if (i >= 0) attempts[i] = a; else attempts.push(a);
    attempts.sort((x, y) => x.date - y.date); persistLocal();
    document.dispatchEvent(new CustomEvent("attempts-changed"));
    try {
      await dbReady;
      if (sb && userId) await sb.from("attempts").upsert({ id: a.id, user_id: userId, data: JSON.parse(JSON.stringify(a)), module: a.module, date: new Date(a.date).toISOString() });
      else if (db && userId) await userCol().doc(a.id).set(JSON.parse(JSON.stringify(a)));
    } catch (e) { }
    return a;
  }
  async function deleteAttempt(id) {
    attempts = attempts.filter(a => a.id !== id); persistLocal();
    document.dispatchEvent(new CustomEvent("attempts-changed"));
    try { await dbReady; if (sb && userId) await sb.from("attempts").delete().eq("id", id).eq("user_id", userId); else if (db && userId) await userCol().doc(id).delete(); } catch (e) { }
  }
  const getAttempts = (module) => attempts.filter(a => !module || a.module === module);
  const auth = {
    enabled: !!sb,
    user: () => authUser,
    async signInWithEmail(email) { const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.origin + location.pathname } }); if (error) throw error; },
    async signInWithPassword(email, password) { const { error } = await sb.auth.signInWithPassword({ email, password }); if (error) throw error; },
    async signUp(email, password, name) { const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + location.pathname, data: { name: name || "" } } }); if (error) throw error; return data; },
    async signInWithGoogle() { const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }); if (error) throw error; },
    async signOut() { await sb.auth.signOut(); }
  };

  // ---------- Marking: Supabase Edge Function or claude.ai sample capability ----------
  let sampleFn; let sampleTried = false;
  async function getSample() {
    if (sampleTried) return sampleFn;
    sampleTried = true;
    try {
      if (sb) {
        await dbReady;
        if (!userId) { sampleFn = null; return null; }
        sampleFn = async (prompt, opts) => {
          const { data, error } = await sb.functions.invoke(cfg.markFunction || "mark", { body: { prompt } });
          if (error) throw new Error(error.message || "marking function failed");
          if (data && data.error) throw new Error(data.error);
          const text = (data && data.text) || "";
          if (opts && opts.onText) opts.onText({ text, delta: text });
          return { text };
        };
        return sampleFn;
      }
      if (window.claude && window.claude.use) sampleFn = await window.claude.use("sample");
    } catch (e) { sampleFn = null; }
    return sampleFn || null;
  }

  // ---------- Band tables (Academic) ----------
  const READING_BANDS = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1]];
  const LISTENING_BANDS = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [11, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1]];
  function bandFor(raw, module) { const t = module === "listening" ? LISTENING_BANDS : READING_BANDS; for (const [min, b] of t) if (raw >= min) return b; return 0; }
  // partial test (one passage/part): scale to 40 for an indicative band
  function indicativeBand(correct, total, module) { if (!total) return 0; return bandFor(Math.round((correct / total) * 40), module); }

  // ---------- Answer normalisation ----------
  const NUM_WORDS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000 };
  function norm(s) {
    s = String(s == null ? "" : s).toLowerCase().trim();
    s = s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"');
    s = s.replace(/[£$€%]/g, " ").replace(/(\d),(\d)/g, "$1$2");
    s = s.replace(/[.,;:!?"()]/g, " ").replace(/\s*-\s*/g, "-").replace(/\s+/g, " ").trim();
    s = s.replace(/^(the|a|an) /, "");
    // number words -> digits for single tokens
    s = s.split(" ").map(w => (NUM_WORDS[w] !== undefined ? String(NUM_WORDS[w]) : w)).join(" ");
    return s;
  }
  function isCorrect(given, accepted) {
    const g = norm(given); if (!g) return false;
    const list = Array.isArray(accepted) ? accepted : [accepted];
    return list.some(a => { const n = norm(a); if (n === g || n.replace(/-/g, " ") === g.replace(/-/g, " ") || n.replace(/-/g, "") === g.replace(/-/g, "")) return true; const dn = n.replace(/[\s.:-]/g, ""), dg = g.replace(/[\s.:-]/g, ""); return /^\d+$/.test(dn) && dn === dg; });
  }

  // ---------- Timer ----------
  class Timer {
    constructor(seconds, { onTick, onWarn, onEnd }) {
      this.total = seconds; this.remaining = seconds; this.onTick = onTick; this.onWarn = onWarn; this.onEnd = onEnd; this.warned = {}; this._h = null; this.running = false;
    }
    start() { if (this.running) return; this.running = true; this._last = Date.now(); this._h = setInterval(() => this._tick(), 250); this._tick(); }
    pause() { this.running = false; clearInterval(this._h); }
    _tick() {
      const now = Date.now(); const dt = (now - this._last) / 1000; this._last = now;
      this.remaining = Math.max(0, this.remaining - dt);
      const r = Math.ceil(this.remaining);
      if (this.onTick) this.onTick(r);
      [600, 300].forEach(w => { if (r <= w && !this.warned[w] && this.total > w) { this.warned[w] = true; this.onWarn && this.onWarn(w); } });
      if (this.remaining <= 0) { this.pause(); this.onEnd && this.onEnd(); }
    }
    addSeconds(s) { this.remaining += s; }
  }
  function showTimeWarning(seconds) {
    const m = seconds / 60; const w = el(`<div class="timewarn">${m} minutes remaining</div>`);
    document.body.appendChild(w); setTimeout(() => w.remove(), 6000);
    try { beep(660, 180); } catch (e) { }
  }
  let actx;
  function beep(freq = 880, ms = 200) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = freq; o.connect(g); g.connect(actx.destination); g.gain.value = 0.08; o.start(); setTimeout(() => { o.stop(); }, ms);
    } catch (e) { }
  }

  // ---------- Top bar ----------
  function topbar({ title, timerEl, buttons }) {
    const bar = el(`<div class="topbar"><span class="brand">IELTS</span><span class="candidate">${esc(settings.name)}</span><span class="muted" style="color:#ccc;font-size:13px">${esc(title || "")}</span><span class="spacer"></span></div>`);
    if (timerEl) bar.appendChild(timerEl);
    (buttons || []).forEach(b => bar.appendChild(b));
    return bar;
  }
  const DIFF_LABEL = { easy: "Easy", standard: "Standard", harder: "Harder" };
  function diffTag(t) { const d = t && t.difficulty; return d ? `<span class="tag diff-${d}" title="${d === "easy" ? "Like an easier Cambridge test: start here" : d === "harder" ? "Like a harder Cambridge test: denser texts, more distractors" : "Typical Cambridge difficulty"}">${DIFF_LABEL[d]}</span>` : ""; }
  function timerElement() { return el(`<div class="timer">--:--</div>`); }
  // Display settings as offered in the computer-delivered test (text size, colour scheme)
  const TEXT_SIZES = [["regular", "Regular"], ["large", "Large"], ["xl", "Extra large"]];
  const SCHEMES = [["std", "Black on white (standard)"], ["wb", "White on black"], ["yb", "Yellow on black"], ["by", "Black on yellow"]];
  function applyDisplay() {
    const d = settings.display || {}; const h = document.documentElement;
    h.classList.remove("ts-large", "ts-xl", "cs-wb", "cs-yb", "cs-by");
    if (d.size === "large") h.classList.add("ts-large"); if (d.size === "xl") h.classList.add("ts-xl");
    if (d.scheme && d.scheme !== "std") h.classList.add("cs-" + d.scheme);
  }
  function displayButton() {
    const b = el(`<button class="tbtn" title="Text size and colours">Settings</button>`);
    b.onclick = () => {
      const d = settings.display || { size: "regular", scheme: "std" }; const root = $("#modal-root");
      const f = el(`<div class="modal-bg"><div class="modal"><h2>Settings</h2><p class="muted">These options are also available in the real computer-delivered test.</p>
        <h3>Text size</h3><div class="row">${TEXT_SIZES.map(([k, l]) => `<label><input type="radio" name="ts" value="${k}" ${d.size === k || (!d.size && k === "regular") ? "checked" : ""}> ${l}</label>`).join("")}</div>
        <h3 style="margin-top:12px">Colours</h3><div>${SCHEMES.map(([k, l]) => `<label style="display:block;margin:4px 0"><input type="radio" name="cs" value="${k}" ${d.scheme === k || (!d.scheme && k === "std") ? "checked" : ""}> ${l}</label>`).join("")}</div>
        <div class="acts"><button class="btn primary" id="ok">Done</button></div></div></div>`);
      f.addEventListener("change", () => { settings.display = { size: $("input[name=ts]:checked", f).value, scheme: $("input[name=cs]:checked", f).value }; applyDisplay(); saveSettings(); });
      $("#ok", f).onclick = () => root.innerHTML = "";
      root.innerHTML = ""; root.appendChild(f);
    };
    return b;
  }
  applyDisplay();
  function updateTimerEl(tel, r) { tel.textContent = fmtTime(r) + " left"; tel.classList.toggle("warn", r <= 600 && r > 300); tel.classList.toggle("crit", r <= 300); }

  // ---------- Drafts: a running test is saved locally so a refresh, Back or a dropped tab can resume it ----------
  const DRAFT_KEY = "ielts_draft";
  function saveDraft(d) { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(Object.assign({ savedAt: Date.now() }, d))); } catch (e) { } }
  function loadDraft(module, testId, scope) { try { const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); if (!d || Date.now() - d.savedAt > 24 * 3600 * 1000) return null; if (module && (d.module !== module || d.testId !== testId || (scope && d.scope !== scope))) return null; return d; } catch (e) { return null; } }
  function clearDraft() { try { localStorage.removeItem(DRAFT_KEY); } catch (e) { } }
  const draftSummary = d => d ? `${d.module[0].toUpperCase() + d.module.slice(1)} ${d.testTitle || d.testId}${d.scope && d.scope !== "full" ? " · " + d.scope.replace("P", "Part ").replace("T", "Task ") : ""}` : "";

  // ---------- Router ----------
  const routes = {};
  function route(name, fn) { routes[name] = fn; }
  // Render exactly once per navigation: if the hash changes, the hashchange event renders; if it is already the current hash, render now.
  function go(name, params) { state.params = params || {}; if (location.hash.replace("#", "") === name) render(); else location.hash = name; }
  const state = { params: {} };
  let renderSeq = 0;
  let lastHash = location.hash;
  function render() {
    renderSeq++;
    const name = (location.hash || "#home").replace("#", "");
    if (state.examActive && !state.examLeaveOk && name !== state.examActive) {
      // Browser Back, a bookmark or a typed URL while a test runs: ask first, restore the exam hash if declined
      const target = location.hash; const here = "#" + state.examActive;
      history.replaceState(null, "", here);
      modal(`<h2>Leave this test?</h2><p>The clock keeps running and your answers are saved, so you can come back and resume from the instructions screen. Leave now?</p>`, [{ label: "Stay", value: false }, { label: "Leave", value: true, cls: "primary" }]).then(ok => { if (ok) { state.examLeaveOk = true; location.hash = target; } });
      return;
    }
    state.examLeaveOk = false;
    lastHash = location.hash;
    let fn = routes[name] || routes.home;
    if (state.gate && name !== "signin" && state.gate(name)) fn = routes.signin;
    window.speechSynthesis && window.speechSynthesis.cancel();
    if (state.cleanup) { try { state.cleanup(); } catch (e) { } state.cleanup = null; }
    state.examActive = null;
    const app = $("#app"); app.innerHTML = ""; app.className = "";
    $("#modal-root").innerHTML = "";
    window.scrollTo(0, 0);
    const target = (window.Shell && fn !== routes.signin && Shell.wants(name)) ? Shell.mount(app, name) : app;
    fn(target, state.params);
  }
  window.addEventListener("hashchange", render);

  // leave-guard
  function guardLeave(active) { window.onbeforeunload = active ? (e => { e.preventDefault(); e.returnValue = ""; }) : null; }

  return { EXAM_DATE, TARGETS, DEFAULT_TARGETS, targetsText, overallTarget, CANDIDATE, auth, backendMode, get syncState() { return syncState; }, get userId() { return userId; }, $, $$, esc, el, toast, modal, copyText, fmtTime, fmtDate, uid, roman, wordCount, settings, saveSettings, saveAttempt, deleteAttempt, getAttempts, dbReady, getSample, bandFor, indicativeBand, norm, isCorrect, Timer, showTimeWarning, beep, topbar, timerElement, updateTimerEl, displayButton, applyDisplay, diffTag, route, go, render, state, guardLeave, saveDraft, loadDraft, clearDraft, draftSummary };
})();
