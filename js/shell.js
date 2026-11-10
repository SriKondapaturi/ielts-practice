/* Ascend shell: sidebar + main column for every screen outside the exam hall */
(function () {
  const { $, $$, esc, el, go, settings, saveSettings, getAttempts, modal } = IELTS;
  const SHELL = new Set(["home", "plan", "progress", "listening", "reading", "writing", "speaking", "speaking-set", "ideas", "listening-results", "reading-results", "reading-review", "writing-mark", "speaking-live-results"]);
  const MARK = `<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="blg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#9E2235"/><stop offset="1" stop-color="#E04A60"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#blg)"/><path d="M8 30 L15 25 L21 27.5 L31 12.5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="12.5" r="3.4" fill="#E09F3E" stroke="#fff" stroke-width="1.4"/></svg>`;
  const ICON = {
    home: `<svg viewBox="0 0 24 24"><path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/></svg>`,
    listening: `<svg viewBox="0 0 24 24"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/></svg>`,
    reading: `<svg viewBox="0 0 24 24"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v16h5.5A2.5 2.5 0 0 1 21 21z"/></svg>`,
    writing: `<svg viewBox="0 0 24 24"><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16z"/><path d="M13 7l4 4"/></svg>`,
    speaking: `<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`,
    progress: `<svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16"/><path d="M8 15l4-5 3 3 5-7"/></svg>`,
    plan: `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`,
    settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`,
    signout: `<svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5M15 12H3M13 4h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-6"/></svg>`,
    chev: `<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>`
  };
  const NAV = [["home", "Today"], ["listening", "Listening"], ["reading", "Reading"], ["writing", "Writing"], ["speaking", "Speaking"], ["progress", "Progress"], ["plan", "Study plan"]];
  const section = name => name.startsWith("listening") ? "listening" : name.startsWith("reading") ? "reading" : name.startsWith("writing") || name === "ideas" ? "writing" : name.startsWith("speaking") ? "speaking" : name;
  const latest = m => { const a = getAttempts().filter(x => x.module === m && x.band); return a.length ? a[a.length - 1].band : null; };
  const initials = n => (n || "?").split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  function syncShort() {
    const st = IELTS.syncState;
    if (st === "synced") return ["sync-ok", "Synced to your account"];
    if (st === "pending") return ["", "Checking sign-in…"];
    if (st === "error") return ["sync-err", "Offline: saving here for now"];
    return ["sync-off", "This browser only"];
  }
  function openSettings() {
    const root = $("#modal-root");
    const f = el(`<div class="modal-bg"><div class="modal"><h2>Settings</h2><label style="display:block;margin:8px 0">Candidate name<br><input id="nm" value="${esc(settings.name)}" style="width:100%;padding:8px"></label><label style="display:block;margin:12px 0"><input type="checkbox" id="rp" ${settings.realisticPauses ? "checked" : ""}> Realistic Listening pauses (time to read questions, 2 minutes to check at the end)</label><p class="muted" style="margin-top:10px">Progress is saved in this browser and, when you are signed in, to your account so it follows you between devices. Text size and colours inside a test are changed from the Settings button in the test itself.</p><div class="acts"><button class="btn danger" id="clr">Clear all history</button><button class="btn" id="c">Close</button><button class="btn primary" id="s">Save</button></div></div></div>`);
    $("#c", f).onclick = () => root.innerHTML = "";
    $("#clr", f).onclick = async () => { root.innerHTML = ""; if (await modal(`<h2>Delete all saved attempts?</h2><p>Every score and marked essay will be removed from this browser and from your account. This cannot be undone.</p>`, [{ label: "Cancel", value: false }, { label: "Delete everything", value: true, cls: "danger" }])) { for (const a of getAttempts().slice()) await IELTS.deleteAttempt(a.id); IELTS.toast("History cleared"); IELTS.render(); } };
    $("#s", f).onclick = () => { settings.name = $("#nm", f).value.trim() || IELTS.CANDIDATE; settings.realisticPauses = $("#rp", f).checked; saveSettings(); root.innerHTML = ""; IELTS.render(); };
    root.innerHTML = ""; root.appendChild(f);
  }
  async function authAction() { if (IELTS.userId) { await IELTS.auth.signOut(); } else { sessionStorage.removeItem("ielts_skip_signin"); go("signin"); } }

  function mount(app, name) {
    const days = Math.ceil((IELTS.EXAM_DATE - Date.now()) / 86400000);
    const collapsed = localStorage.getItem("bl_side") === "min";
    app.className = "shell" + (collapsed ? " collapsed" : "");
    const [syncCls, syncTxt] = syncShort();
    const cur = section(name);
    const side = el(`<aside class="side">
      <a class="brand" href="#home">${MARK}<span><span class="word">Ascend</span><span class="sub">IELTS Academic practice</span></span></a>
      <button class="collapse" title="Collapse the sidebar">${ICON.chev}</button>
      <nav>${NAV.map(([r, t]) => { const m = ["listening", "reading", "writing", "speaking"].includes(r) ? latest(r) : null; return `<a class="nav ${cur === r ? "on" : ""}" href="#${r}">${ICON[r]}<span class="t">${t}</span>${m ? `<span class="k">${m}</span>` : ""}</a>`; }).join("")}</nav>
      <div class="grow"></div>
      <div class="exam-chip"><b>${days > 0 ? days : "Today"}</b><span>${days > 0 ? "days to the exam · 29 Dec" : "is exam day"}</span></div>
      <div class="me"><div class="avatar">${esc(initials(settings.name))}</div><div class="who"><b>${esc(settings.name)}</b><span class="${syncCls}">${syncTxt}</span></div></div>
      <div class="foot"><button class="nav" id="bl-settings">${ICON.settings}<span class="t">Settings</span></button>${IELTS.auth.enabled ? `<button class="nav" id="bl-auth">${ICON.signout}<span class="t">${IELTS.userId ? "Sign out" : "Sign in"}</span></button>` : ""}</div>
    </aside>`);
    $(".collapse", side).onclick = () => { app.classList.toggle("collapsed"); localStorage.setItem("bl_side", app.classList.contains("collapsed") ? "min" : "max"); };
    $("#bl-settings", side).onclick = openSettings;
    const ab = $("#bl-auth", side); if (ab) ab.onclick = authAction;
    const main = el(`<div class="main"></div>`);
    const mh = el(`<div class="mobilehead"><a class="brand" href="#home">${MARK}Ascend</a><div class="right"><button class="btn small" id="mh-settings">Settings</button>${IELTS.auth.enabled ? `<button class="btn small" id="mh-auth">${IELTS.userId ? "Sign out" : "Sign in"}</button>` : ""}</div></div>`);
    $("#mh-settings", mh).onclick = openSettings; const mab = $("#mh-auth", mh); if (mab) mab.onclick = authAction;
    main.appendChild(mh);
    const mob = el(`<nav class="mobilebar">${[["home", "Today"], ["listening", "Listen"], ["reading", "Read"], ["writing", "Write"], ["speaking", "Speak"], ["progress", "Progress"]].map(([r, t]) => `<a class="${cur === r ? "on" : ""}" href="#${r}">${ICON[r]}${t}</a>`).join("")}</nav>`);
    app.appendChild(side); app.appendChild(main); app.appendChild(mob);
    const content = el(`<div class="content"></div>`); main.appendChild(content);
    return content;
  }
  window.Shell = { wants: name => SHELL.has(name), mount, MARK, ICON, openSettings, authAction };
})();
