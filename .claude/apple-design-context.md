# Apple design context: Core Knowledge Ledger

Read by the hig-* skills before they ask questions.

## Product
- What it does: an offline progressive web app where Karachi parents and students track Core Knowledge units, school textbook chapters, and character and deen goals for each child.
- Category: education / family productivity.
- Stage: shipped (version 2), now adding Firebase family sync.

## Platform
- **Web app, not a native app.** Plain HTML, CSS and vanilla JavaScript in one file (`src/app.html`), installed to the home screen as a PWA. There is no SwiftUI, UIKit or Xcode project.
- Main devices: iPhone (Safari, home-screen app) and Android phones (Chrome), then tablets and laptops. Design for 400px wide first.
- Apply Apple HIG principles through web equivalents: semantic colour tokens instead of system colours, `-apple-system` / `system-ui` in font stacks, 44×44 pt minimum touch targets, safe-area insets (`env(safe-area-inset-*)`), `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`.
- SF Symbols cannot be used on the web; use inline SVG icons or text labels.

## Users
- Pakistani Muslim parents and children aged about 4 to 14. Many parents read English as a second language, so labels must be short and plain.
- An Urdu interface (right-to-left) is planned. Layout must not break when `dir="rtl"` is set.

## Existing design system (keep unless the owner asks for a restyle)
- Tokens at the top of `src/app.html`: `--paper`, `--surface`, `--ink`, `--muted`, `--line`, `--rule`, `--accent` (deep teal), `--margin` (red margin line), semantic `--good`, `--warn`, `--bad`, `--info`, and level colours `--l0`–`--l3`. Light and dark values for each.
- Type: Bricolage Grotesque (display), Source Sans 3 (body), JetBrains Mono (unit codes).
- Visual idea: a ruled exercise copy with a red margin line.

## Accessibility requirements
- WCAG 2.1 AA contrast in both themes.
- Every control has a visible label or `aria-label`; keyboard focus is visible.
- Text scales with browser zoom up to 200% without horizontal scroll.

## How to use the HIG skills here
- Use them to review and improve layout, controls, navigation, feedback, dark mode, accessibility and writing.
- Translate native advice to web markup; do not introduce native-only components or Apple-only fonts that would look wrong on Android.
