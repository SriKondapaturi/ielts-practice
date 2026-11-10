/* Writing module: tests, drills, Claude marking */
(function () {
  const { $, $$, esc, el, toast, modal, Timer, topbar, timerElement, updateTimerEl, showTimeWarning, saveAttempt, route, go, state, guardLeave, fmtTime, wordCount, copyText, getSample } = IELTS;
  const tests = () => window.WRITING_TESTS || [];
  const drills = () => window.WRITING_DRILLS || { intro: [], body: [], overview: [] };
  function homeBtn() { const b = el(`<button class="tbtn">Home</button>`); b.onclick = () => go("home"); return b; }
  const round5 = x => Math.round(x * 2) / 2;

  // ---------- menu ----------
  route("writing", (app) => {
    app.appendChild(topbar({ title: "Academic Writing", buttons: [homeBtn()] }));
    const done = IELTS.getAttempts("writing");
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › Writing</div>
      <h1>Academic Writing</h1>
      <p class="muted">Task 1 (a report on a chart, table, map or process, at least 150 words, about 20 minutes) and Task 2 (an essay, at least 250 words, about 40 minutes). 60 minutes in total, one clock, no extra time. Task 2 counts twice as much as Task 1.</p>
      <div class="section"><h2>Full tests (60 minutes)</h2><div class="testlist" id="full"></div></div>
      <div class="section"><h2>Single task</h2><div class="testlist" id="single"></div></div>
      <div class="section"><h2>Quick drills</h2><p class="muted">Short, focused practice marked against the same criteria. Introductions follow the two-sentence method from your study plan.</p><div class="testlist" id="drills"></div></div>
      <div class="section"><h2>Idea bank</h2><p class="muted">Your own topic notes, condensed, for planning body paragraphs.</p><button class="btn" id="ideas">Open idea bank</button></div>
    </div>`);
    tests().forEach(t => {
      const prev = done.filter(a => a.testId === t.id && a.scope === "full"); const last = prev[prev.length - 1];
      const c = el(`<div class="t"><b>${esc(t.title)}</b><div class="meta">Task 1: ${esc(t.task1.kind)} · Task 2: ${esc(t.task2.topic)} (${esc(t.task2.type)})</div><div class="meta">${last && last.band ? `Last: Band ${last.band} (${IELTS.fmtDate(last.date)})` : "Not attempted"}</div><button class="btn primary">Start full test</button></div>`);
      $("button", c).onclick = () => go("writing-instr", { testId: t.id, scope: "full" }); $("#full", wrap).appendChild(c);
      const c1 = el(`<div class="t"><b>${esc(t.title)} · Task 1</b><div class="meta">${esc(t.task1.prompt.split("\n")[0])}</div><button class="btn">Task 1 only (20 min)</button></div>`);
      $("button", c1).onclick = () => go("writing-instr", { testId: t.id, scope: "T1" }); $("#single", wrap).appendChild(c1);
      const c2 = el(`<div class="t"><b>${esc(t.title)} · Task 2</b><div class="meta">${esc(t.task2.prompt.split("\n")[0].slice(0, 110))}…</div><button class="btn">Task 2 only (40 min)</button></div>`);
      $("button", c2).onclick = () => go("writing-instr", { testId: t.id, scope: "T2" }); $("#single", wrap).appendChild(c2);
    });
    [["intro", "Introduction only", "Two sentences: paraphrase + opinion. 8 minutes.", drills().intro.length],
     ["body", "One body paragraph", "Topic sentence, explanation, example, link. 10 minutes.", drills().body.length],
     ["overview", "Task 1 overview only", "Introduction sentence + overview of main features. 6 minutes.", drills().overview.length]].forEach(([k, name, d, n]) => {
      const c = el(`<div class="t"><b>${name}</b><div class="meta">${d} ${n} prompts, chosen at random.</div><button class="btn">Start drill</button></div>`);
      $("button", c).onclick = () => go("writing-drill", { kind: k }); $("#drills", wrap).appendChild(c);
    });
    $("#ideas", wrap).onclick = () => go("ideas");
    app.appendChild(wrap);
  });

  route("ideas", (app) => {
    app.appendChild(topbar({ title: "Idea bank", buttons: [homeBtn()] }));
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › <a href="#writing">Writing</a> › Idea bank</div><h1>Idea bank</h1><p class="muted">Condensed from your "Ideas on different topics" notes. Use these to plan two body paragraphs in under five minutes.</p><div id="list"></div></div>`);
    (window.IDEA_BANK || []).forEach(i => $("#list", wrap).appendChild(el(`<div class="card" style="margin-bottom:10px"><b>${esc(i.q)}</b><p style="margin:6px 0 2px"><span class="tag">Side 1</span> ${esc(i.for)}</p><p style="margin:2px 0"><span class="tag">Side 2</span> ${esc(i.against)}</p></div>`)));
    app.appendChild(wrap);
  });

  // ---------- instructions ----------
  route("writing-instr", (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("writing");
    const minutes = p.scope === "T1" ? 20 : p.scope === "T2" ? 40 : 60;
    app.appendChild(topbar({ title: t.title, buttons: [homeBtn()] }));
    const box = el(`<div class="instr"><div class="box">
      <h1>IELTS Academic Writing</h1><p><b>Time: ${minutes} minutes</b></p>
      <h3>INSTRUCTIONS TO CANDIDATES</h3>
      <ul><li>Answer ${p.scope === "full" ? "<b>both</b> tasks" : "the task"}.</li>${p.scope === "full" ? "<li>Write at least 150 words for Task 1.</li><li>Write at least 250 words for Task 2.</li>" : p.scope === "T1" ? "<li>Write at least 150 words.</li>" : "<li>Write at least 250 words.</li>"}<li>Write your answers in the answer boxes. A word count is shown under each box.</li></ul>
      <h3>INFORMATION FOR CANDIDATES</h3>
      <ul>${p.scope === "full" ? "<li>Task 2 contributes twice as much as Task 1 to the Writing score.</li><li>You can move between the tasks at any time; the clock does not stop.</li>" : ""}<li>Your writing is locked when the time ends and is then marked against the four assessment criteria.</li><li>There is no spell-checker, as in the real test.</li></ul>
      <div class="start"><button class="btn primary" id="start">Start test</button><button class="btn" id="back">Back</button></div></div></div>`);
    $("#start", box).onclick = () => go("writing-exam", p); $("#back", box).onclick = () => go("writing");
    app.appendChild(box);
  });

  // ---------- exam ----------
  route("writing-exam", (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("writing");
    const scope = p.scope; const seconds = (scope === "T1" ? 20 : scope === "T2" ? 40 : 60) * 60;
    const taskKeys = scope === "T1" ? ["task1"] : scope === "T2" ? ["task2"] : ["task1", "task2"];
    const texts = { task1: "", task2: "" }; let curKey = taskKeys[0]; let finished = false;
    app.className = "exam writing";
    const tel = timerElement(); const finishBtn = el(`<button class="tbtn">Finish</button>`); const hideBtn = el(`<button class="tbtn">Hide</button>`);
    app.appendChild(topbar({ title: t.title, timerEl: tel, buttons: [IELTS.displayButton(), hideBtn, finishBtn] }));
    hideBtn.onclick = () => { tel.style.visibility = tel.style.visibility === "hidden" ? "visible" : "hidden"; hideBtn.textContent = tel.style.visibility === "hidden" ? "Show" : "Hide"; };
    const partbar = el(`<div class="partbar"><div class="wtabs">${taskKeys.map(k => `<button data-k="${k}">${k === "task1" ? "Task 1" : "Task 2"}</button>`).join("")}</div><span class="pb-text muted"></span></div>`);
    app.appendChild(partbar);
    const body = el(`<div class="body"><div class="task"></div><div class="editor"><textarea spellcheck="false" placeholder="Type your answer here."></textarea><div class="edbar"><span class="wc">Words: 0</span><span class="muted">Minimum ${curKey === "task1" ? 150 : 250} words</span></div></div></div>`);
    app.appendChild(body);
    const ta = $("textarea", body), wc = $(".wc", body);
    function showTask(k) {
      texts[curKey] = ta.value; curKey = k; ta.value = texts[k];
      $$(".wtabs button", partbar).forEach(b => b.classList.toggle("active", b.dataset.k === k));
      const task = t[k];
      $(".pb-text", partbar).textContent = k === "task1" ? "You should spend about 20 minutes on this task. Write at least 150 words." : "You should spend about 40 minutes on this task. Write at least 250 words.";
      $(".task", body).innerHTML = `<h3>Writing ${k === "task1" ? "Task 1" : "Task 2"}</h3><div class="prompt">${esc(task.prompt)}</div>${k === "task1" ? `<div class="figure">${task.svg || ""}${task.tableHtml || ""}</div>` : `<p class="muted" style="margin-top:14px">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>`}`;
      $(".edbar .muted", body).textContent = `Minimum ${k === "task1" ? 150 : 250} words`;
      updateWc();
    }
    function updateWc() { const n = wordCount(ta.value); wc.textContent = `Words: ${n}`; wc.style.color = n >= (curKey === "task1" ? 150 : 250) ? "var(--ok)" : ""; }
    ta.addEventListener("input", updateWc);
    $$(".wtabs button", partbar).forEach(b => b.onclick = () => showTask(b.dataset.k));
    const timer = new Timer(seconds, { onTick: r => updateTimerEl(tel, r), onWarn: w => showTimeWarning(w), onEnd: () => { ta.disabled = true; toast("Time is up. Your writing has been locked and sent for marking."); finish(true); } });
    timer.start(); guardLeave(true); state.cleanup = () => { timer.pause(); guardLeave(false); };
    finishBtn.onclick = async () => {
      texts[curKey] = ta.value;
      const short = taskKeys.filter(k => wordCount(texts[k]) < (k === "task1" ? 150 : 250));
      const ok = await modal(`<h2>Finish and submit for marking?</h2>${short.length ? `<p><b>${short.map(k => k === "task1" ? "Task 1" : "Task 2").join(" and ")}</b> ${short.length > 1 ? "are" : "is"} under the minimum word count. Under-length answers are penalised.</p>` : ""}<p>Time remaining: ${fmtTime(timer.remaining)}.</p>`, [{ label: "Keep writing", value: false }, { label: "Submit", value: true, cls: "primary" }]);
      if (ok) finish(false);
    };
    async function finish(auto) {
      if (finished) return; finished = true; timer.pause(); guardLeave(false); texts[curKey] = ta.value;
      const attempt = { module: "writing", testId: t.id, testTitle: t.title, scope, texts: { ...texts }, timeUsed: Math.round(seconds - timer.remaining), auto: !!auto, band: null, criteria: null };
      await saveAttempt(attempt);
      go("writing-mark", { id: attempt.id });
    }
    showTask(curKey);
  });

  // ---------- drills ----------
  route("writing-drill", (app, p) => {
    const list = drills()[p.kind] || []; if (!list.length) return go("writing");
    const item = p.item || list[Math.floor(Math.random() * list.length)];
    const minutes = p.kind === "intro" ? 8 : p.kind === "body" ? 10 : 6;
    app.className = "exam writing";
    const tel = timerElement(); const finishBtn = el(`<button class="tbtn">Finish</button>`); const skip = el(`<button class="tbtn">Another prompt</button>`);
    const names = { intro: "Introduction drill", body: "Body paragraph drill", overview: "Overview drill" };
    app.appendChild(topbar({ title: names[p.kind], timerEl: tel, buttons: [skip, finishBtn, homeBtn()] }));
    skip.onclick = () => { state.params = { kind: p.kind }; IELTS.render(); };
    const partbar = el(`<div class="partbar"><b>${names[p.kind]}</b><span class="muted">${minutes} minutes</span></div>`); app.appendChild(partbar);
    let taskHtml = "";
    if (p.kind === "intro") taskHtml = `<h3>Write the introduction only</h3><div class="prompt">${esc(item.prompt)}</div><div class="card" style="margin-top:14px;background:#fafafa"><b>Two sentences only</b><ol style="margin:6px 0 0 18px"><li>Paraphrase the question in your own words (change the words, keep the meaning).</li><li>State your opinion clearly, or say what the two sides are and which you support. For a problem/solution or two-part question, say what the essay covers in one sentence.</li></ol><p class="muted" style="margin-top:8px">No background sentence ("In today's world…"). No "This essay will discuss…". Target: 35–55 words.</p><details style="margin-top:8px"><summary class="muted">Old background statements for ${esc(item.topic)} (from your earlier notes; the new plan says to leave these out)</summary><ul>${item.background.map(b => `<li>${esc(b)}</li>`).join("")}</ul></details></div>`;
    else if (p.kind === "body") taskHtml = `<h3>Write one body paragraph</h3><div class="prompt">${esc(item.prompt)}</div><p style="margin-top:10px"><b>${esc(item.side)}</b></p><div class="card" style="margin-top:10px;background:#fafafa"><b>Structure</b>: topic sentence → explanation of why → example → link back. Target: 90–120 words.<p class="muted" style="margin-top:6px">Idea hint (optional): ${esc(item.ideaHint)}</p></div>`;
    else taskHtml = `<h3>Write the introduction and overview only</h3><div class="prompt">${esc(item.prompt)}</div><div class="figure">${item.svg || ""}${item.tableHtml || ""}</div><p class="muted">One sentence paraphrasing the task, then an overview paragraph with the 2–3 most important features. No numbers in the overview. Target: 50–70 words.</p>`;
    const body = el(`<div class="body"><div class="task">${taskHtml}</div><div class="editor"><textarea spellcheck="false" placeholder="Type here."></textarea><div class="edbar"><span class="wc">Words: 0</span></div></div></div>`); app.appendChild(body);
    const ta = $("textarea", body), wc = $(".wc", body); ta.addEventListener("input", () => wc.textContent = `Words: ${wordCount(ta.value)}`);
    let finished = false;
    const timer = new Timer(minutes * 60, { onTick: r => updateTimerEl(tel, r), onWarn: () => { }, onEnd: () => { ta.disabled = true; finish(true); } });
    timer.start(); state.cleanup = () => timer.pause();
    finishBtn.onclick = () => finish(false);
    async function finish(auto) {
      if (finished) return; finished = true; timer.pause();
      const attempt = { module: "writing", scope: "drill-" + p.kind, testTitle: names[p.kind] + ": " + (item.topic || item.kind || ""), drill: { kind: p.kind, item }, texts: { drill: ta.value }, timeUsed: Math.round(minutes * 60 - timer.remaining), auto: !!auto, band: null, criteria: null };
      await saveAttempt(attempt); go("writing-mark", { id: attempt.id });
    }
  });

  // ---------- marking ----------
  function buildPrompt(a) {
    const t = tests().find(x => x.id === a.testId);
    let intro = `You are a senior IELTS Academic Writing examiner. Mark strictly and honestly against the official public band descriptors, calibrated so that a Band 8 answer would satisfy a real examiner. The candidate's targets: Writing 7.5 in every criterion. Her last assessed level was Band 6.0. Do not inflate bands to be kind. Half bands are allowed for each criterion.\n\nThe method she is now following (from her IELTS Advantage study plan), which you should reinforce explicitly in the feedback:\n- Task 2 introduction = TWO sentences: paraphrase of the question, then a clear opinion or outline. A generic background sentence ("In today's world…", "Education plays a fundamental role…") or a "This essay will discuss/elucidate…" sentence costs marks: say so and show the two-sentence version.\n- Body paragraphs = topic sentence → explanation of why → example (→ link). Two fully developed ideas beat several thin ones.\n- Accurate simple vocabulary beats imprecise complex phrases. Memorised linkers and phrases ("To commence with", "To expound", "vividly substantiates", "To recapitulate", "in this contemporary epoch") used mechanically lower Lexical Resource at 7+: quote them and give the natural alternative.\n- Her known grammar patterns: missing or wrong articles, dangling modifiers, subject-verb agreement, repetition. Check for each and quote instances.\n- Task 1 must have an overview paragraph (main features, no data) after a one-sentence paraphrased introduction, then detail paragraphs with figures.\n\nRules: under-length answers (fewer than 150/250 words) lose marks in Task Achievement/Response. Off-topic or partially addressed prompts cap TA/TR at 5. Quote her actual words in corrections. Be specific, not generic.\n\n`;
    const tasks = [];
    if (a.scope === "full" || a.scope === "T1") tasks.push({ n: 1, key: "task1", task: t.task1, text: a.texts.task1 });
    if (a.scope === "full" || a.scope === "T2") tasks.push({ n: 2, key: "task2", task: t.task2, text: a.texts.task2 });
    let body = "";
    if (a.drill) {
      const d = a.drill; const kindName = { intro: "an essay INTRODUCTION only (background statement, paraphrase, thesis)", body: "ONE BODY PARAGRAPH only", overview: "a Task 1 INTRODUCTION + OVERVIEW only" }[d.kind];
      body += `This is a DRILL: the candidate wrote ${kindName}. Mark only what a drill of this kind can show: for an introduction, Task Response (clear position/paraphrase quality), Coherence, Lexical Resource and Grammar; for a body paragraph, idea development, cohesion, vocabulary and grammar; for an overview, selection of key features (no data), paraphrase and grammar.\n\nPROMPT:\n${d.item.prompt}\n${d.item.side ? "INSTRUCTION: " + d.item.side + "\n" : ""}${d.item.keyFeatures ? "KEY FEATURES OF THE FIGURE (examiner reference):\n- " + d.item.keyFeatures.join("\n- ") + "\n" : ""}\nCANDIDATE'S TEXT (${wordCount(a.texts.drill)} words):\n"""\n${a.texts.drill || "(empty)"}\n"""\n\n`;
      body += `Return ONLY valid JSON of this exact shape (no markdown):\n{"tasks":[{"task":"drill","bands":{"TA":0,"CC":0,"LR":0,"GRA":0},"overall":0,"summary":"2-3 sentences","criteria":{"TA":"specific comment","CC":"...","LR":"...","GRA":"..."},"strengths":["..."],"corrections":[{"original":"her exact words","corrected":"improved","note":"why"}],"improved":"a rewritten Band 8 version of her text, same ideas, 1-2 sentences longer at most"}],"overall":0,"priority":"the single most important thing to fix next, 2-3 sentences"}`;
      return intro + body;
    }
    tasks.forEach(tk => {
      body += `=== WRITING TASK ${tk.n} ===\nPROMPT:\n${tk.task.prompt}\n`;
      if (tk.n === 1) body += `FIGURE TYPE: ${tk.task.kind}. KEY FEATURES an examiner expects to see covered (candidate could not see this list):\n- ${tk.task.keyFeatures.join("\n- ")}\n${tk.task.tableHtml ? "DATA TABLE (HTML): " + tk.task.tableHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") + "\n" : ""}`;
      else body += `ESSAY TYPE: ${tk.task.type}. Relevant ideas (examiner reference, not required): ${tk.task.ideas.join(" | ")}\n`;
      body += `\nCANDIDATE'S ANSWER (${wordCount(tk.text)} words):\n"""\n${tk.text || "(no answer written)"}\n"""\n\n`;
    });
    body += `For EACH task give: a band (to the nearest 0.5) for each of the four criteria (Task 1: Task Achievement; Task 2: Task Response; then Coherence and Cohesion; Lexical Resource; Grammatical Range and Accuracy), an overall task band (average of the four, rounded down to the nearest 0.5 as examiners do), a 2-3 sentence summary, one specific comment per criterion that quotes her words, 2-3 genuine strengths, 6-10 specific corrections (original → corrected → why; cover grammar, word choice and cohesion), and the weakest paragraph quoted in full with an improved Band 8 rewrite of it (same ideas, similar length) and a short explanation of what changed. Finish with the overall Writing band (Task 2 weighted double: (T1 + 2*T2)/3, rounded to the nearest 0.5${tasks.length === 1 ? "; with one task only, the overall equals that task's band" : ""}) and the single highest-priority fix.\n\nReturn ONLY valid JSON of this exact shape (no markdown, no commentary):\n{"tasks":[{"task":1,"bands":{"TA":0,"CC":0,"LR":0,"GRA":0},"overall":0,"summary":"...","criteria":{"TA":"...","CC":"...","LR":"...","GRA":"..."},"strengths":["..."],"corrections":[{"original":"...","corrected":"...","note":"..."}],"weakestParagraph":{"original":"...","improved":"...","why":"..."}}],"overall":0,"priority":"..."}`;
    return intro + body;
  }

  function renderMarking(container, a, data) {
    const bandBox = (bands, overall, taskLabel) => `<div class="bands">${[["TA", a.scope === "T1" || (taskLabel === "Task 1") ? "Task Achievement" : "Task Response"], ["CC", "Coherence & Cohesion"], ["LR", "Lexical Resource"], ["GRA", "Grammatical Range & Accuracy"]].map(([k, l]) => `<div class="b"><div class="v">${esc(bands[k])}</div><div class="l">${l}</div></div>`).join("")}<div class="b" style="background:#333;color:#fff"><div class="v">${esc(overall)}</div><div class="l" style="color:#ddd">${taskLabel} band</div></div></div>`;
    let html = `<div class="marking"><h2>Overall Writing band: ${esc(data.overall)}</h2><p><b>Priority:</b> ${esc(data.priority || "")}</p></div>`;
    (data.tasks || []).forEach(tk => {
      const label = tk.task === "drill" ? "Drill" : "Task " + tk.task;
      html += `<div class="marking"><h2>${label}</h2>${bandBox(tk.bands || {}, tk.overall, label)}<p>${esc(tk.summary || "")}</p>
        ${tk.criteria ? `<h3>By criterion</h3>${Object.entries(tk.criteria).map(([k, v]) => `<p><b>${k}:</b> ${esc(v)}</p>`).join("")}` : ""}
        ${tk.strengths && tk.strengths.length ? `<h3>Strengths</h3><ul>${tk.strengths.map(s => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
        ${tk.corrections && tk.corrections.length ? `<h3>Corrections</h3>${tk.corrections.map(c => `<div class="corr"><span class="o">${esc(c.original)}</span> → <span class="c">${esc(c.corrected)}</span><div class="muted">${esc(c.note || "")}</div></div>`).join("")}` : ""}
        ${tk.weakestParagraph ? `<h3>Weakest paragraph, improved</h3><p class="muted">Original:</p><div class="para">${esc(tk.weakestParagraph.original)}</div><p class="muted">Band 8 version:</p><div class="para" style="background:#eef8ee">${esc(tk.weakestParagraph.improved)}</div><p>${esc(tk.weakestParagraph.why || "")}</p>` : ""}
        ${tk.improved ? `<h3>Band 8 version of your text</h3><div class="para" style="background:#eef8ee">${esc(tk.improved)}</div>` : ""}
      </div>`;
    });
    container.innerHTML = html;
  }

  function parseJson(text) {
    try { return JSON.parse(text); } catch (e) { }
    const m = text.match(/\{[\s\S]*\}/); if (m) { try { return JSON.parse(m[0]); } catch (e) { } }
    return null;
  }
  async function storeResult(a, data) {
    const tasks = data.tasks || [];
    a.marking = data; a.band = data.overall;
    const crit = { TA: 0, CC: 0, LR: 0, GRA: 0 }; let n = 0;
    tasks.forEach((tk, i) => { const w = tk.task === 2 ? 2 : 1; Object.keys(crit).forEach(k => crit[k] += (+tk.bands[k] || 0) * w); n += w; });
    if (n) Object.keys(crit).forEach(k => crit[k] = round5(crit[k] / n));
    a.criteria = crit;
    await saveAttempt(a);
  }

  route("writing-mark", (app, p) => {
    const a = IELTS.getAttempts("writing").find(x => x.id === p.id); if (!a) return go("writing");
    app.appendChild(topbar({ title: "Writing marking", buttons: [homeBtn()] }));
    const wrap = el(`<div class="results"><div class="breadcrumb"><a href="#home">Home</a> › <a href="#writing">Writing</a> › Marking</div>
      <h1>${esc(a.testTitle || "")}</h1>
      <div class="row" style="margin-bottom:14px"><span class="tag">${esc(a.scope)}</span><span class="tag">Time used ${fmtTime(a.timeUsed || 0)}</span>${a.auto ? '<span class="tag">Auto-submitted</span>' : ""}</div>
      <div id="essays"></div>
      <div id="markarea" class="marking"><p class="status">Preparing marking…</p></div>
      <div class="row" style="margin-top:16px"><button class="btn" id="copyprompt">Copy marking prompt for Claude chat</button><button class="btn" id="manual">Enter bands manually</button><a class="btn" href="#progress">Progress</a><button class="btn" id="again">Try again</button></div>
    </div>`);
    const essays = $("#essays", wrap);
    Object.entries(a.texts).forEach(([k, v]) => essays.appendChild(el(`<details style="margin-bottom:10px" ${a.drill ? "open" : ""}><summary><b>${k === "task1" ? "Task 1" : k === "task2" ? "Task 2" : "Your text"}</b> · ${wordCount(v)} words</summary><div class="essay-view">${esc(v || "(empty)")}</div></details>`)));
    const area = $("#markarea", wrap);
    $("#again", wrap).onclick = () => a.drill ? go("writing-drill", { kind: a.drill.kind }) : go("writing-instr", { testId: a.testId, scope: a.scope });
    $("#copyprompt", wrap).onclick = () => copyText(buildPrompt(a) + "\n\nAfter the JSON, also write the feedback in plain English so I can read it.");
    $("#manual", wrap).onclick = async () => {
      const root = $("#modal-root");
      const f = el(`<div class="modal-bg"><div class="modal"><h2>Enter bands from Claude's feedback</h2><p class="muted">If you marked this in Claude chat, type the bands here so your progress chart stays complete.</p>${["TA", "CC", "LR", "GRA"].map(k => `<label style="display:block;margin:6px 0">${k} <input type="number" step="0.5" min="1" max="9" data-k="${k}" style="width:80px"></label>`).join("")}<div class="acts"><button class="btn" id="c">Cancel</button><button class="btn primary" id="s">Save</button></div></div></div>`);
      $("#c", f).onclick = () => root.innerHTML = "";
      $("#s", f).onclick = async () => { const b = {}; $$("input", f).forEach(i => b[i.dataset.k] = +i.value || 0); const overall = round5((b.TA + b.CC + b.LR + b.GRA) / 4); root.innerHTML = ""; await storeResult(a, { overall, priority: "Bands entered manually.", tasks: [{ task: a.drill ? "drill" : (a.scope === "T2" ? 2 : 1), bands: b, overall, summary: "Marked in Claude chat." }] }); renderMarking(area, a, a.marking); };
      root.innerHTML = ""; root.appendChild(f);
    };
    app.appendChild(wrap);
    if (a.marking) { renderMarking(area, a, a.marking); return; }
    (async () => {
      const sample = await getSample();
      if (!sample) {
        area.innerHTML = `<h3>Marking in Claude chat</h3><p>In-page marking is not available in this view (it works when the page is opened signed in to claude.ai). Press <b>Copy marking prompt</b>, paste it into a Claude chat, and you will get the bands, corrections and an improved paragraph. Then use <b>Enter bands manually</b> to record the result here.</p>`;
        return;
      }
      area.innerHTML = `<p class="status">Claude is marking your writing against the four criteria… this takes about a minute.</p><div id="stream" class="muted" style="font-size:12px;white-space:pre-wrap;max-height:160px;overflow:auto"></div>`;
      try {
        let data = null;
        const prompt = buildPrompt(a);
        if (sample.json) { try { data = await sample.json(prompt, { modelTier: "complex", cache: false }); } catch (e) { data = null; } }
        if (!data) {
          const res = await sample(prompt, { modelTier: "complex", cache: false, onText: ({ text }) => { const s = $("#stream", area); if (s) s.textContent = text.slice(-600); } });
          data = parseJson(res.text || "");
        }
        if (!data || !data.tasks) throw new Error("Could not read the marking result.");
        await storeResult(a, data); renderMarking(area, a, data);
      } catch (e) {
        area.innerHTML = `<p class="status">Marking on the page did not complete (${esc(e.message || e.code || "error")}). Use <b>Copy marking prompt</b> below and paste it into Claude chat instead.</p>`;
      }
    })();
  });
})();
