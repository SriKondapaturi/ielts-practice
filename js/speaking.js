/* Speaking module: examiner flow with timers; the interview itself runs with Claude in voice mode */
(function () {
  const { $, $$, esc, el, toast, modal, topbar, saveAttempt, route, go, state, fmtTime, copyText, beep, getSample, wordCount } = IELTS;
  const sets = () => window.SPEAKING_SETS || [];
  function homeBtn() { const b = el(`<button class="tbtn">Home</button>`); b.onclick = () => go("home"); return b; }
  const round5 = x => Math.round(x * 2) / 2;

  function examinerPrompt(s) {
    return `You are a strict, certified IELTS Speaking examiner conducting a full Academic Speaking test with me in voice mode. Stay completely in the examiner role from start to finish. Do not give feedback, corrections, encouragement or comments on my answers during the test; respond only as a real examiner would ("Thank you.", "Let's move on to...", "Why is that?", "Can you tell me more?"). Keep your own turns short. Follow the timings and announce each part.

PART 1 (4 to 5 minutes). Begin: "Good morning. My name is [examiner name]. Can you tell me your full name, please? ... Thank you. Can I see your identification, please? ... Thank you. Now, in this first part I'd like to ask you some questions about yourself." Then ask these questions in order, one at a time, waiting for each answer. If an answer is very short, prompt once with "Why?" or "Can you say more about that?" and move on. Do not let Part 1 run past 5 minutes.
${s.part1.topics.map(t => `Topic: ${t.name}\n${t.questions.map(q => "- " + q).join("\n")}`).join("\n")}

PART 2 (3 to 4 minutes). Say: "Now I'm going to give you a topic and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish. Here is your topic." Then read the cue card:
"${s.part2.cue}
You should say:
${s.part2.bullets.map(b => "  " + b).join("\n")}
${s.part2.andLine}"
Say "You have one minute to prepare," then stay silent for about 60 seconds. Then say: "All right? Remember you have one to two minutes for this, so don't worry if I stop you. I'll tell you when the time is up. Can you start speaking now, please?" Let me speak without interrupting for up to 2 minutes. If I stop before one minute, say "Can you tell me a little more about that?" At two minutes, say "Thank you." Then ask one rounding-off question: "${s.part2.roundingOff[0]}"

PART 3 (4 to 5 minutes). Say: "We've been talking about ${s.part2.cue.replace(/^Describe /, "").replace(/\.$/, "")}, and I'd like to discuss with you one or two more general questions related to this." Ask these discussion questions, one at a time, following up naturally with "Why do you think that is?" or "Can you give an example?" when answers are thin:
${s.part3.topics.map(t => `Topic: ${t.name}\n${t.questions.map(q => "- " + q).join("\n")}`).join("\n")}
End with: "Thank you. That is the end of the Speaking test."

ONLY AFTER saying that, drop the examiner role and give a written assessment:
1. A band score (whole or half band) for each criterion: Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, Pronunciation, and the overall Speaking band (average rounded to the nearest half band), calibrated to the real public band descriptors. My target is Band 7.5 in every criterion; be honest, not kind.
2. For each criterion, two or three specific observations quoting what I actually said.
3. A list of my errors with corrections (grammar, word choice, pronunciation of specific words).
4. Three upgraded versions of my weakest answers, written the way a Band 8 candidate would say them.
5. The single most important thing to work on before the exam.
Begin the test now.`;
  }

  route("speaking", (app) => {
    app.appendChild(topbar({ title: "Speaking", buttons: [homeBtn()] }));
    const wrap = el(`<div class="speaking"><div class="breadcrumb"><a href="#home">Home</a> › Speaking</div>
      <h1>Speaking</h1>
      <p class="muted">Two ways to practise. <b>Examiner on this page</b>: the page asks the questions aloud, runs the official timings (Part 1: 4–5 min; Part 2: 1 min preparation, 2 min talk; Part 3: 4–5 min), records you, transcribes your answers and marks Fluency, Vocabulary and Grammar. <b>Claude in voice mode</b>: a full interactive interview with follow-up questions and a Pronunciation band; one button copies the strict-examiner prompt.</p>
      <div class="card" style="margin-bottom:16px"><b>Recommended weekly mix</b> (from your study plan): two sets with the examiner on this page for fluency and timing, one full mock with Claude in voice mode for pronunciation and follow-up questions. Use headphones so the examiner's voice is not picked up by the microphone.</div>
      <div class="testlist" id="sets"></div>
      <div class="section"><button class="btn" id="random">Random set</button></div>
    </div>`);
    const done = IELTS.getAttempts("speaking");
    sets().forEach(s => {
      const prev = done.filter(a => a.testId === s.id); const last = prev[prev.length - 1];
      const c = el(`<div class="t"><b>${esc(s.theme)}</b><div class="meta">Part 2: ${esc(s.part2.cue)}</div><div class="meta">${last && last.band ? `Last: Band ${last.band} (${IELTS.fmtDate(last.date)})` : "Not attempted"}</div><button class="btn primary" data-live>Examiner on this page</button><button class="btn" data-set>Cue card, timers and Claude prompt</button></div>`);
      $("[data-live]", c).onclick = () => go("speaking-live-instr", { id: s.id }); $("[data-set]", c).onclick = () => go("speaking-set", { id: s.id }); $("#sets", wrap).appendChild(c);
    });
    $("#random", wrap).onclick = () => go("speaking-live-instr", { id: sets()[Math.floor(Math.random() * sets().length)].id });
    app.appendChild(wrap);
  });

  route("speaking-set", (app, p) => {
    const s = sets().find(x => x.id === p.id); if (!s) return go("speaking");
    app.appendChild(topbar({ title: "Speaking · " + s.theme, buttons: [homeBtn()] }));
    let step = 0; let timerH = null; let remaining = 0;
    const wrap = el(`<div class="speaking"><div class="breadcrumb"><a href="#home">Home</a> › <a href="#speaking">Speaking</a> › ${esc(s.theme)}</div>
      <div class="row" style="justify-content:space-between"><h1 style="margin:0">${esc(s.theme)}</h1><button class="btn primary" id="copy">Copy examiner prompt for Claude</button></div>
      <div class="steps" id="steps"></div>
      <div id="stage"></div>
    </div>`);
    $("#copy", wrap).onclick = () => copyText(examinerPrompt(s));
    const stage = $("#stage", wrap);
    const names = ["Introduction", "Part 1", "Part 2", "Part 3", "Finish"];
    function paintSteps() { $("#steps", wrap).innerHTML = names.map((n, i) => `<span class="${i === step ? "on" : ""}" data-i="${i}">${n}</span>`).join(""); $$("#steps span", wrap).forEach(sp => sp.onclick = () => { stopTimer(); step = +sp.dataset.i; render(); }); }
    function stopTimer() { clearInterval(timerH); timerH = null; }
    function startTimer(seconds, elTimer, onEnd, warnAt) {
      stopTimer(); remaining = seconds; elTimer.textContent = fmtTime(remaining);
      timerH = setInterval(() => { remaining--; elTimer.textContent = fmtTime(Math.max(0, remaining)); elTimer.classList.toggle("crit", remaining <= (warnAt || 30)); if (remaining <= 0) { stopTimer(); beep(880, 400); onEnd && onEnd(); } }, 1000);
    }
    function render() {
      paintSteps();
      if (step === 0) stage.innerHTML = `<div class="card"><h2>Before you start</h2><p>Sit as you would in the exam: no notes except for Part 2, no phone, answer in full sentences. The examiner will introduce the test and check your identity, then begin Part 1.</p><p class="muted">Examiner: "Good morning. My name is … Can you tell me your full name, please? … Can I see your identification, please? … Thank you."</p><div class="row" style="margin-top:12px"><button class="btn primary" id="go">Begin Part 1</button></div></div>`;
      if (step === 1) stage.innerHTML = `<div class="card"><h2>Part 1 · Introduction and interview</h2><p class="muted">4–5 minutes. Short, natural answers of two to four sentences each. Extend with a reason, an example or a comparison with the past.</p><div class="sp-timer" id="t">5:00</div><div class="row"><button class="btn primary" id="start">Start 5-minute timer</button><button class="btn" id="go">Go to Part 2</button></div>${s.part1.topics.map(t => `<h3 style="margin-top:14px">${esc(t.name)}</h3><ul class="qlist">${t.questions.map(q => `<li>${esc(q)}</li>`).join("")}</ul>`).join("")}</div>`;
      if (step === 2) stage.innerHTML = `<div class="card"><h2>Part 2 · Individual long turn</h2><p class="muted">Examiner: "Now I'm going to give you a topic and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish."</p>
        <div class="cue"><b>${esc(s.part2.cue)}</b><br>You should say:<ul>${s.part2.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>${esc(s.part2.andLine)}</div>
        <div class="sp-timer" id="t">1:00</div><div id="phase" class="muted" style="text-align:center">Preparation time</div>
        <div class="row" style="justify-content:center;margin-top:8px"><button class="btn primary" id="prep">Start 1-minute preparation</button><button class="btn" id="talk">Start 2-minute talk</button><button class="btn" id="go">Go to Part 3</button></div>
        <textarea placeholder="Notes (allowed during the 1 minute)" style="width:100%;height:80px;margin-top:12px"></textarea>
        <p style="margin-top:12px"><b>Rounding-off question:</b> ${esc(s.part2.roundingOff[0])}</p></div>`;
      if (step === 3) stage.innerHTML = `<div class="card"><h2>Part 3 · Two-way discussion</h2><p class="muted">4–5 minutes. Abstract questions linked to the Part 2 topic. Give an opinion, a reason, an example and, where possible, the other side.</p><div class="sp-timer" id="t">5:00</div><div class="row"><button class="btn primary" id="start">Start 5-minute timer</button><button class="btn" id="go">Finish</button></div>${s.part3.topics.map(t => `<h3 style="margin-top:14px">${esc(t.name)}</h3><ul class="qlist">${t.questions.map(q => `<li>${esc(q)}</li>`).join("")}</ul>`).join("")}</div>`;
      if (step === 4) stage.innerHTML = `<div class="card"><h2>End of the Speaking test</h2><p>Ask Claude for the assessment (the prompt already tells it to give bands only now). Record them here.</p>
        <div class="row">${[["FC", "Fluency & Coherence"], ["LR", "Lexical Resource"], ["GRA", "Grammatical Range & Accuracy"], ["P", "Pronunciation"]].map(([k, l]) => `<label style="display:flex;flex-direction:column;font-size:13px">${l}<input type="number" step="0.5" min="1" max="9" data-k="${k}" style="width:110px;padding:6px"></label>`).join("")}</div>
        <textarea id="notes" placeholder="Paste the key corrections Claude gave you (optional)" style="width:100%;height:120px;margin-top:12px"></textarea>
        <div class="row" style="margin-top:12px"><button class="btn primary" id="save">Save bands</button><a class="btn" href="#progress">Progress</a><button class="btn" id="another">Another set</button></div></div>`;
      const goBtn = $("#go", stage); if (goBtn) goBtn.onclick = () => { stopTimer(); step++; render(); };
      const t = $("#t", stage);
      if (step === 1 || step === 3) $("#start", stage).onclick = () => startTimer(300, t, () => toast("Time for this part is up."), 30);
      if (step === 2) {
        $("#prep", stage).onclick = () => { $("#phase", stage).textContent = "Preparation time"; startTimer(60, t, () => { $("#phase", stage).textContent = "Examiner: Can you start speaking now, please?"; toast("Start speaking now."); setTimeout(() => startTimer(120, t, () => { $("#phase", stage).textContent = "Examiner: Thank you."; toast("Thank you. End of the talk."); }, 20), 1500); }, 10); };
        $("#talk", stage).onclick = () => { $("#phase", stage).textContent = "Speaking time"; startTimer(120, t, () => { $("#phase", stage).textContent = "Examiner: Thank you."; toast("Thank you. End of the talk."); }, 20); };
      }
      if (step === 4) {
        $("#save", stage).onclick = async () => {
          const b = {}; $$("input[type=number]", stage).forEach(i => b[i.dataset.k] = +i.value || 0);
          if (!b.FC || !b.LR || !b.GRA || !b.P) return toast("Enter all four bands first.");
          const band = round5((b.FC + b.LR + b.GRA + b.P) / 4);
          await saveAttempt({ module: "speaking", testId: s.id, testTitle: s.theme, scope: "full", band, criteria: b, notes: $("#notes", stage).value });
          toast(`Saved: Speaking Band ${band}`); go("progress");
        };
        $("#another", stage).onclick = () => go("speaking");
      }
    }
    state.cleanup = stopTimer;
    render(); app.appendChild(wrap);
  });

  // ======================================================================
  // Live examiner on the page: spoken questions, recording, transcript, marking
  // ======================================================================
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  route("speaking-live-instr", (app, p) => {
    const s = sets().find(x => x.id === p.id); if (!s) return go("speaking");
    app.appendChild(topbar({ title: "Speaking · " + s.theme, buttons: [homeBtn()] }));
    const box = el(`<div class="instr"><div class="box">
      <h1>IELTS Speaking</h1><p><b>Time: 11 to 14 minutes</b></p>
      <h3>INSTRUCTIONS TO CANDIDATES</h3>
      <ul><li>The examiner's questions are spoken aloud. Answer out loud; the page listens and moves on when you finish (or press <b>Next</b>).</li><li>Part 2: one minute to prepare (you may type notes), then speak for up to two minutes.</li><li>Wear headphones. Allow the microphone when asked.</li></ul>
      <h3>INFORMATION FOR CANDIDATES</h3>
      <ul><li>Your answers are recorded and transcribed. At the end you receive bands for Fluency and Coherence, Lexical Resource and Grammatical Range and Accuracy, with corrections and Band 8 versions of weak answers.</li><li>Pronunciation cannot be judged from a transcript: for a Pronunciation band, do one mock a week with Claude in voice mode (button on the set page) and add the band afterwards.</li><li>${SR ? "Speech recognition is available in this browser." : "<b>This browser has no speech recognition</b> (Chrome or Edge on a laptop works best). You can still run the timed interview and record yourself, but marking needs a transcript."}${canRecord ? "" : " Recording is not available in this browser."}</li></ul>
      <div class="opts"><b>Microphone check:</b> <button class="btn small" id="mic">Test microphone</button> <span class="muted" id="micinfo"></span></div>
      <div class="start"><button class="btn primary" id="start">Start test</button><button class="btn" id="back">Back</button></div></div></div>`);
    $("#mic", box).onclick = async () => { try { const st = await navigator.mediaDevices.getUserMedia({ audio: true }); st.getTracks().forEach(t => t.stop()); $("#micinfo", box).textContent = "Microphone works."; } catch (e) { $("#micinfo", box).textContent = "Microphone blocked: allow it in the browser's address bar, then try again."; } };
    $("#start", box).onclick = () => go("speaking-live", p); $("#back", box).onclick = () => go("speaking");
    app.appendChild(box);
  });

  route("speaking-live", async (app, p) => {
    const s = sets().find(x => x.id === p.id); if (!s) return go("speaking");
    const Speech = window.Speech; await Speech.init();
    const examiner = Speech.assign({}).__narrator; examiner.rate = Math.min(1, (IELTS.settings.ttsRate || 0.95));
    app.className = "exam speaking-live";
    const tel = IELTS.timerElement(); tel.textContent = "Part 1";
    const nextBtn = el(`<button class="tbtn">Next</button>`); const stopBtn = el(`<button class="tbtn">End test</button>`);
    app.appendChild(topbar({ title: "Speaking · " + s.theme, timerEl: tel, buttons: [nextBtn, stopBtn] }));
    const body = el(`<div class="body" style="display:block;overflow:auto"><div class="speaking" style="max-width:860px;margin:0 auto;padding:20px">
      <div class="card"><div class="row" style="justify-content:space-between"><h2 id="ph" style="margin:0">Introduction</h2><span class="muted" id="partclock"></span></div>
      <div id="examiner" class="examiner-line"><span class="ex-icon"></span><span id="exsay">…</span></div>
      <div id="cue" class="cue hidden"></div>
      <div id="listen" class="listen hidden"><span class="mic-dot"></span><span id="interim" class="muted">Listening…</span></div>
      <textarea id="notes" class="hidden" placeholder="Notes (allowed only during the one-minute preparation)" style="width:100%;height:80px;margin-top:10px"></textarea>
      </div>
      <div class="card" style="margin-top:12px"><h3>Transcript so far</h3><div id="log" class="muted" style="font-size:14px">Your answers appear here as they are transcribed.</div></div>
    </div></div>`);
    app.appendChild(body);
    const exsay = $("#exsay", body), listenBox = $("#listen", body), interim = $("#interim", body), log = $("#log", body), ph = $("#ph", body), partclock = $("#partclock", body), notes = $("#notes", body), cueBox = $("#cue", body);
    const transcript = []; let ended = false; let nextResolver = null; let abortAll = false;
    nextBtn.onclick = () => { if (nextResolver) nextResolver("next"); };
    IELTS.guardLeave(true);

    // recorder
    let rec = null, chunks = [], stream = null;
    if (canRecord) { try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); rec = new MediaRecorder(stream); rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); }; rec.start(1000); } catch (e) { rec = null; toast("Microphone not available; the test runs without recording."); } }

    const say = async (text) => { if (abortAll) return; exsay.textContent = text; $("#examiner", body).classList.add("talking"); await Speech.speak(text, examiner); $("#examiner", body).classList.remove("talking"); };
    const wait = ms => new Promise(r => { const h = setTimeout(() => r("time"), ms); nextResolver = v => { clearTimeout(h); r(v); }; });

    // listen for one answer: resolves {text, ms}
    function listen({ maxMs, minMs = 3000, silenceMs = 4500, label }) {
      return new Promise(resolve => {
        const start = Date.now(); let finals = []; let lastActivity = Date.now(); let interimText = ""; let stopped = false; let r = null;
        listenBox.classList.remove("hidden"); interim.textContent = label || "Listening…";
        const finish = () => { if (stopped) return; stopped = true; clearInterval(tick); nextResolver = null; listenBox.classList.add("hidden"); try { r && r.stop(); } catch (e) { } const text = (finals.join(" ") + " " + interimText).replace(/\s+/g, " ").trim(); resolve({ text, ms: Date.now() - start }); };
        nextResolver = () => finish();
        if (SR) {
          const startRec = () => { r = new SR(); r.lang = "en-GB"; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
            r.onresult = e => { interimText = ""; for (let i = e.resultIndex; i < e.results.length; i++) { const t = e.results[i][0].transcript; if (e.results[i].isFinal) finals.push(t.trim()); else interimText += t; } lastActivity = Date.now(); interim.textContent = (finals.slice(-2).join(" ") + " " + interimText).trim().slice(-140) || "Listening…"; };
            r.onerror = e => { if (e.error === "not-allowed" || e.error === "service-not-allowed") { interim.textContent = "Microphone blocked. Press Next when you have finished speaking."; r = null; } };
            r.onend = () => { if (!stopped && r) { try { r.start(); } catch (e) { } } };
            try { r.start(); } catch (e) { } };
          startRec();
        } else interim.textContent = "Speak your answer, then press Next.";
        const tick = setInterval(() => { const el = Date.now() - start; if (el >= maxMs) return finish(); if (SR && el >= minMs && (finals.length || interimText) && Date.now() - lastActivity > silenceMs) return finish(); if (SR && el >= Math.max(minMs, 12000) && !finals.length && !interimText) return finish(); }, 250);
      });
    }
    function logAnswer(part, q, ans) { transcript.push({ part, question: q, answer: ans.text, seconds: Math.round(ans.ms / 1000) }); log.innerHTML = transcript.map(t => `<p><b>${esc(t.question)}</b><br>${esc(t.answer) || "<i>(no speech detected)</i>"} <span class="muted">· ${t.seconds}s, ${wordCount(t.answer)} words</span></p>`).join(""); }

    let partTimer = null;
    function startPartClock(seconds, label) { clearInterval(partTimer); let rem = seconds; const paint = () => { tel.textContent = `${label} · ${fmtTime(rem)}`; tel.classList.toggle("crit", rem <= 30); partclock.textContent = `${fmtTime(rem)} left in this part`; }; paint(); partTimer = setInterval(() => { rem--; paint(); if (rem <= 0) clearInterval(partTimer); }, 1000); return () => rem; }

    stopBtn.onclick = async () => { if (await modal(`<h2>End the Speaking test now?</h2><p>Your answers so far will be kept and marked.</p>`, [{ label: "Continue", value: false }, { label: "End test", value: true, cls: "primary" }])) { abortAll = true; Speech.stop(); if (nextResolver) nextResolver("abort"); } };
    state.cleanup = () => { abortAll = true; clearInterval(partTimer); Speech.stop(); if (stream) stream.getTracks().forEach(t => t.stop()); IELTS.guardLeave(false); };

    async function run() {
      // Introduction
      ph.textContent = "Introduction"; const rem1 = startPartClock(300, "Part 1");
      await say("Good morning. My name is Claire. Can you tell me your full name, please?");
      let a = await listen({ maxMs: 15000, minMs: 1500, silenceMs: 2500 }); if (abortAll) return finishTest(); logAnswer(0, "Can you tell me your full name, please?", a);
      await say("Thank you. Can I see your identification, please?"); await wait(2500); if (abortAll) return finishTest();
      await say("Thank you. Now, in this first part, I'd like to ask you some questions about yourself.");
      // Part 1
      ph.textContent = "Part 1 · Introduction and interview";
      outer1: for (const t of s.part1.topics) {
        if (rem1() < 25) break;
        await say(`Let's talk about ${t.name.toLowerCase()}.`);
        for (const q of t.questions) {
          if (rem1() < 15 || abortAll) break outer1;
          await say(q); if (abortAll) break outer1;
          const ans = await listen({ maxMs: Math.min(45000, Math.max(8000, rem1() * 1000)), minMs: 3000, silenceMs: 4000 }); logAnswer(1, q, ans);
          if (!abortAll && wordCount(ans.answer || ans.text) > 0 && wordCount(ans.text) < 12 && rem1() > 40) { await say("Why is that?"); const f = await listen({ maxMs: 25000, minMs: 2500, silenceMs: 3500 }); logAnswer(1, q + " — Why is that?", f); }
        }
      }
      if (abortAll) return finishTest();
      // Part 2
      ph.textContent = "Part 2 · Individual long turn"; clearInterval(partTimer); tel.textContent = "Part 2";
      await say("Now, I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish. Do you understand?");
      await wait(2500);
      cueBox.classList.remove("hidden"); cueBox.innerHTML = `<b>${esc(s.part2.cue)}</b><br>You should say:<ul>${s.part2.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>${esc(s.part2.andLine)}`;
      await say("Here's some paper and a pencil for making notes, and here's your topic. I'd like you to describe " + s.part2.cue.replace(/^Describe /, "").replace(/\.$/, "") + ". You have one minute to prepare.");
      notes.classList.remove("hidden"); notes.disabled = false; const remP = startPartClock(60, "Preparation"); await wait(60000); if (abortAll) return finishTest(); notes.disabled = true;
      await say("All right? Remember, you have one to two minutes for this, so don't worry if I stop you. I'll tell you when the time is up. Can you start speaking now, please?");
      startPartClock(120, "Part 2 talk");
      const long = await listen({ maxMs: 120000, minMs: 45000, silenceMs: 7000, label: "Speak for up to two minutes…" }); logAnswer(2, "Long turn: " + s.part2.cue, long);
      if (abortAll) return finishTest();
      await say("Thank you. " + s.part2.roundingOff[0]); const ro = await listen({ maxMs: 20000, minMs: 2000, silenceMs: 3000 }); logAnswer(2, s.part2.roundingOff[0], ro);
      cueBox.classList.add("hidden"); notes.classList.add("hidden");
      if (abortAll) return finishTest();
      // Part 3
      ph.textContent = "Part 3 · Two-way discussion"; const rem3 = startPartClock(300, "Part 3");
      await say(`We've been talking about ${s.part2.cue.replace(/^Describe /, "").replace(/\.$/, "")}, and I'd like to discuss with you one or two more general questions related to this.`);
      outer3: for (const t of s.part3.topics) {
        if (rem3() < 30) break;
        await say(`Let's consider first of all ${t.name.toLowerCase()}.`);
        for (const q of t.questions) {
          if (rem3() < 20 || abortAll) break outer3;
          await say(q); if (abortAll) break outer3;
          const ans = await listen({ maxMs: Math.min(60000, Math.max(10000, rem3() * 1000)), minMs: 4000, silenceMs: 4500 }); logAnswer(3, q, ans);
          if (!abortAll && wordCount(ans.text) < 25 && rem3() > 50) { const fu = ["Why do you think that is?", "Can you give me an example?", "Do you think that will change in the future?"][transcript.length % 3]; await say(fu); const f = await listen({ maxMs: 35000, minMs: 3000, silenceMs: 4000 }); logAnswer(3, q + " — " + fu, f); }
        }
      }
      await say("Thank you. That is the end of the Speaking test.");
      finishTest();
    }
    async function finishTest() {
      if (ended) return; ended = true; clearInterval(partTimer); IELTS.guardLeave(false);
      let audioUrl = null;
      if (rec) { await new Promise(r => { rec.onstop = r; try { rec.stop(); } catch (e) { r(); } }); if (chunks.length) audioUrl = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || "audio/webm" })); }
      if (stream) stream.getTracks().forEach(t => t.stop());
      const attempt = { module: "speaking", testId: s.id, testTitle: s.theme, scope: "live", band: null, criteria: null, transcript, auto: false };
      await saveAttempt(attempt); state.lastAudio = audioUrl;
      go("speaking-live-results", { id: attempt.id });
    }
    run();
  });

  function speakingPrompt(s, tr) {
    const lines = tr.map(t => `[Part ${t.part}] EXAMINER: ${t.question}\nCANDIDATE (${t.seconds}s, ${wordCount(t.answer)} words${t.seconds ? ", " + Math.round(wordCount(t.answer) / Math.max(1, t.seconds) * 60) + " wpm" : ""}): ${t.answer || "(no speech detected)"}`).join("\n\n");
    return `You are a strict, certified IELTS Speaking examiner. Below is the automatic transcript of a candidate's full Speaking test (Parts 1 to 3) with the time each answer took and the words-per-minute rate. The candidate's target is Band 7.5 in every criterion; her recent level is around 6.5. Mark honestly against the public band descriptors, not kindly.

Important: this is a speech-recognition transcript. It has no punctuation, may have auto-corrected a few small grammar slips, and cannot show pronunciation, intonation or hesitation sounds. Judge Fluency and Coherence from answer length, words per minute (a natural rate is roughly 120-160 wpm; under 90 suggests hesitation), self-correction, repetition and the use of discourse markers; Lexical Resource from range, precision, collocation, idiomatic language and paraphrase; Grammatical Range and Accuracy from the range of structures and visible errors (articles, tense, agreement, prepositions, word order). Give Pronunciation as null.

Themes of this set: ${s.theme}. Part 2 cue: ${s.part2.cue}

TRANSCRIPT
${lines}

Return ONLY valid JSON of this shape (no markdown):
{"bands":{"FC":0,"LR":0,"GRA":0,"P":null},"overall":0,"summary":"3-4 sentences on the overall performance","criteria":{"FC":"specific comment quoting her words and citing wpm/length","LR":"...","GRA":"..."},"strengths":["..."],"corrections":[{"original":"her exact words","corrected":"natural Band 8 wording","note":"why"}],"upgraded":[{"question":"...","yours":"her answer, trimmed","band8":"how a Band 8 candidate would answer in 3-5 sentences"}],"priority":"the single most important thing to work on, 2-3 sentences"}
Overall = average of FC, LR and GRA rounded to the nearest 0.5. Give 6-10 corrections and upgrade her 3 weakest answers (at least one from Part 3).`;
  }

  route("speaking-live-results", (app, p) => {
    const a = IELTS.getAttempts("speaking").find(x => x.id === p.id); if (!a) return go("speaking");
    const s = sets().find(x => x.id === a.testId);
    app.appendChild(topbar({ title: "Speaking results", buttons: [homeBtn()] }));
    const tr = a.transcript || [];
    const totalWords = tr.reduce((n, t) => n + wordCount(t.answer), 0), totalSec = tr.reduce((n, t) => n + (t.seconds || 0), 0);
    const wrap = el(`<div class="results"><div class="breadcrumb"><a href="#home">Home</a> › <a href="#speaking">Speaking</a> › Results</div>
      <h1>${esc(a.testTitle || "")}</h1>
      <div class="row" style="margin-bottom:14px"><span class="tag">Examiner on this page</span><span class="tag">${tr.length} answers</span><span class="tag">${totalWords} words in ${fmtTime(totalSec)}</span><span class="tag">${totalSec ? Math.round(totalWords / totalSec * 60) : 0} words per minute</span></div>
      ${state.lastAudio ? `<div class="card" style="margin-bottom:12px"><b>Your recording</b> <span class="muted">(kept only until you leave this page)</span><br><audio controls src="${state.lastAudio}" style="width:100%;margin-top:6px"></audio> <a class="btn small" href="${state.lastAudio}" download="speaking-${esc(a.testId)}.webm" style="margin-top:6px;display:inline-block">Download recording</a></div>` : ""}
      <details style="margin-bottom:12px"><summary><b>Transcript</b></summary>${tr.map(t => `<p><span class="tag">Part ${t.part}</span> <b>${esc(t.question)}</b><br>${esc(t.answer) || "<i>(no speech detected)</i>"} <span class="muted">· ${t.seconds}s, ${wordCount(t.answer)} words</span></p>`).join("") || '<p class="muted">No answers were transcribed.</p>'}</details>
      <div id="markarea" class="marking"><p class="status">Preparing marking…</p></div>
      <div class="row" style="margin-top:16px"><button class="btn" id="copyprompt">Copy marking prompt for Claude chat</button><button class="btn" id="pron">Add Pronunciation band</button><a class="btn" href="#progress">Progress</a><button class="btn" id="again">Another set</button></div>
    </div>`);
    const area = $("#markarea", wrap);
    $("#again", wrap).onclick = () => go("speaking");
    $("#copyprompt", wrap).onclick = () => copyText(speakingPrompt(s, tr) + "\n\nAfter the JSON, write the feedback in plain English too.");
    $("#pron", wrap).onclick = async () => {
      const root = $("#modal-root");
      const f = el(`<div class="modal-bg"><div class="modal"><h2>Pronunciation band</h2><p class="muted">From a Claude voice-mode mock or a teacher. Adding it completes the four-criterion band for this attempt.</p><label>Band <input type="number" step="0.5" min="1" max="9" id="pb" style="width:80px"></label><div class="acts"><button class="btn" id="c">Cancel</button><button class="btn primary" id="s">Save</button></div></div></div>`);
      $("#c", f).onclick = () => root.innerHTML = "";
      $("#s", f).onclick = async () => { const v = +$("#pb", f).value; if (!v) return; root.innerHTML = ""; a.criteria = Object.assign({ FC: 0, LR: 0, GRA: 0 }, a.criteria || {}, { P: v }); const vals = ["FC", "LR", "GRA", "P"].map(k => +a.criteria[k]).filter(x => x > 0); a.band = round5(vals.reduce((x, y) => x + y, 0) / vals.length); await saveAttempt(a); toast(`Saved: Speaking Band ${a.band}`); IELTS.render(); };
      root.innerHTML = ""; root.appendChild(f);
    };
    app.appendChild(wrap);
    function render(data) {
      const b = data.bands || {};
      area.innerHTML = `<h2>Speaking band (3 criteria): ${esc(data.overall)}${a.criteria && a.criteria.P ? ` · with Pronunciation ${esc(a.criteria.P)}: <b>${esc(a.band)}</b>` : ""}</h2>
        <div class="bands">${[["FC", "Fluency & Coherence"], ["LR", "Lexical Resource"], ["GRA", "Grammatical Range & Accuracy"], ["P", "Pronunciation"]].map(([k, l]) => `<div class="b"><div class="v">${k === "P" ? esc((a.criteria && a.criteria.P) || "—") : esc(b[k])}</div><div class="l">${l}${k === "P" ? "<br><span class='muted'>not judged from a transcript</span>" : ""}</div></div>`).join("")}</div>
        <p><b>Priority:</b> ${esc(data.priority || "")}</p><p>${esc(data.summary || "")}</p>
        ${data.criteria ? `<h3>By criterion</h3>${Object.entries(data.criteria).map(([k, v]) => `<p><b>${k}:</b> ${esc(v)}</p>`).join("")}` : ""}
        ${data.strengths && data.strengths.length ? `<h3>Strengths</h3><ul>${data.strengths.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${data.corrections && data.corrections.length ? `<h3>Corrections</h3>${data.corrections.map(c => `<div class="corr"><span class="o">${esc(c.original)}</span> → <span class="c">${esc(c.corrected)}</span><div class="muted">${esc(c.note || "")}</div></div>`).join("")}` : ""}
        ${data.upgraded && data.upgraded.length ? `<h3>Band 8 versions of your weakest answers</h3>${data.upgraded.map(u => `<div class="para"><b>${esc(u.question)}</b><p class="muted" style="margin:4px 0">You: ${esc(u.yours)}</p><p style="margin:0;background:#eef8ee;padding:6px">${esc(u.band8)}</p></div>`).join("")}` : ""}`;
    }
    if (a.marking) { render(a.marking); return; }
    if (!tr.some(t => t.answer)) { area.innerHTML = `<p class="status">No speech was transcribed, so there is nothing to mark. Check the microphone permission and use Chrome or Edge.</p>`; return; }
    (async () => {
      const sample = await getSample();
      if (!sample) { area.innerHTML = `<h3>Marking in Claude chat</h3><p>Sign in to get marking on this page, or press <b>Copy marking prompt</b> and paste it into a Claude chat.</p>`; return; }
      area.innerHTML = `<p class="status">The examiner is marking your transcript… about a minute.</p>`;
      try {
        const res = await sample(speakingPrompt(s, tr), { modelTier: "complex", cache: false });
        let data = null; try { data = JSON.parse(res.text); } catch (e) { const m = (res.text || "").match(/\{[\s\S]*\}/); if (m) data = JSON.parse(m[0]); }
        if (!data || !data.bands) throw new Error("Could not read the marking result.");
        a.marking = data; a.criteria = { FC: +data.bands.FC || 0, LR: +data.bands.LR || 0, GRA: +data.bands.GRA || 0, P: (a.criteria && a.criteria.P) || null };
        const vals = ["FC", "LR", "GRA", "P"].map(k => +a.criteria[k]).filter(x => x > 0); a.band = round5(vals.reduce((x, y) => x + y, 0) / vals.length);
        await saveAttempt(a); render(data);
      } catch (e) { area.innerHTML = `<p class="status">Marking did not complete (${esc(e.message || "error")}). Use <b>Copy marking prompt</b> and paste it into Claude chat.</p>`; }
    })();
  });
})();
