import asyncio, json, subprocess, time, sys, os
from playwright.async_api import async_playwright

PORT = 8765
ROOT = os.path.join(os.path.dirname(__file__), "..")
SHOTS = os.path.join(os.path.dirname(__file__), "..", "shots")
os.makedirs(SHOTS, exist_ok=True)

async def main():
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    errors = []
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
            page = await browser.new_page(viewport={"width": 1366, "height": 800})
            await page.add_init_script("sessionStorage.setItem('ielts_skip_signin','1')")
            page.on("pageerror", lambda e: errors.append("PAGEERROR: " + str(e)))
            page.on("console", lambda m: errors.append("CONSOLE " + m.type + ": " + m.text) if m.type in ("error",) else None)
            base = f"http://127.0.0.1:{PORT}/index.html"
            await page.goto(base); await page.wait_for_timeout(500)
            await page.screenshot(path=f"{SHOTS}/01-home.png", full_page=True)
            print("home modules:", await page.locator(".module").count())

            # ---------- READING: run every test, answer everything correctly via the data, check 40/40 ----------
            n_tests = await page.evaluate("window.READING_TESTS.length")
            for i in range(n_tests):
                tid = await page.evaluate(f"window.READING_TESTS[{i}].id")
                await page.goto(base + "#reading"); await page.wait_for_timeout(200)
                await page.evaluate(f"IELTS.go('reading-instr', {{testId:'{tid}', scope:'full'}})"); await page.wait_for_timeout(200)
                await page.click("#start"); await page.wait_for_timeout(400)
                if i == 0:
                    await page.screenshot(path=f"{SHOTS}/02-reading-exam.png")
                # fill correct answers for all groups by driving the UI for each passage
                res = await page.evaluate("""async (tid) => {
                  const t = window.READING_TESTS.find(x=>x.id===tid);
                  const fill = async (ps) => {
                    document.querySelectorAll('.navbar .ptab .pname')[ps.number-1].click();
                    await new Promise(r=>setTimeout(r,50));
                    for (const g of ps.questionGroups) {
                      if (g.type==='mcq-multi') { g.answer.forEach(L=>{ const cb=document.querySelector(`input[data-multi="multi${g.range[0]}"][value="${L}"]`); cb.click(); }); continue; }
                      for (const q of g.questions) {
                        const ans = Array.isArray(q.answer)? q.answer[0] : q.answer;
                        const radio = document.querySelector(`input[type=radio][name="q${q.n}"][value="${ans}"]`);
                        if (radio) { radio.click(); continue; }
                        const sel = document.querySelector(`select[data-q="${q.n}"]`);
                        if (sel) { sel.value = ans; sel.dispatchEvent(new Event('change')); if (sel.value!==ans) return 'select value missing q'+q.n+' '+ans; continue; }
                        const inp = document.querySelector(`input[type=text][data-q="${q.n}"]`);
                        if (inp) { inp.value = ans; inp.dispatchEvent(new Event('input')); continue; }
                        return 'no input for q'+q.n;
                      }
                    }
                    return null;
                  };
                  for (const ps of t.passages) { const e = await fill(ps); if (e) return e; }
                  return document.querySelectorAll('.navbar .num.done').length + ' answered in current part';
                }""", tid)
                print(tid, "fill:", res)
                # finish
                await page.click("text=Finish"); await page.wait_for_timeout(200)
                await page.click(".modal .btn.primary"); await page.wait_for_timeout(600)
                score = await page.locator(".score .sc .v").first.inner_text()
                band = await page.locator(".score .sc .v").nth(1).inner_text()
                print(tid, "score:", score, "band:", band)
                if score.strip() != "40 / 40": errors.append(f"{tid} expected 40/40 got {score}")
                if i == 0:
                    await page.screenshot(path=f"{SHOTS}/03-reading-results.png", full_page=True)
                    await page.click("#review"); await page.wait_for_timeout(400)
                    await page.screenshot(path=f"{SHOTS}/04-reading-review.png")

            # wrong-answer marking sanity: run R1 passage 1 with deliberately wrong + variant answers
            await page.evaluate("IELTS.go('reading-instr', {testId:'R1', scope:'P1'})"); await page.wait_for_timeout(200)
            await page.click("#start"); await page.wait_for_timeout(300)
            await page.evaluate("""() => {
              const set=(n,v)=>{const i=document.querySelector(`input[type=text][data-q="${n}"]`); i.value=v; i.dispatchEvent(new Event('input'));};
              document.querySelector('input[name="q1"][value="FALSE"]').click();
              set(7,'the wind'); set(8,'Mesh'); set(9,'gutter.'); set(10,'storage tanks'); set(11,'Maintenance'); set(12,'Five'); set(13,'5');
            }""")
            await page.click("text=Finish"); await page.click(".modal .btn.primary"); await page.wait_for_timeout(500)
            rows = await page.evaluate("Array.from(document.querySelectorAll('.rtable tr')).slice(1).map(tr=>Array.from(tr.children).map(td=>td.innerText))")
            print("P1 marking sample:", rows[:13])

            # ---------- TIMER: warnings + auto submit ----------
            await page.evaluate("IELTS.go('reading-instr', {testId:'R1', scope:'P1'})"); await page.wait_for_timeout(200)
            await page.click("#start"); await page.wait_for_timeout(300)
            # shrink timer: find Timer instance via a hack: speed by setting remaining through onTick closure not accessible -> use prototype patch
            await page.evaluate("""() => { const T = IELTS.Timer.prototype; const orig = T._tick; T._tick = function(){ this.remaining = Math.min(this.remaining, 601); if (this._fast) this.remaining -= 60; this._fast = true; orig.call(this); }; }""")
            await page.wait_for_timeout(1500)
            warn = await page.locator(".timewarn").count()
            tcls = await page.locator(".topbar .timer").get_attribute("class")
            print("warning shown:", warn, "timer class:", tcls)
            await page.screenshot(path=f"{SHOTS}/05-timer-warning.png")
            await page.wait_for_timeout(4000)
            url = page.url
            print("after timeout url:", url, "auto:", await page.locator("text=auto-submitted").count())
            if "reading-results" not in url: errors.append("auto-submit did not navigate to results")
            await page.goto(base + "#writing"); await page.reload(); await page.wait_for_timeout(600)

            # ---------- WRITING ----------
            await page.screenshot(path=f"{SHOTS}/06-writing-menu.png", full_page=True)
            for i in range(await page.evaluate("window.WRITING_TESTS.length")):
                tid = f"W{i+1}"
                await page.evaluate(f"IELTS.go('writing-instr', {{testId:'{tid}', scope:'full'}})"); await page.wait_for_timeout(200)
                await page.click("#start"); await page.wait_for_timeout(400)
                await page.screenshot(path=f"{SHOTS}/07-writing-{tid}-task1.png")
            await page.fill("textarea", "The graph shows " + "word " * 160)
            wc = await page.locator(".wc").inner_text(); print("word count:", wc)
            await page.click(".wtabs button[data-k=task2]"); await page.wait_for_timeout(200)
            await page.fill("textarea", "Essay " + "text " * 260)
            await page.click("text=Finish"); await page.wait_for_timeout(200); await page.click(".modal .btn.primary"); await page.wait_for_timeout(800)
            await page.screenshot(path=f"{SHOTS}/08-writing-mark.png", full_page=True)
            print("marking area:", (await page.locator("#markarea").inner_text())[:200])
            # drill
            await page.evaluate("IELTS.go('writing-drill', {kind:'intro'})"); await page.wait_for_timeout(300)
            await page.screenshot(path=f"{SHOTS}/09-drill-intro.png")
            await page.evaluate("IELTS.go('writing-drill', {kind:'overview'})"); await page.wait_for_timeout(300)
            await page.screenshot(path=f"{SHOTS}/10-drill-overview.png")

            # ---------- LISTENING (no voices in headless: check fallback + marking) ----------
            await page.goto(base + "#listening"); await page.wait_for_timeout(600)
            await page.screenshot(path=f"{SHOTS}/11-listening-menu.png", full_page=True)
            for i in range(await page.evaluate("window.LISTENING_TESTS.length")):
                tid = f"L{i+1}"
                await page.evaluate(f"IELTS.go('listening-instr', {{testId:'{tid}', scope:'full'}})"); await page.wait_for_timeout(200)
                await page.click("#start"); await page.wait_for_timeout(3200)
                # dismiss no-voices modal if present
                if await page.locator(".modal-bg").count(): await page.click(".modal .btn")
                if i == 0: await page.screenshot(path=f"{SHOTS}/12-listening-exam.png")
                res = await page.evaluate("""async (tid) => {
                  const t = window.LISTENING_TESTS.find(x=>x.id===tid);
                  for (const pt of t.parts) {
                    document.querySelectorAll('.navbar .ptab .pname')[pt.number-1].click(); await new Promise(r=>setTimeout(r,50));
                    for (const g of pt.questionGroups) {
                      if (g.type==='mcq-multi') { g.answer.forEach(L=>document.querySelector(`input[data-multi="multi${g.range[0]}"][value="${L}"]`).click()); continue; }
                      for (const q of g.questions) {
                        const ans = Array.isArray(q.answer)? q.answer[0] : q.answer;
                        const radio = document.querySelector(`input[type=radio][name="q${q.n}"][value="${ans}"]`); if (radio) { radio.click(); continue; }
                        const sel = document.querySelector(`select[data-q="${q.n}"]`); if (sel) { sel.value = ans; sel.dispatchEvent(new Event('change')); if (sel.value!==ans) return 'select missing q'+q.n; continue; }
                        const inp = document.querySelector(`input[type=text][data-q="${q.n}"]`); if (inp) { inp.value = ans; inp.dispatchEvent(new Event('input')); continue; }
                        return 'no input q'+q.n;
                      }
                    }
                  }
                  return 'ok';
                }""", tid)
                await page.click("text=Finish"); await page.wait_for_timeout(200); await page.click(".modal .btn.primary"); await page.wait_for_timeout(600)
                score = await page.locator(".score .sc .v").first.inner_text()
                print(tid, "fill:", res, "score:", score)
                if score.strip() != "40 / 40": errors.append(f"{tid} expected 40/40 got {score}")
            await page.click("#transcript"); await page.wait_for_timeout(200)
            await page.screenshot(path=f"{SHOTS}/13-listening-results.png", full_page=True)
            # speech prep check
            print("prep:", await page.evaluate("Speech.prep('That is O-K-O-N-E-D-O, number 0-7-7-2-4, 5-0-9, 3-1-8, at 8.30, costs £95, postcode G-L-5, 2-R-T.')"))

            # ---------- SPEAKING ----------
            await page.goto(base + "#speaking"); await page.wait_for_timeout(300)
            await page.screenshot(path=f"{SHOTS}/14-speaking-menu.png", full_page=True)
            await page.evaluate("IELTS.go('speaking-set', {id:'S1'})"); await page.wait_for_timeout(300)
            await page.click("#go"); await page.click("#go"); await page.wait_for_timeout(200)
            await page.click("#prep"); await page.wait_for_timeout(1500)
            print("prep timer:", await page.locator("#t").inner_text())
            await page.screenshot(path=f"{SHOTS}/15-speaking-part2.png", full_page=True)
            plen = await page.evaluate("(() => { const s = window.SPEAKING_SETS[0]; return 1; })()")

            # ---------- PROGRESS ----------
            await page.goto(base + "#progress"); await page.wait_for_timeout(400)
            await page.screenshot(path=f"{SHOTS}/16-progress.png", full_page=True)
            print("attempts:", await page.evaluate("IELTS.getAttempts().length"))


            # ---------- NEW: drag and drop, display settings ----------
            await page.goto(base + "#reading"); await page.wait_for_timeout(200)
            await page.evaluate("IELTS.go('reading-instr', {testId:'R1', scope:'full'})"); await page.wait_for_timeout(200)
            await page.click("#start"); await page.wait_for_timeout(400)
            dd = await page.evaluate("""() => {
              // find a passage with a drag group
              const t = window.READING_TESTS[0];
              for (const ps of t.passages) { document.querySelectorAll('.navbar .ptab .pname')[ps.number-1].click(); const opt = document.querySelector('.dragopt'); if (opt) {
                const sel = document.querySelector('.gap select'); const L = opt.dataset.letter; const zone = sel.closest('.q') || sel.closest('.gap');
                const dt = new DataTransfer(); dt.setData('text/plain', L);
                opt.dispatchEvent(new DragEvent('dragstart', {dataTransfer: dt, bubbles:true}));
                zone.dispatchEvent(new DragEvent('dragover', {dataTransfer: dt, bubbles:true, cancelable:true}));
                zone.dispatchEvent(new DragEvent('drop', {dataTransfer: dt, bubbles:true, cancelable:true}));
                return {letter: L, selected: sel.value, q: sel.dataset.q, done: document.querySelectorAll('.navbar .num.done').length};
              } }
              return 'no drag group';
            }""")
            print("drag-drop:", dd)
            if not isinstance(dd, dict) or dd["letter"] != dd["selected"]: errors.append(f"drag-drop failed: {dd}")
            await page.click("text=Settings"); await page.wait_for_timeout(200)
            await page.click("input[name=ts][value=large]"); await page.click("input[name=cs][value=yb]"); await page.wait_for_timeout(100)
            cls = await page.evaluate("document.documentElement.className")
            print("display classes:", cls)
            if "ts-large" not in cls or "cs-yb" not in cls: errors.append("display settings not applied")
            await page.screenshot(path=f"{SHOTS}/21-reading-yellow-large.png")
            await page.click(".modal #ok"); await page.click("text=Settings"); await page.click("input[name=ts][value=regular]"); await page.click("input[name=cs][value=std]"); await page.click(".modal #ok")

            # ---------- NEW: live speaking examiner with mocked speech recognition and microphone ----------
            await page.add_init_script("""
              window.SpeechRecognition = window.webkitSpeechRecognition = class { constructor(){ this.continuous=true; } start(){ this._t=setTimeout(()=>{ const txt='I come from a small town near the coast and I have lived there for most of my life because my family runs a business there.'; const ev={resultIndex:0, results:[Object.assign([{transcript: txt}],{isFinal:true})]}; this.onresult && this.onresult(ev); }, 300); } stop(){ clearTimeout(this._t); this.onend && this.onend(); } };
              navigator.mediaDevices.getUserMedia = async () => { const ctx = new AudioContext(); const dst = ctx.createMediaStreamDestination(); return dst.stream; };
              // make the examiner instant: no voices -> speak resolves on a short timer; shorten waits
              window.speechSynthesis.getVoices = () => [];
            """)
            await page.goto(base + "#speaking"); await page.wait_for_timeout(300)
            await page.evaluate("IELTS.go('speaking-live-instr', {id:'S1'})"); await page.wait_for_timeout(200)
            await page.screenshot(path=f"{SHOTS}/22-speaking-live-instr.png", full_page=True)
            await page.click("#start"); await page.wait_for_timeout(1500)
            # drive it: press Next repeatedly until results
            for _ in range(80):
                if "#speaking-live-results" in page.url: break
                try: await page.click("text=Next", timeout=800)
                except Exception: pass
                await page.wait_for_timeout(700)
                if _ == 6: await page.screenshot(path=f"{SHOTS}/23-speaking-live.png")
            print("speaking live url:", page.url)
            if "#speaking-live-results" not in page.url: errors.append("live speaking did not reach results")
            else:
                n = await page.evaluate("(IELTS.getAttempts('speaking').slice(-1)[0].transcript||[]).length")
                print("live transcript answers:", n)
                if n < 5: errors.append(f"live transcript too short: {n}")
                await page.screenshot(path=f"{SHOTS}/24-speaking-live-results.png", full_page=True)

            # ---------- NEW: error log ----------
            await page.goto(base + "#progress"); await page.wait_for_timeout(400)
            cnt = await page.locator("#errcount").inner_text(); print("error log:", cnt)
            if "to review" not in cnt: errors.append("error log missing")
            await page.screenshot(path=f"{SHOTS}/25-error-log.png", full_page=True)

            # ---------- MOBILE ----------
            m = await browser.new_page(viewport={"width": 390, "height": 760})
            await m.add_init_script("sessionStorage.setItem('ielts_skip_signin','1')")
            m.on("pageerror", lambda e: errors.append("MOBILE PAGEERROR: " + str(e)))
            await m.goto(base); await m.wait_for_timeout(300); await m.screenshot(path=f"{SHOTS}/17-mobile-home.png", full_page=True)
            await m.evaluate("IELTS.go('reading-instr', {testId:'R1', scope:'full'})"); await m.wait_for_timeout(200); await m.click("#start"); await m.wait_for_timeout(300)
            await m.screenshot(path=f"{SHOTS}/18-mobile-reading-q.png")
            await m.click(".mobile-switch button[data-m=passage]"); await m.wait_for_timeout(200)
            await m.screenshot(path=f"{SHOTS}/19-mobile-reading-passage.png")
            await m.evaluate("IELTS.go('writing-instr', {testId:'W3', scope:'full'})"); await m.wait_for_timeout(200); await m.click("#start"); await m.wait_for_timeout(300)
            await m.screenshot(path=f"{SHOTS}/20-mobile-writing.png")
            await browser.close()
    finally:
        srv.terminate()
    print("\nERRORS:" if errors else "\nNO ERRORS")
    for e in errors: print(" ", e)

asyncio.run(main())
