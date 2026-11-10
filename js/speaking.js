/* Speaking module: examiner flow with timers; the interview itself runs with Claude in voice mode */
(function () {
  const { $, $$, esc, el, toast, modal, topbar, saveAttempt, route, go, state, fmtTime, copyText, beep } = IELTS;
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
      <p class="muted">The interview itself happens with Claude in voice mode. Pick a set below: this page shows the examiner's flow and runs the official timers (Part 1: 4–5 min; Part 2: 1 min preparation, 2 min talk; Part 3: 4–5 min), and one button copies a ready-made strict-examiner prompt for Claude.</p>
      <div class="card" style="margin-bottom:16px"><b>How to run a mock interview</b><ol style="margin:8px 0 0 18px"><li>Choose a set and press <b>Copy examiner prompt</b>.</li><li>Open a new Claude chat, paste the prompt, send it, then switch to voice mode.</li><li>Keep this page open for the cue card and the timers.</li><li>At the end, Claude gives bands and corrections. Record the bands here with <b>Save bands</b> so your progress chart updates.</li></ol></div>
      <div class="testlist" id="sets"></div>
      <div class="section"><button class="btn" id="random">Random set</button></div>
    </div>`);
    const done = IELTS.getAttempts("speaking");
    sets().forEach(s => {
      const prev = done.filter(a => a.testId === s.id); const last = prev[prev.length - 1];
      const c = el(`<div class="t"><b>${esc(s.theme)}</b><div class="meta">Part 2: ${esc(s.part2.cue)}</div><div class="meta">${last && last.band ? `Last: Band ${last.band} (${IELTS.fmtDate(last.date)})` : "Not attempted"}</div><button class="btn primary">Open set</button></div>`);
      $("button", c).onclick = () => go("speaking-set", { id: s.id }); $("#sets", wrap).appendChild(c);
    });
    $("#random", wrap).onclick = () => go("speaking-set", { id: sets()[Math.floor(Math.random() * sets().length)].id });
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
})();
