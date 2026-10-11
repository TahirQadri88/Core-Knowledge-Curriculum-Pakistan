"""Smoke test for the built app in docs/. Run after `python3 build.py`.

Needs: pip install playwright && python -m playwright install chromium
"""
import asyncio, functools, http.server, os, socketserver, sys, threading

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "docs")


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=ROOT)
    srv = socketserver.TCPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, srv.server_address[1]


async def main():
    from playwright.async_api import async_playwright
    srv, port = serve()
    fails = []

    def check(cond, msg):
        print(("PASS " if cond else "FAIL ") + msg)
        if not cond:
            fails.append(msg)

    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 400, "height": 900})
        errors = []
        pg.on("pageerror", lambda e: errors.append(str(e)))
        url = f"http://127.0.0.1:{port}/index.html"
        await pg.goto(url)
        await pg.evaluate("localStorage.clear()")
        await pg.reload()
        await pg.wait_for_timeout(500)

        check(await pg.get_attribute("#tab-books", "aria-selected") == "true", "School books is the first tab shown")
        before = await pg.locator(".ledger").count()
        await pg.locator("#addList").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".ledger").count() == before + 13, "School list adds all 13 Class 4 books in one tap")
        check("9780190706982" in await pg.inner_text("#view"), "Added books show their ISBN")
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".ledger").count() == before, "Undo removes the books just added")
        await pg.locator("#tab-track").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".row").count() > 20, "Core Knowledge rows render for the sample student")
        await pg.locator('[data-g="1"]').click()
        check(await pg.locator(".strand").count() == 2, "Grade 1 Language Arts shows both strands")
        await pg.locator('[data-open="la-1-2"]').click()
        href = await pg.locator("#d-la-1-2 a").first.get_attribute("href")
        check(href and "/free-resource/ckla-domain-02-human-body/" in href, "Details links to the unit download page")

        await pg.locator('[data-tick="la-1-1"]').check()
        await pg.reload(); await pg.wait_for_timeout(300)
        await pg.locator("#tab-track").click()
        await pg.locator('[data-g="1"]').click()
        check(await pg.locator('[data-tick="la-1-1"]').is_checked(), "Ticks persist after reload")

        await pg.locator("#tab-books").click()
        await pg.select_option("#bSeries", "0"); await pg.fill("#bNum", "4")
        check((await pg.input_value("#bTitle")).endswith("Book 4"), "Series picker fills the book title")
        await pg.fill("#bCh", "1. Our Earth and its maps\n3) Early civilisations of the Indus Valley")
        await pg.locator("#bookForm button").click(); await pg.wait_for_timeout(200)
        sugg = " ".join(await pg.locator(".sugg").all_inner_texts())
        check("Ancient India" in sugg, "Indus Valley chapter suggests CKHG Ancient India")

        await pg.locator("#tab-char").click()
        await pg.locator('[data-cv="ch-emo-2"][data-lv="3"]').click()
        check(await pg.locator('[data-cv="ch-emo-2"][data-lv="3"]').get_attribute("aria-pressed") == "true", "Character level saves")

        await pg.locator("#tab-compare").click(); await pg.wait_for_timeout(100)
        await pg.locator("#tab-more").click(); await pg.wait_for_timeout(100)
        await pg.locator('[data-more="sources"]').click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#moreBody h2").count() >= 1, "More tab shows Sources")
        await pg.locator('[data-more="backup"]').click(); await pg.wait_for_timeout(100)
        check("ckledger" in await pg.input_value("#bk"), "More tab shows Backup and the backup text is produced")

        await pg.locator("#tab-track").click(); await pg.wait_for_timeout(200)
        tabs_fit = await pg.evaluate("[...document.querySelectorAll('.tab')].every(t => t.getBoundingClientRect().right <= innerWidth)")
        check(tabs_fit, "All tabs are visible at phone width")
        small = await pg.evaluate("""[...document.querySelectorAll('.tab, .seg button, .linkbtn, .btn, .tick, .search, .check')]
            .filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.height < 43.5 || r.width < 43.5).length""")
        check(small == 0, f"Core Knowledge controls are at least 44px ({small} too small)")
        await pg.locator('[data-skipus]').first.click(); await pg.wait_for_timeout(100)
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(100)
        check(await pg.locator('[data-skipus]').count() >= 1, "Undo restores skipped U.S.-focus units")
        await pg.evaluate("document.documentElement.dir = 'rtl'"); await pg.wait_for_timeout(100)
        check(await pg.evaluate("document.documentElement.scrollWidth") <= 400, "No horizontal scroll in right-to-left layout")
        await pg.evaluate("document.documentElement.dir = ''")
        await pg.set_viewport_size({"width": 200, "height": 450}); await pg.wait_for_timeout(200)
        width200 = await pg.evaluate("document.documentElement.scrollWidth")
        check(width200 <= 200, f"No horizontal scroll at 200% zoom ({width200}px)")
        await pg.set_viewport_size({"width": 400, "height": 900}); await pg.wait_for_timeout(100)

        await pg.locator("#installBtn").click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#installSteps li").count() == 3, "Install app shows home-screen steps when the browser has no prompt")
        await pg.locator("#installClose").click()
        check(await pg.locator("#installHelp").is_hidden(), "Install help closes")
        check(await pg.locator("#childFields").is_hidden(), "Child details stay folded away until Edit details")

        check(await pg.locator("#setupForm").is_visible(), "First visit shows the two-question setup")
        await pg.fill("#sName", "Aisha"); await pg.select_option("#sGrade", "0")
        check("9 books" in await pg.inner_text("#sBooksLbl"), "KG offers the 9 Nursery-list books")
        await pg.select_option("#sGrade", "5"); await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        check(await pg.locator("#view .ledger").count() == 12 and "Aisha" in await pg.inner_text("#childSum"), "Setup creates the child with all 12 Class 5 books")
        view = await pg.inner_text("#view")
        check("Ancient civilisations of the world" in view and "Ch. 9a" in view and "Space and Satellites" in view and "Probability" in view,
              "Class 5 Oxford books come with their chapters (Social Studies, Science, Mathematics)")
        check(await pg.locator("#view .details").count() == 0 and await pg.locator('#view [data-open][aria-expanded="true"]').count() == 0,
              "Chapters start folded, with no edit panels open")
        check("Ch. 13 · p. 114" in view, "Social Studies chapters show the page they start on")
        check("Planet SinRota" in view and "Unit 18 · p. 180" in view and "Why do we use money?" in view, "Oxford Discover 5 has its 18 units under the Big Questions")
        check("Part 4 · The Earth and Space" in view and "Unit 9 · p. 99" in view, "Primary Science 5 shows its Parts and page numbers")
        check("Coding Animal Adaptations" in view and "Unit 3 · Data Handling" in view, "Keyboard 5 has its 6 chapters under 4 units")
        wb = await pg.locator(".ledger", has_text="Oxford Discover Workbook 5").inner_text()
        check("Unit 18 · p. 170" in wb and "Dreaming of Dodos" in wb, "Oxford Discover Workbook 5 has its own page numbers")
        ur = pg.locator(".ledger", has_text="Karwan-e-Urdu Book - 5")
        check(await ur.locator(".row").count() == 29 and "Lesson 29 · p. 157" in await ur.inner_text()
              and await ur.locator(".row .t").first.get_attribute("dir") == "auto", "Karwan-e-Urdu 5 has its 29 Urdu lessons, shown right to left")
        check(await pg.locator(".chsrc").count() == 7 and await pg.locator(".chsrc .pill").count() == 1, "Each loaded chapter list names its source; Mathematics asks for a check")
        check(await pg.locator("#setup").is_hidden() and await pg.locator("#studentSel option").count() == 1, "Setup replaces the sample child and closes")
        await pg.locator("#addStudent").click(); await pg.fill("#sName", "Hamza"); await pg.select_option("#sGrade", "0")
        await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        check(await pg.locator("#studentSel option").count() == 2 and await pg.locator("#view .ledger").count() == 9, "Add child adds a second child with the KG books")
        await pg.locator("#addStudent").click(); await pg.fill("#sName", "Ali"); await pg.select_option("#sGrade", "7")
        await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        v7 = await pg.inner_text("#view")
        check("Striving for peace" in v7 and "Structure of an Atom" in v7 and "Section 2 · History" in v7 and "Entrepreneurial Design Thinking" in v7,
              "A Class 7 child gets Oxford chapters from the Teaching Guides (English, Science, Social Studies, Keyboard)")

        width = await pg.evaluate("document.documentElement.scrollWidth")
        check(width <= 400, f"No horizontal scroll at phone width ({width}px)")
        check(not errors, "No JavaScript errors" + (": " + "; ".join(errors) if errors else ""))
        await b.close()
    srv.shutdown()
    print("\nAll passed." if not fails else f"\n{len(fails)} failed.")
    sys.exit(1 if fails else 0)


asyncio.run(main())
