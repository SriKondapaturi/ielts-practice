/* Progress dashboard */
(function () {
  const { $, $$, esc, el, topbar, route, go, getAttempts, fmtDate, modal, deleteAttempt } = IELTS;
  function homeBtn() { const b = el(`<button class="tbtn">Home</button>`); b.onclick = () => go("home"); return b; }

  function trendChart(points, target) {
    // points: [{date, band, label}]
    const w = 420, h = 200, pad = { l: 34, r: 12, t: 14, b: 30 };
    const W = w - pad.l - pad.r, H = h - pad.t - pad.b;
    const y = b => pad.t + H - ((Math.max(4, Math.min(9, b)) - 4) / 5) * H; // 4..9
    const x = i => points.length > 1 ? pad.l + (W * i) / (points.length - 1) : pad.l + W / 2;
    let s = `<svg viewBox="0 0 ${w} ${h}" font-family="Arial" font-size="11">`;
    for (let b = 4; b <= 9; b++) s += `<line x1="${pad.l}" y1="${y(b)}" x2="${pad.l + W}" y2="${y(b)}" stroke="#eee"/><text x="${pad.l - 6}" y="${y(b) + 4}" text-anchor="end" fill="#666">${b}</text>`;
    s += `<line x1="${pad.l}" y1="${y(target)}" x2="${pad.l + W}" y2="${y(target)}" stroke="#1a7f37" stroke-dasharray="5 4"/><text x="${pad.l + W}" y="${y(target) - 4}" text-anchor="end" fill="#1a7f37">target ${target}</text>`;
    if (!points.length) return s + `<text x="${w / 2}" y="${h / 2}" text-anchor="middle" fill="#999">No attempts yet</text></svg>`;
    s += `<polyline fill="none" stroke="#333" stroke-width="2" points="${points.map((p, i) => `${x(i)},${y(p.band)}`).join(" ")}"/>`;
    points.forEach((p, i) => { s += `<circle cx="${x(i)}" cy="${y(p.band)}" r="4" fill="${p.band >= target ? "#1a7f37" : "#333"}"><title>${esc(p.label)}: Band ${p.band} (${fmtDate(p.date)})</title></circle>`; if (points.length <= 8 || i % Math.ceil(points.length / 8) === 0) s += `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" fill="#666">${new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</text>`; });
    return s + "</svg>";
  }

  route("progress", (app) => {
    app.appendChild(topbar({ title: "Progress", buttons: [homeBtn()] }));
    const all = getAttempts();
    const mods = [["listening", "Listening"], ["reading", "Reading"], ["writing", "Writing"], ["speaking", "Speaking"]];
    const wrap = el(`<div class="progress"><div class="breadcrumb"><a href="#home">Home</a> › Progress</div><h1>Progress</h1><p class="muted">Band trend per module (full tests and single parts; single parts are scaled estimates) against the target for that module (${IELTS.targetsText()}). Then the question types and criteria that cost the most marks.</p><div class="pgrid" id="charts"></div><div class="section"><h2>Where marks are lost</h2><div class="pgrid" id="weak"></div></div><div class="section"><h2>Error log</h2><p class="muted">Every mark you lost, in one place, as your study plan asks. Tick an item once you have written the correction in your notebook and understood why; ticked items are hidden by default.</p><div class="row" style="margin-bottom:8px"><label><input type="checkbox" id="showrev"> Show reviewed items</label><span class="muted" id="errcount"></span></div><div id="errlog"></div></div>
      <div class="section"><h2>All attempts</h2><div id="list"></div></div></div>`);
    const charts = $("#charts", wrap);
    mods.forEach(([m, name]) => {
      const pts = all.filter(a => a.module === m && a.band).map(a => ({ date: a.date, band: a.band, label: (a.testTitle || "") + (a.scope && a.scope !== "full" ? " " + a.scope : "") }));
      const full = all.filter(a => a.module === m && a.band && a.scope === "full");
      const best = full.length ? Math.max(...full.map(a => a.band)) : null; const last = pts.length ? pts[pts.length - 1].band : null;
      charts.appendChild(el(`<div class="card chart"><h3>${name} <span class="muted" style="font-weight:normal;font-size:13px">· ${pts.length} attempt${pts.length === 1 ? "" : "s"}${last ? ` · latest ${last}` : ""}${best ? ` · best full test ${best}` : ""}</span></h3>${trendChart(pts, IELTS.TARGETS[m])}</div>`));
    });
    // weak spots
    const weak = $("#weak", wrap);
    ["reading", "listening"].forEach(m => {
      const agg = {}; all.filter(a => a.module === m && a.byType).forEach(a => Object.entries(a.byType).forEach(([k, v]) => { agg[k] = agg[k] || { correct: 0, total: 0 }; agg[k].correct += v.correct; agg[k].total += v.total; }));
      const rows = Object.entries(agg).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));
      weak.appendChild(el(`<div class="card"><h3>${m === "reading" ? "Reading" : "Listening"} question types</h3>${rows.length ? `<table class="rtable">${rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v.correct}/${v.total}</td><td style="width:38%"><div class="bar"><div style="width:${Math.round(100 * v.correct / v.total)}%;background:${v.correct / v.total < 0.7 ? "#b42318" : "#333"}"></div></div></td></tr>`).join("")}</table><p class="muted" style="margin-top:8px">Red bars are below 70%. Band 8 needs about 88% (35 of 40).</p>` : '<p class="muted">No marked tests yet.</p>'}</div>`));
    });
    [["writing", "Writing criteria", { TA: "Task Achievement / Response", CC: "Coherence & Cohesion", LR: "Lexical Resource", GRA: "Grammatical Range & Accuracy" }], ["speaking", "Speaking criteria", { FC: "Fluency & Coherence", LR: "Lexical Resource", GRA: "Grammatical Range & Accuracy", P: "Pronunciation" }]].forEach(([m, title, labels]) => {
      const at = all.filter(a => a.module === m && a.criteria);
      const avg = {}; Object.keys(labels).forEach(k => { const vals = at.map(a => +a.criteria[k]).filter(v => v > 0); avg[k] = vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : null; });
      const rows = Object.entries(avg).filter(([k, v]) => v != null).sort((a, b) => a[1] - b[1]);
      weak.appendChild(el(`<div class="card"><h3>${title}</h3>${rows.length ? `<table class="rtable">${rows.map(([k, v]) => `<tr><td>${esc(labels[k])}</td><td>${v.toFixed(1)}</td><td style="width:38%"><div class="bar"><div style="width:${Math.round((v / 9) * 100)}%;background:${v < 7.5 ? "#b42318" : "#333"}"></div></div></td></tr>`).join("")}</table><p class="muted" style="margin-top:8px">Average band per criterion across ${at.length} marked attempt${at.length === 1 ? "" : "s"}. The lowest is where the next band comes from.</p>` : '<p class="muted">No marked attempts yet.</p>'}</div>`));
    });
    // error log
    const settings = IELTS.settings; settings.reviewed = settings.reviewed || {};
    const errs = [];
    all.forEach(a => {
      if ((a.module === "reading" || a.module === "listening") && a.results) a.results.filter(r => !r.correct).forEach(r => errs.push({ key: `${a.id}:${r.n}`, date: a.date, module: a.module, test: a.testTitle, what: `Q${r.n} · ${esc(Questions.TYPE_LABEL[r.type] || r.type)}`, wrong: r.given || "(blank)", right: r.expected, note: r.given && r.expected && IELTS.norm(r.given) === IELTS.norm(r.expected) ? "Right words, too many of them or a spelling slip" : "" }));
      if (a.module === "writing" && a.marking && a.marking.tasks) a.marking.tasks.forEach(tk => (tk.corrections || []).forEach((c, i) => errs.push({ key: `${a.id}:w${tk.task}:${i}`, date: a.date, module: "writing", test: a.testTitle, what: tk.task === "drill" ? "Drill" : "Task " + tk.task, wrong: c.original, right: c.corrected, note: c.note })));
      if (a.module === "speaking" && a.marking && a.marking.corrections) a.marking.corrections.forEach((c, i) => errs.push({ key: `${a.id}:s:${i}`, date: a.date, module: "speaking", test: a.testTitle, what: "Spoken", wrong: c.original, right: c.corrected, note: c.note }));
    });
    errs.sort((x, y) => y.date - x.date);
    const errlog = $("#errlog", wrap), showrev = $("#showrev", wrap);
    function paintErrors() {
      const vis = errs.filter(e => showrev.checked || !settings.reviewed[e.key]);
      $("#errcount", wrap).textContent = `${errs.filter(e => !settings.reviewed[e.key]).length} to review · ${errs.length} total`;
      if (!vis.length) { errlog.innerHTML = `<p class="muted">${errs.length ? "Everything is reviewed." : "No errors recorded yet."}</p>`; return; }
      const tbl = el(`<table class="rtable"><tr><th></th><th>Date</th><th>Module</th><th>Where</th><th>You wrote / said</th><th>Correct</th><th>Why</th></tr></table>`);
      vis.slice(0, 200).forEach(e => { const tr = el(`<tr class="${settings.reviewed[e.key] ? "muted" : ""}"><td><input type="checkbox" ${settings.reviewed[e.key] ? "checked" : ""}></td><td>${fmtDate(e.date)}</td><td>${esc(e.module)}</td><td>${esc(e.test || "")}<br><span class="muted">${e.what}</span></td><td class="bad">${esc(e.wrong)}</td><td class="ok">${esc(e.right)}</td><td class="muted">${esc(e.note || "")}</td></tr>`); $("input", tr).onchange = ev => { if (ev.target.checked) settings.reviewed[e.key] = Date.now(); else delete settings.reviewed[e.key]; IELTS.saveSettings(); paintErrors(); }; tbl.appendChild(tr); });
      errlog.innerHTML = ""; errlog.appendChild(tbl);
    }
    showrev.onchange = paintErrors; paintErrors();
    // list
    const list = $("#list", wrap);
    if (!all.length) list.innerHTML = '<p class="muted">Nothing yet. Completed tests appear here automatically.</p>';
    else {
      const tbl = el(`<table class="rtable"><tr><th>Date</th><th>Module</th><th>Test</th><th>Score</th><th>Band</th><th></th></tr></table>`);
      all.slice().reverse().forEach(a => {
        const tr = el(`<tr><td>${fmtDate(a.date)}</td><td>${esc(a.module)}</td><td>${esc(a.testTitle || "")}${a.scope && a.scope !== "full" ? ` <span class="tag">${esc(a.scope)}</span>` : ""}</td><td>${a.raw != null ? `${a.raw}/${a.total}` : a.criteria ? Object.entries(a.criteria).filter(([k, v]) => v > 0).map(([k, v]) => `${k} ${v}`).join(" · ") : "—"}</td><td><b>${a.band != null ? a.band : "unmarked"}</b></td><td><button class="btn small" data-open>Open</button> <button class="btn small danger" data-del>Delete</button></td></tr>`);
        $("[data-open]", tr).onclick = () => go(a.module === "writing" ? "writing-mark" : a.module + "-results", { id: a.id });
        if (a.module === "speaking") $("[data-open]", tr).onclick = () => a.scope === "live" ? go("speaking-live-results", { id: a.id }) : modal(`<h2>${esc(a.testTitle)}</h2><p>Band ${a.band}: ${Object.entries(a.criteria || {}).filter(([k, v]) => v > 0).map(([k, v]) => `${k} ${v}`).join(", ")}</p><div class="essay-view">${esc(a.notes || "No notes saved.")}</div>`);
        $("[data-del]", tr).onclick = async () => { if (await modal(`<h2>Delete this attempt?</h2>`, [{ label: "Cancel", value: false }, { label: "Delete", value: true, cls: "danger" }])) { await deleteAttempt(a.id); IELTS.render(); } };
        tbl.appendChild(tr);
      });
      list.appendChild(tbl);
    }
    app.appendChild(wrap);
  });
})();
