# Core Knowledge Ledger

An offline progressive web app for Karachi families. Parents and students track:
1. **Core Knowledge** units, Kindergarten to Grade 8 (Language Arts CKLA, History & Geography CKHG, Science CKSci), by class and age.
2. **School books**: Oxford University Press Pakistan or any other textbooks, chapter by chapter, with matching Core Knowledge units suggested as background reading.
3. **Character & deen**: the qualities from the article *Things Every Child (4–12) Should Learn — Beyond Just Good Grades* by Abul Laith Muhammad Tahir Qadri, tracked on four levels (Not yet, Learning, Often, Habit).

Owner: Tahir (Karachi). Users: Pakistani Muslim parents on phones, Sindh Board, O Level and homeschool families.

## Layout
- `src/app.html`: the whole app (HTML, CSS, vanilla JS). The `/*__DATA__*/` marker is replaced with `src/data.js` at build time.
- `src/data.js`: curriculum data (`RAW`, `ITEMS`, `SOURCES`, `NOTES`), Oxford series list (`BOOK_SERIES`), character list (`CHAR`, `LEVELS`), Harvard links (`HARVARD`).
- `build.py`: builds `docs/` (installable PWA: index.html, manifest.json, sw.js, icons) and `build/` (single-file artifact.html and a zip).
- `scripts/test_app.py`: browser smoke test of `docs/`. `scripts/check_links.py`: checks every unit link against coreknowledge.org.
- `docs/` is generated. Never edit it by hand; edit `src/` and rebuild.
- GitHub Pages (source: GitHub Actions, `.github/workflows/pages.yml`) runs `build.py` on `main` for the site root and on every other branch with `CK_PREVIEW=<branch-slug>` for `/preview/<branch-slug>/`. Preview builds use their own localStorage key (`ckledger.v1.preview`) and service worker cache, and show a banner. Keep the `const KEY = "ckledger.v1";` line in `src/app.html` exactly as written; `build.py` replaces it for previews.
- `notes/`: background and decisions. Read `notes/decisions.md` before changing data or features.
- `SETUP.md`: step-by-step setup for GitHub, GitHub Pages, Firebase and Claude Code prompts.

## Commands
- Build: `python3 build.py` (needs Pillow: `pip install pillow`)
- Run locally: `python3 -m http.server 8080 -d docs`, then open http://localhost:8080
- Test: `python3 scripts/test_app.py` (needs `pip install playwright` and `python -m playwright install chromium`)
- Check links: `python3 scripts/check_links.py`

After any change: build, run the test, and run the link check if `src/data.js` changed. Do not report a change as done until the test passes.

## Rules for curriculum data
- Never add, rename or move a Core Knowledge unit from memory. Confirm it on coreknowledge.org (unit page, the History & Geography / Science / Language Arts pages, or the library sitemaps) and record where in `SOURCES` and in `notes/decisions.md` with the date.
- Each row in `RAW` is `"title|unit-page-slug|online-resources-pdf-path|flags"`. The slug goes after `https://www.coreknowledge.org/free-resource/`. Leave the slug empty when no page exists and add the `nopage` flag.
- Flags: `us` (U.S.-focused, optional for Pakistani families), `islam` (written about Islam from outside the faith; parent reads first), `sa` (South Asia link), `review` (parent may want to read first), `book` (needs a purchased novel), `nopage`.
- Item ids (`la-4-2`, `la-1-s3`, `hg-4-4`, `sci-5-6`) are stored in users' saved progress. Never renumber or reuse an id. To retire a unit, keep the id and mark it in `notes/decisions.md`.
- Do not invent Oxford chapter lists. OUP does not publish them online; parents paste the Contents page from their own copy.

## Rules for the app
- Vanilla JS, one HTML file, no framework, no build tools beyond `build.py`. Only external request: Google Fonts (cached by the service worker).
- Saved data lives in localStorage under `ckledger.v1`. New student fields must get defaults in `fix()` so old backups still load. Backups must stay restorable.
- When `docs/` content changes, bump `CACHE` in the service worker string inside `build.py` (e.g. `ckledger-v3`) so installed copies update.
- Mobile first: must work at 400px wide with no horizontal scroll. Light and dark themes via the CSS tokens at the top of `src/app.html`; no literal colours in components.
- Keyboard focus visible, every control labelled, `prefers-reduced-motion` respected.

## Backend (Firebase Spark, free)
- Plan: `notes/backend-plan.md`. Draft security rules: `firebase/firestore.rules`.
- Offline-first: localStorage stays the main copy; Firestore sync is added on top and only when signed in. Signed-out use must keep working.
- Write single fields with field paths (`"status.<id>"`) so devices do not overwrite each other.
- Rules changes need emulator tests (`@firebase/rules-unit-testing`) covering every case listed in the plan, and must pass before anyone pastes them into the Firebase console.
- The Firebase web config is public by design. Never commit service-account keys, tokens or `.env` files.
- Firebase only loads in the GitHub Pages build (`docs/`); the claude.ai artifact build stays local-only.

## Writing style for anything users read
- Plain, direct English. Short sentences. No filler, no "worth noting", no em-dash asides, no emoji section markers.
- Use proper Islamic titles and salutations: the Prophet ﷺ, Sayyidunā …, Companions رضي الله عنه / رضي الله عنها / رضي الله عنهم, scholars رحمه الله.
- Credit the character list to Abul Laith Muhammad Tahir Qadri, as written in the article.
- The app is independent; say it is not affiliated with the Core Knowledge Foundation or Oxford University Press.
