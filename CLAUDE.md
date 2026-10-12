# Ilm Track

Core Knowledge Tracker for Pakistani Students (formerly Core Knowledge Ledger). Live at https://ilmtrack.pages.dev.

An offline progressive web app for Karachi families. Parents and students track:
1. **Class goals**: what Pakistan's National Curriculum expects by the end of each class, KG to Class 8, in plain words.
2. **School books**: Oxford University Press Pakistan or any other textbooks, chapter by chapter, with matching Core Knowledge units suggested as extra reading.
3. **Character & deen**: Qur'an hifz, revision and reading, a daily routine each family sets up per child around the five prayers, and the qualities from the article *Things Every Child (4–12) Should Learn — Beyond Just Good Grades* by Abul Laith Muhammad Tahir Qadri, tracked on four levels (Not yet, Learning, Often, Habit).
4. **Extra reading**: optional Core Knowledge units, Kindergarten to Grade 8 (Language Arts CKLA, History & Geography CKHG, Science CKSci), by class.

Status (12 October 2026): still being built and tested by the owner; no active users yet. Keep the saved-data rules anyway, so real families' progress is safe once they start.

Owner: Tahir (Karachi). Users: Pakistani Muslim parents on phones, Sindh Board, O Level and homeschool families.

## Layout
- `src/app.html`: the whole app (HTML, CSS, vanilla JS). The `/*__DATA__*/` marker is replaced with `src/data.js` at build time.
- `src/data.js`: curriculum data (`RAW`, `ITEMS`, `SOURCES`, `NOTES`), National Curriculum goals (`NCP`, `NCP_SUBJ`, `NCP_BOOKS`), regions (`HG_REGION`), Oxford series list (`BOOK_SERIES`), character list (`CHAR`, `LEVELS`), Harvard links (`HARVARD`).
- `build.py`: builds `docs/` (installable PWA: index.html, manifest.json, sw.js, icons) and `build/` (single-file artifact.html and a zip).
- `scripts/test_app.py`: browser smoke test of `docs/`. `scripts/check_links.py`: checks every unit link against coreknowledge.org.
- `docs/` is generated. Never edit it by hand; edit `src/` and rebuild.
- GitHub Pages (source: GitHub Actions, `.github/workflows/pages.yml`) runs `build.py` and publishes `docs/` on every push to `main` or a `claude/**` branch. The last push is live; the owner tests it there and then merges into `main`.
- Cloudflare Pages also publishes `main` at https://ilmtrack.pages.dev (build `python3 build.py`, output `docs`, Pillow from `requirements.txt`). Keep every path in the app relative so both addresses work.
- `notes/`: background and decisions. Read `notes/decisions.md` before changing data or features.
- `SETUP.md`: step-by-step setup for GitHub, GitHub Pages, Cloudflare Pages, family sync and Claude Code prompts.

## Commands
- Build: `python3 build.py` (needs Pillow: `pip install pillow`)
- Run locally: `python3 -m http.server 8080 -d docs`, then open http://localhost:8080
- Test: `python3 scripts/test_app.py` (needs `pip install playwright` and `python -m playwright install chromium`)
- Check links: `python3 scripts/check_links.py`
- Sync end-to-end test: `python3 scripts/test_sync.py` (starts `scripts/dev_server.mjs`: the built app plus the real API on Node's SQLite, with a test-only login). Run it after any change to sync, the API or saved data.

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
- Vanilla JS, one HTML file, no framework, no build tools beyond `build.py`. External requests: Google Fonts (cached by the service worker), and Google's sign-in script (`accounts.google.com/gsi/client`), loaded only on More → Family when signed out on a site with the sync server. The service worker never caches `/api/`.
- Saved data lives in localStorage under `ckledger.v1`. New student fields must get defaults in `fix()` so old backups still load. Backups must stay restorable.
- When `docs/` content changes, bump `CACHE` in the service worker string inside `build.py` (e.g. `ckledger-v3`) so installed copies update.
- Mobile first: must work at 400px wide with no horizontal scroll. Light and dark themes via the CSS tokens at the top of `src/app.html`; no literal colours in components.
- Keyboard focus visible, every control labelled, `prefers-reduced-motion` respected.
- Every tappable control is at least 44×44px (`--tap`). Borders of controls use `--control-line` (3:1 contrast); `--line` is for decorative dividers only.
- Sizes in `rem`, never a fixed `px` font size, so text follows the phone's text-size setting. No horizontal scroll at 200% zoom.
- Use logical CSS (`padding-inline-start`, `inset-inline-end`, `text-align:start`) instead of left/right, so the planned Urdu (right-to-left) layout mirrors correctly.
- Messages go through `toast()`, which also announces them to screen readers; pass an undo function for anything destructive.
- First visit: a two-question setup (child's name and class) on Home adds that class's `SCHOOL_LIST` books; `ui.welcome` controls it. **Add child** (Home and More, `data-addchild`) reuses the same form. Child details have their own screen (More → Child details). Say "child", not "student", in anything parents read.
- **Install app** button: uses Chrome's install prompt when offered, otherwise shows Safari or Chrome steps. Hidden when already installed or in the artifact build.
- Navigation: a bottom tab bar with five tabs: **Home** (default; the progress dashboard), **Goals**, **Books**, **Deen**, **Reading** (Core Knowledge). **More** is the ⋯ button in the top bar, covering Child details, Family, Progress report, Compare, Backup and Sources. Keep at most five tabs; tabs are for navigation only.
- Screens are routes in the address (`#/goals/sci`, `#/books/<id>`, `#/deen/quran`, `#/more/family`, `#/report`). Tabs replace the history entry (`tabTo`); opening an item pushes one (`go`, or `data-go` on a link) and the top bar shows **Back**, so the phone's back button and swipe-back work. Add new screens to `SCREENS` with a title and a render function.
- Progress report (`#/report`): an A4 page with print styles. Parents print it or save it as a PDF. It stays light like paper, even in dark mode.
- Qur'an: surah data comes only from `SURAHS` (Tanzil Quran Metadata). Never type Qur'anic text or surah data from memory. Progress is keyed by surah number (`quran.h`), so never renumber.
- Class goals are a checklist. Ticks are saved as `ncp-<subject>-<class>-<n>` (Pakistan goals) and `intl-<s>-<class>-<n>` (international extras from `INTL`, compared with the Core Knowledge Sequence; see `notes/alignment.md`). Never reorder or reuse rows in `NCP` or `INTL`; add new ones at the end. Extras never include U.S.-only or sensitive topics (evolution, puberty and reproduction, Israel and Palestine, other faiths' religious texts), and link only to a hand-checked Core Knowledge unit.
- Class goals come from `NCP` in `src/data.js`: plain-language summaries of Pakistan's National Curriculum progression grids (ncc.gov.pk), each point with the grid's SLO codes. Never add a goal from memory; summarise only what the grid says for that class, and record the source in `notes/decisions.md`. Update them when the draft 2026 national curriculum is final.
- Core Knowledge is optional extra reading: no "expected by now" pace on it, U.S.-only units hidden unless the parent turns them on, History & Geography grouped by region (`HG_REGION`). Give every new History & Geography unit a region.

## Design skills
- `.claude/skills/hig-*`: Apple Human Interface Guidelines skills from HIG Doctor (Raintree Technology, MIT; Apple's reference text in each `references/` folder is © Apple Inc.). Snapshot copied on 11 October 2026 from commit 5e20558.
- `.claude/apple-design-context.md` tells those skills this is a web PWA for iPhone and Android. Follow it: apply HIG principles through web equivalents, and keep the existing tokens and fonts unless the owner asks for a restyle.
- For any UI change, check it against the relevant hig-* skill (layout, controls, dialogs, accessibility, dark mode) before reporting it done.

## Backend (Cloudflare Pages Functions + D1, free)
- Plan and safety rules: `notes/backend-plan.md`. Code: `server/app.js`, `server/auth.js`, tables `server/schema.sql`, entry `functions/api/[[path]].js`.
- Tests: `node --test server/test/api.test.js` (Node 22+, no installs; `server/test/d1.js` stands in for D1). Any server change must keep every test passing and add tests for new cases.
- Offline-first: localStorage stays the main copy; sync is added on top and only when signed in. Signed-out use must keep working, and on the GitHub Pages address (no `/api`).
- App side (in `src/app.html`, "Family sync"): changes are found by comparing each child with a snapshot of what was last synced (`ckledger.sync` in localStorage), so new fields need adding to `flat()` and `applyPull()` to sync. Every `save()` schedules a sync; sync's own writes use `localSave()`. The Google client ID comes from `/api/config`, never from the code.
- Every route that touches family data checks membership and role. Child phones may change only `s:`, `n:`, `r:` and `q:` marks. The owner cannot be removed. Use bound SQL parameters only.
- One row per tick in `marks`, so phones never overwrite each other's different changes. Schema changes must be additive (new tables or columns), never dropping data; add the SQL to `server/schema.sql` and tell the owner to run it in the D1 console.
- Bindings (`DB`, `GOOGLE_CLIENT_ID`) live in the Cloudflare dashboard, not in a `wrangler.toml`. The Google client ID is public; there are no secrets. Never commit API tokens, keys or `.env` files.

## Writing style for anything users read
- Plain, direct English. Short sentences. No filler, no "worth noting", no em-dash asides, no emoji section markers.
- Use proper Islamic titles and salutations: the Prophet ﷺ, Sayyidunā …, Companions رضي الله عنه / رضي الله عنها / رضي الله عنهم, scholars رحمه الله.
- Credit the character list to Abul Laith Muhammad Tahir Qadri, as written in the article.
- The app is independent; say it is not affiliated with the Core Knowledge Foundation or Oxford University Press.
