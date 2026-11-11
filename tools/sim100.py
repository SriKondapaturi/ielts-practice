"""100 simulated users against the site. Each user gets a fresh browser context (clean storage), a random device
and a random scenario. Findings are recorded with a severity and written to shots/sim100-report.md.
Run: python3 tools/sim100.py [seed]
"""
import asyncio, json, random, subprocess, sys, os, time, traceback
from playwright.async_api import async_playwright

PORT = 8780
ROOT = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(ROOT, "shots")
os.makedirs(OUT, exist_ok=True)
SEED = int(sys.argv[1]) if len(sys.argv) > 1 else 8
rnd = random.Random(SEED)
BASE = f"http://127.0.0.1:{PORT}/index.html"

DEVICES = [("laptop", 1366, 768), ("desktop", 1536, 864), ("macbook", 1440, 900), ("iphone", 390, 844), ("android", 412, 915), ("ipad", 820, 1180), ("small-laptop", 1280, 720)]
NAMES = ["Neha", "Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Ananya", "Karthik", "Divya", "Rohan", "Meera", "Sai", "Lakshmi", "Aditya", "Pooja", "Nikhil", "Shreya", "Varun", "Kavya", "Harsha"]

findings = []  # dict(sev, user, area, msg)
def add(sev, user, area, msg): findings.append(dict(sev=sev, user=user, area=area, msg=msg)); print(f"[{sev}] U{user} {area}: {msg}")

FILL_JS = """async ([mod, tid, strategy, seed]) => {
  const T = mod==='reading' ? window.READING_TESTS : window.LISTENING_TESTS; const t = T.find(x=>x.id===tid);
  const scope = window.__simScope || 'full'; const units = (mod==='reading' ? t.passages : t.parts).filter(u => scope==='full' || 'P'+u.number===scope);
  let s = seed; const rand = () => { s = (s*9301+49297)%233280; return s/233280; };
  const wrongWord = ['banana','seven','house','blue','xyz','1999','the mesh','not given'];
  let expectedCorrect = 0, answered = 0, wrongList = [];
  for (const u of units) {
    const tabs = document.querySelectorAll('.navbar .ptab .pname'); if (tabs[u.number-1]) { tabs[u.number-1].click(); await new Promise(r=>setTimeout(r,40)); }
    for (const g of u.questionGroups) {
      if (g.type==='mcq-multi') { if (strategy!=='correct' && strategy!=='variant') continue; const letters = (strategy==='correct'||strategy==='variant') ? g.answer : [g.answer[0], 'A','B','C','D','E'].slice(0, g.answer.length); letters.forEach(L=>{ const cb=document.querySelector(`input[data-multi="multi${g.range[0]}"][value="${L}"]`); if (cb && !cb.checked) cb.click(); }); if (strategy==='correct'||strategy==='variant') expectedCorrect += g.answer.length; continue; }
      for (const q of g.questions) {
        const ans = Array.isArray(q.answer)? q.answer[0] : q.answer;
        let mode = strategy==='random' ? 'wrong' : strategy; if (strategy==='partial') mode = rand() < 0.6 ? 'correct' : (rand()<0.5 ? 'wrong' : 'blank'); if (strategy==='variant') mode = 'variant';
        if (mode==='blank') continue;
        let val = ans;
        if (mode==='wrong') { val = wrongWord[Math.floor(rand()*wrongWord.length)]; }
        if (mode==='variant') { val = rand()<0.5 ? ans.toUpperCase() : ('  ' + ans + '  '); }
        const radio = document.querySelector(`input[type=radio][name="q${q.n}"]`);
        if (radio) { const opts=[...document.querySelectorAll(`input[type=radio][name="q${q.n}"]`)]; let pick = opts.find(o=>o.value===ans); if (mode==='wrong') pick = opts.find(o=>o.value!==ans) || pick; if (mode==='variant') pick = opts.find(o=>o.value===ans); pick.click(); answered++; if (pick.value===ans) expectedCorrect++; else wrongList.push(q.n); continue; }
        const sel = document.querySelector(`select[data-q="${q.n}"]`);
        if (sel) { const opts=[...sel.options].map(o=>o.value).filter(Boolean); let v = ans; if (mode==='wrong') v = opts.find(o=>o!==ans) || ans; if (mode==='variant') v = ans; sel.value = v; sel.dispatchEvent(new Event('change')); answered++; if (v===ans) expectedCorrect++; else wrongList.push(q.n); continue; }
        const inp = document.querySelector(`input[type=text][data-q="${q.n}"]`);
        if (inp) { inp.value = val; inp.dispatchEvent(new Event('input')); answered++; if (mode==='correct'||mode==='variant') expectedCorrect++; else wrongList.push(q.n); continue; }
        return { error: 'no input for q'+q.n };
      }
    }
  }
  return { expectedCorrect, answered, wrongList };
}"""

async def probe_layout(page, user, area):
    r = await page.evaluate("""() => { const d=document.documentElement; const over = d.scrollWidth > d.clientWidth + 2; const small=[...document.querySelectorAll('button, a.btn, a.nav, .mobilebar a')].filter(b=>{ const r=b.getBoundingClientRect(); return r.width>0 && r.height>0 && r.height<30; }).length; const clipped=[...document.querySelectorAll('.t > b, .module h2, h1')].filter(e=>e.scrollWidth>e.clientWidth+2).length; return {over, small, clipped, w:d.clientWidth}; }""")
    if r["over"]: add("warning", user, area, f"horizontal overflow at {r['w']}px wide")
    if r["small"] > 0 and r["w"] < 500: add("warning", user, area, f"{r['small']} tap targets under 32px tall on a phone")
    if r["clipped"]: add("warning", user, area, f"{r['clipped']} headings clipped")

async def run_user(browser, user):
    dev = rnd.choice(DEVICES); name = rnd.choice(NAMES)
    ctx = await browser.new_context(viewport={"width": dev[1], "height": dev[2]}, is_mobile=dev[1] < 500, has_touch=dev[1] < 900)
    page = await ctx.new_page()
    await page.add_init_script("sessionStorage.setItem('ielts_skip_signin','1')")
    await page.add_init_script("""window.SpeechRecognition = window.webkitSpeechRecognition = class { start(){ const n = window.__simAnswerWords||30; const words='I think this is really interesting because it helps people in many ways and for example last year my cousin did the same thing and it changed how she works'.split(' '); const txt = Array.from({length:n},(_,i)=>words[i%words.length]).join(' '); this._t=setTimeout(()=>{ this.onresult && this.onresult({resultIndex:0, results:[Object.assign([{transcript: txt}],{isFinal:true})]}); }, 250); } stop(){ clearTimeout(this._t); this.onend && this.onend(); } };
      navigator.mediaDevices.getUserMedia = async () => { const ctx = new AudioContext(); return ctx.createMediaStreamDestination().stream; };""")
    errs = []
    page.on("pageerror", lambda e: errs.append("pageerror: " + str(e)[:200]))
    page.on("console", lambda m: errs.append("console.error: " + m.text[:200]) if m.type == "error" and "favicon" not in m.text and "fonts.g" not in m.text else None)
    scenario = rnd.choice(["reading_full", "reading_full", "reading_part", "listening_full", "listening_part", "writing_full", "writing_drill", "speaking_live", "targets", "progress_ops", "navigation", "display", "signin_form", "timer", "variants", "mobile_tour", "reading_full"])
    strategy = rnd.choice(["correct", "random", "blank", "partial", "variant", "correct"])
    area = f"{scenario}/{strategy}/{dev[0]}"
    t0 = time.time()
    try:
        await page.goto(BASE + "#home"); await page.wait_for_timeout(500)
        await page.evaluate(f"IELTS.settings.name = {json.dumps(name)}; IELTS.saveSettings();")
        load = await page.evaluate("Math.round(performance.getEntriesByType('navigation')[0].duration)")
        if load > 2500: add("warning", user, area, f"first load {load} ms")
        await probe_layout(page, user, "home")
        if scenario in ("reading_full", "reading_part", "listening_full", "listening_part", "variants", "timer"):
            mod = "listening" if scenario.startswith("listening") else "reading"
            if scenario == "variants": strategy = "variant"
            T = await page.evaluate(f"window.{'READING' if mod=='reading' else 'LISTENING'}_TESTS.map(t=>t.id)")
            tid = rnd.choice(T); scope = "full" if scenario.endswith("full") or scenario in ("variants", "timer") else rnd.choice(["P1", "P2", "P3"] + (["P4"] if mod == "listening" else []))
            await page.evaluate(f"IELTS.state.examLeaveOk=true; IELTS.go('{mod}-instr', {{testId:'{tid}', scope:'{scope}'}})"); await page.wait_for_timeout(250)
            if not await page.locator("#start").count(): add("error", user, area, "instruction screen has no Start button"); return
            if scenario == "timer":
                await page.evaluate("const P=IELTS.Timer.prototype._tick; IELTS.Timer.prototype._tick=function(){ this.remaining -= 60; P.call(this); }")
            await page.click("#start"); await page.wait_for_timeout(2800 if mod == "listening" else 400)
            if await page.locator(".modal-bg").count(): await page.click(".modal .btn")
            await probe_layout(page, user, f"{mod} exam")
            if scenario == "timer":
                for _ in range(90):
                    if "-results" in page.url: break
                    await page.wait_for_timeout(500)
                url = page.url
                if "-results" not in url: add("error", user, area, f"timer did not auto-submit, still at {url.split('#')[-1]}")
                else:
                    txt = await page.inner_text("body")
                    if "auto-submitted" not in txt and "Time" not in txt: add("warning", user, area, "no auto-submit notice on results")
                return
            await page.evaluate(f"window.__simScope={json.dumps(scope)}"); res = await page.evaluate(FILL_JS, [mod, tid, strategy, user * 7 + 3])
            if "error" in res: add("error", user, area, res["error"]); return
            await page.click("text=Finish"); await page.wait_for_timeout(200)
            if await page.locator(".modal .btn.primary").count(): await page.click(".modal .btn.primary")
            await page.wait_for_timeout(700)
            if "-results" not in page.url: add("error", user, area, "Finish did not reach results"); return
            a = await page.evaluate("IELTS.getAttempts().slice(-1)[0]")
            if not a: add("error", user, area, "no attempt saved"); return
            total = 40 if scope == "full" else len([r for r in a["results"]])
            if a["raw"] != res["expectedCorrect"]: add("error", user, area, f"{tid} {scope}: raw {a['raw']} but expected {res['expectedCorrect']} (strategy {strategy})")
            if scope == "full" and a["raw"] == 40 and a["band"] != 9: add("error", user, area, "40/40 not band 9")
            if scope == "full":
                band_expected = await page.evaluate(f"IELTS.bandFor({a['raw']}, '{mod}')")
                if a["band"] != band_expected: add("error", user, area, f"band {a['band']} vs table {band_expected}")
            wrong_in_log = await page.evaluate("IELTS.getAttempts().slice(-1)[0].results.filter(r=>!r.correct).length")
            if wrong_in_log != (len(a["results"]) - a["raw"]): add("error", user, area, "results/raw mismatch")
            await probe_layout(page, user, f"{mod} results")
            if mod == "reading" and rnd.random() < 0.5:
                if await page.locator("#review").count(): await page.click("#review"); await page.wait_for_timeout(400); await probe_layout(page, user, "reading review")
                else: add("warning", user, area, "no 'Review in passage' button on results")
        elif scenario == "writing_full":
            tid = rnd.choice([f"W{i}" for i in range(1, 9)])
            await page.evaluate(f"IELTS.state.examLeaveOk=true; IELTS.go('writing-instr', {{testId:'{tid}', scope:'full'}})"); await page.wait_for_timeout(250)
            await page.click("#start"); await page.wait_for_timeout(400)
            await probe_layout(page, user, "writing exam")
            n1 = rnd.choice([0, 80, 150, 190]); n2 = rnd.choice([0, 120, 250, 320])
            await page.fill("textarea", ("The chart shows " + "data ") * (n1 // 2) if n1 else "")
            wc = await page.locator(".wc").inner_text()
            got = int("".join(ch for ch in wc.split("word")[0] if ch.isdigit()) or 0)
            if abs(got - (n1 and (n1 // 2) * 4)) > 3 and n1: add("warning", user, area, f"word count shows {got} for ~{(n1//2)*4} words")
            await page.click(".wtabs button[data-k=task2]"); await page.wait_for_timeout(150)
            await page.fill("textarea", ("Many people believe " + "that ") * (n2 // 2) if n2 else "")
            await page.click("text=Finish"); await page.wait_for_timeout(200)
            if await page.locator(".modal .btn.primary").count(): await page.click(".modal .btn.primary")
            await page.wait_for_timeout(800)
            if "writing-mark" not in page.url: add("error", user, area, "did not reach marking page"); return
            txt = await page.locator("#markarea").inner_text()
            if "Copy marking prompt" not in await page.inner_text("body"): add("error", user, area, "no copy-prompt fallback when marking unavailable")
            a = await page.evaluate("IELTS.getAttempts().slice(-1)[0]")
            if a["module"] != "writing": add("error", user, area, "writing attempt not saved")
            if rnd.random() < 0.5:
                if await page.locator("#manual").count():
                    await page.click("#manual"); await page.wait_for_timeout(200)
                    for k in ["TA", "CC", "LR", "GRA"]:
                        await page.fill(f".modal input[data-k={k}]", str(rnd.choice([5.5, 6, 6.5, 7])))
                    if await page.locator(".modal .btn.primary").count(): await page.click(".modal .btn.primary"); await page.wait_for_timeout(400)
                    b = await page.evaluate("IELTS.getAttempts().slice(-1)[0].band")
                    if not b: add("error", user, area, "manual bands did not set a band")
                else: add("warning", user, area, "no 'Enter bands manually' option")
            await probe_layout(page, user, "writing marking")
        elif scenario == "writing_drill":
            kind = rnd.choice(["intro", "body", "overview"])
            await page.evaluate(f"IELTS.state.examLeaveOk=true; IELTS.go('writing-drill', {{kind:'{kind}'}})"); await page.wait_for_timeout(400)
            if not await page.locator("textarea").count(): add("error", user, area, f"drill {kind} has no textarea"); return
            await page.fill("textarea", "Some people think that " + "idea " * 40)
            await probe_layout(page, user, f"drill {kind}")
            btn = page.locator("text=Finish")
            if await btn.count(): await btn.first.click(); await page.wait_for_timeout(300);
            if await page.locator(".modal .btn.primary").count(): await page.click(".modal .btn.primary"); await page.wait_for_timeout(500)
        elif scenario == "speaking_live":
            sid = rnd.choice([f"S{i}" for i in range(1, 9)])
            await page.evaluate(f"window.__simAnswerWords = {rnd.choice([0, 4, 25, 60])}")
            await page.evaluate(f"IELTS.state.examLeaveOk=true; IELTS.go('speaking-live-instr', {{id:'{sid}'}})"); await page.wait_for_timeout(300)
            await page.click("#start"); await page.wait_for_timeout(1200)
            for _ in range(60):
                if "speaking-live-results" in page.url: break
                try: await page.click("text=Next", timeout=600)
                except Exception: pass
                await page.wait_for_timeout(900)
            if "speaking-live-results" not in page.url: add("error", user, area, "live speaking did not reach results"); return
            a = await page.evaluate("IELTS.getAttempts().slice(-1)[0]")
            if a["module"] != "speaking" or not isinstance(a.get("transcript"), list): add("error", user, area, "speaking attempt malformed")
            body = await page.inner_text("body")
            if "Copy marking prompt" not in body: add("error", user, area, "no copy-prompt on speaking results")
            await probe_layout(page, user, "speaking results")
        elif scenario == "targets":
            await page.evaluate("IELTS.state.examLeaveOk=true; IELTS.go('targets')"); await page.wait_for_timeout(300)
            pid = rnd.choice(["uni65", "uni70", "clb9", "health", "neha", "eight", "custom"])
            await page.click(f".preset[data-id={pid}]"); await page.wait_for_timeout(100)
            if pid == "custom":
                await page.evaluate("document.querySelectorAll('.sliders input').forEach((s,i)=>{ s.value = [6,7.5,5.5,9][i]; s.dispatchEvent(new Event('input')); })")
            await page.click("#save"); await page.wait_for_timeout(500)
            t = await page.evaluate("({l:IELTS.TARGETS.listening, r:IELTS.TARGETS.reading, w:IELTS.TARGETS.writing, s:IELTS.TARGETS.speaking, saved: IELTS.settings.targets})")
            if not t["saved"]: add("error", user, area, "targets not saved")
            if pid == "custom" and (t["l"], t["r"], t["w"], t["s"]) != (6, 7.5, 5.5, 9): add("error", user, area, f"custom targets wrong: {t}")
            if "#home" not in page.url: add("warning", user, area, "did not return home after saving targets")
            pos = await page.evaluate("[...document.querySelectorAll('.bandline .goal')].map(g=>g.style.left)")
            if len(pos) != 4: add("error", user, area, "band line missing target markers")
            await probe_layout(page, user, "home after targets")
        elif scenario == "progress_ops":
            await page.evaluate("""async () => { const now=Date.now(); for (let i=0;i<4;i++) await IELTS.saveAttempt({id:'sim'+i, module:['reading','listening','writing','speaking'][i], testId:'X'+i, testTitle:'Sim '+i, scope:'full', raw: i<2?30:undefined, band: 6.5+i*0.5, date: now-i*86400000, results: i<2 ? [{n:1,type:'tfng',given:'TRUE',expected:'FALSE',correct:false},{n:2,type:'tfng',given:'TRUE',expected:'TRUE',correct:true}] : [], criteria: i==2?{TA:6,CC:6,LR:7,GRA:6.5}:undefined, marking: i==2?{tasks:[{task:2,corrections:[{original:'a',corrected:'b',note:'c'}]}]}:undefined}); }""")
            await page.evaluate("IELTS.state.examLeaveOk=true; IELTS.go('progress')"); await page.wait_for_timeout(500)
            cnt = await page.locator("#errcount").inner_text()
            if not cnt.startswith("3 to review"): add("error", user, area, f"error log count '{cnt}', expected 3 (2 wrong answers + 1 correction)")
            await page.click("#errlog input[type=checkbox] >> nth=0"); await page.wait_for_timeout(200)
            cnt2 = await page.locator("#errcount").inner_text()
            if not cnt2.startswith("2 to review"): add("error", user, area, f"review tick did not update count: '{cnt2}'")
            n0 = await page.locator("#list tr").count()
            await page.click("#list [data-del] >> nth=0"); await page.wait_for_timeout(150)
            if await page.locator(".modal").count(): await page.click(".modal .btn.danger, .modal .btn.primary"); await page.wait_for_timeout(300)
            n1 = await page.locator("#list tr").count()
            if n1 >= n0: add("error", user, area, "delete attempt did not remove a row")
            await probe_layout(page, user, "progress")
        elif scenario == "navigation":
            await page.evaluate("IELTS.state.examLeaveOk=true; IELTS.go('reading-instr', {testId:'R1', scope:'full'})"); await page.wait_for_timeout(200)
            await page.click("#start"); await page.wait_for_timeout(300)
            await page.go_back(); await page.wait_for_timeout(300)
            if await page.locator(".modal").count() == 0: add("error", user, area, "Back during a test showed no Leave prompt")
            else: await page.click(".modal .btn.primary"); await page.wait_for_timeout(300)
            if not await page.evaluate("!!localStorage.getItem('ielts_draft')"): add("error", user, area, "no draft saved after leaving a test")
            for r in ["#listening", "#writing", "#speaking", "#progress", "#plan", "#ideas", "#home", "#nonexistent-route"]:
                await page.goto(BASE + r); await page.wait_for_timeout(250)
                if await page.evaluate("document.querySelector('#app').children.length === 0"): add("error", user, area, f"blank page at {r}")
            await page.reload(); await page.wait_for_timeout(500)
            if await page.evaluate("document.querySelector('#app').children.length === 0"): add("error", user, area, "blank after reload")
        elif scenario == "display":
            await page.evaluate("IELTS.state.examLeaveOk=true; IELTS.go('reading-instr', {testId:'R2', scope:'full'})"); await page.wait_for_timeout(200)
            await page.click("#start"); await page.wait_for_timeout(300)
            for size, scheme in [("large", "wb"), ("xl", "yb"), ("regular", "by"), ("regular", "std")]:
                await page.click("text=Settings"); await page.wait_for_timeout(150)
                await page.click(f"input[name=ts][value={size}]"); await page.click(f"input[name=cs][value={scheme}]"); await page.click(".modal #ok"); await page.wait_for_timeout(150)
                cls = await page.evaluate("document.documentElement.className")
                if (size != "regular" and f"ts-{size}" not in cls) or (scheme != "std" and f"cs-{scheme}" not in cls): add("error", user, area, f"display {size}/{scheme} not applied: '{cls}'")
                await probe_layout(page, user, f"exam {size}/{scheme}")
                contrast = await page.evaluate("getComputedStyle(document.querySelector('.passage p')).color + ' on ' + getComputedStyle(document.querySelector('.pane')).backgroundColor")
                if scheme in ("wb", "yb") and "rgb(0, 0, 0)" in contrast.split(" on ")[1] and "255" not in contrast.split(" on ")[0] and "230" not in contrast.split(" on ")[0]: add("error", user, area, f"unreadable text in {scheme}: {contrast}")
        elif scenario == "signin_form":
            await page.evaluate("sessionStorage.removeItem('ielts_skip_signin'); IELTS.go('signin')"); await page.wait_for_timeout(400)
            if not await page.locator("#go").count(): add("error", user, area, "sign-in form missing"); return
            await page.click("#go"); await page.wait_for_timeout(200)
            st = await page.locator("#status").inner_text()
            if "email" not in st.lower(): add("error", user, area, f"empty sign-in gave no validation message: '{st}'")
            await page.click(".seg button[data-m=up]"); await page.wait_for_timeout(100)
            await page.fill("#em", "test@example.com"); await page.fill("#pw", "short"); await page.click("#go"); await page.wait_for_timeout(200)
            st = await page.locator("#status").inner_text()
            if "name" not in st.lower() and "8" not in st: add("error", user, area, f"create-account validation weak: '{st}'")
            await page.fill("#nm", "Test User"); await page.click("#go"); await page.wait_for_timeout(200)
            st = await page.locator("#status").inner_text()
            if "8" not in st: add("error", user, area, f"short password accepted: '{st}'")
            await probe_layout(page, user, "sign-in")
            await page.click("#skip"); await page.wait_for_timeout(400)
            if "#home" not in page.url: add("error", user, area, "guest link did not open home")
        elif scenario == "mobile_tour":
            for r in ["#home", "#listening", "#reading", "#writing", "#speaking", "#progress", "#plan", "#targets"]:
                await page.goto(BASE + r); await page.wait_for_timeout(350)
                await probe_layout(page, user, f"tour {r}")
                ms = await page.evaluate("Math.max(...[...document.querySelectorAll('.testlist .t, .module, .card')].map(e=>e.scrollWidth - e.clientWidth))")
                if ms and ms > 4: add("warning", user, area, f"card content overflows by {ms}px at {r}")
            if dev[1] < 900:
                vis = await page.evaluate("getComputedStyle(document.querySelector('.mobilebar')).display")
                if vis == "none": add("error", user, area, "bottom tab bar hidden on phone")
        dt = time.time() - t0
        if dt > 40: add("warning", user, area, f"scenario took {dt:.0f}s")
    except Exception as e:
        add("error", user, area, f"exception: {str(e)[:160]}")
        try: await page.screenshot(path=f"{OUT}/sim-fail-{user}.png")
        except Exception: pass
    for e in errs: add("error", user, area, e)
    await ctx.close()

async def main():
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
            for u in range(1, 101):
                await run_user(browser, u)
            await browser.close()
    finally:
        srv.terminate()
    sev = {"error": [], "warning": [], "note": []}
    for f in findings: sev[f["sev"]].append(f)
    lines = [f"# Simulation of 100 users (seed {SEED})", "", f"Errors: {len(sev['error'])} · Warnings: {len(sev['warning'])} · Notes: {len(sev['note'])}", ""]
    for s in ["error", "warning", "note"]:
        lines.append(f"## {s.title()}s");
        seen = {}
        for f in sev[s]: key = f["msg"].split(" at ")[0][:90]; seen.setdefault(key, []).append(f)
        for key, fs in sorted(seen.items(), key=lambda kv: -len(kv[1])): lines.append(f"- ({len(fs)}×) {fs[0]['msg']}  — e.g. U{fs[0]['user']} {fs[0]['area']}")
        lines.append("")
    open(os.path.join(OUT, "sim100-report.md"), "w").write("\n".join(lines))
    print("\n".join(lines))

asyncio.run(main())
