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
- OUP Pakistan series names come from oup.com.pk product pages and a Karachi school book list (https://dps.edu.pk/doc/book-list/Class-V.pdf). OUP publishes no chapter lists, so none are bundled.
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
