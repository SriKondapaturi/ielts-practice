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
    if (st === "signed-out") return IELTS.auth.enabled ? "Not signed in: progress is saved in this browser only. Sign in from the sidebar to keep it across devices." : "Not signed in: progress is saved in this browser only. Sign in to claude.ai to keep it across devices.";
    if (st === "error") return "Could not reach account storage; progress is saved in this browser for now and will sync when it reconnects.";
    return "Progress is saved in this browser.";
  }
  // ---------- sign-in (self-hosted mode) ----------
  const SKIP_KEY = "ielts_skip_signin";
  IELTS.state.gate = () => IELTS.auth.enabled && !IELTS.userId && IELTS.syncState !== "local" && !sessionStorage.getItem(SKIP_KEY) && IELTS.syncState !== "pending";
  route("signin", (app) => {
    app.className = "auth";
    let mode = "in";
    const wrap = el(`<div style="display:contents"><div class="panel">
        <div class="brand">${Shell.MARK}<span class="word">Band 8</span></div>
        <h1>Eight is a habit, not a hope.</h1>
        <p>Timed Listening, Reading, Writing and Speaking tests built to the Cambridge standard, marked on the official criteria, with every lost mark logged so the next attempt is better than the last.</p>
        <svg class="art" viewBox="0 0 520 150" aria-hidden="true"><g stroke="rgba(255,255,255,.18)" stroke-width="1">${[0,1,2,3,4].map(i=>`<line x1="${20+i*120}" y1="20" x2="${20+i*120}" y2="120"/>`).join("")}</g><g fill="rgba(255,255,255,.5)" font-family="-apple-system, Inter, Segoe UI, sans-serif" font-weight="600" font-size="14">${[5,6,7,8,9].map((b,i)=>`<text x="${20+i*120}" y="142" text-anchor="middle">${b}</text>`).join("")}</g><g stroke="rgba(255,255,255,.25)" stroke-width="1">${[40,66,92,118].map(y=>`<line x1="20" y1="${y}" x2="500" y2="${y}"/>`).join("")}</g><g stroke="#7C80F0" stroke-width="6" stroke-linecap="round">${[[40,260,330],[66,260,345],[92,200,290],[118,200,300]].map(([y,a,b])=>`<line x1="${a}" y1="${y}" x2="${b}" y2="${y}"/>`).join("")}</g><g fill="#fff">${[[40,330],[66,345],[92,290],[118,300]].map(([y,x])=>`<circle cx="${x}" cy="${y}" r="6"/>`).join("")}</g><g stroke="#E09F3E" stroke-width="3" stroke-linecap="round">${[[40,380],[66,380],[92,320],[118,320]].map(([y,x])=>`<line x1="${x}" y1="${y-8}" x2="${x}" y2="${y+8}"/>`).join("")}</g><g fill="rgba(255,255,255,.7)" font-family="-apple-system, Inter, Segoe UI, sans-serif" font-size="12">${[["Listening",40],["Reading",66],["Writing",92],["Speaking",118]].map(([t,y])=>`<text x="0" y="${y+4}" dx="0">${t}</text>`).join("")}</g></svg>
        <div class="foot">Original tests · official timings · progress that follows you to every device</div>
      </div>
      <div class="form"><div class="box">
        <div class="seg"><button class="on" data-m="in">Sign in</button><button data-m="up">Create account</button></div>
        <h2 id="ttl">Welcome back</h2><p class="sub" id="sub">Your scores and marked work are waiting.</p>
        <div id="nmrow" class="hidden"><label for="nm">Your name</label><input id="nm" type="text" autocomplete="name" placeholder="As it should appear on the test screens"></div>
        <label for="em">Email</label><input id="em" type="email" autocomplete="email" placeholder="you@example.com">
        <label for="pw">Password</label><input id="pw" type="password" autocomplete="current-password" placeholder="At least 8 characters">
        <div class="status" id="status"></div>
        <button class="btn" id="go">Sign in</button>
        <button class="btn quiet" id="link">Email me a sign-in link instead</button>
        <div class="guest"><span>Just looking?</span><button id="skip">Continue without an account</button></div>
      </div></div></div>`);
    const st = $("#status", wrap); const say = (m, bad) => { st.textContent = m; st.className = "status " + (bad ? "bad" : "ok"); };
    const creds = () => [$("#em", wrap).value.trim(), $("#pw", wrap).value];
    const setMode = m => { mode = m; $$(".seg button", wrap).forEach(b => b.classList.toggle("on", b.dataset.m === m)); $("#nmrow", wrap).classList.toggle("hidden", m !== "up"); $("#ttl", wrap).textContent = m === "up" ? "Create your account" : "Welcome back"; $("#sub", wrap).textContent = m === "up" ? "Your progress will follow you to any device." : "Your scores and marked work are waiting."; $("#go", wrap).textContent = m === "up" ? "Create account" : "Sign in"; $("#pw", wrap).autocomplete = m === "up" ? "new-password" : "current-password"; say(""); };
    $$(".seg button", wrap).forEach(b => b.onclick = () => setMode(b.dataset.m));
    $("#go", wrap).onclick = async () => {
      const [e, p] = creds();
      if (mode === "in") { if (!e || !p) return say("Enter your email and password.", true); try { say("Signing in…"); await IELTS.auth.signInWithPassword(e, p); } catch (err) { say(err.message || "Sign-in failed", true); } return; }
      const nm = $("#nm", wrap).value.trim();
      if (!nm) return say("Enter your name so the test screens can show it.", true);
      if (!e || p.length < 8) return say("Enter your email and a password of at least 8 characters.", true);
      try { say("Creating account…"); const r = await IELTS.auth.signUp(e, p, nm); settings.name = nm; localStorage.setItem("ielts_pending_name", nm); saveSettings(); say(r && r.session ? "Account created. Signing you in…" : "Account created. If a confirmation email arrives, open the link, then sign in with your email and password."); } catch (err) { say(err.message || "Could not create the account", true); }
    };
    $("#pw", wrap).addEventListener("keydown", e => { if (e.key === "Enter") $("#go", wrap).click(); });
    $("#link", wrap).onclick = async () => { const [e] = creds(); if (!e) return say("Enter your email first.", true); try { await IELTS.auth.signInWithEmail(e); say("Check your email for the sign-in link."); } catch (err) { say(err.message || "Could not send the link", true); } };
    $("#skip", wrap).onclick = () => { sessionStorage.setItem(SKIP_KEY, "1"); go("home"); };
    app.appendChild(wrap);
  });
  // ---------- target bands (asked once after the account is created; changeable any time) ----------
  const PRESETS = [
    { id: "uni65", name: "University entry", bands: { listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.5 }, who: "Most degree courses in the US, UK, Canada and Australia: 6.5 overall, nothing below 6.0." },
    { id: "uni70", name: "Competitive courses", bands: { listening: 7, reading: 7, writing: 7, speaking: 7 }, who: "Top universities and US graduate schools: 7.0 overall, 6.5 to 7.0 in each." },
    { id: "clb9", name: "Canada Express Entry, CLB 9", bands: { listening: 8, reading: 7, writing: 7, speaking: 7 }, who: "Maximum language points for Canadian permanent residence." },
    { id: "health", name: "Health professions", bands: { listening: 7.5, reading: 7, writing: 7, speaking: 7.5 }, who: "Doctors and nurses (UK GMC and NMC, Australian AHPRA, US state boards): 7.0 in each, 7.5 overall." },
    { id: "neha", name: "Scholarships and top-tier admissions", bands: { listening: 8, reading: 8, writing: 7.5, speaking: 7.5 }, who: "8.0 overall stands out anywhere." },
    { id: "eight", name: "Band 8 in every module", bands: { listening: 8, reading: 8, writing: 8, speaking: 8 }, who: "Elite programmes and a few professional bodies." },
    { id: "custom", name: "Set my own", bands: null, who: "5.0 to 9.0 in half bands, per module." }
  ];
  route("targets", (app) => {
    const cur = Object.assign({}, IELTS.DEFAULT_TARGETS, settings.targets || {});
    const first = !settings.targets;
    const wrap = el(`<div class="home targets"><div class="breadcrumb"><a href="#home">Home</a> › Target bands</div>
      <h1>${first ? "What are you aiming for?" : "Your target bands"}</h1>
      <p class="muted" style="max-width:66ch">${first ? "Pick a requirement or set your own. Everything on the site is measured against these four numbers; change them any time in Settings." : "Change the four numbers the site measures you against."}</p>
      <div class="presets">${PRESETS.map(p => `<button class="preset" data-id="${p.id}"><b>${esc(p.name)}</b><span class="nums">${p.bands ? ["listening", "reading", "writing", "speaking"].map(m => `<span><i>${m[0].toUpperCase()}</i>${p.bands[m].toFixed(1)}</span>`).join("") : "<span class='muted'>L · R · W · S</span>"}</span><span class="who">${esc(p.who)}</span></button>`).join("")}</div>
      <div class="card custom"><h3>Your four targets</h3><div class="sliders">${["listening", "reading", "writing", "speaking"].map(m => `<label><span class="m">${m[0].toUpperCase() + m.slice(1)}</span><input type="range" min="5" max="9" step="0.5" data-m="${m}" value="${cur[m]}"><b data-v="${m}">${cur[m].toFixed(1)}</b></label>`).join("")}</div>
        <p class="muted" id="overall">Overall ${IELTS.overallTarget().toFixed(1)}</p>
        <div class="row" style="margin-top:12px"><button class="btn primary" id="save">${first ? "Save and start" : "Save targets"}</button>${first ? "" : `<a class="btn" href="#home">Cancel</a>`}</div></div>
    </div>`);
    const sliders = $$("input[type=range]", wrap);
    const paint = () => { const t = {}; sliders.forEach(s => { t[s.dataset.m] = +s.value; $(`[data-v=${s.dataset.m}]`, wrap).textContent = (+s.value).toFixed(1); }); const o = Math.round((t.listening + t.reading + t.writing + t.speaking) / 4 * 2) / 2; $("#overall", wrap).textContent = `Overall ${o.toFixed(1)}`; let hit = false; $$(".preset", wrap).forEach(b => { const p = PRESETS.find(x => x.id === b.dataset.id); const on = !hit && !!p.bands && ["listening", "reading", "writing", "speaking"].every(m => p.bands[m] === t[m]); if (on) hit = true; b.classList.toggle("on", on); }); return t; };
    sliders.forEach(s => s.oninput = paint); paint();
    $$(".preset", wrap).forEach(b => b.onclick = () => { const p = PRESETS.find(x => x.id === b.dataset.id); if (p.bands) { sliders.forEach(s => s.value = p.bands[s.dataset.m]); paint(); } else { $(".custom", wrap).scrollIntoView({ behavior: "smooth", block: "center" }); sliders[0].focus(); } });
    $("#save", wrap).onclick = () => { settings.targets = paint(); saveSettings(); IELTS.toast("Targets saved"); go("home"); };
    app.appendChild(wrap);
  });
  route("plan", (app) => {
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › Study plan</div>
      <h1>Seven weeks to 29 December</h1>
      <p class="muted">About 10 hours a week: the 35-minute daily spine (4 hours) plus three focus sessions of about 2 hours. Based on the IELTS Advantage plan, re-ordered so that Listening, Reading and Speaking are practised every week rather than only near the end, and with a checkpoint each week that decides what carries over.</p>
      <div class="card" style="margin-bottom:14px"><h3>Targets</h3><p>${IELTS.targetsText()} · overall ${IELTS.overallTarget().toFixed(1)} · <a href="#targets">change</a></p>
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
    if (IELTS.userId && !settings.targets && IELTS.syncState === "synced") return go("targets");
    const days = Math.ceil((EXAM_DATE - Date.now()) / 86400000);
    const all = getAttempts();
    const latest = m => { const a = all.filter(x => x.module === m && x.band); return a.length ? a[a.length - 1].band : null; };
    const tgt = m => IELTS.TARGETS[m];
    const hour = new Date().getHours(); const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    const first = (settings.name || "").split(" ")[0];
    const today = new Date(); const week = SCHEDULE.find(w => today >= new Date(w.from + "T00:00:00") && today <= new Date(w.to + "T23:59:59")) || SCHEDULE[0];
    const dayIdx = Math.floor((today - new Date(week.from + "T00:00:00")) / 86400000);
    const spineToday = dayIdx % 2 === 0 ? ["listening", "One Listening part (20 min)"] : ["reading", "One Reading passage (20 min)"];
    const MODS = [["listening", "Listening", "4 parts, 40 questions, about 30 minutes. Played once, as in the exam."], ["reading", "Reading", "3 passages, 40 questions, 60 minutes. Highlight, note, review."], ["writing", "Writing", "Task 1 report and Task 2 essay, 60 minutes. Marked on the four criteria."], ["speaking", "Speaking", "Three parts with a spoken examiner, recorded and marked."]];
    const pct = b => ((Math.min(9, Math.max(5, b)) - 5) / 4 * 100);
    const lanes = MODS.map(([m, n], i) => { const b = latest(m); const t = tgt(m); return `<div class="lane" style="top:${18 + i * 50}px"><div class="rail"></div>${b ? `<div class="fill" style="left:0;width:${pct(b)}%"></div>` : ""}<div class="goal" style="left:${pct(t)}%" title="Target ${t}"></div><div class="dot ${b ? "" : "none"}" style="left:${b ? pct(b) : 0}%"></div><div class="val ${b ? "" : "none"}" style="left:${b ? pct(b) : 0}%">${b ? "Band " + b : "no test yet"}</div><div class="name">${n}</div></div>`; }).join("");
    const ticks = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map(b => `<div class="tick ${Number.isInteger(b) ? "major" : ""}" style="left:${pct(b)}%">${Number.isInteger(b) ? `<span>${b}</span>` : ""}</div>`).join("");
    const gaps = MODS.map(([m, n]) => { const b = latest(m); return b ? [n, tgt(m) - b] : null; }).filter(Boolean);
    const foot = gaps.length ? (gaps.every(g => g[1] <= 0) ? "Every module is at or above its target. Hold it there with one full test a week." : `Furthest from target: ${gaps.sort((x, y) => y[1] - x[1])[0][0]}, ${gaps[0][1].toFixed(1)} band${gaps[0][1] === 1 ? "" : "s"} to go.`) : "Take one test in each module this week to place your markers on the line.";
    const recent = all.slice(-6).reverse();
    const wrap = el(`<div class="home">
      <div class="greet"><div><h1>${greet}${first ? ", " + esc(first) : ""}.</h1><div class="date">${today.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} · ${days > 0 ? `${days} days to the exam on 29 December` : "Exam day"}</div></div><div class="sync">${syncLabel()}</div></div>
      <div class="bandline"><div class="head"><h2>Where you stand</h2><div class="legend"><a href="#targets" style="color:var(--bl-ink-3)">Targets: ${IELTS.targetsText().replace(/[a-z]+ /gi, m => m[0] + " ")}</a><span><i style="background:var(--bl-teal)"></i>Latest band</span><span><i style="background:var(--bl-saffron);border-radius:2px;width:4px"></i>Target</span></div></div>
        <div class="scale"><div class="axis">${ticks}</div>${lanes}</div><div class="foot">${foot}</div></div>
      <div class="today">
        <div class="card"><h3>Today</h3><div class="when">${esc(week.title)} · ${new Date(week.from + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })} to ${new Date(week.to + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
          <ul><li>${spineToday[1]}</li><li>Error log: for each wrong answer write spelling, missed or misunderstood (5 min)</li><li>Grammar drill: articles, dangling modifiers, agreement (10 min)</li>${week !== SCHEDULE[0] ? "<li>Record one Part 1 answer and listen back (5 min)</li>" : ""}</ul>
          <p class="muted" style="margin:12px 0 0;font-size:13px">This week: ${week.items.slice(0, 2).map(esc).join("; ")}. <a href="#plan">Full plan</a></p></div>
        <div class="card"><h3>Start now</h3><div class="next" style="margin-top:10px"><button class="btn primary" data-go="${spineToday[0]}">${spineToday[1].replace(/ \(.*\)/, "")}<span>›</span></button><button class="btn" data-go="writing">Writing drill: two-sentence introduction<span>›</span></button><button class="btn" data-go="speaking">Speaking set with the examiner<span>›</span></button></div></div>
      </div>
      <div class="modules">${MODS.map(([m, n, d]) => `<div class="module"><h2>${n}<span class="band">${latest(m) ? `<b>${latest(m)}</b> · target ${tgt(m)}` : "target " + tgt(m)}</span></h2><div class="desc">${d}</div><div class="actions"><button class="btn primary" data-go="${m}" data-full="1">${m === "speaking" ? "Examiner sets" : "Full timed test"}</button><button class="btn" data-go="${m}">${m === "speaking" ? "Random set" : m === "writing" ? "Single task or drills" : "Practise one part"}</button></div></div>`).join("")}</div>
      ${recent.length ? `<div class="section"><div class="row" style="justify-content:space-between"><h2 style="margin:0">Recent attempts</h2><a class="btn small" href="#progress">All progress</a></div><table class="rtable recent" style="margin-top:12px"><tr><th>When</th><th>Test</th><th>Result</th></tr>${recent.map(a => `<tr><td>${IELTS.fmtDate(a.date)}</td><td>${esc(a.testTitle || a.module)}${a.scope && a.scope !== "full" ? ` <span class="muted">(${esc(a.scope)})</span>` : ""}</td><td>${a.band ? `<span class="band-pill">${a.band}</span>` : "<span class='muted'>unmarked</span>"}${a.raw != null ? ` <span class="muted">${a.raw}/40</span>` : ""}</td></tr>`).join("")}</table></div>` : ""}
    </div>`);
    $$("[data-go]", wrap).forEach(b => b.onclick = () => {
      const m = b.dataset.go;
      if (m === "speaking") return b.dataset.full ? go("speaking") : go("speaking-live-instr", { id: (window.SPEAKING_SETS || [])[Math.floor(Math.random() * (window.SPEAKING_SETS || []).length)].id });
      go(m);
    });
    app.appendChild(wrap);
  });
})();
