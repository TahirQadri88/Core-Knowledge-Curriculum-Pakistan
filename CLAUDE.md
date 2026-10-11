# Core Knowledge Ledger

An offline progressive web app for Karachi families. Parents and students track:
1. **Class goals**: what Pakistan's National Curriculum expects by the end of each class, KG to Class 8, in plain words.
2. **School books**: Oxford University Press Pakistan or any other textbooks, chapter by chapter, with matching Core Knowledge units suggested as extra reading.
3. **Character & deen**: the qualities from the article *Things Every Child (4–12) Should Learn — Beyond Just Good Grades* by Abul Laith Muhammad Tahir Qadri, tracked on four levels (Not yet, Learning, Often, Habit).
4. **Extra reading**: optional Core Knowledge units, Kindergarten to Grade 8 (Language Arts CKLA, History & Geography CKHG, Science CKSci), by class.

Owner: Tahir (Karachi). Users: Pakistani Muslim parents on phones, Sindh Board, O Level and homeschool families.

## Layout
- `src/app.html`: the whole app (HTML, CSS, vanilla JS). The `/*__DATA__*/` marker is replaced with `src/data.js` at build time.
- `src/data.js`: curriculum data (`RAW`, `ITEMS`, `SOURCES`, `NOTES`), National Curriculum goals (`NCP`, `NCP_SUBJ`, `NCP_BOOKS`), regions (`HG_REGION`), Oxford series list (`BOOK_SERIES`), character list (`CHAR`, `LEVELS`), Harvard links (`HARVARD`).
- `build.py`: builds `docs/` (installable PWA: index.html, manifest.json, sw.js, icons) and `build/` (single-file artifact.html and a zip).
- `scripts/test_app.py`: browser smoke test of `docs/`. `scripts/check_links.py`: checks every unit link against coreknowledge.org.
- `docs/` is generated. Never edit it by hand; edit `src/` and rebuild.
- GitHub Pages (source: GitHub Actions, `.github/workflows/pages.yml`) runs `build.py` and publishes `docs/` on every push to `main` or a `claude/**` branch. The last push is live; the owner tests it there and then merges into `main`.
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
- Do not invent chapter lists. Bundle one only when it is copied from OUP Pakistan's Teaching Guide PDFs on oup.com.pk or from the book's printed Contents page, and record the source in `notes/decisions.md`. Otherwise parents paste the Contents page from their own copy.
- `SCHOOL_LIST` in `src/data.js` is the owner's school book list for 2026–27 (KG uses the Nursery list; Classes 1–8). Keep titles and ISBNs exactly as printed.
- `BOOK_CHAPTERS` holds chapter lists keyed by the pupil's-book ISBN, each with its Teaching Guide URL. Match the edition exactly (SNC guides for SNC books). Set `check: true` when the guide is an older printing than the book.

## Rules for the app
- Vanilla JS, one HTML file, no framework, no build tools beyond `build.py`. Only external request: Google Fonts (cached by the service worker).
- Saved data lives in localStorage under `ckledger.v1`. New student fields must get defaults in `fix()` so old backups still load. Backups must stay restorable.
- When `docs/` content changes, bump `CACHE` in the service worker string inside `build.py` (e.g. `ckledger-v3`) so installed copies update.
- Mobile first: must work at 400px wide with no horizontal scroll. Light and dark themes via the CSS tokens at the top of `src/app.html`; no literal colours in components.
- Keyboard focus visible, every control labelled, `prefers-reduced-motion` respected.
- Every tappable control is at least 44×44px (`--tap`). Borders of controls use `--control-line` (3:1 contrast); `--line` is for decorative dividers only.
- Sizes in `rem`, never a fixed `px` font size, so text follows the phone's text-size setting. No horizontal scroll at 200% zoom.
- Use logical CSS (`padding-inline-start`, `inset-inline-end`, `text-align:start`) instead of left/right, so the planned Urdu (right-to-left) layout mirrors correctly.
- Messages go through `toast()`, which also announces them to screen readers; pass an undo function for anything destructive.
- First visit: a two-question setup (child's name and class) adds that class's `SCHOOL_LIST` books; `ui.welcome` controls it. **Add child** reuses the same form. Child details stay folded behind **Edit details**. Say "child", not "student", in anything parents read.
- **Install app** button: uses Chrome's install prompt when offered, otherwise shows Safari or Chrome steps. Hidden when already installed or in the artifact build.
- Tabs: Class goals (first and default), School books, Character & deen, Extra reading (Core Knowledge), More (Compare, Backup, Sources). Keep at most five.
- Class goals come from `NCP` in `src/data.js`: plain-language summaries of Pakistan's National Curriculum progression grids (ncc.gov.pk), each point with the grid's SLO codes. Never add a goal from memory; summarise only what the grid says for that class, and record the source in `notes/decisions.md`. Update them when the draft 2026 national curriculum is final.
- Core Knowledge is optional extra reading: no "expected by now" pace on it, U.S.-only units hidden unless the parent turns them on, History & Geography grouped by region (`HG_REGION`). Give every new History & Geography unit a region.

## Design skills
- `.claude/skills/hig-*`: Apple Human Interface Guidelines skills from HIG Doctor (Raintree Technology, MIT; Apple's reference text in each `references/` folder is © Apple Inc.). Snapshot copied on 11 October 2026 from commit 5e20558.
- `.claude/apple-design-context.md` tells those skills this is a web PWA for iPhone and Android. Follow it: apply HIG principles through web equivalents, and keep the existing tokens and fonts unless the owner asks for a restyle.
- For any UI change, check it against the relevant hig-* skill (layout, controls, dialogs, accessibility, dark mode) before reporting it done.

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
