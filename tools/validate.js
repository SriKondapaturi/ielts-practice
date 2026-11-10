// Validates data files: node tools/validate.js site/data/reading-2.js
// Checks: syntax, question numbering 1-40 contiguous, answers present, word counts, gap markers match question numbers.
const fs = require("fs");
const vm = require("vm");
const files = process.argv.slice(2);
let problems = 0;
function warn(msg) { console.log("  ! " + msg); problems++; }

for (const f of files) {
  console.log("== " + f);
  const code = fs.readFileSync(f, "utf8");
  const ctx = { window: {} };
  try { vm.runInNewContext(code, ctx); } catch (e) { warn("SYNTAX: " + e.message); continue; }
  const w = ctx.window;
  const tests = (w.READING_TESTS || []).map(t => ({ kind: "R", t })).concat((w.LISTENING_TESTS || []).map(t => ({ kind: "L", t })));
  for (const { kind, t } of tests) {
    console.log("  test " + t.id + " " + t.title);
    const sections = kind === "R" ? t.passages : t.parts;
    if (!sections || sections.length !== (kind === "R" ? 3 : 4)) warn("wrong number of sections");
    const seen = new Set();
    for (const sec of sections || []) {
      if (kind === "R") {
        const words = sec.paragraphs.join(" ").split(/\s+/).length;
        console.log(`    passage ${sec.number} "${sec.title}" words=${words} paras=${sec.paragraphs.length}`);
        if (words < 700 || words > 1050) warn(`passage ${sec.number} word count ${words} out of range`);
        const usesLetters = sec.questionGroups.some(g => g.type === "headings" || g.type === "matchinfo");
        if (usesLetters && !sec.lettered) warn(`passage ${sec.number} needs lettered:true`);
      } else {
        const spoken = (sec.script || []).filter(u => u.t).map(u => u.t).join(" ").split(/\s+/).length;
        console.log(`    part ${sec.number} spoken words=${spoken} speakers=${Object.keys(sec.speakers || {}).join(",")}`);
        if (spoken < 450 || spoken > 1100) warn(`part ${sec.number} spoken words ${spoken} out of range`);
        for (const u of sec.script || []) if (u.s && !sec.speakers[u.s]) warn(`part ${sec.number} unknown speaker ${u.s}`);
        if (!sec.intro) warn(`part ${sec.number} missing intro`);
      }
      for (const g of sec.questionGroups || []) {
        if (!g.type || !g.range || !g.instructions) warn(`group missing type/range/instructions in section ${sec.number}`);
        const [a, b] = g.range;
        const qs = g.questions || [];
        if (qs.length !== b - a + 1) warn(`${g.type} ${a}-${b}: ${qs.length} questions, expected ${b - a + 1}`);
        qs.forEach((q, i) => {
          if (q.n !== a + i) warn(`${g.type}: question n=${q.n} expected ${a + i}`);
          if (seen.has(q.n)) warn(`duplicate question ${q.n}`); seen.add(q.n);
          if (g.type !== "mcq-multi") {
            if (q.answer === undefined || q.answer === null || q.answer === "" || (Array.isArray(q.answer) && !q.answer.length)) warn(`question ${q.n} has no answer`);
          }
          if (["tfng"].includes(g.type) && !["TRUE", "FALSE", "NOT GIVEN"].includes(q.answer)) warn(`q${q.n} tfng answer invalid: ${q.answer}`);
          if (["ynng"].includes(g.type) && !["YES", "NO", "NOT GIVEN"].includes(q.answer)) warn(`q${q.n} ynng answer invalid: ${q.answer}`);
          if (g.type === "mcq") {
            if (!q.options || q.options.length < 3) warn(`q${q.n} mcq needs options`);
            const idx = "ABCD".indexOf(q.answer); if (idx < 0 || idx >= (q.options || []).length) warn(`q${q.n} mcq answer letter invalid`);
          }
          if (g.type === "headings") {
            const romans = ["i","ii","iii","iv","v","vi","vii","viii","ix","x","xi","xii"];
            if (!romans.slice(0, (g.headings||[]).length).includes(q.answer)) warn(`q${q.n} heading answer ${q.answer} not in list`);
            if (!q.paragraph) warn(`q${q.n} heading missing paragraph`);
          }
          if (["matchfeatures", "endings", "summary-box"].includes(g.type)) {
            if (!(g.options || []).some(o => o.letter === q.answer)) warn(`q${q.n} answer ${q.answer} not among options`);
          }
          if (["sentence", "short", "summary", "notes", "table", "flowchart", "diagram"].includes(g.type) && !(g.letterOptions)) {
            if (!Array.isArray(q.answer)) warn(`q${q.n} completion answer must be an array`);
            else q.answer.forEach(ans => { if (ans.split(/\s+/).length > 3) warn(`q${q.n} answer "${ans}" longer than 3 words`); });
          }
        });
        if (g.type === "mcq-multi") {
          if (!Array.isArray(g.answer) || g.answer.length !== (g.select || 2)) warn(`mcq-multi ${a}-${b} answer array wrong`);
        }
        if (g.type === "headings") {
          const used = qs.map(q => q.answer); if (new Set(used).size !== used.length) warn("heading used twice");
          if ((g.headings || []).length < qs.length + 2) warn("headings list should have at least 2 extra headings");
        }
        // gap markers
        const blob = JSON.stringify(g);
        const gaps = [...blob.matchAll(/\[\[(\d+)\]\]/g)].map(m => +m[1]);
        if (["notes", "table", "flowchart", "summary", "summary-box"].includes(g.type)) {
          const expected = qs.map(q => q.n);
          const missing = expected.filter(n => !gaps.includes(n)); const extra = gaps.filter(n => !expected.includes(n));
          if (missing.length) warn(`${g.type} ${a}-${b} missing gap markers for ${missing.join(",")}`);
          if (extra.length) warn(`${g.type} ${a}-${b} extra gap markers ${extra.join(",")}`);
        }
        if (g.type === "sentence" || g.type === "short") {
          qs.forEach(q => { if (g.type === "sentence" && !(q.text || "").includes("______")) warn(`q${q.n} sentence needs ______`); });
        }
        if (g.type === "diagram") {
          if (!g.svg) warn(`diagram ${a}-${b} missing svg`);
          else if (!g.letterOptions) qs.forEach(q => { if (!g.svg.includes(`data-gap="${q.n}"`) && !g.svg.includes(`data-gap='${q.n}'`)) warn(`diagram missing data-gap for ${q.n}`); });
        }
      }
    }
    for (let n = 1; n <= 40; n++) if (!seen.has(n)) warn("missing question " + n);
    if (seen.size !== 40) warn("total questions " + seen.size);
  }
}
console.log(problems ? `\n${problems} problem(s)` : "\nOK");
process.exit(problems ? 1 : 0);
