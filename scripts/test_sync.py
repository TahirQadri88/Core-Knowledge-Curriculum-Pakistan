"""End-to-end test of family sync: the built app (docs/) against the real API (server/app.js) on a local test server.
Run after `python3 build.py`:  python3 scripts/test_sync.py   (needs Node 22+ and Playwright with Chromium)
"""
import asyncio, os, subprocess, sys, time, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PORT = 8791
BASE = f"http://127.0.0.1:{PORT}"



async def launch(p):
    """Playwright's own browser, or the preinstalled one when the pinned build is missing (e.g. cloud sessions)."""
    try:
        return await p.chromium.launch()
    except Exception:
        return await p.chromium.launch(executable_path=os.environ.get("CHROMIUM", "/opt/pw-browsers/chromium"))

async def main():
    from playwright.async_api import async_playwright
    srv = subprocess.Popen(["node", "--no-warnings", os.path.join(ROOT, "scripts", "dev_server.mjs"), str(PORT)], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    for _ in range(50):
        try:
            urllib.request.urlopen(BASE + "/api/config", timeout=1); break
        except Exception:
            time.sleep(0.1)
    fails = []

    def check(cond, msg):
        print(("PASS " if cond else "FAIL ") + msg)
        if not cond:
            fails.append(msg)

    try:
        async with async_playwright() as p:
            b = await launch(p)
            errors = []

            async def phone(name):
                ctx = await b.new_context(viewport={"width": 400, "height": 900}, service_workers="block")
                pg = await ctx.new_page()
                pg.on("pageerror", lambda e: errors.append(f"{name}: {e}"))
                return ctx, pg

            async def nav(pg, path):
                await pg.evaluate(f"history.replaceState({{d: 0}}, '', '#/{path}'); dispatchEvent(new PopStateEvent('popstate'))"); await pg.wait_for_timeout(200)

            async def family_tab(pg):
                # on a new phone the Welcome screen links to Family itself; elsewhere it is under More
                if await pg.locator("#moreBtn").is_visible(): await pg.locator("#moreBtn").click()
                await pg.locator('[data-go="more/family"]').click(); await pg.wait_for_timeout(200)

            async def sync_now(pg):
                await family_tab(pg)
                await pg.locator("#syncBtn").click(); await pg.wait_for_timeout(600)

            async def goals(pg, cls=4):
                await pg.locator("#tab-goals").click()
                await pg.locator(f'[data-gc="{cls}"]').click()
                await pg.locator('[data-go="goals/sci"]').click(); await pg.wait_for_timeout(150)

            # mum: set up a child, sign in, create the family
            mctx, mum = await phone("mum")
            await mum.goto(BASE + "/"); await mum.wait_for_timeout(300)
            await mum.fill("#sName", "Aisha"); await mum.select_option("#sGrade", "4")
            await mum.locator("#setupForm .btn.primary").click(); await mum.wait_for_timeout(400)
            check(await mum.locator(".famcard").is_visible() and await mum.inner_text("#syncChip") == "Family", "Home and the header offer family sync straight away")
            await mum.locator("[data-joinfocus]").click(); await mum.wait_for_timeout(300)
            check(await mum.evaluate("document.activeElement.id") == "joinCode", "I have a family code opens Family with the code box ready")
            await mum.locator("#tab-home").click(); await mum.locator("#famLater").click(); await mum.wait_for_timeout(200)
            check(await mum.locator(".famcard").count() == 0 and await mum.locator("#syncChip").is_visible(), "Not now hides the card but keeps Family in the header")
            await family_tab(mum)
            check("Share progress between phones" in await mum.inner_text("#view"), "Signed out, Family offers sign-in and a code")
            await mum.goto(BASE + "/__test/login?sub=mum"); await mum.goto(BASE + "/"); await mum.wait_for_timeout(500)
            await family_tab(mum)
            await mum.fill("#famName", "Qadri family"); await mum.locator("#famForm .btn.primary").click(); await mum.wait_for_timeout(600)
            check("Add this phone’s children to the family?" in await mum.inner_text("#view"), "Creating a family asks before uploading this phone's children")
            await mum.locator("#askYes").click(); await mum.wait_for_timeout(800)
            check(await mum.locator("#syncChip").is_visible() and "Synced" in await mum.inner_text("#syncChip"), "After adding, the header shows Synced")
            await goals(mum)
            await mum.locator('[data-tick="ncp-sci-4-1"]').check(); await mum.wait_for_timeout(200)
            await sync_now(mum)

            # child's phone: join from the invite link, see mum's tick
            await mum.locator('[data-invite="child"]').click(); await mum.wait_for_timeout(300)
            code = (await mum.inner_text("#inviteCode")).strip()
            check(len(code) == 11 and code[5] == "-", f"A child's phone code is made ({code})")
            kctx, kid = await phone("kid")
            await kid.goto(BASE + "/#join=" + code); await kid.wait_for_timeout(500)
            check(await kid.input_value("#joinCode") == code, "The invite link opens Family with the code filled in")
            await kid.locator("#joinForm .btn.primary").click(); await kid.wait_for_timeout(1200)
            check("Aisha" in await kid.inner_text("#studentSel") and await kid.locator("#studentSel option").count() == 1, "The child's phone gets the family's child and drops the sample")
            check("child’s phone" in await kid.inner_text("#view"), "The child's phone knows its role")
            await goals(kid)
            check(await kid.locator('[data-tick="ncp-sci-4-1"]').is_checked(), "Mum's tick appears on the child's phone")
            await kid.locator("#tab-books").click(); await kid.wait_for_timeout(150)
            check(await kid.locator('a.navrow[data-go^="books/"]').count() == 13, "All 13 Class 4 books come across with the child")

            # child ticks; a character level stays on the child's phone without breaking sync
            await goals(kid)
            await kid.locator('[data-tick="ncp-sci-4-2"]').check(); await kid.wait_for_timeout(100)
            await nav(kid, "deen/char")
            await kid.locator('[data-cv="ch-emo-2"][data-lv="3"]').click()
            await sync_now(kid)
            check("Synced" in await kid.inner_text("#syncChip") and "Could not" not in await kid.inner_text("#view"), "The child's phone syncs without errors")
            await sync_now(mum); await goals(mum)
            check(await mum.locator('[data-tick="ncp-sci-4-2"]').is_checked(), "The child's tick appears on mum's phone")
            await nav(mum, "deen/char")
            check(await mum.get_attribute('[data-cv="ch-emo-2"][data-lv="3"]', "aria-pressed") != "true", "A character level set on the child's phone is not sent to the family")

            # offline: tick on the child's phone, come back online, it reaches mum
            await kctx.set_offline(True)
            await goals(kid); await kid.locator('[data-tick="ncp-sci-4-3"]').check(); await kid.wait_for_timeout(3000)
            check("Offline" in await kid.inner_text("#syncChip"), "Offline, the header says so and the tick stays on the phone")
            await kctx.set_offline(False); await kid.evaluate("dispatchEvent(new Event('online'))"); await kid.wait_for_timeout(1200)
            await sync_now(mum); await goals(mum)
            check(await mum.locator('[data-tick="ncp-sci-4-3"]').is_checked(), "Back online, the child's offline tick reaches mum")

            # a second parent joins and can untick; mum sees it
            await family_tab(mum); await mum.locator('[data-invite="parent"]').click(); await mum.wait_for_timeout(300)
            pcode = (await mum.inner_text("#inviteCode")).strip()
            dctx, dad = await phone("dad")
            await dad.goto(BASE + "/__test/login?sub=dad"); await dad.goto(BASE + "/"); await dad.wait_for_timeout(500)
            await family_tab(dad); await dad.fill("#joinCode", pcode); await dad.locator("#joinForm .btn.primary").click(); await dad.wait_for_timeout(1200)
            await goals(dad)
            await dad.locator('[data-tick="ncp-sci-4-1"]').uncheck(); await sync_now(dad)
            await sync_now(mum); await goals(mum)
            check(not await mum.locator('[data-tick="ncp-sci-4-1"]').is_checked(), "A second parent's untick reaches mum")
            await family_tab(mum); await mum.wait_for_timeout(400)
            members = await mum.inner_text("#memberList")
            check("Dad" in members and "child’s phone" in members, "Mum sees the members list")

            # backup and restore with the server copy
            async def backup(pg):
                await pg.locator("#moreBtn").click(); await pg.locator('[data-go="more/backup"]').click(); await pg.wait_for_timeout(200)
            await backup(kid)
            check("cannot restore" in await kid.inner_text("#moreBody") and await kid.locator("#doImp").count() == 0 and await kid.locator("[data-del]").count() == 0,
                  "A child's phone cannot restore a backup or remove a child")
            await backup(mum)
            check("Ilm Track server" in await mum.inner_text("#moreBody") and await mum.locator("#refetch").count() == 1, "Backup says the family copy is on the server")
            saved = await mum.input_value("#bk")
            await goals(mum); await mum.locator('[data-tick="ncp-sci-4-5"]').check(); await sync_now(mum)
            await sync_now(dad); await goals(dad)
            check(await dad.locator('[data-tick="ncp-sci-4-5"]').is_checked(), "Mum's new tick reaches dad before the restore")
            await backup(mum); await mum.set_input_files("#impFile", files=[{"name": "ilmtrack-backup.json", "mimeType": "application/json", "buffer": saved.encode()}]); await mum.wait_for_timeout(300)
            check("Aisha" in await mum.inner_text("#impPreview") and "on every phone" in await mum.inner_text("#impPreview"), "Choosing a file shows what will change before restoring")
            await mum.locator("#doRestore").click(); await mum.wait_for_timeout(300)
            check("whole family" in await mum.inner_text("#toast") and "Undo" in await mum.inner_text("#toast"), "Restoring in a family says so and offers Undo")
            await mum.wait_for_timeout(800); await sync_now(mum); await sync_now(dad); await goals(dad)
            check(not await dad.locator('[data-tick="ncp-sci-4-5"]').is_checked() and await dad.locator('[data-tick="ncp-sci-4-2"]').is_checked(),
                  "A parent's restore reaches the other phones")
            await nav(mum, "home")
            check("family’s copy" in await mum.inner_text("#appFooter") and "Abul Laith Muhammad Tahir Qadri" in await mum.inner_text("#appFooter"),
                  "The footer says the family copy is on the server and credits the developer")
            await backup(dad); await dad.locator("#refetch").click(); await dad.locator("#refetch").click(); await dad.wait_for_timeout(1500)
            names = await dad.inner_text("#studentSel")
            check("Aisha" in names and "Downloaded" in await dad.inner_text("#toast"), "Download the family copy again rebuilds the phone from the server")
            await goals(dad)
            check(await dad.locator('[data-tick="ncp-sci-4-2"]').is_checked() and not await dad.locator('[data-tick="ncp-sci-4-5"]').is_checked(),
                  "The downloaded copy has the family's ticks")

            check(not errors, "No JavaScript errors" + (": " + "; ".join(errors) if errors else ""))
            await b.close()
    finally:
        srv.terminate()
    print("\nAll passed." if not fails else f"\n{len(fails)} failed.")
    sys.exit(1 if fails else 0)


asyncio.run(main())
