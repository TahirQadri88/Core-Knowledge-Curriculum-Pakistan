# Decisions and verification record

All checks were made on 11 October 2026 unless stated.

## Core Knowledge data
- 256 units: CKLA 121 (K–3 read-aloud domains and Skills units, Grades 4–8 units), CKHG 73, CKSci 62.
- Unit download pages: every slug in `src/data.js` was matched against https://www.coreknowledge.org/library-sitemap1.xml, -2.xml and -3.xml. 254 units have a page. CKLA Grade 8 *Frankenstein* and *Narrative of the Life of Frederick Douglass* have no page; they link to their Online Resources PDFs.
- Online Resources PDFs (per-unit link lists) come from the unit lists on https://www.coreknowledge.org/history-geography/, https://www.coreknowledge.org/science/ and https://www.coreknowledge.org/language-arts/.
- CKLA K–2 domain order: https://www.coreknowledge.org/wp-content/uploads/2017/03/AnnotatedLesson_LL_CKLA.pdf
- CKLA Grade 3 domain order: RACHEL mirror https://rachel.core2learn.org/modules/en-coreknowledge/CoreKnowledgeG3.html (the Foundation's download page has no single list).
- CKLA Grades 4–5 use the units the Foundation offers free today, not its 2014 scope-and-sequence PDFs (those listed different units, some sold through Amplify). Grade confirmed directly on the unit pages for G4 U1, G4 U4, G4 U7, G5 U1, G5 U7, G5 U9; the rest by unit number and slug.
  - Grade 4: Brown Girl Dreaming (buy the book), The Middle Ages, King Arthur and the Round Table, Listen, My Children (Poetry), Geology, The American Revolution, The United States Constitution, Treasure Island.
  - Grade 5: They Call Me Güero (buy the book), Early American Civilizations, Adventures of Don Quixote, The Renaissance, A Midsummer Night's Dream, The Reformation, Poetry, Native Americans, The Science of Breakable Things (buy the book).
- CKHG Grade 7 is *A History of the United States* (one page for both volumes). CKHG Grade 8 *World History* volumes are free at https://www.coreknowledge.org/free-resource/world-history/ (confirmed from the product page).
- Mathematics is left out on purpose: families follow their school or board maths book.
- Kindergarten Skills unit titles are generic ("Kindergarten Skills, Unit n") because the site gives no names. Grade 1–3 Skills titles were read from page slugs; G3 "How Does Your Body Work?" and similar were matched to the RACHEL mirror.

## Guidance tags (ours, not the Foundation's)
- `us` on units mainly about U.S. history, civics or culture. Families may skip them; skipped units leave the percentage.
- `islam` on CKHG Grade 1 *Three World Religions* and Grade 4 *Medieval Islamic Empires*: written from outside the faith; parent reads first and adds proper titles.
- `review` on CKSci Grade 5 *Human Hormones and Reproduction*, Grade 8 *Genetics* and *Natural Selection and Common Ancestry*.

## School books
- OUP Pakistan series names come from oup.com.pk product pages and a Karachi school book list (https://dps.edu.pk/doc/book-list/Class-V.pdf).
- `SCHOOL_LIST` (11 October 2026): the owner's school book list for 2026–27, printed 15 July 2026 (Cambridge Levels I–VI, Matric Grades VII–VIII). Titles, editions, publishers and ISBNs were extracted from the PDF text, not retyped. Level n is stored as Class n. The optional Little Oxford Dictionary is left out. Pre-Nursery, Nursery and Grades IX–X are not stored, because the app covers KG to Class 8 and the IX–X pages list Sindh Textbook Board books without titles. The owner confirmed on 11 October 2026 that KG uses the Nursery list, so the Nursery books (Paragon Publications, Maktaba Barkat-ul-Madina) are stored as Class KG. The two Urdu titles were read from the page image, because the PDF text layer garbles Urdu.
- Correction (11 October 2026): OUP Pakistan does publish contents pages, inside the free Teaching Guide PDFs on oup.com.pk (for example New Oxford Social Studies for Pakistan 4th Edition, Oxford Reading Circle 2nd Edition). Bundled chapter lists must be copied from those guides or from the printed Contents page, with the source recorded here. Bundled so far in `BOOK_CHAPTERS` (keyed by pupil's-book ISBN), checked 11 October 2026 once oup.com.pk was allowed:
  - New Oxford Social Studies for Pakistan Book 5 (4th Edition) SNC, ISBN 9780190706999: 16 chapters from "05-New Oxford Social Studies for Pakistan TG 5 SNC.pdf". The SNC guide differs from the older 4th-edition guide (it adds 9a Entrepreneurship and replaces "Early history of Islam" and "Pakistan after independence" with "Ancient civilisations of the world"), so the SNC guide was used to match the school's edition. The product page https://oup.com.pk/new-oxford-social-studies-for-pakistan-book-5-snc.html carries the same ISBN. The owner photographed the printed book's imprint page and Contents (ISBN 9780190706999, "Fourth Edition with online digital content (SNC) published in 2021", Eighth Impression 2026): all 16 chapters match in order and wording, and the starting page of each chapter was added from it.
  - New Oxford Primary Science Book 5 (3rd Edition) SNC, ISBN 9780190706944: 11 units from "NOPS TG 5 SNC.pdf". Its contents page lists Unit 9 as "Structure of Earth", repeating Unit 8; the guide's lesson pages and curriculum map call Unit 9 "Space and Satellites", which is used. The owner's photos of the printed Third Edition Contents (11 October 2026) confirm all 11 units, including Unit 9 "Space and Satellites"; start pages and the four Parts were added from it, and Unit 8 uses the printed capitalisation "The Structure of The Earth". The photos do not show the ISBN page.
  - Primary Mathematics Book 5 (2nd Edition) SNC, ISBN 9780190709693: the product page https://oup.com.pk/school-textbooks/mathematics/new-syllabus-primary-mathematics-book-5-2nd-edition-snc.html shows this is New Syllabus Primary Mathematics. 15 chapters from "NSPM-Teacher's-Resource-Book-5.pdf" (2nd Edition, created April 2020, before the SNC printing). Marked `check: true`, so the app asks parents to compare with their book.
  - Oxford Discover 5 Student Book, 2nd edition (school list ISBN 9780194053990): 18 units with start pages and their nine Big Questions, from the owner's photos of the printed book's scope-and-sequence pages (11 October 2026). The cover confirms title, level and edition; the ISBN on the inside-cover card (9780194056250) belongs to the app access card, not the Student Book. The Workbook (school list ISBN 9780194054010) has its own start pages from the owner's photo of its printed contents, which list only unit numbers under the same nine Big Questions; each Workbook unit is labelled with the title of the Student Book unit of the same number.
  - Keyboard Computer Science with Application Software Book 5, Fourth Edition (ISBN 9789697346257): 6 chapters in 4 units with start pages, from the owner's photos of the printed imprint page (Fourth Edition adapted and published in Pakistan in 2025, Third Impression 2026) and Contents, 11 October 2026. OUP Pakistan has no Teaching Guide for this book.
  - Karwan-e-Urdu Book 5, Paramount Books (ISBN 9789696370543, printed in Urdu digits as ۹۷۸-۹۶۹-۶۳۷-۰۵۴-۳; author Professor Ali Akbar; first published 2015, ninth printing 2026): 29 lessons with start pages, typed in Urdu from the owner's photos of the printed فہرست, 11 October 2026. The book prints the full salutation after the name of the Prophet; the app uses ﷺ. رحمۃ اللہ علیہ marks after Saʿdi and Iqbal are kept as printed.
  - Classes 1 to 8, from the Teaching Guides listed on https://oup.com.pk/teaching-guides (11 October 2026), matched to the school list by edition:
    - Primary Mathematics Books 1, 2, 3, 4 (SNC) and 6: New Syllabus Primary Mathematics Teacher's Resource Books 1, 2, 3, 4 and 6 (2nd Edition). Titles split by the two-column layout were read from the contents-page images; where the contents page is cut short or misprinted ("Addition and Subtraction Within", "Additional and Subtraction Within 10 000") the chapter title is taken from the guide's lesson pages. Books 1 to 4 are marked `check: true` because the guides predate the SNC printings. The A and B workbooks are not given chapters.
    - New Oxford Primary Science 3 (TG 3) and 4 SNC (TG 4 SNC). TG 4 SNC's contents page is untidy ("Topic:" prefixes, a missing Part 3) and the guide names Unit 5 both "Forces, Energy and Machines" and "Forms of Energy and Energy Transfer", so Book 4 is marked `check: true` and shown without Part headings.
    - New Oxford Social Studies for Pakistan 3 (TG 3) and 4 SNC (TG 4 SNC), with unit headings.
    - Keyboard Books 6 to 8, 4th Edition (Keyboard-4E-TG-6 to 8).
    - New Oxford Secondary Science 6 to 8 (TG 6 to 8). Shown without Biology/Chemistry/Physics headings because TG 7's contents page prints "Structure of an Atom" under Biology.
    - Secondary Social Studies for Pakistan Books 1 to 3, Revised (Teaching Guides 1 to 3), under Geography and History sections.
    - Oxford Progressive English 7 and 8 SNC (Teaching Guides 7 and 8 SNC).
    - Countdown 7 and 8 (3rd Edition): the Teaching Guides map units to curriculum outcomes but never give unit titles, so no chapters are bundled.
  - Not available from oup.com.pk: Oxford Discover guides (OUP English Language Teaching, not OUP Pakistan), and the non-Oxford books (Paragon, Paramount, Maktaba Barkat-ul-Madina). Parents paste these.
- Chapter-to-unit suggestions: shared title words, weighted by rarity, light preference for nearby grades, small synonym map (`SYN`, e.g. indus → india). Suggestions only.

## Class goals: Pakistan's National Curriculum (11 October 2026)
- Why: the owner found the app did not show what a Pakistani child should know by a given class, and Core Knowledge's history is mostly American. The owner chose the National Curriculum as the backbone, Core Knowledge as optional extra reading grouped by region, and KG to Class 8.
- Source: the National Curriculum Council's progression grids on ncc.gov.pk (`NCP_SUBJ` in `src/data.js` holds each PDF). In force: National Curriculum of Pakistan 2020 for Early Childhood to Class 5, and 2022-23 for Classes 6 to 8. The Draft Federal Education Policy and the 2026 national curriculum are drafts and are not used. fbise.edu.pk refused our requests (403), so FBISE copies were not checked.
- Subjects by class, as the grids set them: KG = the Early Childhood grid's 4 to 5 years column; Classes 1 to 3 = English, Urdu, Mathematics, Islamiyat, General Knowledge; Classes 4 and 5 = those without General Knowledge, plus Science and Social Studies; Classes 6 to 8 = English, Urdu, Mathematics, Islamiyat, Science, History, Geography, Computer Science.
- `NCP` holds 4 to 11 plain-English points per subject and class, each with the grid's SLO codes (or the grid section where none are printed). They are summaries, not copies. They were written from the grids only, with no gaps filled from general knowledge:
  - Mathematics: from the "Required Standards and SLOs" tables (Classes 1 to 8).
  - English: from the "Suggested Guidelines" (Competencies A to D).
  - Urdu: from the "Required Standards and SLOs", read as page images because the PDF text is in visual order. Starred (advanced) items are left out. So is U-01-C-09 (noon ghunna, tashdeed and tanween in Class 1), which is too advanced to show as a Class 1 expectation. Two code misprints were noticed: page 4 prints "U-02-03-A" for U-03-A-02, and page 10 has a Class 1 cell labelled U-02-B-03, which is not used.
  - Islamiyat: from the scanned Islamiyat grid, read as page images. Each class has its own section with SLO codes I-<class>-<strand>-<n> (strands A Qur'an & Hadith to G Islamic teachings and modern needs); PDF page = printed page + 4. Hard-to-read print: Class 3 reading range (Paras 2 to 8), the Class 7 translation surahs (written as "selected surahs about Sayyidunā Ibrahim and Musa"), and the Class 8 translation beyond Surah Yusuf. Two points cite a printed page instead of codes (Class 5 Akhlaq, p. 85; Class 6 Ashara Mubashshara, p. 109). Class 1 was spot-checked against PDF page 25. The source writes Sayyidunā Ali with كرم الله وجهه; the app uses رضي الله عنه as the project's style rule says.
  - Social Studies, Class 5: the grid prints the culture outcomes under Class 5 with codes SS-06-B-01 to B-05. The codes are cited as printed.
- Progress on each subject comes from the child's school books whose subject teaches it (`NCP_BOOKS`). The goals themselves are not ticked, so no new ids are stored.
- Core Knowledge is now "Extra reading". It has no expected-by-now marker, because it is optional. U.S.-flagged units are hidden by default (`ui.hideUS`, switched on once for existing users by `ui.v = 2`), and hidden units do not count in percentages unless already done. History & Geography units are grouped by region (`HG_REGIONS`, `HG_REGION`; this tracker's grouping): 30 of 73 are about the United States, and 1 (Ancient India) is about South Asia.
- Tabs became Class goals (first and default; setup lands there), School books, Character & deen, Extra reading, More (Compare, Backup, Sources). Compare now measures each child on their school books.

## Three-colour palette (12 October 2026)
- The owner asked for a modern three-colour palette, not "AI standard pastel", with text readable in light and dark mode.
- The palette is emerald (main), saffron (highlight) and ink (neutrals). Badges, the selected class tile and character levels became solid fills instead of soft tints. Errors and Delete use a burnt-orange shade of saffron.
- Contrast was checked for every text and background pair in both themes: all are at least 4.5:1, and control borders at least 3:1. The icon and theme colour were updated to match.

## Family sync on Cloudflare instead of Firebase (12 October 2026)
- The owner asked whether Cloudflare could be the backend, and chose it over the earlier Firebase plan.
  - Reasons: one account, the same address, and higher free limits. D1 allows 100,000 writes a day; Firestore Spark allows 20,000.
- Owner's choices:
  - Children's phones join with a one-time code from a parent, with no Google account needed.
  - A child's phone may only tick, add notes, and mark routine and Qur'an.
- The Firebase draft (`firebase/firestore.rules`) was removed.
- Step 1 is done: the server, tables and tests (`server/`). The app is not connected yet.

## Name and address (12 October 2026)
- The owner renamed the app **Ilm Track**, with the subtitle "Core Knowledge Tracker for Pakistani Students" (the owner's wording, kept as given). Published free at https://ilmtrack.pages.dev (Cloudflare Pages) as well as on GitHub Pages.
- The saved-data key `ckledger.v1` and the backup id `"app": "ckledger"` are unchanged, so existing progress and backups still load.

## Daily routine (12 October 2026)
- The owner asked for the routine to be open for each family to set up for each child, rather than fixed from the daily plan document.
- Character & deen has a third section, Routine. Each child has their own list (`routine.items` = `{ id, t, at }`, where `at` is one of fajr, morning, zuhr, asr, maghrib, isha, any). Ticks are kept per local date in `routine.days[YYYY-MM-DD]` and pruned after 60 days. `fix()` gives the defaults.
- Set-up offers a simple starting routine (11 items, e.g. "Pray Fajr", "Homework", "Revise one surah"), a copy of another child's routine, or an empty list. Every item can be renamed, moved, re-timed or deleted (delete has Undo).
- Times follow the prayers, not the clock, so the routine needs no location or prayer-time calculation.
- A week strip shows the last 7 days; any of them can be opened and ticked.

## Class goals checklist and international extras (12 October 2026)
- The owner asked whether the goals match Core Knowledge, so Karachi children keep up with international standards, and asked for a simple checklist parents can tick.
- Comparison: Pakistan's goals against the Core Knowledge Sequence 2023 (https://www.coreknowledge.org/wp-content/uploads/2023/03/CK_Sequence2023_GK8_W3.pdf) for English, Mathematics, Science and History & Geography, KG to Class 8. Full results with page and code references: `notes/alignment.md`.
- Findings in short: maths is closely matched and Pakistan is often ahead on arithmetic, but behind on statistics and some Class 8 topics. Science covers similar ground but often 1 to 4 years later, with some topics missing. In English the skills match, but Pakistan names no literature and has no research skills. History & Geography reaches world history later, and some regions never.
- Owner's choices: extras can be ticked but are counted separately from Pakistan's goals; sensitive topics (evolution, puberty and reproduction, Israel and Palestine, other faiths' religious texts) are left out; a simple tick, not levels.
- `INTL` in `src/data.js`: up to 5 extras per subject per class (2 in KG). Topics Pakistan does not teach by Class 8 come first, then topics Pakistan teaches two or more years later.
  - U.S.-only topics are excluded.
  - Hand edits: Ashoka and the Byzantine Empire were dropped (Pakistani textbooks probably mention them), and so were Judaism, Darwin and "compare with religious sources". Low-value picks such as "Modern Mexico" and "Canada" were swapped for earlier-taught world history.
- Each extra links to a Core Knowledge unit only where one was checked by hand to fit (73 of 142). Automatic word matching was tried and rejected: it linked "Modern Japan" to Mount Rushmore and "Glands and hormones" to the reproduction unit.
- Ticks are saved in `status` as `ncp-<subject>-<class>-<n>` and `intl-<s>-<class>-<n>`. Never reorder or reuse NCP or INTL rows; add new ones at the end.

## Qur'an tracker (12 October 2026)
- The owner chose: inside Character & deen (sections Qur'an and Character, Qur'an first), four hifz levels, and this order: Qur'an, then the daily routine, then Urdu.
- Surah names, ayah counts and the juz each surah starts in: Tanzil Quran Metadata 1.0, https://tanzil.net/res/text/metadata/quran-data.js (Creative Commons Attribution 3.0), downloaded 12 October 2026, generated into `SURAHS`. Ayat al-Kursi (2:255) is tracked as its own item, id "ak".
- `QURAN_CLASS`: the surahs each class memorises, from the I-<class>-A SLOs of the National Curriculum Islamiyat grid (see Class goals). Class 3's al-Lahab is Tanzil's Al-Masad, and Class 8's al-Inshirah is Tanzil's Ash-Sharh.
- Saved per child as `quran.h[<surah number or "ak">] = { lv, d, r }`: lv is 0 Not started, 1 Learning, 2 Memorised, 3 Revise; d is the date the level changed; r is the date last revised. Plus `quran.read` ("q" for Qaida, or the para number) and `quran.khatm`. Surah numbers never change, so these ids are stable. `fix()` gives the defaults.
- "Due for revision" means marked Revise, or memorised and not revised for 30 days. Marking a surah Memorised counts as its first revision.
- Hifz opens on Ayat al-Kursi and Juz 30 from Surah an-Nas, the usual order for children. Due and All 114 (grouped by juz) are one tap away.

## Character & deen
- Items are the article's own list, made gender-neutral ("they") so the app works for daughters and sons.
- Four levels instead of a checkbox because habits form gradually. Each change is dated; history keeps the last 24 changes, used for the up/down trend.
- Harvard Center on the Developing Child links checked live: guide, activities guide (age bands 6–18 months, 18–36 months, 3–5, 5–7, 7–12, adolescents), infographic.

## Pace calibration
- "Expected" = months since the school-year start month ÷ 10, capped at 100%. Default start month April (Sindh Board sessions start 1 April). Many O Level schools start in August.

## Ideas not built yet
- Urdu interface option and Hijri dates.
- Family sync: in progress on Cloudflare, see notes/backend-plan.md.
- A printable term report (needs to run outside the claude.ai artifact viewer, which blocks printing).
- Sindh Board textbook chapters as a second book source, with the same suggestion engine.
- Weekly timetable view built from the daily plan document.
