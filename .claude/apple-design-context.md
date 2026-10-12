# Apple design context: Ilm Track

Read by the hig-* skills before they ask questions.

## Product
- What it does: an offline progressive web app where Karachi parents see what Pakistan's National Curriculum expects in each class, and track school textbook chapters, character and deen goals, and optional Core Knowledge reading for each child.
- Category: education / family productivity.
- Stage: being built and tested by the owner; adding family sync on Cloudflare (Pages Functions + D1).

## Platform
- **Web app, not a native app.** Plain HTML, CSS and vanilla JavaScript in one file (`src/app.html`), installed to the home screen as a PWA. There is no SwiftUI, UIKit or Xcode project.
- Main devices: iPhone (Safari, home-screen app) and Android phones (Chrome), then tablets and laptops. Design for 400px wide first.
- Apply Apple HIG principles through web equivalents: semantic colour tokens instead of system colours, `-apple-system` / `system-ui` in font stacks, 44×44 pt minimum touch targets, safe-area insets (`env(safe-area-inset-*)`), `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`.
- SF Symbols cannot be used on the web; use inline SVG icons or text labels.

## Users
- Pakistani Muslim parents and children aged about 4 to 14. Many parents read English as a second language, so labels must be short and plain.
- An Urdu interface (right-to-left) is planned. Layout must not break when `dir="rtl"` is set.

## Existing design system (keep unless the owner asks for a restyle)
- Three-colour palette chosen by the owner on 12 October 2026 (modern, no pastel tints). Emerald was tried first; the owner asked for another main colour.
  - **Indigo** is the main colour: buttons, the selected tab, progress, done, selected tiles. Light `#4338CA`, dark `#8E94FF`.
  - **Saffron** `#F4A100` is the highlight: the margin line, NOW badge, "Learning" and warnings.
  - **Ink** is the neutral for text and surfaces. Light text `#121417` on `#F4F4F1`/`#FFFFFF`; dark text `#EEEEEA` on `#0E1012`/`#171A1E`.
- A burnt-orange shade of saffron (`--bad`) is kept for errors and Delete.
- Tokens at the top of `src/app.html`:
  - Surfaces and text: `--paper`, `--surface`, `--ink`, `--muted`, `--line`, `--rule`, `--control-line`.
  - Main colour: `--accent`, `--accent-ink`, and `--margin` for the margin line.
  - Status text colours: `--good`, `--warn`, `--bad`, `--info`.
  - Solid fills with their text colour: `--good-fill`/`--on-good`, `--warn-fill`/`--on-warn`, `--bad-fill`/`--on-bad`, `--info-fill`/`--on-info`.
  - Neutral notice background: `--tint`.
  - Character levels: `--l0` to `--l3`, each with its own `-ink` text colour.
- Status badges are solid fills, not soft tints.
- Navigation: a bottom tab bar (Home, Goals, Books, Deen, Reading) with icons and labels; the current tab is filled with the main colour. A top bar shows Back, the screen title, the child picker and ⋯ (More). Items open their own screens.
- Every text/background pair passes WCAG AA (4.5:1) in both themes, and control borders pass 3:1. Recheck the contrast of any new pair before using it.
- Type: Bricolage Grotesque (display), Source Sans 3 (body), JetBrains Mono (codes).
- Visual idea: a ruled exercise copy with a saffron margin line.

## Accessibility requirements
- WCAG 2.1 AA contrast in both themes.
- Every control has a visible label or `aria-label`; keyboard focus is visible.
- Text scales with browser zoom up to 200% without horizontal scroll.

## How to use the HIG skills here
- Use them to review and improve layout, controls, navigation, feedback, dark mode, accessibility and writing.
- Translate native advice to web markup; do not introduce native-only components or Apple-only fonts that would look wrong on Android.
