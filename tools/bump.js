// Bump the asset version so browsers fetch fresh files after a deploy: node tools/bump.js
const fs = require("fs"); const V = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");
for (const f of ["index.html", "sw.js", "js/main.js"]) { let s = fs.readFileSync(f, "utf8"); s = s.replace(/\?v=[A-Za-z0-9]+/g, "?v=" + V).replace(/ielts-[A-Za-z0-9]+"/, "ielts-" + V + '"'); fs.writeFileSync(f, s); }
console.log("version", V);
