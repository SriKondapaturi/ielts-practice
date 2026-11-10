/* Home screen */
(function () {
  const { $, $$, esc, el, topbar, route, go, getAttempts, EXAM_DATE, settings, saveSettings, modal } = IELTS;
  const SCHEDULE = [
    { from: "2026-11-10", to: "2026-11-16", title: "Week 1 · Task 2 introductions and grammar", items: ["Two-sentence introduction only: paraphrase + your opinion or outline", "No background sentence, no 'This essay will discuss'", "Articles (a, an, the) and dangling modifiers from the grammar ebook", "Checkpoint: 1 timed essay marked; baseline Listening and Reading tests"] },
    { from: "2026-11-17", to: "2026-11-23", title: "Week 2 · Task 2 body paragraphs", items: ["Topic sentence → explanation (why) → example", "Precise simple words over vague complex ones", "Daily 5-minute recorded Part 1 answer starts", "Checkpoint: 2 timed essays, each criterion 7.0 or higher"] },
    { from: "2026-11-24", to: "2026-11-30", title: "Week 3 · Speaking Parts 1 and 2", items: ["Answer = point, reason, example, personal link", "Two Speaking sets with Claude as examiner, recorded", "One Task 2 essay to keep writing warm", "Checkpoint: Speaking 7.0+, Part 2 fills two minutes"] },
    { from: "2026-12-01", to: "2026-12-07", title: "Week 4 · Speaking Part 3 and Task 1 start", items: ["Part 3: opinion + reason + example, paraphrase the question first", "Topic word families: crime, health, environment, technology, education", "Three overview drills; one full Task 1", "Checkpoint: Speaking 7.5; Task 1 overview present every time"] },
    { from: "2026-12-08", to: "2026-12-14", title: "Week 5 · Task 1 and Reading strategy", items: ["Task 1 every type: line, bar, pie, table, process, map (timed, 20 min)", "True/False/Not Given rules; 20 minutes a passage", "One full Reading test; one Speaking set", "Checkpoint: Reading 35/40, Task 1 7.5"] },
    { from: "2026-12-15", to: "2026-12-21", title: "Week 6 · Listening and full mocks", items: ["Read questions first, predict answer type, spelling and word limits", "Two full Listening tests, one Reading, one full Writing test", "One Speaking set", "Checkpoint: Listening 35/40, Reading 35/40, Writing 7.5"] },
    { from: "2026-12-22", to: "2026-12-28", title: "Week 7 · Mock day and taper", items: ["22–23 Dec: one full exam day, all four modules, then review every error", "24–26 Dec: short drills only, one Speaking set a day", "27 Dec: re-read your best essay and Task 1; 28 Dec: rest", "Exam 29 December"] }
  ];
  function syncLabel() {
    const st = IELTS.syncState;
    if (st === "pending") return "Checking sign-in…";
    if (st === "synced") return `Progress saved to your account${IELTS.auth.user() ? " (" + esc(IELTS.auth.user().email) + ")" : ""}: it follows you to any device where you open this page signed in.`;
    if (st === "signed-out") return IELTS.auth.enabled ? "Not signed in: progress is saved in this browser only. Use Sign in (top right) to keep it across devices." : "Not signed in: progress is saved in this browser only. Sign in to claude.ai to keep it across devices.";
    if (st === "error") return "Could not reach account storage; progress is saved in this browser for now and will sync when it reconnects.";
    return "Progress is saved in this browser.";
  }
  // ---------- sign-in (self-hosted mode) ----------
  const SKIP_KEY = "ielts_skip_signin";
  IELTS.state.gate = () => IELTS.auth.enabled && !IELTS.userId && IELTS.syncState !== "local" && !sessionStorage.getItem(SKIP_KEY) && IELTS.syncState !== "pending";
  route("signin", (app) => {
    app.appendChild(topbar({ title: "Sign in" }));
    const wrap = el(`<div class="instr"><div class="box">
      <h1>IELTS Academic practice</h1>
      <p class="muted">Sign in so your scores and marked essays are saved to your account and follow you between your laptop and phone.</p>
      <div id="status" class="muted" style="min-height:20px"></div>
      <label style="display:block;margin:10px 0 6px">Email<br><input id="em" type="email" autocomplete="email" style="width:100%;padding:8px;font-size:15px"></label>
      <label style="display:block;margin:6px 0 10px">Password<br><input id="pw" type="password" autocomplete="current-password" style="width:100%;padding:8px;font-size:15px"></label>
      <label style="display:block;margin:6px 0 10px">Your name <span class="muted">(for a new account; shown in the top bar, can be changed later in Settings)</span><br><input id="nm" type="text" autocomplete="name" placeholder="e.g. Neha Priyanka" style="width:100%;padding:8px;font-size:15px"></label>
      <div class="row"><button class="btn primary" id="in">Sign in</button><button class="btn" id="up">Create account</button><button class="btn" id="link">Email me a sign-in link instead</button></div>
      <p class="muted" style="margin-top:16px"><button class="btn small" id="skip">Continue without an account</button> &nbsp; progress then stays in this browser only.</p>
    </div></div>`);
    const st = $("#status", wrap); const say = (m, bad) => { st.textContent = m; st.style.color = bad ? "var(--bad)" : "var(--ok)"; };
    const creds = () => [$("#em", wrap).value.trim(), $("#pw", wrap).value];
    $("#in", wrap).onclick = async () => { const [e, p] = creds(); if (!e || !p) return say("Enter your email and password.", true); try { say("Signing in…"); await IELTS.auth.signInWithPassword(e, p); } catch (err) { say(err.message || "Sign-in failed", true); } };
    $("#up", wrap).onclick = async () => { const [e, p] = creds(); const nm = $("#nm", wrap).value.trim(); if (!e || p.length < 8) return say("Enter your email and a password of at least 8 characters.", true); if (!nm) return say("Enter your name so the test screens can show it.", true); try { say("Creating account…"); const r = await IELTS.auth.signUp(e, p, nm); settings.name = nm; localStorage.setItem("ielts_pending_name", nm); saveSettings(); say(r && r.session ? "Account created. Signing you in…" : "Account created. If a confirmation email arrives, open the link, then sign in with your email and password."); } catch (err) { say(err.message || "Could not create the account", true); } };
    $("#link", wrap).onclick = async () => { const [e] = creds(); if (!e) return say("Enter your email first.", true); try { await IELTS.auth.signInWithEmail(e); say("Check your email for the sign-in link."); } catch (err) { say(err.message || "Could not send the link", true); } };
    $("#skip", wrap).onclick = () => { sessionStorage.setItem(SKIP_KEY, "1"); go("home"); };
    app.appendChild(wrap);
  });
  route("plan", (app) => {
    const back = el(`<button class="tbtn">Home</button>`); back.onclick = () => go("home");
    app.appendChild(topbar({ title: "Study plan", buttons: [back] }));
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › Study plan</div>
      <h1>Seven weeks to 29 December</h1>
      <p class="muted">About 10 hours a week: the 35-minute daily spine (4 hours) plus three focus sessions of about 2 hours. Based on the IELTS Advantage plan, re-ordered so that Listening, Reading and Speaking are practised every week rather than only near the end, and with a checkpoint each week that decides what carries over.</p>
      <div class="card" style="margin-bottom:14px"><h3>Targets</h3><p>Listening 8.0 (35 of 40) · Reading 8.0 (35 of 40) · Writing 7.5 (each criterion) · Speaking 7.5 (each criterion)</p>
      <h3>Daily spine, every day</h3><ul><li>20 min: one Listening part or one Reading passage, alternating days. Full tests on Sundays in the weeks that call for them.</li><li>5 min: error log. For every wrong answer write one word: spelling, missed, or misunderstood. The Progress page shows which question types cost most.</li><li>10 min: grammar drill from the grammar ebook, in this order: articles, dangling modifiers, subject-verb agreement, complex sentences.</li><li>From week 2, 5 min: record one Part 1 answer (2 to 3 sentences with a reason) and listen back for fillers and single-word answers.</li></ul>
      <h3>Writing rules that apply from week 1</h3><ul><li>Introduction is two sentences: paraphrase the question, then state your opinion or what the essay covers. No background sentence ("In today's world…"), no "This essay will discuss/elucidate".</li><li>Each body paragraph: topic sentence, explanation of why, example, link. Two developed ideas beat four thin ones.</li><li>Prefer the precise simple word to the impressive vague one. Memorised linkers ("To commence with", "To recapitulate") lose marks at 7+.</li><li>Task 1 always has an overview paragraph with the two or three main features and no numbers.</li></ul>
      <h3>Checkpoint rule</h3><p>At the end of each week, compare the week's checkpoint with its pass mark. A module below its mark keeps one of the next week's three focus sessions. Above it, move on.</p></div>
      <div class="schedule" id="weeks"></div>
      <div class="card" style="margin-top:14px"><h3>Session shape (2 hours)</h3><p>10 min review of last error log → 60 min the week's focus (timed) → 30 min marking and rewriting the weakest paragraph using the Band 8 version → 20 min vocabulary from the topic that came up.</p></div>
    </div>`);
    const weeks = $("#weeks", wrap); const now = new Date();
    SCHEDULE.forEach(w => { const on = now >= new Date(w.from + "T00:00:00") && now <= new Date(w.to + "T23:59:59"); weeks.appendChild(el(`<div class="wk ${on ? "now" : ""}"><b>${w.title}</b><span class="muted">${new Date(w.from + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${new Date(w.to + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span><ul style="margin:6px 0 0 16px;padding:0">${w.items.map(i => `<li>${i}</li>`).join("")}</ul></div>`)); });
    app.appendChild(wrap);
  });
  route("home", (app) => {
    const settingsBtn = el(`<button class="tbtn">Settings</button>`);
    settingsBtn.onclick = async () => {
      const root = $("#modal-root");
      const f = el(`<div class="modal-bg"><div class="modal"><h2>Settings</h2><label style="display:block;margin:8px 0">Candidate name<br><input id="nm" value="${esc(settings.name)}" style="width:100%;padding:6px"></label><label style="display:block;margin:8px 0"><input type="checkbox" id="rp" ${settings.realisticPauses ? "checked" : ""}> Realistic Listening pauses (20 s to read questions, 2 min to check at the end)</label><p class="muted" style="margin-top:10px">Progress is saved in this browser and, when you are signed in, to your account so it follows you between devices. Text size and colours can be changed from the Settings button inside each test.</p><div class="acts"><button class="btn danger" id="clr">Clear all history</button><button class="btn" id="c">Close</button><button class="btn primary" id="s">Save</button></div></div></div>`);
      $("#c", f).onclick = () => root.innerHTML = "";
      $("#clr", f).onclick = async () => { root.innerHTML = ""; if (await modal(`<h2>Delete all saved attempts?</h2><p>Every score and marked essay will be removed from this browser and from your account. This cannot be undone.</p>`, [{ label: "Cancel", value: false }, { label: "Delete everything", value: true, cls: "danger" }])) { for (const a of getAttempts().slice()) await IELTS.deleteAttempt(a.id); IELTS.toast("History cleared"); IELTS.render(); } };
      $("#s", f).onclick = () => { settings.name = $("#nm", f).value.trim() || IELTS.CANDIDATE; settings.realisticPauses = $("#rp", f).checked; saveSettings(); root.innerHTML = ""; IELTS.render(); };
      root.innerHTML = ""; root.appendChild(f);
    };
    const authBtns = [];
    if (IELTS.auth.enabled) { const b = el(`<button class="tbtn">${IELTS.userId ? "Sign out" : "Sign in"}</button>`); b.onclick = async () => { if (IELTS.userId) { await IELTS.auth.signOut(); } else { sessionStorage.removeItem("ielts_skip_signin"); go("signin"); } }; authBtns.push(b); }
    app.appendChild(topbar({ title: "Academic practice", buttons: [...authBtns, settingsBtn] }));
    const days = Math.ceil((EXAM_DATE - Date.now()) / 86400000);
    const all = getAttempts();
    const latest = m => { const a = all.filter(x => x.module === m && x.band); return a.length ? a[a.length - 1].band : null; };
    const tgt = m => IELTS.TARGETS[m];
    const count = m => all.filter(x => x.module === m).length;
    const wrap = el(`<div class="home">
      <div class="hero"><div><h1>IELTS Academic practice</h1><p class="muted">For ${esc(settings.name)} · targets Listening 8.0 · Reading 8.0 · Writing 7.5 · Speaking 7.5</p><p class="muted" id="sync" style="font-size:13px">${syncLabel()}</p></div>
      <div class="countdown">${days > 0 ? `<div class="big">${days}</div><div class="muted">days to the exam (${EXAM_DATE.toLocaleDateString("en-GB", { day: "numeric", month: "long" })})</div>` : `<div class="big">Exam day</div>`}</div></div>
      <div class="modules">
        ${[["listening", "Listening", "4 parts · 40 questions · about 30 minutes. Browser voices, played once."], ["reading", "Reading", "3 passages · 40 questions · 60 minutes. Highlighting, notes, review flags."], ["writing", "Writing", "Task 1 report + Task 2 essay · 60 minutes. Marked on the four criteria."], ["speaking", "Speaking", "3 parts with Claude in voice mode. Timers and cue cards here."]].map(([m, n, d]) => `<div class="module"><h2>${n}<span class="band">${latest(m) ? "latest " + latest(m) + " / target " + tgt(m) : "target " + tgt(m)}</span></h2><div class="desc">${d}</div><div class="actions"><button class="btn primary" data-go="${m}" data-full="1">${m === "speaking" ? "Open examiner sets" : "Full timed test"}</button><button class="btn" data-go="${m}">${m === "speaking" ? "Random set" : m === "writing" ? "Single task or drills" : "Practise one part"}</button></div></div>`).join("")}
      </div>
      <div class="section"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Seven weeks to 29 December</h2><span class="row"><a class="btn small" href="#plan">Full study plan</a><a class="btn small" href="#progress">See progress</a></span></div><div class="schedule" style="margin-top:10px">${SCHEDULE.map(w => { const now = new Date(); const on = now >= new Date(w.from + "T00:00:00") && now <= new Date(w.to + "T23:59:59"); return `<div class="wk ${on ? "now" : ""}"><b>${w.title}</b><span class="muted">${new Date(w.from + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${new Date(w.to + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span><ul style="margin:6px 0 0 16px;padding:0">${w.items.map(i => `<li>${i}</li>`).join("")}</ul></div>`; }).join("")}</div></div>
      <div class="section"><h2>Every day, 35 minutes (the spine)</h2><div class="row" style="gap:16px"><span class="tag">One Listening part or one Reading passage, alternating (20 min)</span><span class="tag">Error log: spelling, missed, misunderstood (5 min)</span><span class="tag">Grammar drill: articles, modifiers, agreement (10 min)</span><span class="tag">From week 2: one recorded Part 1 answer (5 min)</span></div></div>
      <div class="section"><h2>Targets in numbers</h2><div class="row" style="gap:16px"><span class="tag">Listening 35/40</span><span class="tag">Reading 35/40</span><span class="tag">Writing: every criterion 7.5, Task 2 counts double</span><span class="tag">Speaking: extended answers, few errors, 7.5 on each criterion</span></div></div>
    </div>`);
    $$("[data-go]", wrap).forEach(b => b.onclick = () => {
      const m = b.dataset.go;
      if (m === "speaking") return b.dataset.full ? go("speaking") : go("speaking-set", { id: (window.SPEAKING_SETS || [])[Math.floor(Math.random() * (window.SPEAKING_SETS || []).length)].id });
      go(m);
    });
    app.appendChild(wrap);
  });
})();
