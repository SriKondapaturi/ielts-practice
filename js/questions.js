/* Shared question rendering + marking for Reading and Listening */
window.Questions = (function () {
  const { esc, el, roman, isCorrect, $$ } = IELTS;

  const TYPE_LABEL = {
    tfng: "True / False / Not Given", ynng: "Yes / No / Not Given", headings: "Matching headings", matchinfo: "Matching information",
    matchfeatures: "Matching features", endings: "Matching sentence endings", mcq: "Multiple choice", "mcq-multi": "Multiple choice (two answers)",
    sentence: "Sentence completion", short: "Short answers", table: "Table completion", notes: "Note completion", flowchart: "Flow-chart completion",
    summary: "Summary completion", "summary-box": "Summary completion (word list)", diagram: "Diagram / map labelling"
  };

  function gapHtml(n, ctx, opts) {
    const v = ctx.answers[n] || "";
    if (opts && opts.letters) {
      const o = opts.letters.map(L => `<option value="${L}" ${v === L ? "selected" : ""}>${L}</option>`).join("");
      return `<span class="gap" data-q="${n}"><span class="gn">${n}</span><select data-q="${n}"><option value=""></option>${o}</select></span>`;
    }
    return `<span class="gap" data-q="${n}"><span class="gn">${n}</span><input type="text" autocomplete="off" spellcheck="false" data-q="${n}" value="${esc(v)}"></span>`;
  }
  const fillGaps = (text, ctx, opts) => esc(text).replace(/\[\[(\d+)\]\]/g, (m, n) => gapHtml(+n, ctx, opts));

  function instr(group) {
    const lines = (group.instructions || []).map((l, i) => `<p class="${i === 0 ? "bold" : ""}">${esc(l)}</p>`).join("");
    let legend = "";
    if (group.legend) legend = `<table class="legend">${group.legend.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table>`;
    const [a, b] = group.range;
    return `<div class="ghead">Questions ${a}${b > a ? "–" + b : ""}</div><div class="instrs">${lines}</div>${legend}`;
  }
  const radio = (n, value, label, ctx) => `<label><input type="radio" name="q${n}" value="${esc(value)}" ${ctx.answers[n] === value ? "checked" : ""} data-q="${n}"> ${label}</label>`;

  function renderGroup(group, ctx) {
    const g = group; let body = "";
    const title = g.notesTitle || g.tableTitle || g.flowchartTitle || g.summaryTitle || "";
    switch (g.type) {
      case "tfng": case "ynng":
        body = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text)}<div class="opts">${(g.type === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"] : ["YES", "NO", "NOT GIVEN"]).map(o => radio(q.n, o, o, ctx)).join("")}</div></div></div>`).join("");
        break;
      case "mcq":
        body = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text)}<div class="opts">${q.options.map((o, i) => radio(q.n, "ABCDE"[i], `<b>${"ABCDE"[i]}</b>&nbsp; ${esc(o)}`, ctx)).join("")}</div></div></div>`).join("");
        break;
      case "mcq-multi": {
        const key = "multi" + g.range[0]; const chosen = ctx.answers[key] || [];
        body = `<div class="q" data-q="${g.range[0]}"><span class="qn">${g.range[0]}–${g.range[1]}</span><div class="qbody">${esc(g.stem)}<div class="opts">${g.options.map((o, i) => { const L = "ABCDEFG"[i]; return `<label><input type="checkbox" data-multi="${key}" data-q="${g.range[0]}" value="${L}" ${chosen.includes(L) ? "checked" : ""}> <b>${L}</b>&nbsp; ${esc(o)}</label>`; }).join("")}</div></div></div>`;
        break;
      }
      case "headings": {
        const list = `<div class="headings-list dragsrc"><span class="ot">List of Headings</span>${g.headings.map((h, i) => `<div class="dragopt" draggable="true" data-letter="${roman[i]}" title="Drag onto a paragraph, or use the list"><b>${roman[i]}</b>&nbsp; ${esc(h)}</div>`).join("")}</div>`;
        const ex = g.example ? `<div class="example"><b>Example</b> &nbsp; Paragraph ${esc(g.example.paragraph)} &nbsp; <b>${esc(g.example.answer)}</b></div>` : "";
        const letters = g.headings.map((h, i) => roman[i]);
        body = list + ex + g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">Paragraph ${esc(q.paragraph)} &nbsp; ${gapHtml(q.n, ctx, { letters })}</div></div>`).join("");
        break;
      }
      case "matchinfo": {
        const letters = lettersFromRange(g.paragraphsRange || "A-H");
        body = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text)} &nbsp; ${gapHtml(q.n, ctx, { letters })}</div></div>`).join("");
        break;
      }
      case "matchfeatures": case "endings": {
        const letters = g.options.map(o => o.letter);
        const box = `<div class="optbox dragsrc"><span class="ot">${esc(g.optionsTitle || (g.type === "endings" ? "" : "Options"))}</span>${g.options.map(o => `<div class="dragopt" draggable="true" data-letter="${esc(o.letter)}"><b>${esc(o.letter)}</b>&nbsp; ${esc(o.text)}</div>`).join("")}</div>`;
        const qs = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text)} &nbsp; ${gapHtml(q.n, ctx, { letters })}</div></div>`).join("");
        body = g.type === "endings" ? qs + box : box + qs;
        break;
      }
      case "sentence":
        body = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text).replace("______", `<input type="text" class="inline" autocomplete="off" spellcheck="false" data-q="${q.n}" value="${esc(ctx.answers[q.n] || "")}">`)}</div></div>`).join("");
        break;
      case "short":
        body = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${esc(q.text)}<div><input type="text" autocomplete="off" spellcheck="false" data-q="${q.n}" value="${esc(ctx.answers[q.n] || "")}"></div></div></div>`).join("");
        break;
      case "notes":
        body = `<div class="notesbox">${title ? `<span class="nt">${esc(title)}</span>` : ""}${g.lines.map(ln => { const isH = !/\[\[|^•|^-|^\d/.test(ln) && ln.length < 60; return `<span class="ln ${isH ? "h" : ""}">${fillGaps(ln, ctx)}</span>`; }).join("")}</div>`;
        break;
      case "table":
        body = `<table class="qtable">${title ? `<caption>${esc(title)}</caption>` : ""}${g.columns ? `<tr>${g.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr>` : ""}${g.rows.map(r => `<tr>${r.map(c => `<td>${fillGaps(c, ctx)}</td>`).join("")}</tr>`).join("")}</table>`;
        break;
      case "flowchart":
        body = `<div class="flow">${title ? `<b style="margin-bottom:6px">${esc(title)}</b>` : ""}${g.lines.map((ln, i) => `${i ? '<div class="farrow">↓</div>' : ""}<div class="fbox">${fillGaps(ln, ctx)}</div>`).join("")}</div>`;
        break;
      case "summary":
        body = `<div class="sumbox">${title ? `<span class="st">${esc(title)}</span>` : ""}${fillGaps(g.text, ctx)}</div>`;
        break;
      case "summary-box": {
        const letters = g.options.map(o => o.letter);
        body = `<div class="sumbox">${title ? `<span class="st">${esc(title)}</span>` : ""}${fillGaps(g.text, ctx, { letters })}</div><div class="optbox dragsrc">${g.options.map(o => `<div class="dragopt" draggable="true" data-letter="${esc(o.letter)}"><b>${esc(o.letter)}</b>&nbsp; ${esc(o.text)}</div>`).join("")}</div>`;
        break;
      }
      case "diagram": {
        const inputs = g.questions.map(q => `<div class="q" data-q="${q.n}"><span class="qn">${q.n}</span><div class="qbody">${q.text ? esc(q.text) + " &nbsp; " : ""}${g.letterOptions ? gapHtml(q.n, ctx, { letters: g.letterOptions }).replace(`<span class="gn">${q.n}</span>`, "") : `<input type="text" autocomplete="off" spellcheck="false" data-q="${q.n}" value="${esc(ctx.answers[q.n] || "")}">`}</div></div>`).join("");
        body = `<div class="diagram">${g.caption ? `<div class="caption">${esc(g.caption)}</div>` : ""}${g.svg}</div><div class="diagram-inputs">${inputs}</div>`;
        break;
      }
      default: body = `<p class="muted">Unsupported question type: ${esc(g.type)}</p>`;
    }
    const node = el(`<div class="qgroup" data-type="${g.type}">${instr(g)}${body}</div>`);
    // wire events
    $$("input[type=text]", node).forEach(inp => { inp.addEventListener("input", () => ctx.onChange(+inp.dataset.q, inp.value)); inp.addEventListener("focus", () => ctx.onFocus && ctx.onFocus(+inp.dataset.q)); });
    $$("select", node).forEach(s => { s.addEventListener("change", () => ctx.onChange(+s.dataset.q, s.value)); s.addEventListener("focus", () => ctx.onFocus && ctx.onFocus(+s.dataset.q)); });
    $$("input[type=radio]", node).forEach(r => r.addEventListener("change", () => { ctx.onChange(+r.dataset.q, r.value); ctx.onFocus && ctx.onFocus(+r.dataset.q); }));
    $$("input[type=checkbox][data-multi]", node).forEach(cb => cb.addEventListener("change", () => {
      const key = cb.dataset.multi; const all = $$(`input[data-multi="${key}"]`, node); const chosen = all.filter(c => c.checked).map(c => c.value);
      const max = g.select || 2;
      if (chosen.length > max) { cb.checked = false; IELTS.toast(`Choose only ${max} letters`); return; }
      ctx.onChange(key, chosen, g.range); ctx.onFocus && ctx.onFocus(g.range[0]);
    }));
    $$(".q", node).forEach(q => q.addEventListener("click", () => ctx.onFocus && ctx.onFocus(+q.dataset.q)));
    wireDragDrop(node, ctx);
    if (ctx.review) decorateReview(node, g, ctx);
    return node;
  }

  // Drag-and-drop as in the computer-delivered test: drag an option onto a question; the dropdown stays as a keyboard/touch alternative
  function wireDragDrop(node, ctx) {
    if (ctx.review) return;
    const opts = $$(".dragopt", node); if (!opts.length) return;
    opts.forEach(o => {
      o.addEventListener("dragstart", e => { e.dataTransfer.setData("text/plain", o.dataset.letter); e.dataTransfer.effectAllowed = "copy"; o.classList.add("dragging"); });
      o.addEventListener("dragend", () => o.classList.remove("dragging"));
    });
    const zones = $$(".gap select", node).map(sel => sel.closest(".q") || sel.closest(".gap"));
    zones.forEach(z => {
      if (!z || z.dataset.dz) return; z.dataset.dz = "1";
      z.addEventListener("dragover", e => { e.preventDefault(); e.dataTransfer.dropEffect = "copy"; z.classList.add("dropover"); });
      z.addEventListener("dragleave", () => z.classList.remove("dropover"));
      z.addEventListener("drop", e => {
        e.preventDefault(); z.classList.remove("dropover");
        const L = e.dataTransfer.getData("text/plain"); const sel = z.querySelector("select") || z.closest(".gap, .q").querySelector("select"); if (!sel || !L) return;
        if (![...sel.options].some(op => op.value === L)) return;
        sel.value = L; sel.dispatchEvent(new Event("change")); z.classList.add("dropped"); setTimeout(() => z.classList.remove("dropped"), 600);
      });
    });
  }
  function lettersFromRange(r) { const [a, b] = r.split("-"); const out = []; for (let c = a.charCodeAt(0); c <= b.charCodeAt(0); c++) out.push(String.fromCharCode(c)); return out; }

  // ---------- marking ----------
  function expectedDisplay(g, q) {
    if (g.type === "mcq-multi") return g.answer.join(", ");
    if (Array.isArray(q.answer)) return q.answer[0];
    return q.answer;
  }
  function wordLimit(g) {
    const txt = (g.instructions || []).join(" ").toUpperCase();
    let words = null, number = /AND\/OR A NUMBER|OR A NUMBER/.test(txt);
    if (/ONE WORD/.test(txt)) words = 1; else if (/TWO WORDS/.test(txt)) words = 2; else if (/THREE WORDS/.test(txt)) words = 3;
    if (/A NUMBER ONLY|ONLY A NUMBER/.test(txt) && words === null) words = 0;
    return words === null ? null : { words, number };
  }
  function withinLimit(given, lim) {
    if (!lim) return true;
    const toks = String(given || "").trim().replace(/\b([A-Za-z]{1,2}\d[A-Za-z\d]?) (\d[A-Za-z]{2})\b/g, "$1$2").split(/\s+/).filter(Boolean);
    const isNum = t => /^[£$€]?\d[\d.,:%]*$/.test(t);
    const nums = toks.filter(isNum).length, words = toks.length - nums;
    if (lim.words === 0) return words === 0 && nums <= 1;
    if (lim.number) return words <= lim.words && nums <= 1;
    return words + nums <= lim.words;
  }
  function markGroup(g, answers) {
    const out = [];
    const lim = wordLimit(g);
    if (g.type === "mcq-multi") {
      const key = "multi" + g.range[0]; const chosen = answers[key] || [];
      const correctLetters = g.answer.slice();
      // one mark per correct letter chosen (up to the number of boxes)
      const hits = chosen.filter(L => correctLetters.includes(L));
      g.questions.forEach((q, i) => out.push({ n: q.n, type: g.type, given: chosen.join(", "), expected: g.answer.join(", "), correct: i < hits.length }));
      return out;
    }
    g.questions.forEach(q => {
      const given = answers[q.n];
      let ok = false;
      if (["tfng", "ynng", "mcq", "headings", "matchinfo", "matchfeatures", "endings", "summary-box"].includes(g.type) || (g.type === "diagram" && g.letterOptions)) ok = String(given || "").trim().toLowerCase() === String(q.answer).toLowerCase();
      else ok = isCorrect(given, q.answer) && withinLimit(given, lim);
      out.push({ n: q.n, type: g.type, given: given == null ? "" : given, expected: expectedDisplay(g, q), correct: ok, overLimit: ok ? false : (isCorrect(given, q.answer) && !withinLimit(given, lim)) });
    });
    return out;
  }
  function markAll(groups, answers) { return groups.flatMap(g => markGroup(g, answers)).sort((a, b) => a.n - b.n); }
  function byType(results) {
    const m = {}; results.forEach(r => { const k = TYPE_LABEL[r.type] || r.type; m[k] = m[k] || { correct: 0, total: 0 }; m[k].total++; if (r.correct) m[k].correct++; });
    return m;
  }
  function decorateReview(node, g, ctx) {
    const res = Object.fromEntries((ctx.results || []).map(r => [r.n, r]));
    $$("input, select", node).forEach(i => { i.disabled = true; });
    $$("[data-q]", node).forEach(elq => {
      if (!elq.classList.contains("q") && !elq.classList.contains("gap")) return;
      const n = +elq.dataset.q; const r = res[n]; if (!r) return;
      const tag = el(`<span class="${r.correct ? "ok" : "bad"}" style="font-size:13px;margin-left:6px;font-weight:bold">${r.correct ? "✓" : "✗ " + esc(r.expected)}</span>`);
      (elq.querySelector(".qbody") || elq).appendChild(tag);
    });
  }

  function resultsTable(results) {
    return `<table class="rtable"><tr><th>Q</th><th>Your answer</th><th>Correct answer</th><th>Type</th></tr>${results.map(r => `<tr><td>${r.n}</td><td class="${r.correct ? "ok" : "bad"}">${esc(r.given) || "<span class='muted'>—</span>"}${r.overLimit ? " <span class='muted' style='font-weight:normal'>(too many words)</span>" : ""}</td><td>${esc(r.expected)}</td><td class="muted">${esc(TYPE_LABEL[r.type] || r.type)}</td></tr>`).join("")}</table>`;
  }
  function typeTable(bt) {
    return `<table class="rtable"><tr><th>Question type</th><th>Score</th><th></th></tr>${Object.entries(bt).sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total)).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v.correct}/${v.total}</td><td style="width:40%"><div class="bar"><div style="width:${Math.round(100 * v.correct / v.total)}%"></div></div></td></tr>`).join("")}</table>`;
  }

  return { TYPE_LABEL, renderGroup, markGroup, markAll, byType, resultsTable, typeTable };
})();
