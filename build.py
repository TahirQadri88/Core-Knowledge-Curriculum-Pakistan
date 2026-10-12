import json, os, re, shutil, zipfile
from PIL import Image, ImageDraw, ImageFont

root = os.path.dirname(os.path.abspath(__file__))
app = open(os.path.join(root, "src", "app.html"), encoding="utf-8").read()
data = open(os.path.join(root, "src", "data.js"), encoding="utf-8").read()
inlined = app.replace("/*__DATA__*/", data)
os.makedirs(os.path.join(root, "build"), exist_ok=True)
open(os.path.join(root, "build", "artifact.html"), "w", encoding="utf-8").write(inlined)

pwa = os.path.join(root, "docs")
shutil.rmtree(pwa, ignore_errors=True)
os.makedirs(os.path.join(pwa, "icons"))

# split title/links/style from body for a proper document head
m = re.search(r"^(.*?</style>)(.*)$", inlined, re.S)
head, body = m.group(1), m.group(2)
doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#4338CA">
<meta name="description" content="What your child should learn each class, with school books, Qur'an, character and daily routine. Works offline.">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Ilm Track">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="manifest" href="manifest.json">
<link rel="icon" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/icon-180.png">
{head}
</head>
<body>
{body}
</body>
</html>
"""
open(os.path.join(pwa, "index.html"), "w", encoding="utf-8").write(doc)

manifest = {
    "id": "./",
    "name": "Ilm Track: Core Knowledge Tracker for Pakistani Students",
    "short_name": "Ilm Track",
    "description": "What your child should learn each class, with school books, Qur'an, character and daily routine. Works offline.",
    "lang": "en",
    "categories": ["education", "kids"],
    "orientation": "portrait",
    "start_url": "./",
    "scope": "./",
    "display": "standalone",
    "background_color": "#F4F4F1",
    "theme_color": "#4338CA",
    "icons": [
        {"src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
        {"src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}
    ]
}
json.dump(manifest, open(os.path.join(pwa, "manifest.json"), "w"), indent=2)

sw = """/* Ilm Track service worker: cache the app shell for offline use. */
const CACHE = "ckledger-v25";
const SHELL = ["./", "./index.html", "./manifest.json", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin && url.pathname.startsWith("/api/")) return; // family sync: always the network, never the cache
  if (url.origin === location.origin) {
    // app files: cache first, refresh in background
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; }).catch(() => hit);
      return hit || net;
    }));
  } else if (/fonts\\.(googleapis|gstatic)\\.com$/.test(url.hostname)) {
    // fonts: cache after first load so the app looks right offline
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
  }
});
"""
open(os.path.join(pwa, "sw.js"), "w").write(sw)

def icon(size, maskable=False):
    img = Image.new("RGB", (size, size), "#4338CA" if maskable else "#F4F4F1")
    d = ImageDraw.Draw(img)
    pad = int(size * (0.18 if maskable else 0.08))
    if not maskable:
        d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.16), fill="#4338CA")
    inner = pad + int(size * 0.08)
    # ruled lines + margin line, like an exercise copy
    for k in range(4):
        y = inner + int((size - 2 * inner) * (0.2 + 0.2 * k))
        d.line([inner + int(size * 0.12), y, size - inner, y], fill="#A9ADFF", width=max(2, size // 64))
    mx = inner + int(size * 0.08)
    d.line([mx, inner, mx, size - inner], fill="#F4A100", width=max(2, size // 64))
    # tick mark
    w = max(4, size // 18)
    a = (inner + int(size * 0.2), inner + int(size * 0.42)); b = (inner + int(size * 0.33), inner + int(size * 0.56)); c = (size - inner - int(size * 0.05), inner + int(size * 0.12))
    d.line([a, b, c], fill="#ffffff", width=w, joint="curve")
    return img

icon(192).save(os.path.join(pwa, "icons", "icon-192.png"))
icon(180, True).save(os.path.join(pwa, "icons", "icon-180.png"))  # iPhone home screen: full-bleed, iOS rounds the corners
icon(512).save(os.path.join(pwa, "icons", "icon-512.png"))
icon(512, True).save(os.path.join(pwa, "icons", "icon-maskable-512.png"))

readme = """# Ilm Track (PWA)

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
"""
open(os.path.join(pwa, "README.md"), "w").write(readme)
open(os.path.join(pwa, ".nojekyll"), "w").write("")

zp = os.path.join(root, "build", "ilmtrack-pwa.zip")
with zipfile.ZipFile(zp, "w", zipfile.ZIP_DEFLATED) as z:
    for dp, _, fs in os.walk(pwa):
        for f in fs:
            full = os.path.join(dp, f)
            z.write(full, os.path.join("ilmtrack", os.path.relpath(full, pwa)))
print("ok", os.path.getsize(zp))
