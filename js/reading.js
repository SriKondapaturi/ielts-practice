/* Reading module */
(function () {
  const { $, $$, esc, el, toast, modal, Timer, topbar, timerElement, updateTimerEl, showTimeWarning, bandFor, indicativeBand, saveAttempt, route, go, state, guardLeave, fmtTime, settings } = IELTS;

  const tests = () => window.READING_TESTS || [];
  const PASSAGE_WORDS = { 1: "Reading Passage 1", 2: "Reading Passage 2", 3: "Reading Passage 3" };

  // ---------- menu ----------
  route("reading", (app) => {
    app.appendChild(topbar({ title: "Academic Reading", buttons: [homeBtn()] }));
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › Reading</div>
      <h1>Academic Reading</h1>
      <p class="muted">Three passages, 40 questions, 60 minutes. The real test gives no extra time to transfer answers. Choose a full test, or practise one passage with 20 minutes.</p>
      <div class="section"><h2>Full tests</h2><div class="testlist" id="full"></div></div>
      <div class="section"><h2>Practise one passage (20 minutes)</h2><div class="testlist" id="single"></div></div>
    </div>`);
    const done = IELTS.getAttempts("reading");
    tests().forEach(t => {
      const prev = done.filter(a => a.testId === t.id && a.scope === "full");
      const last = prev[prev.length - 1];
      const card = el(`<div class="t"><b>${esc(t.title)}</b><div class="meta">${t.passages.map(p => esc(p.title)).join(" · ")}</div><div class="meta">${last ? `Last: ${last.raw}/40, Band ${last.band} (${IELTS.fmtDate(last.date)})` : "Not attempted"}</div><button class="btn primary">Start full test</button></div>`);
      $("button", card).onclick = () => go("reading-instr", { testId: t.id, scope: "full" });
      $("#full", wrap).appendChild(card);
      t.passages.forEach(p => {
        const pc = el(`<div class="t"><b>${esc(t.title)} · Passage ${p.number}</b><div class="meta">${esc(p.title)} · ${p.questionGroups.map(g => Questions.TYPE_LABEL[g.type]).filter((v, i, a) => a.indexOf(v) === i).join(", ")}</div><button class="btn">Practise this passage</button></div>`);
        $("button", pc).onclick = () => go("reading-instr", { testId: t.id, scope: "P" + p.number });
        $("#single", wrap).appendChild(pc);
      });
    });
    app.appendChild(wrap);
  });

  function homeBtn() { const b = el(`<button class="tbtn">Home</button>`); b.onclick = () => go("home"); return b; }

  // ---------- instructions ----------
  route("reading-instr", (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("reading");
    const single = p.scope !== "full";
    app.appendChild(topbar({ title: t.title, buttons: [homeBtn()] }));
    const minutes = single ? 20 : 60;
    const box = el(`<div class="instr"><div class="box">
      <h1>IELTS Academic Reading</h1>
      <p><b>Time: ${minutes} minutes</b></p>
      <h3>INSTRUCTIONS TO CANDIDATES</h3>
      <ul>
        <li>Answer <b>all</b> the questions.</li>
        <li>You can change your answers at any time during the test.</li>
        <li>Spelling matters: an answer with a spelling mistake is marked wrong.</li>
        <li>Do not write more than the number of words allowed for each answer.</li>
      </ul>
      <h3>INFORMATION FOR CANDIDATES</h3>
      <ul>
        <li>There are ${single ? "13 or 14" : "40"} questions in this ${single ? "part" : "test"}.</li>
        <li>Each question carries one mark.</li>
        <li>${single ? "This part has one passage." : "There are three parts to the test, each with one passage."}</li>
        <li>The test clock will show you when you have 10 minutes and 5 minutes left. Your answers are submitted automatically when time runs out.</li>
        <li>Select text in the passage to highlight it or add a note, as in the computer-delivered test.</li>
      </ul>
      <div class="start"><button class="btn primary" id="start">Start test</button><button class="btn" id="back">Back</button></div>
    </div></div>`);
    $("#start", box).onclick = () => go("reading-exam", p);
    $("#back", box).onclick = () => go("reading");
    app.appendChild(box);
  });

  // ---------- exam ----------
  route("reading-exam", (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("reading");
    const single = p.scope !== "full";
    const passages = single ? t.passages.filter(x => "P" + x.number === p.scope) : t.passages;
    const seconds = single ? 20 * 60 : 60 * 60;
    const answers = {}; const flags = new Set(); let cur = passages[0]; let curQ = passages[0].questionGroups[0].range[0];
    const allGroups = passages.flatMap(x => x.questionGroups);
    const qnums = allGroups.flatMap(g => { const [a, b] = g.range; const arr = []; for (let i = a; i <= b; i++) arr.push(i); return arr; });
    let finished = false;

    app.className = "exam";
    const tel = timerElement();
    const helpBtn = el(`<button class="tbtn">Help</button>`);
    const hideBtn = el(`<button class="tbtn">Hide</button>`);
    const finishBtn = el(`<button class="tbtn">Finish</button>`);
    app.appendChild(topbar({ title: `${t.title}${single ? " · Passage " + cur.number : ""}`, timerEl: tel, buttons: [IELTS.displayButton(), hideBtn, helpBtn, finishBtn] }));
    const partbar = el(`<div class="partbar"><b></b><span class="pb-text"></span><span class="spacer" style="flex:1"></span><span class="mobile-switch"><button class="btn small" data-m="passage">Passage</button><button class="btn small" data-m="questions">Questions</button></span></div>`);
    app.appendChild(partbar);
    const body = el(`<div class="body"><div class="pane left"><div class="passage"></div></div><div class="splitter"></div><div class="pane right"></div></div>`);
    app.appendChild(body);
    const nav = el(`<div class="navbar"><div class="parts"></div><label class="review-toggle"><input type="checkbox" id="revflag"> Review</label><div class="arrows"><button class="btn small" id="prev">◀</button><button class="btn small" id="next">▶</button></div></div>`);
    app.appendChild(nav);
    app.classList.add("mob-questions");
    $$(".mobile-switch button", partbar).forEach(b => b.onclick = () => { app.classList.remove("mob-passage", "mob-questions"); app.classList.add(b.dataset.m === "passage" ? "mob-passage" : "mob-questions"); });

    // hide timer toggle (as in CD-IELTS)
    hideBtn.onclick = () => { tel.style.visibility = tel.style.visibility === "hidden" ? "visible" : "hidden"; hideBtn.textContent = tel.style.visibility === "hidden" ? "Show" : "Hide"; };
    helpBtn.onclick = () => modal(`<h2>Help</h2><ul><li>Select any text in the passage to <b>highlight</b> it or add a <b>note</b>. Click a highlight to remove it.</li><li>Use the number buttons at the bottom to move between questions. Black means answered. A yellow border means you flagged it for review.</li><li>For headings, sentence endings and word-list summaries, <b>drag</b> an option onto the question, or pick it from the list.</li><li>Tick <b>Review</b> to flag the current question.</li><li><b>Settings</b> changes the text size and colours, as in the real test.</li><li>Drag the grey bar between the passage and the questions to resize them.</li><li>The clock turns orange at 10 minutes and red at 5 minutes. Answers are submitted automatically at zero.</li></ul>`);

    // splitter
    const left = $(".pane.left", body), right = $(".pane.right", body), split = $(".splitter", body);
    let dragging = false;
    split.addEventListener("mousedown", () => { dragging = true; document.body.style.userSelect = "none"; });
    window.addEventListener("mousemove", e => { if (!dragging) return; const r = body.getBoundingClientRect(); const pct = Math.min(75, Math.max(25, ((e.clientX - r.left) / r.width) * 100)); left.style.flex = `0 0 ${pct}%`; });
    window.addEventListener("mouseup", () => { dragging = false; document.body.style.userSelect = ""; });

    // passage render with highlighting
    const highlights = {}; // passage number -> innerHTML (to persist highlights across part switches)
    function renderPassage(ps) {
      const pass = $(".passage", left);
      if (highlights[ps.number]) { pass.innerHTML = highlights[ps.number]; return; }
      const paras = ps.paragraphs.map((txt, i) => `<p>${ps.lettered ? `<span class="pl">${String.fromCharCode(65 + i)}</span>` : ""}${esc(txt)}</p>`).join("");
      pass.innerHTML = `<h2>${esc(ps.title)}</h2>${ps.subtitle ? `<div class="subtitle">${esc(ps.subtitle)}</div>` : ""}${paras}`;
    }
    let menu = null;
    function removeMenu() { if (menu) { menu.remove(); menu = null; } }
    left.addEventListener("mouseup", (e) => {
      setTimeout(() => {
        removeMenu();
        const sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
        const range = sel.getRangeAt(0); if (!left.contains(range.commonAncestorContainer)) return;
        const rect = range.getBoundingClientRect();
        menu = el(`<div class="hl-menu"><button data-a="hl">Highlight</button><button data-a="note">Note</button><button data-a="clear">Clear</button></div>`);
        menu.style.left = Math.max(8, rect.left + window.scrollX) + "px"; menu.style.top = (rect.top + window.scrollY - 36) + "px";
        document.body.appendChild(menu);
        menu.onmousedown = ev => ev.preventDefault();
        menu.onclick = async (ev) => {
          const a = ev.target.dataset.a; if (!a) return;
          if (a === "clear") { clearHighlightsInRange(range); }
          else {
            let note = "";
            if (a === "note") { removeMenu(); note = await promptNote(); if (note == null) { sel.removeAllRanges(); return; } }
            wrapRange(range, a === "note" ? "note" : "", note);
          }
          sel.removeAllRanges(); removeMenu(); highlights[cur.number] = $(".passage", left).innerHTML;
        };
      }, 10);
    });
    left.addEventListener("click", (e) => {
      const m = e.target.closest("mark"); if (!m || (window.getSelection() && !window.getSelection().isCollapsed)) return;
      if (m.title) toast("Note: " + m.title, 4000);
      modal(`<h2>${m.classList.contains("note") ? "Note" : "Highlight"}</h2>${m.title ? `<p>${esc(m.title)}</p>` : ""}<p class="muted">"${esc(m.textContent.slice(0, 160))}${m.textContent.length > 160 ? "…" : ""}"</p>`, [{ label: "Remove", value: "rm", cls: "danger" }, { label: "Close", value: false }]).then(v => { if (v === "rm") { unwrap(m); highlights[cur.number] = $(".passage", left).innerHTML; } });
    });
    document.addEventListener("mousedown", (e) => { if (menu && !menu.contains(e.target)) removeMenu(); });
    function promptNote() {
      return new Promise(resolve => {
        const root = $("#modal-root");
        const bg = el(`<div class="modal-bg"><div class="modal"><h2>Add a note</h2><textarea style="width:100%;height:90px"></textarea><div class="acts"><button class="btn" id="c">Cancel</button><button class="btn primary" id="s">Save</button></div></div></div>`);
        $("#c", bg).onclick = () => { root.innerHTML = ""; resolve(null); };
        $("#s", bg).onclick = () => { const v = $("textarea", bg).value.trim(); root.innerHTML = ""; resolve(v); };
        root.innerHTML = ""; root.appendChild(bg); $("textarea", bg).focus();
      });
    }
    function wrapRange(range, cls, title) {
      const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let n = walker.currentNode.nodeType === 3 ? walker.currentNode : walker.nextNode();
      while (n) { if (range.intersectsNode(n) && n.textContent.trim()) nodes.push(n); n = walker.nextNode(); }
      nodes.forEach(tn => {
        let start = tn === range.startContainer ? range.startOffset : 0;
        let end = tn === range.endContainer ? range.endOffset : tn.textContent.length;
        if (end <= start) return;
        const r2 = document.createRange(); r2.setStart(tn, start); r2.setEnd(tn, end);
        const m = document.createElement("mark"); if (cls) m.className = cls; if (title) m.title = title;
        try { r2.surroundContents(m); } catch (e) { }
      });
    }
    function unwrap(m) { const parent = m.parentNode; while (m.firstChild) parent.insertBefore(m.firstChild, m); parent.removeChild(m); parent.normalize(); }
    function clearHighlightsInRange(range) { $$("mark", left).forEach(m => { if (range.intersectsNode(m)) unwrap(m); }); }

    // questions
    const ctx = {
      answers, review: false,
      onChange: (n, v) => { if (typeof n === "string") { answers[n] = v; } else answers[n] = v; paintNav(); },
      onFocus: (n) => { if (qnums.includes(n)) { curQ = n; paintNav(); $("#revflag", nav).checked = flags.has(n); } }
    };
    function renderQuestions(ps) {
      right.innerHTML = "";
      ps.questionGroups.forEach(g => right.appendChild(Questions.renderGroup(g, ctx)));
      $$(".q", right).forEach(q => q.classList.toggle("current", +q.dataset.q === curQ));
    }
    function showPassage(ps) {
      cur = ps;
      $("b", partbar).textContent = `Part ${ps.number}`;
      $(".pb-text", partbar).textContent = ` Read the text and answer Questions ${ps.questionGroups[0].range[0]}–${ps.questionGroups[ps.questionGroups.length - 1].range[1]}.`;
      renderPassage(ps); renderQuestions(ps); left.scrollTop = 0; right.scrollTop = 0; paintNav();
    }
    // nav palette
    function paintNav() {
      const parts = $(".parts", nav); parts.innerHTML = "";
      passages.forEach(ps => {
        const [a] = ps.questionGroups[0].range, b = ps.questionGroups[ps.questionGroups.length - 1].range[1];
        const tab = el(`<div class="ptab ${ps === cur ? "open" : "collapsed"}"><span class="pname">Part ${ps.number}</span><span class="nums"></span></div>`);
        $(".pname", tab).onclick = () => { if (ps !== cur) { curQ = a; showPassage(ps); } };
        const nums = $(".nums", tab);
        for (let i = a; i <= b; i++) {
          const answered = isAnswered(i);
          const bt = el(`<button class="num ${answered ? "done" : ""} ${flags.has(i) ? "flag" : ""} ${i === curQ ? "cur" : ""}">${i}</button>`);
          bt.onclick = () => jumpTo(i, ps);
          nums.appendChild(bt);
        }
        if (ps !== cur) { tab.innerHTML = `<span class="pname">Part ${ps.number}</span><span class="muted" style="font-size:12px">${countAnswered(a, b)} of ${b - a + 1}</span>`; $(".pname", tab).onclick = () => { curQ = a; showPassage(ps); }; }
        parts.appendChild(tab);
      });
      $$(".q", right).forEach(q => q.classList.toggle("current", +q.dataset.q === curQ));
      $("#revflag", nav).checked = flags.has(curQ);
    }
    function isAnswered(i) {
      const g = allGroups.find(g => i >= g.range[0] && i <= g.range[1]);
      if (g && g.type === "mcq-multi") { const ch = answers["multi" + g.range[0]] || []; return ch.length > (i - g.range[0]); }
      return answers[i] != null && String(answers[i]).trim() !== "";
    }
    function countAnswered(a, b) { let c = 0; for (let i = a; i <= b; i++) if (isAnswered(i)) c++; return c; }
    function jumpTo(i, ps) {
      curQ = i; if (ps && ps !== cur) showPassage(ps);
      const target = right.querySelector(`[data-q="${i}"]`);
      if (target) { target.scrollIntoView({ block: "center", behavior: "smooth" }); const inp = target.matches("input,select") ? target : target.querySelector("input,select"); if (inp && window.innerWidth > 860) inp.focus({ preventScroll: true }); }
      app.classList.remove("mob-passage"); app.classList.add("mob-questions");
      paintNav();
    }
    $("#prev", nav).onclick = () => { const i = qnums.indexOf(curQ); if (i > 0) jumpTo(qnums[i - 1], passages.find(ps => inPassage(ps, qnums[i - 1]))); };
    $("#next", nav).onclick = () => { const i = qnums.indexOf(curQ); if (i < qnums.length - 1) jumpTo(qnums[i + 1], passages.find(ps => inPassage(ps, qnums[i + 1]))); };
    const inPassage = (ps, n) => ps.questionGroups.some(g => n >= g.range[0] && n <= g.range[1]);
    $("#revflag", nav).onchange = (e) => { e.target.checked ? flags.add(curQ) : flags.delete(curQ); paintNav(); };

    // timer
    const timer = new Timer(seconds, {
      onTick: r => updateTimerEl(tel, r),
      onWarn: w => showTimeWarning(w),
      onEnd: () => { toast("Time is up. Your answers have been submitted."); finish(true); }
    });
    timer.start(); guardLeave(true);
    state.cleanup = () => { timer.pause(); guardLeave(false); removeMenu(); };

    finishBtn.onclick = async () => {
      const un = qnums.filter(i => !isAnswered(i)).length;
      const ok = await modal(`<h2>Finish the test?</h2><p>${un ? `You have <b>${un}</b> unanswered question${un > 1 ? "s" : ""}.` : "All questions are answered."} Time remaining: ${fmtTime(timer.remaining)}.</p><p class="muted">In the real test you cannot finish early, but you can here. Your answers will be marked now.</p>`, [{ label: "Keep working", value: false }, { label: "Submit answers", value: true, cls: "primary" }]);
      if (ok) finish(false);
    };

    async function finish(auto) {
      if (finished) return; finished = true; timer.pause(); guardLeave(false);
      const results = Questions.markAll(allGroups, answers);
      const raw = results.filter(r => r.correct).length;
      const band = single ? indicativeBand(raw, results.length, "reading") : bandFor(raw, "reading");
      const bt = Questions.byType(results);
      const attempt = { module: "reading", testId: t.id, testTitle: t.title, scope: p.scope, raw, total: results.length, band, byType: bt, results: results.map(r => ({ n: r.n, given: r.given, expected: r.expected, correct: r.correct, type: r.type })), timeUsed: Math.round(seconds - timer.remaining), auto: !!auto };
      await saveAttempt(attempt);
      state.lastReading = { attempt, test: t, passages, answers, highlights };
      go("reading-results", { id: attempt.id });
    }
    showPassage(passages[0]);
  });

  // ---------- results ----------
  route("reading-results", (app, p) => {
    const a = IELTS.getAttempts("reading").find(x => x.id === p.id) || (state.lastReading && state.lastReading.attempt);
    if (!a) return go("reading");
    const t = tests().find(x => x.id === a.testId);
    app.appendChild(topbar({ title: "Reading results", buttons: [homeBtn()] }));
    const single = a.scope !== "full";
    const bt = a.byType || {};
    const wrap = el(`<div class="results">
      <div class="breadcrumb"><a href="#home">Home</a> › <a href="#reading">Reading</a> › Results</div>
      <h1>${esc(a.testTitle || "")}${single ? " · Passage " + a.scope.slice(1) : ""}</h1>
      <div class="score">
        <div class="sc"><div class="v">${a.raw} / ${a.total}</div><div class="l">Correct answers</div></div>
        <div class="sc"><div class="v">${a.band}</div><div class="l">${single ? "Indicative band (scaled to 40)" : "Band score (official Academic table)"}</div></div>
        <div class="sc"><div class="v">${fmtTime(a.timeUsed || 0)}</div><div class="l">Time used${a.auto ? " (auto-submitted)" : ""}</div></div>
      </div>
      <div class="row" style="margin-bottom:18px"><button class="btn primary" id="review">Review answers in the passage</button><button class="btn" id="again">Try again</button><a class="btn" href="#progress">Progress</a></div>
      <h2>By question type</h2>${Questions.typeTable(bt)}
      <h2 style="margin-top:22px">All answers</h2>${Questions.resultsTable(a.results)}
      <p class="muted" style="margin-top:14px">Band 8 needs 35 of 40 on a full test. Band 7 needs 30. Spelling and word limits count.</p>
    </div>`);
    $("#again", wrap).onclick = () => go("reading-instr", { testId: a.testId, scope: a.scope });
    $("#review", wrap).onclick = () => {
      if (!t) return toast("Test content not found");
      state.reviewData = a; go("reading-review", { id: a.id });
    };
    app.appendChild(wrap);
  });

  route("reading-review", (app, p) => {
    const a = IELTS.getAttempts("reading").find(x => x.id === p.id); if (!a) return go("reading");
    const t = tests().find(x => x.id === a.testId); if (!t) return go("reading");
    const single = a.scope !== "full";
    const passages = single ? t.passages.filter(x => "P" + x.number === a.scope) : t.passages;
    const answers = {}; a.results.forEach(r => { if (r.type === "mcq-multi") { const g = passages.flatMap(x => x.questionGroups).find(g => g.type === "mcq-multi" && r.n >= g.range[0] && r.n <= g.range[1]); if (g) answers["multi" + g.range[0]] = String(r.given).split(",").map(s => s.trim()).filter(Boolean); } else answers[r.n] = r.given; });
    app.className = "exam";
    const back = el(`<button class="tbtn">Back to results</button>`); back.onclick = () => go("reading-results", { id: a.id });
    app.appendChild(topbar({ title: "Review · " + (a.testTitle || ""), buttons: [back, homeBtn()] }));
    const partbar = el(`<div class="partbar"><b>Review</b><span class="pb-text">Correct answers are shown in green; your incorrect answers in red.</span><span style="flex:1"></span><span class="mobile-switch"><button class="btn small" data-m="passage">Passage</button><button class="btn small" data-m="questions">Questions</button></span></div>`);
    app.appendChild(partbar);
    const body = el(`<div class="body"><div class="pane left"><div class="passage"></div></div><div class="splitter"></div><div class="pane right"></div></div>`);
    app.appendChild(body); app.classList.add("mob-questions");
    $$(".mobile-switch button", partbar).forEach(b => b.onclick = () => { app.classList.remove("mob-passage", "mob-questions"); app.classList.add(b.dataset.m === "passage" ? "mob-passage" : "mob-questions"); });
    const nav = el(`<div class="navbar"><div class="parts"></div></div>`); app.appendChild(nav);
    const ctx = { answers, review: true, results: a.results, onChange() { }, onFocus() { } };
    function show(ps) {
      $(".passage", body).innerHTML = `<h2>${esc(ps.title)}</h2>${ps.subtitle ? `<div class="subtitle">${esc(ps.subtitle)}</div>` : ""}${ps.paragraphs.map((txt, i) => `<p>${ps.lettered ? `<span class="pl">${String.fromCharCode(65 + i)}</span>` : ""}${esc(txt)}</p>`).join("")}`;
      const right = $(".pane.right", body); right.innerHTML = ""; ps.questionGroups.forEach(g => right.appendChild(Questions.renderGroup(g, ctx)));
      $(".parts", nav).innerHTML = ""; passages.forEach(x => { const b = el(`<button class="btn small ${x === ps ? "primary" : ""}">Part ${x.number}</button>`); b.onclick = () => show(x); $(".parts", nav).appendChild(b); });
    }
    show(passages[0]);
  });
})();
