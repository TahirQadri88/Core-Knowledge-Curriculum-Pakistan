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

        async def nav(path):
            await pg.evaluate(f"history.replaceState({{d: 0}}, '', '#/{path}'); dispatchEvent(new PopStateEvent('popstate'))"); await pg.wait_for_timeout(150)

        async def open_book(title):
            await pg.locator("a.navrow", has_text=title).first.click(); await pg.wait_for_timeout(150)
            t = await pg.inner_text("#view"); return t

        # Home and navigation
        check(await pg.evaluate("location.hash") == "#/home" and await pg.get_attribute("#tab-home", "aria-current") == "page", "The app opens on Home")
        check(await pg.locator("#setupForm").is_visible(), "First visit shows the two-question setup on Home")
        await pg.locator("#setupSkip").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".tile").count() == 6 and "Class goals" in await pg.inner_text("#view") and "Next up" in await pg.inner_text("#view"),
              "Home shows six progress tiles and what to do next")
        check(await pg.locator("#backBtn").is_hidden(), "No Back button on a main tab")
        await pg.locator('.tile[data-go="goals"]').click(); await pg.wait_for_timeout(150)
        check(await pg.evaluate("location.hash") == "#/goals" and await pg.inner_text("#screenTitle") == "Class goals", "A Home tile opens its screen")

        # Class goals: subjects list, then one screen per subject
        check(await pg.locator('a.navrow[data-go^="goals/"]').count() == 6, "Class 4 lists 6 National Curriculum subjects")
        await pg.locator('[data-go="goals/sci"]').click(); await pg.wait_for_timeout(150)
        g4 = await pg.inner_text("#view")
        check(await pg.inner_text("#screenTitle") == "Science" and await pg.locator("#backBtn").is_visible(), "A subject opens its own screen, with Back")
        check("water cycle" in g4 and "SCI-04-C-01" in g4 and await pg.locator('#view a[href*="ncc.gov.pk"]').count() == 1, "Each goal shows its code and the ncc.gov.pk source")
        check("International extras" in g4 and "CK Seq p." in g4 and "Not in Pakistan’s curriculum" in g4, "Subjects list international extras with their Core Knowledge page")
        await pg.locator('[data-tick="ncp-sci-4-1"]').check(); await pg.wait_for_timeout(100)
        check(await pg.locator('[data-tick="ncp-sci-4-1"]').is_checked(), "Ticking a goal saves")
        await pg.locator("#goalsLeft").check(); await pg.wait_for_timeout(100)
        check(await pg.locator('[data-tick="ncp-sci-4-1"]').count() == 0 and await pg.locator('[data-tick="ncp-sci-4-2"]').count() == 1, "Show only what's left hides ticked goals")
        await pg.locator("#goalsLeft").uncheck(); await pg.wait_for_timeout(100)
        small = await pg.evaluate("""[...document.querySelectorAll('#view .tick, #view .btn, #view .check, #view .sugg-a')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.height < 43.5).length""")
        check(small == 0, f"Class goals controls are at least 44px tall ({small} too small)")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(150)
        check(await pg.evaluate("location.hash") == "#/goals" and "1 of 7 goals" in await pg.inner_text('[data-go="goals/sci"]'), "Back returns to the subjects, with the new count")
        await pg.locator('[data-gc="0"]').click(); await pg.wait_for_timeout(100)
        await pg.locator('[data-go="goals/ece"]').click(); await pg.wait_for_timeout(100)
        check("first Kalimah" in await pg.inner_text("#view"), "KG goals come from the Early Childhood curriculum")
        await pg.go_back(); await pg.wait_for_timeout(150)
        check(await pg.evaluate("location.hash") == "#/goals", "The phone's back button works too")
        await pg.locator('[data-gc="1"]').click(); await pg.locator('[data-go="goals/isl"]').click(); await pg.wait_for_timeout(100)
        check("Surah al-Fatihah and Surah al-Ikhlas" in await pg.inner_text("#view"), "Class 1 Islamiyat goals list the surahs to memorise")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        await pg.locator('[data-gc="7"]').click(); await pg.wait_for_timeout(100)
        check(await pg.locator('a.navrow[data-go^="goals/"]').count() == 8, "Class 7 has goals for 8 subjects, Islamiyat included")
        await pg.locator('[data-gc="4"]').click(); await pg.locator('[data-go="goals/sci"]').click(); await pg.wait_for_timeout(100)
        await pg.locator("[data-gock]").click(); await pg.wait_for_timeout(150)
        check(await pg.get_attribute("#tab-track", "aria-current") == "page" and await pg.get_attribute('[data-subj="sci"]', "aria-pressed") == "true",
              "A subject's Extra reading button opens Core Knowledge Science for that class")
        await pg.locator('[data-subj="all"]').click()

        # School books: list, then one screen per book
        await pg.locator("#tab-books").click(); await pg.wait_for_timeout(150)
        before = await pg.locator('a.navrow[data-go^="books/"]').count()
        await pg.locator("#addList").click(); await pg.wait_for_timeout(150)
        check(await pg.locator('a.navrow[data-go^="books/"]').count() == before + 13, "School list adds all 13 Class 4 books in one tap")
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(150)
        check(await pg.locator('a.navrow[data-go^="books/"]').count() == before, "Undo removes the books just added")
        await pg.select_option("#bSeries", "0"); await pg.fill("#bNum", "4")
        check((await pg.input_value("#bTitle")).endswith("Book 4"), "Series picker fills the book title")
        await pg.fill("#bCh", "1. Our Earth and its maps\n3) Early civilisations of the Indus Valley")
        await pg.locator("#bookForm button").click(); await pg.wait_for_timeout(200)
        check((await pg.evaluate("location.hash")).startswith("#/books/b-"), "Adding a book opens it")
        sugg = " ".join(await pg.locator(".sugg").all_inner_texts())
        check("Ancient India" in sugg, "Indus Valley chapter suggests CKHG Ancient India")
        await pg.locator("#delBook").click(); await pg.wait_for_timeout(150)
        check(await pg.evaluate("location.hash") == "#/books" and await pg.locator('a.navrow[data-go^="books/"]').count() == before, "Deleting a book returns to the list")
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(150)
        check(await pg.locator('a.navrow[data-go^="books/"]').count() == before + 1, "Undo brings the deleted book back")

        # Extra reading
        await pg.locator("#tab-track").click(); await pg.wait_for_timeout(150)
        check(await pg.locator(".row").count() > 15, "Core Knowledge rows render for the sample child")
        check(await pg.locator('[data-tick="hg-4-7"]').count() == 0 and "30 of its 73" in await pg.text_content("#view"),
              "U.S. units are hidden by default, and the region summary counts them")
        await pg.locator('[data-g="1"]').click()
        strands = await pg.locator(".strand").all_inner_texts()
        check(any("Read-aloud" in t for t in strands) and any("Skills" in t for t in strands) and any("Middle East, Africa and Islam" in t for t in strands),
              "Grade 1 shows the Language Arts strands and History grouped by region")
        await pg.locator('[data-open="la-1-2"]').click()
        href = await pg.locator("#d-la-1-2 a").first.get_attribute("href")
        check(href and "/free-resource/ckla-domain-02-human-body/" in href, "Details links to the unit download page")
        await pg.locator('[data-tick="la-1-1"]').check()
        await pg.reload(); await pg.wait_for_timeout(300)
        check(await pg.evaluate("location.hash") == "#/track", "A reload stays on the same screen")
        await pg.locator('[data-g="1"]').click()
        check(await pg.locator('[data-tick="la-1-1"]').is_checked(), "Ticks persist after reload")

        # Deen: Qur'an, Routine, Character
        await pg.locator("#tab-deen").click(); await pg.wait_for_timeout(100)
        check(await pg.locator('a.navrow[data-go^="deen/"]').count() == 3, "Deen lists Qur'an, Character and Routine")
        await pg.locator('[data-go="deen/quran"]').click(); await pg.wait_for_timeout(100)
        check("Class 4 Islamiyat: surahs to memorise" in await pg.inner_text("#view"), "Qur'an shows the class's Islamiyat surahs")
        check(await pg.locator('[data-q="114"]').count() >= 1 and await pg.locator('[data-q="77"]').count() == 0, "Hifz starts on Juz 30")
        await pg.locator('ul.rows [data-q="107"][data-lv="2"]').first.click(); await pg.wait_for_timeout(100)
        check(await pg.get_attribute('[data-q="107"][data-lv="2"]', "aria-pressed") == "true" and "6" in await pg.inner_text(".pace .pbox .pct >> nth=0"),
              "Marking a surah Memorised saves and counts")
        await pg.locator('[data-q="107"][data-lv="3"]').first.click(); await pg.wait_for_timeout(100)
        await pg.locator('[data-qv="due"]').click(); await pg.wait_for_timeout(100)
        check(await pg.locator('#view ul.rows [data-rev="107"]').count() >= 1, "A surah marked Revise shows under Due")
        await pg.locator('[data-rev="107"]').first.click(); await pg.wait_for_timeout(100)
        check("Nothing is due" in await pg.inner_text("#view"), "Revised today clears it from Due")
        await pg.locator('[data-qv="all"]').click(); await pg.wait_for_timeout(150)
        check(await pg.locator('ul.rows li .levels').count() >= 115 and "Juz 1" in await pg.inner_text("#view"), "All 114 surahs and Ayat al-Kursi, grouped by juz")
        await pg.select_option("#qRead", "9"); await pg.locator("#khPlus").click(); await pg.wait_for_timeout(100)
        await pg.reload(); await pg.wait_for_timeout(300)
        check("Para 9" in await pg.inner_text("#view") and "1 khatm completed" in await pg.inner_text("#view"), "Reading stage and khatms persist")
        small = await pg.evaluate("""[...document.querySelectorAll('#view button, #view select')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.height < 43.5 || r.width < 43.5).length""")
        check(small == 0, f"Qur'an controls are at least 44px ({small} too small)")
        await nav("deen/routine")
        check(await pg.locator("#rStart").count() == 1, "Routine starts with a set-up screen for the child")
        await pg.locator("#rStart").click(); await pg.wait_for_timeout(100)
        check(await pg.locator("[data-rtick]").count() == 11 and "After Asr" in await pg.inner_text("#view"), "The simple routine adds 11 items grouped by prayer")
        await pg.locator("[data-rtick]").first.check(); await pg.wait_for_timeout(100)
        check("1 of 11" in await pg.inner_text("#view .group-head h3"), "Ticking a routine item counts for today")
        await pg.locator("#rEdit").click(); await pg.fill("#rNew", "Help set the table"); await pg.select_option("#rNewAt", "maghrib")
        await pg.locator("#rAdd .btn.primary").click(); await pg.wait_for_timeout(100)
        await pg.locator("[data-rdel]").first.click(); await pg.wait_for_timeout(100)
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(100)
        check(await pg.locator("[data-rdel]").count() == 12, "Routine items can be added, and a delete can be undone")
        small = await pg.evaluate("""[...document.querySelectorAll('#view button, #view select, #view input')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.height < 43.5).length""")
        check(small == 0, f"Routine edit controls are at least 44px tall ({small} too small)")
        await pg.locator("#rDone").click(); await pg.wait_for_timeout(100)
        await pg.reload(); await pg.wait_for_timeout(300)
        check("Help set the table" in await pg.inner_text("#view") and "1 of 12" in await pg.inner_text("#view"), "Routine and today's ticks persist")
        await pg.locator('[data-rday="1"]').click(); await pg.wait_for_timeout(100)
        check("0 of 12" in await pg.inner_text("#view"), "Earlier days of the week can be viewed and ticked separately")
        await pg.locator('[data-rday="0"]').click()
        await nav("deen/char")
        await pg.locator('[data-cv="ch-emo-2"][data-lv="3"]').click()
        check(await pg.locator('[data-cv="ch-emo-2"][data-lv="3"]').get_attribute("aria-pressed") == "true", "Character level saves")

        # Home reflects progress; the progress report
        await pg.locator("#tab-home").click(); await pg.wait_for_timeout(150)
        check("1/12" in await pg.inner_text('.tile[data-go="deen/routine"]'), "Home shows today's routine")
        await pg.locator('[data-go="report"]').click(); await pg.wait_for_timeout(150)
        rep = await pg.inner_text(".report")
        check(all(w.lower() in rep.lower() for w in ["progress report", "Class goals: Pakistan’s National Curriculum", "Qur’an", "Daily routine", "not affiliated"]),
              "The progress report covers goals, books, Qur'an, character and routine")
        check(await pg.locator("#printRep").is_visible(), "The report has a Print or save as PDF button")

        # More: Compare, Family, Sources, Backup, Child details
        await pg.locator("#moreBtn").click(); await pg.wait_for_timeout(100)
        check(await pg.inner_text("#screenTitle") == "More" and await pg.locator("#backBtn").is_visible(), "More opens from the top bar")
        await pg.locator('[data-go="more/compare"]').click(); await pg.wait_for_timeout(100)
        check("Children this year" in await pg.inner_text("#moreBody"), "Compare sits under More")
        await pg.locator("#backBtn").click(); await pg.locator('[data-go="more/family"]').click(); await pg.wait_for_timeout(300)
        check("ilmtrack.pages.dev" in await pg.inner_text("#moreBody") and await pg.locator("#syncChip").is_hidden(),
              "Without the sync server, Family explains where sync works and no sync status shows")
        await pg.locator("#backBtn").click(); await pg.locator('[data-go="more/sources"]').click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#moreBody h2").count() >= 1, "More shows Sources")
        await pg.locator("#backBtn").click(); await pg.locator('[data-go="more/backup"]').click(); await pg.wait_for_timeout(100)
        check("ckledger" in await pg.input_value("#bk"), "More shows Backup and the backup text is produced")
        await pg.locator("#backBtn").click(); await pg.locator('[data-go="more/child"]').click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#childCard").is_visible() and await pg.locator("#fName").is_visible(), "Child details has its own screen")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#childCard").is_hidden(), "Child details are hidden on other screens")

        # layout checks on Extra reading
        await pg.locator("#tab-track").click(); await pg.wait_for_timeout(200)
        tabs_fit = await pg.evaluate("[...document.querySelectorAll('.tabbar-item')].every(t => t.getBoundingClientRect().right <= innerWidth)")
        check(tabs_fit, "All tabs are visible at phone width")
        small = await pg.evaluate("""[...document.querySelectorAll('.tabbar-item, .appbar-btn, .seg button, .linkbtn, .btn, .tick, .search, .check')]
            .filter(e => e.offsetParent).map(e => e.getBoundingClientRect()).filter(r => r.height < 43.5 || r.width < 43.5).length""")
        check(small == 0, f"Core Knowledge controls and tabs are at least 44px ({small} too small)")
        await pg.locator("#showUS").check(); await pg.wait_for_timeout(100)
        check(await pg.locator('#view .tag.us').count() >= 1, "Show U.S. units brings them back")
        await pg.locator('[data-skipus]').first.click(); await pg.wait_for_timeout(100)
        await pg.locator("#toast button").click(); await pg.wait_for_timeout(100)
        check(await pg.locator('[data-skipus]').count() >= 1, "Undo restores skipped U.S.-focus units")
        await pg.evaluate("document.documentElement.dir = 'rtl'"); await pg.wait_for_timeout(100)
        check(await pg.evaluate("document.documentElement.scrollWidth") <= 400, "No horizontal scroll in right-to-left layout")
        await pg.evaluate("document.documentElement.dir = ''")
        await pg.set_viewport_size({"width": 200, "height": 450}); await pg.wait_for_timeout(200)
        wide = []
        for path in ["home", "goals", "goals/sci", "books", "deen", "deen/quran", "track", "more", "report"]:
            await nav(path)
            w = await pg.evaluate("document.documentElement.scrollWidth")
            if w > 200: wide.append(f"{path} {w}px")
        check(not wide, "No horizontal scroll at 200% zoom on any screen" + (": " + ", ".join(wide) if wide else ""))
        await pg.set_viewport_size({"width": 400, "height": 900}); await pg.wait_for_timeout(100)

        await nav("home")
        await pg.locator("[data-install]").first.click(); await pg.wait_for_timeout(100)
        check(await pg.locator("#installSteps li").count() == 3, "Install app shows home-screen steps when the browser has no prompt")
        await pg.locator("#installClose").click()
        check(await pg.locator("#installHelp").is_hidden(), "Install help closes")

        # setup a real child (the welcome comes back for an untouched sample in a fresh browser)
        await pg.evaluate("localStorage.clear()"); await pg.goto(url); await pg.wait_for_timeout(400)
        await pg.fill("#sName", "Aisha"); await pg.select_option("#sGrade", "0")
        check("9 books" in await pg.inner_text("#sBooksLbl"), "KG offers the 9 Nursery-list books")
        await pg.select_option("#sGrade", "5"); await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        check(await pg.evaluate("location.hash") == "#/home" and "Aisha" in await pg.inner_text(".hero"), "After setup the parent lands on the child's Home")
        await pg.locator("#tab-books").click(); await pg.wait_for_timeout(150)
        check(await pg.locator('a.navrow[data-go^="books/"]').count() == 12, "Setup creates the child with all 12 Class 5 books")
        ss = await open_book("Social Studies")
        check("Ancient civilisations of the world" in ss and "Ch. 13 · p. 114" in ss, "Social Studies 5 comes with its chapters and pages")
        check(await pg.locator("#view .details").count() == 0 and await pg.locator('#view [data-open][aria-expanded="true"]').count() == 0,
              "Chapters start folded, with no edit panels open")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        sci = await open_book("New Oxford Primary Science")
        check("Ch. 9a" in sci or "Space and Satellites" in sci, "Primary Science 5 comes with its chapters")
        check("Part 4 · The Earth and Space" in sci and "Unit 9 · p. 99" in sci, "Primary Science 5 shows its Parts and page numbers")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        mth = await open_book("Primary Mathematics")
        check("Probability" in mth and await pg.locator(".chsrc .pill").count() == 1, "Mathematics 5 has its chapters and asks for a check")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        od = await open_book("Oxford Discover Student Book 5")
        check("Planet SinRota" in od and "Unit 18 · p. 180" in od and "Why do we use money?" in od, "Oxford Discover 5 has its 18 units under the Big Questions")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        kb = await open_book("Keyboard")
        check("Coding Animal Adaptations" in kb and "Unit 3 · Data Handling" in kb, "Keyboard 5 has its 6 chapters under 4 units")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        wb = await open_book("Oxford Discover Workbook 5")
        check("Unit 18 · p. 170" in wb and "Dreaming of Dodos" in wb, "Oxford Discover Workbook 5 has its own page numbers")
        await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        await open_book("Karwan-e-Urdu Book - 5")
        check(await pg.locator("#view .row").count() == 29 and "Lesson 29 · p. 157" in await pg.inner_text("#view")
              and await pg.locator("#view .row .t").first.get_attribute("dir") == "auto", "Karwan-e-Urdu 5 has its 29 Urdu lessons, shown right to left")
        check(await pg.locator("#setup").is_hidden() and await pg.locator("#studentSel option").count() == 1, "Setup replaces the sample child and closes")
        await pg.locator("#tab-home").click(); await pg.wait_for_timeout(100)
        await pg.locator("#addStudent").click(); await pg.fill("#sName", "Hamza"); await pg.select_option("#sGrade", "0")
        await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        await pg.locator("#tab-books").click(); await pg.wait_for_timeout(150)
        check(await pg.locator("#studentSel option").count() == 2 and await pg.locator('a.navrow[data-go^="books/"]').count() == 9, "Add child adds a second child with the KG books")
        await pg.locator("#moreBtn").click(); await pg.locator("[data-addchild]").first.click(); await pg.wait_for_timeout(150)
        await pg.fill("#sName", "Ali"); await pg.select_option("#sGrade", "7")
        await pg.locator("#setupForm .btn.primary").click(); await pg.wait_for_timeout(200)
        await pg.locator("#tab-books").click(); await pg.wait_for_timeout(150)
        v7 = (await open_book("Oxford Progressive English")); await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        v7 += await open_book("Science"); await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        v7 += await open_book("Social Studies"); await pg.locator("#backBtn").click(); await pg.wait_for_timeout(100)
        v7 += await open_book("Keyboard")
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
