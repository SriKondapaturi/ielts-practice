/* Listening module with browser text-to-speech */
(function () {
  const { $, $$, esc, el, toast, modal, Timer, topbar, timerElement, updateTimerEl, bandFor, indicativeBand, saveAttempt, route, go, state, guardLeave, fmtTime, settings, copyText } = IELTS;
  const tests = () => window.LISTENING_TESTS || [];

  // ---------- speech engine ----------
  const Speech = {
    voices: [], ready: null,
    init() {
      if (this.ready) return this.ready;
      this.ready = new Promise(res => {
        if (!("speechSynthesis" in window)) return res([]);
        const load = () => { const v = speechSynthesis.getVoices(); if (v.length) { this.voices = v; res(v); } };
        load(); speechSynthesis.onvoiceschanged = load; setTimeout(() => res(this.voices), 2500);
      });
      return this.ready;
    },
    classify(v) {
      const n = (v.name + " " + (v.voiceURI || "")).toLowerCase();
      const f = /female|woman|zira|hazel|susan|samantha|karen|moira|tessa|fiona|victoria|kate|serena|libby|sonia|maisie|emma|jenny|aria|ava|allison|catherine|amelia|olivia|martha|hollie|natasha|clara|zoe|heera|neerja|priya|swara|molly|isla|google uk english female|google us english/.test(n);
      const m = /\bmale\b|\bman\b|david|george|daniel|alex|fred|oliver|james|thomas|ryan|guy|brian|christopher|eric|andrew|arthur|alfie|elliot|ethan|noah|william|ravi|prabhat|mark|liam|connor|google uk english male/.test(n);
      return f && !m ? "female" : m ? "male" : "unknown";
    },
    // Accent mix of the real recordings: mostly British, then Australian / New Zealand, North American, Irish, occasionally others.
    ACCENTS: ["en-GB", "en-AU", "en-US", "en-IE", "en-NZ", "en-CA", "en-IN", "en-ZA"],
    ACCENT_NAME: { "en-GB": "British", "en-AU": "Australian", "en-US": "American", "en-IE": "Irish", "en-NZ": "New Zealand", "en-CA": "Canadian", "en-IN": "Indian", "en-ZA": "South African" },
    quality(v) { return /natural|online|neural|premium|enhanced/i.test(v.name) ? 0 : /google|microsoft/i.test(v.name) ? 1 : /apple|samantha|daniel|karen|moira|tessa|rishi|fiona/i.test(v.name) ? 2 : 3; },
    locale(v) { const m = String(v.lang || "").replace("_", "-").match(/^en-([A-Za-z]{2})/); return m ? "en-" + m[1].toUpperCase() : "en"; },
    // In Chrome on Windows the Microsoft (SAPI) voices often play nothing while reporting success; Google voices are reliable there. Edge's Natural voices are fine.
    isChrome: /Chrome\//.test(navigator.userAgent) && !/Edg\//.test(navigator.userAgent),
    usable() {
      const en = this.voices.filter(v => /^en/i.test(v.lang));
      if (settings.allVoices) return en;
      const google = en.filter(v => /google/i.test(v.name));
      if (this.isChrome && google.length >= 2) return en.filter(v => /google/i.test(v.name) || /natural|online/i.test(v.name));
      return en;
    },
    accentsAvailable() { const set = new Set(this.usable().map(v => this.locale(v))); return this.ACCENTS.filter(a => set.has(a)); },
    pool(gender, accent) {
      const en = this.usable();
      const rank = v => (accent ? (this.locale(v) === accent ? 0 : 3) : (/en-GB/i.test(v.lang) ? 0 : 1)) + this.quality(v) / 10;
      const list = en.filter(v => this.classify(v) === gender).sort((a, b) => rank(a) - rank(b));
      if (list.length) return list;
      return en.filter(v => this.classify(v) === "unknown").sort((a, b) => rank(a) - rank(b)).concat(en.sort((a, b) => rank(a) - rank(b)));
    },
    assign(speakers) {
      // returns map key -> {voice, pitch, rate, accent}; each speaker gets a different voice and, where the device allows, a different accent
      const used = new Set(); const out = {};
      const avail = this.accentsAvailable();
      const narratorPool = this.pool("female", "en-GB").concat(this.pool("male", "en-GB"));
      const baseRate = settings.ttsRate + (this.rateOffset || 0);
      out.__narrator = { voice: narratorPool[0] || null, pitch: 1, rate: settings.ttsRate, accent: "en-GB" };
      if (out.__narrator.voice) used.add(out.__narrator.voice.name);
      let ai = 0;
      Object.entries(speakers || {}).forEach(([k, sp], i) => {
        const gender = sp.gender || "female";
        // preferred accent: author override, else cycle through the accents this device has
        let accent = sp.accent && avail.includes(sp.accent) ? sp.accent : null;
        if (!accent) { for (let tries = 0; tries < avail.length && !accent; tries++) { const cand = avail[ai % avail.length]; ai++; if (this.pool(gender, cand).some(v => this.locale(v) === cand && !used.has(v.name))) accent = cand; } }
        const pool = this.pool(gender, accent || undefined);
        let voice = pool.find(v => !used.has(v.name) && (!accent || this.locale(v) === accent)) || pool.find(v => !used.has(v.name)) || pool[0] || null;
        if (voice) used.add(voice.name);
        const dup = Object.values(out).filter(o => o.voice && voice && o.voice.name === voice.name).length;
        // natural variation: each speaker has a slightly different pace and pitch
        const rateJitter = [0, 0.04, -0.03, 0.02, -0.05][i % 5];
        out[k] = { voice, pitch: dup ? (dup % 2 ? 0.82 : 1.18) : (gender === "male" ? 0.93 + 0.04 * (i % 2) : 1.02 + 0.05 * (i % 2)), rate: Math.max(0.8, Math.min(1.15, baseRate + rateJitter + (dup ? 0.04 : 0))), accent: voice ? this.locale(voice) : null };
      });
      return out;
    },
    describe(assignment, speakers) {
      return Object.entries(speakers || {}).map(([k, sp]) => { const a = assignment[k] || {}; return `${sp.name || k}: ${this.ACCENT_NAME[a.accent] || "English"}${a.voice ? " (" + a.voice.name.replace(/Microsoft |Google /, "").replace(/ - .*$/, "") + ")" : ""}`; }).join(" · ");
    },
    prep(text) {
      // spell letter/digit groups like O-K-O-N or 0-7-7-2-4 as separate characters
      return text.replace(/\b([A-Za-z0-9](?:-[A-Za-z0-9]){1,})\b/g, (m) => m.split("-").map(c => (/[A-Za-z]/.test(c) ? c.toUpperCase() : c)).join(", "))
        .replace(/\b(\d+)\.(\d\d)\b/g, (m, a, b) => (b === "00" ? `${a} o'clock` : `${a} ${b}`))
        .replace(/£(\d+)/g, "$1 pounds");
    },
    stalled: false, onStall: null, started: 0,
    speak(text, cfg, volume) {
      return new Promise(resolve => {
        if (!("speechSynthesis" in window)) return setTimeout(resolve, 60 * text.split(" ").length);
        const chunks = text.length > 220 ? text.match(/[^.!?]+[.!?]+["']?\s*|[^.!?]+$/g) || [text] : [text];
        let i = 0;
        const next = (retry) => {
          if (i >= chunks.length) return resolve();
          const idx = retry ? i - 1 : i++;
          const u = new SpeechSynthesisUtterance(this.prep(chunks[idx]));
          if (cfg && cfg.voice) u.voice = cfg.voice; u.lang = (cfg && cfg.voice && cfg.voice.lang) || "en-GB"; u.pitch = cfg ? cfg.pitch : 1; u.rate = cfg ? cfg.rate : 0.95; u.volume = volume == null ? 1 : volume;
          let done = false, started = false;
          const finish = () => { if (done) return; done = true; clearTimeout(wd); clearTimeout(sw); next(); };
          // If Chrome's shared speech engine never starts this utterance (stuck item from another tab, muted engine), unjam once, then warn instead of racing on silently
          const sw = setTimeout(() => {
            if (started || done || !this.voices.length) return;
            try { speechSynthesis.cancel(); speechSynthesis.resume(); } catch (e) { }
            if (!retry) { done = true; clearTimeout(wd); return setTimeout(() => next(true), 300); }
            this.stalled = true; done = true; clearTimeout(wd);
            const resume = () => { this.stalled = false; i = idx; next(); };
            if (this.onStall) this.onStall(resume); else resume();
          }, 3500);
          const wd = setTimeout(finish, 2000 + u.text.split(" ").length * 700 / (u.rate || 1));
          u.onstart = () => { started = true; this.started++; this.stalled = false; };
          u.onend = finish; u.onerror = e => { if (e && e.error === "interrupted" && !started && !done) return; finish(); };
          speechSynthesis.speak(u);
        };
        next();
      });
    },
    stop() { try { speechSynthesis.cancel(); } catch (e) { } }
  };

  const sleep = (ms, signal) => new Promise(res => { const h = setTimeout(res, ms); if (signal) signal.addEventListener("abort", () => { clearTimeout(h); res(); }, { once: true }); });

  // ---------- menu ----------
  route("listening", (app) => {
    app.appendChild(topbar({ title: "Listening", buttons: [homeBtn()] }));
    const wrap = el(`<div class="home"><div class="breadcrumb"><a href="#home">Home</a> › Listening</div>
      <h1>Listening</h1>
      <p class="muted">Four parts, 40 questions, about 30 minutes plus checking time. The recording is read aloud by your browser with a different voice for each speaker and is played once only, as in the real test. Use headphones or speakers.</p>
      <div class="card" style="margin-bottom:18px"><div class="row"><button class="btn small" id="voicetest">Test the voices</button><span class="muted" id="voiceinfo">Checking available voices…</span></div>
      <div class="row" style="margin-top:8px"><label><input type="checkbox" id="realistic" ${settings.realisticPauses ? "checked" : ""}> Realistic pauses (reading time before each part, 2 minutes to check at the end)</label></div>
      <div class="row" style="margin-top:8px"><label>Speed <input type="range" id="rate" min="0.8" max="1.1" step="0.05" value="${settings.ttsRate}"> <span id="ratev">${settings.ttsRate}</span></label></div>
      <div class="row" style="margin-top:8px"><label><input type="checkbox" id="allv" ${settings.allVoices ? "checked" : ""}> Use every installed voice (only if "Test the voices" plays all three)</label></div></div>
      <div class="section"><h2>Full tests</h2><div class="testlist" id="full"></div></div>
      <div class="section"><h2>Practise one part</h2><p class="muted">In single-part practice you may pause and replay the recording.</p><div class="testlist" id="single"></div></div>
    </div>`);
    $("#realistic", wrap).onchange = e => { settings.realisticPauses = e.target.checked; IELTS.saveSettings(); };
    $("#allv", wrap).onchange = e => { settings.allVoices = e.target.checked; IELTS.saveSettings(); IELTS.render(); };
    $("#rate", wrap).oninput = e => { settings.ttsRate = +e.target.value; $("#ratev", wrap).textContent = e.target.value; IELTS.saveSettings(); };
    Speech.init().then(v => {
      const en = Speech.usable(); const skipped = v.filter(x => /^en/i.test(x.lang)).length - en.length;
      const acc = Speech.accentsAvailable().map(a => Speech.ACCENT_NAME[a]);
      $("#voiceinfo", wrap).textContent = en.length ? `${en.length} English voice${en.length > 1 ? "s" : ""} available (${en.filter(x => Speech.classify(x) === "female").length} female, ${en.filter(x => Speech.classify(x) === "male").length} male). Accents: ${acc.join(", ") || "English"}. Speakers in a part are given different voices.${skipped ? ` ${skipped} Microsoft voice${skipped > 1 ? "s" : ""} skipped: they are silent in Chrome. Use Microsoft Edge for more accents.` : ""}` : "No speech voices found in this browser. Use the 'Read with Claude' option inside a test, or try Chrome or Edge.";
    });
    $("#voicetest", wrap).onclick = async () => { await Speech.init(); Speech.onStall = (resume) => { $("#voiceinfo", wrap).textContent = "No sound came out. Close other tabs of this site, check the tab is not muted, or type chrome://restart in the address bar and try again."; Speech.onStall = null; resume(); }; const sp = { W: { name: "Speaker 1", gender: "female" }, M: { name: "Speaker 2", gender: "male" }, X: { name: "Speaker 3", gender: "female" } }; const a = Speech.assign(sp); $("#voiceinfo", wrap).textContent = "Voices for this test: " + Speech.describe(a, sp); await Speech.speak("Hello, this is the first speaker. My name is S-M-I-T-H.", a.W); await Speech.speak("And this is the second speaker. My number is 0-7-7-0-0, 9-0-0, 1-2-3.", a.M); await Speech.speak("And I am the third speaker. The meeting is at 9.30 on Tuesday.", a.X); };
    const done = IELTS.getAttempts("listening");
    tests().forEach(t => {
      const prev = done.filter(a => a.testId === t.id && a.scope === "full"); const last = prev[prev.length - 1];
      const card = el(`<div class="t"><b>${esc(t.title)}</b> ${IELTS.diffTag(t)}<div class="meta">${t.parts.map(p => esc(p.intro.replace(/^You will hear /, "").replace(/\.$/, ""))).join(" · ")}</div><div class="meta">${last ? `Last: ${last.raw}/40, Band ${last.band} (${IELTS.fmtDate(last.date)})` : "Not attempted"}</div><button class="btn primary">Start full test</button></div>`);
      $("button", card).onclick = () => go("listening-instr", { testId: t.id, scope: "full" });
      $("#full", wrap).appendChild(card);
      t.parts.forEach(p => {
        const pc = el(`<div class="t"><b>${esc(t.title)} · Part ${p.number}</b> ${IELTS.diffTag(t)}<div class="meta">${esc(p.intro)}</div><button class="btn">Practise this part</button></div>`);
        $("button", pc).onclick = () => go("listening-instr", { testId: t.id, scope: "P" + p.number });
        $("#single", wrap).appendChild(pc);
      });
    });
    app.appendChild(wrap);
  });
  function homeBtn() { const b = el(`<button class="tbtn">Home</button>`); b.onclick = () => go("home"); return b; }

  // ---------- instructions ----------
  route("listening-instr", (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("listening");
    const single = p.scope !== "full";
    app.appendChild(topbar({ title: t.title, buttons: [homeBtn()] }));
    const box = el(`<div class="instr"><div class="box">
      <h1>IELTS Listening</h1>
      <p><b>Time: approximately ${single ? "8" : "30"} minutes</b></p>
      <h3>INSTRUCTIONS TO CANDIDATES</h3>
      <ul><li>Answer <b>all</b> the questions.</li><li>You can change your answers at any time during the test.</li><li>Write your answers as you listen. Spelling matters.</li></ul>
      <h3>INFORMATION FOR CANDIDATES</h3>
      <ul><li>There are ${single ? "10" : "40"} questions in this ${single ? "part" : "test"}.</li><li>Each question carries one mark.</li><li>${single ? "" : "There are four parts to the test. "}You will hear each part <b>once only</b>${single ? " (in single-part practice you may pause and replay)" : ""}.</li><li>For each part of the test there will be time for you to look through the questions and time for you to check your answers.</li><li>At the end of the test you will have ${settings.realisticPauses ? "2 minutes" : "30 seconds"} to check your answers before they are submitted.</li></ul>
      <div class="opts"><b>Sound check:</b> make sure your volume is on. <button class="btn small" id="snd">Play test sound</button> <span class="muted">The recording starts when you press Start.</span></div>
      <div class="start"><button class="btn primary" id="start">Start test</button><button class="btn" id="back">Back</button></div>
    </div></div>`);
    $("#snd", box).onclick = async () => { await Speech.init(); Speech.speak("This is a sound check. If you can hear this, you are ready to begin.", Speech.assign({}).__narrator); };
    $("#start", box).onclick = () => go("listening-exam", p);
    $("#back", box).onclick = () => go("listening");
    app.appendChild(box);
  });

  // ---------- exam ----------
  route("listening-exam", async (app, p) => {
    const t = tests().find(x => x.id === p.testId); if (!t) return go("listening");
    const single = p.scope !== "full";
    const parts = single ? t.parts.filter(x => "P" + x.number === p.scope) : t.parts;
    const allGroups = parts.flatMap(x => x.questionGroups);
    const qnums = allGroups.flatMap(g => { const [a, b] = g.range; const arr = []; for (let i = a; i <= b; i++) arr.push(i); return arr; });
    const answers = {}; const flags = new Set(); let cur = parts[0]; let curQ = qnums[0]; let finished = false; let volume = 1;
    const realistic = settings.realisticPauses;
    const LOOK = realistic ? 20000 : 8000, CHECK_PART = realistic ? 20000 : 6000, FINAL = realistic ? 120 : 30;

    app.className = "exam listening";
    const tel = timerElement(); tel.textContent = "Listening";
    const helpBtn = el(`<button class="tbtn">Help</button>`); const finishBtn = el(`<button class="tbtn">Finish</button>`);
    app.appendChild(topbar({ title: t.title + (single ? " · Part " + cur.number : ""), timerEl: tel, buttons: [IELTS.displayButton(), helpBtn, finishBtn] }));
    const player = el(`<div class="player"><span class="audio-icon"></span><span class="status">Preparing…</span><label>Volume <input type="range" class="vol" min="0" max="1" step="0.05" value="1"></label>${single ? '<button class="btn small" id="pause">Pause</button><button class="btn small" id="replay">Replay part</button>' : ""}<button class="btn small" id="claude">Read with Claude instead</button></div>`);
    app.appendChild(player);
    const body = el(`<div class="body"><div class="qpane"></div></div>`); app.appendChild(body);
    const nav = el(`<div class="navbar"><div class="parts"></div><label class="review-toggle"><input type="checkbox" id="revflag"> Review</label><div class="arrows"><button class="btn small" id="prev">◀</button><button class="btn small" id="next">▶</button></div></div>`); app.appendChild(nav);
    const qpane = $(".qpane", body), status = $(".status", player), icon = $(".audio-icon", player);
    $(".vol", player).oninput = e => { volume = +e.target.value; };
    helpBtn.onclick = () => modal(`<h2>Help</h2><ul><li>The recording plays automatically and only once. Type your answers while you listen.</li><li>Use the numbers at the bottom to move between questions; all parts are available at any time, as in the real test.</li><li>At the end you have ${FINAL === 120 ? "2 minutes" : "30 seconds"} to check your answers before they are submitted.</li><li>If the voices stop unexpectedly, press "Read with Claude instead" to copy the script for Claude voice mode.</li></ul>`);

    const ctx = {
      answers, onChange: (n, v) => { answers[n] = v; paintNav(); },
      onFocus: n => { if (qnums.includes(n)) { curQ = n; paintNav(); } }
    };
    function showPart(pt) {
      cur = pt; qpane.innerHTML = `<div class="partbar" style="margin:-18px -22px 14px"><b>Part ${pt.number}</b>&nbsp; Listen and answer Questions ${pt.questionGroups[0].range[0]}–${pt.questionGroups[pt.questionGroups.length - 1].range[1]}.</div>`;
      pt.questionGroups.forEach(g => qpane.appendChild(Questions.renderGroup(g, ctx)));
      paintNav();
    }
    function isAnswered(i) { const g = allGroups.find(g => i >= g.range[0] && i <= g.range[1]); if (g && g.type === "mcq-multi") { const ch = answers["multi" + g.range[0]] || []; return ch.length > (i - g.range[0]); } return answers[i] != null && String(answers[i]).trim() !== ""; }
    function paintNav() {
      const ps = $(".parts", nav); ps.innerHTML = "";
      parts.forEach(pt => {
        const a = pt.questionGroups[0].range[0], b = pt.questionGroups[pt.questionGroups.length - 1].range[1];
        const tab = el(`<div class="ptab ${pt === cur ? "open" : "collapsed"}"><span class="pname">Part ${pt.number}</span><span class="nums"></span></div>`);
        if (pt === cur) { for (let i = a; i <= b; i++) { const bt = el(`<button class="num ${isAnswered(i) ? "done" : ""} ${flags.has(i) ? "flag" : ""} ${i === curQ ? "cur" : ""}">${i}</button>`); bt.onclick = () => jumpTo(i); $(".nums", tab).appendChild(bt); } }
        else { let c = 0; for (let i = a; i <= b; i++) if (isAnswered(i)) c++; tab.innerHTML = `<span class="pname">Part ${pt.number}</span><span class="muted" style="font-size:12px">${c} of ${b - a + 1}</span>`; }
        $(".pname", tab).onclick = () => { if (pt !== cur) { curQ = a; showPart(pt); } };
        ps.appendChild(tab);
      });
      $$(".q", qpane).forEach(q => q.classList.toggle("current", +q.dataset.q === curQ));
      $("#revflag", nav).checked = flags.has(curQ);
    }
    function jumpTo(i) {
      curQ = i; const pt = parts.find(x => x.questionGroups.some(g => i >= g.range[0] && i <= g.range[1])); if (pt !== cur) showPart(pt);
      const target = qpane.querySelector(`[data-q="${i}"]`); if (target) { target.scrollIntoView({ block: "center", behavior: "smooth" }); const inp = target.matches("input,select") ? target : target.querySelector("input,select"); if (inp && window.innerWidth > 860) inp.focus({ preventScroll: true }); }
      paintNav();
    }
    $("#prev", nav).onclick = () => { const i = qnums.indexOf(curQ); if (i > 0) jumpTo(qnums[i - 1]); };
    $("#next", nav).onclick = () => { const i = qnums.indexOf(curQ); if (i < qnums.length - 1) jumpTo(qnums[i + 1]); };
    $("#revflag", nav).onchange = e => { e.target.checked ? flags.add(curQ) : flags.delete(curQ); paintNav(); };

    // ----- playback -----
    await Speech.init();
    const hasVoices = Speech.voices.some(v => /^en/i.test(v.lang));
    const abort = new AbortController(); let paused = false, pauseResolver = null, replayRequested = false;
    const waitIfPaused = async () => { while (paused) await new Promise(r => { pauseResolver = r; setTimeout(r, 300); }); };
    const say = async (text, cfg) => { if (abort.signal.aborted) return; await waitIfPaused(); icon.classList.add("on"); await Speech.speak(text, cfg, volume); icon.classList.remove("on"); };
    const pause = async ms => { if (abort.signal.aborted) return; await sleep(ms, abort.signal); };
    let narrator = Speech.assign({}).__narrator;
    Speech.onStall = (resume) => {
      status.textContent = "No sound is coming out";
      modal(`<h2>No sound is coming out</h2><p>The browser's speech engine did not start speaking. This usually means another tab of this site is holding it, the tab is muted, or Chrome's speech engine is stuck.</p><ol style="margin-left:18px"><li>Close every other tab of this site.</li><li>Right-click this tab: if it says <b>Unmute site</b>, click it; check the Windows volume mixer for Chrome.</li><li>If it is still silent, close all tabs of the site, type <b>chrome://restart</b> in the address bar, then come back.</li></ol><p class="muted">The recording is paused and will continue from this sentence.</p>`, [{ label: "Try again", value: true, cls: "primary" }]).then(resume);
    };

    if (single) {
      $("#pause", player).onclick = () => { paused = !paused; $("#pause", player).textContent = paused ? "Resume" : "Pause"; if (paused) { try { speechSynthesis.pause(); } catch (e) { } } else { try { speechSynthesis.resume(); } catch (e) { } if (pauseResolver) pauseResolver(); } };
      $("#replay", player).onclick = () => { replayRequested = true; Speech.stop(); };
    }
    $("#claude", player).onclick = async () => {
      const ok = await modal(`<h2>Read with Claude instead</h2><p>This copies the full recording script with reading instructions. Paste it into a Claude chat and switch to voice mode; Claude will read it to you with pauses, then you type your answers here and press Finish.</p><p class="muted">The browser voices will be stopped.</p>`, [{ label: "Cancel", value: false }, { label: "Copy script", value: true, cls: "primary" }]);
      if (!ok) return;
      abort.abort(); Speech.stop(); status.textContent = "Browser audio stopped. Listen with Claude, then press Finish.";
      copyText(scriptForClaude(t, parts));
    };

    async function playPart(pt) {
      Speech.rateOffset = t.difficulty === "easy" ? -0.04 : t.difficulty === "harder" ? 0.05 : 0;
      const voices = Speech.assign(pt.speakers); let lastSpeaker = null;
      status.textContent = `Part ${pt.number}`; status.title = Speech.describe(voices, pt.speakers);
      await say(`Part ${pt.number}. ${pt.intro}`, narrator);
      await pause(1500);
      for (const u of pt.script) {
        if (abort.signal.aborted || replayRequested) return;
        if (u.cue === "look") { status.textContent = `Part ${pt.number} · Time to look at questions ${u.range[0]}–${u.range[1]}`; await say(`You now have some time to look at questions ${u.range[0]} to ${u.range[1]}.`, narrator); await pause(LOOK); status.textContent = `Part ${pt.number} · Playing`; }
        else if (u.cue === "continue") { await pause(1500); status.textContent = `Part ${pt.number} · Time to look at questions ${u.range[0]}–${u.range[1]}`; await say(`Before you hear the rest of the ${pt.speakers && Object.keys(pt.speakers).length > 1 ? "conversation" : "talk"}, you have some time to look at questions ${u.range[0]} to ${u.range[1]}.`, narrator); await pause(Math.round(LOOK * 0.75)); await say(`Now listen and answer questions ${u.range[0]} to ${u.range[1]}.`, narrator); status.textContent = `Part ${pt.number} · Playing`; }
        else if (u.pause) await pause(u.pause);
        else if (u.t) await say(u.t, voices[u.s] || narrator);
        if (u.t) await pause(/\?\s*$/.test(u.t) ? 550 : u.s !== lastSpeaker ? 420 : 300); if (u.t) lastSpeaker = u.s;
      }
      if (abort.signal.aborted || replayRequested) return;
      status.textContent = `End of Part ${pt.number} · Check your answers`;
      await say(`That is the end of Part ${pt.number}. You now have ${CHECK_PART >= 20000 ? "twenty seconds" : "a few seconds"} to check your answers.`, narrator);
      await pause(CHECK_PART);
    }
    async function run() {
      if (!hasVoices) { status.textContent = "No speech voices available in this browser."; await modal(`<h2>No voices available</h2><p>Your browser has no English text-to-speech voices. Use <b>Read with Claude instead</b> to copy the script for Claude voice mode, or open this page in Chrome or Edge.</p>`); return; }
      status.textContent = "Starting…";
      if (!single) { await say("You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and questions, and you will have a chance to check your answers. The recording will be played once only. The test is in four parts. Now turn to Part 1.", narrator); await pause(1200); }
      for (let i = 0; i < parts.length; i++) {
        const pt = parts[i]; showPart(pt); curQ = pt.questionGroups[0].range[0]; paintNav();
        do { replayRequested = false; await playPart(pt); } while (replayRequested && !abort.signal.aborted);
        if (abort.signal.aborted) return;
        if (i < parts.length - 1) { await say(`Now turn to Part ${parts[i + 1].number}.`, narrator); await pause(800); }
      }
      if (abort.signal.aborted) return;
      await say(`That is the end of the listening test. You now have ${FINAL === 120 ? "two minutes" : "thirty seconds"} to check your answers.`, narrator);
      status.textContent = "Checking time";
      const timer = new Timer(FINAL, { onTick: r => updateTimerEl(tel, r), onEnd: () => finish(true) });
      tel.classList.remove("hidden"); timer.start(); state.cleanup2 = () => timer.pause();
    }
    run();

    finishBtn.onclick = async () => {
      const un = qnums.filter(i => !isAnswered(i)).length;
      const ok = await modal(`<h2>Finish the test?</h2><p>${un ? `You have <b>${un}</b> unanswered question${un > 1 ? "s" : ""}.` : "All questions are answered."}</p><p class="muted">The recording will stop and your answers will be marked.</p>`, [{ label: "Keep working", value: false }, { label: "Submit answers", value: true, cls: "primary" }]);
      if (ok) finish(false);
    };
    guardLeave(true);
    state.cleanup = () => { abort.abort(); Speech.stop(); Speech.onStall = null; guardLeave(false); if (state.cleanup2) state.cleanup2(); };

    async function finish(auto) {
      if (finished) return; finished = true; abort.abort(); Speech.stop(); guardLeave(false); if (state.cleanup2) state.cleanup2();
      const results = Questions.markAll(allGroups, answers);
      const raw = results.filter(r => r.correct).length;
      const band = single ? indicativeBand(raw, results.length, "listening") : bandFor(raw, "listening");
      const attempt = { module: "listening", testId: t.id, testTitle: t.title, scope: p.scope, raw, total: results.length, band, byType: Questions.byType(results), results: results.map(r => ({ n: r.n, given: r.given, expected: r.expected, correct: r.correct, type: r.type })), auto: !!auto };
      await saveAttempt(attempt);
      go("listening-results", { id: attempt.id });
    }
    showPart(parts[0]);
  });

  function scriptForClaude(t, parts) {
    let s = `Please act as the IELTS Listening test recording. Read the script below aloud in voice mode, exactly as written, at a natural, clear pace. Use a noticeably different voice or tone for each speaker. Read spelled-out names letter by letter and phone numbers digit by digit. Where the script says [PAUSE 20 seconds] or similar, stay silent for that long. Do not add any commentary, explanations or answers. Each part is played once only.\n\n`;
    s += `NARRATOR: You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and questions, and you will have a chance to check your answers. The recording will be played once only.\n\n`;
    parts.forEach(pt => {
      s += `=== PART ${pt.number} ===\nNARRATOR: ${pt.intro}\n`;
      pt.script.forEach(u => {
        if (u.cue === "look") s += `NARRATOR: You now have some time to look at questions ${u.range[0]} to ${u.range[1]}. [PAUSE 20 seconds]\n`;
        else if (u.cue === "continue") s += `NARRATOR: Before you hear the rest, you have some time to look at questions ${u.range[0]} to ${u.range[1]}. [PAUSE 15 seconds] Now listen and answer questions ${u.range[0]} to ${u.range[1]}.\n`;
        else if (u.pause) s += `[PAUSE ${Math.round(u.pause / 1000)} seconds]\n`;
        else if (u.t) s += `${(pt.speakers[u.s] || {}).name || u.s} (${(pt.speakers[u.s] || {}).gender || ""}): ${u.t}\n`;
      });
      s += `NARRATOR: That is the end of Part ${pt.number}. You now have twenty seconds to check your answers. [PAUSE 20 seconds]\n\n`;
    });
    s += `NARRATOR: That is the end of the listening test. You now have two minutes to check your answers.`;
    return s;
  }

  // ---------- results ----------
  route("listening-results", (app, p) => {
    const a = IELTS.getAttempts("listening").find(x => x.id === p.id); if (!a) return go("listening");
    const t = tests().find(x => x.id === a.testId);
    const single = a.scope !== "full";
    app.appendChild(topbar({ title: "Listening results", buttons: [homeBtn()] }));
    const wrap = el(`<div class="results">
      <div class="breadcrumb"><a href="#home">Home</a> › <a href="#listening">Listening</a> › Results</div>
      <h1>${esc(a.testTitle || "")}${single ? " · Part " + a.scope.slice(1) : ""}</h1>
      <div class="score">
        <div class="sc"><div class="v">${a.raw} / ${a.total}</div><div class="l">Correct answers</div></div>
        <div class="sc"><div class="v">${a.band}</div><div class="l">${single ? "Indicative band (scaled to 40)" : "Band score (official Listening table)"}</div></div>
      </div>
      <div class="row" style="margin-bottom:18px"><button class="btn primary" id="transcript">Show transcript</button><button class="btn" id="again">Try again</button><a class="btn" href="#progress">Progress</a></div>
      <h2>By question type</h2>${Questions.typeTable(a.byType || {})}
      <h2 style="margin-top:22px">All answers</h2>${Questions.resultsTable(a.results)}
      <div id="tr" class="hidden" style="margin-top:22px"></div>
      <p class="muted" style="margin-top:14px">Band 8 needs 35 of 40. Band 7 needs 30. Check your spelling of names and plurals.</p>
    </div>`);
    $("#again", wrap).onclick = () => go("listening-instr", { testId: a.testId, scope: a.scope });
    $("#transcript", wrap).onclick = () => {
      if (!t) return; const parts = single ? t.parts.filter(x => "P" + x.number === a.scope) : t.parts;
      const tr = $("#tr", wrap); tr.classList.toggle("hidden");
      tr.innerHTML = `<h2>Transcript</h2>` + parts.map(pt => `<div class="card" style="margin-bottom:12px"><h3>Part ${pt.number}</h3><p class="muted">${esc(pt.intro)}</p>${pt.script.filter(u => u.t).map(u => `<p><b>${esc((pt.speakers[u.s] || {}).name || u.s)}:</b> ${esc(u.t)}</p>`).join("")}</div>`).join("");
    };
    app.appendChild(wrap);
  });

  window.Speech = Speech;
})();
