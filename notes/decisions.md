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
  - Not available from oup.com.pk: Oxford Discover guides (OUP English Language Teaching, not OUP Pakistan), and the non-Oxford books (Paragon, Paramount, Maktaba Barkat-ul-Madina). Parents paste these.
- Chapter-to-unit suggestions: shared title words, weighted by rarity, light preference for nearby grades, small synonym map (`SYN`, e.g. indus → india). Suggestions only.

## Character & deen
- Items are the article's own list, made gender-neutral ("they") so the app works for daughters and sons.
- Four levels instead of a checkbox because habits form gradually. Each change is dated; history keeps the last 24 changes, used for the up/down trend.
- Harvard Center on the Developing Child links checked live: guide, activities guide (age bands 6–18 months, 18–36 months, 3–5, 5–7, 7–12, adolescents), infographic.

## Pace calibration
- "Expected" = months since the school-year start month ÷ 10, capped at 100%. Default start month April (Sindh Board sessions start 1 April). Many O Level schools start in August.

## Ideas not built yet
- Urdu interface option and Hijri dates.
- Optional sync between a parent's and child's devices (for example Firebase), keeping offline-first.
- A printable term report (needs to run outside the claude.ai artifact viewer, which blocks printing).
- Sindh Board textbook chapters as a second book source, with the same suggestion engine.
- Weekly timetable view built from the daily plan document.
