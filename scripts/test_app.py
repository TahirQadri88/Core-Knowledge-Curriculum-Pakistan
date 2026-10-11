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

        check(await pg.locator(".row").count() > 20, "Core Knowledge rows render for the sample student")
        await pg.locator('[data-g="1"]').click()
        check(await pg.locator(".strand").count() == 2, "Grade 1 Language Arts shows both strands")
        await pg.locator('[data-open="la-1-2"]').click()
        href = await pg.locator("#d-la-1-2 a").first.get_attribute("href")
        check(href and "/free-resource/ckla-domain-02-human-body/" in href, "Details links to the unit download page")

        await pg.locator('[data-tick="la-1-1"]').check()
        await pg.reload(); await pg.wait_for_timeout(300)
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

        for tab in ["compare", "sources", "backup"]:
            await pg.locator(f"#tab-{tab}").click(); await pg.wait_for_timeout(100)
        check("ckledger" in await pg.input_value("#bk"), "Backup text is produced")

        width = await pg.evaluate("document.documentElement.scrollWidth")
        check(width <= 400, f"No horizontal scroll at phone width ({width}px)")
        check(not errors, "No JavaScript errors" + (": " + "; ".join(errors) if errors else ""))
        await b.close()
    srv.shutdown()
    print("\nAll passed." if not fails else f"\n{len(fails)} failed.")
    sys.exit(1 if fails else 0)


asyncio.run(main())
