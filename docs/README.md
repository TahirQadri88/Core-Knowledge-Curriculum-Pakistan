# Core Knowledge Ledger (PWA)

A self-contained progressive web app for tracking Core Knowledge objectives (Kindergarten to Grade 8)
for students and parents. All 256 Core Knowledge units and their source links are inside index.html.
Progress is stored in the browser on each device; use the Backup tab to copy or move it.

## Run it
Any static host works. Two quick options:

- GitHub Pages: create a repository, upload these files to the root, then Settings > Pages > Deploy from branch (main, /root).
- Local test: `python3 -m http.server 8080` in this folder, then open http://localhost:8080

Install: open the hosted page on a phone, then "Add to Home screen" (Android/Chrome) or Share > "Add to Home Screen" (iPhone/Safari).
After the first visit it works offline.

## Files
- index.html: the app, with all curriculum data inline
- manifest.json: install name, colours and icons
- sw.js: offline cache for the app and its fonts
- icons/: app icons

## Updating the curriculum
Unit data sits in the `RAW` object near the top of the first <script> in index.html. Each entry is
[title, path under coreknowledge.org/wp-content/uploads/, flags]. Flags: us, islam, sa, review, paid.
After editing, change CACHE in sw.js (e.g. ckledger-v2) so installed copies pick up the new version.

Unit lists were checked against coreknowledge.org on 11 October 2026; see the Sources tab.
This app is independent and not affiliated with the Core Knowledge Foundation.
