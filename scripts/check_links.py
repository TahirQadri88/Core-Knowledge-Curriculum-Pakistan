"""Check that every Core Knowledge unit link in src/data.js still exists on coreknowledge.org.

- Unit download pages are checked against the Foundation's own sitemap of free-resource pages.
- Online Resources PDFs are checked with an HTTP HEAD request.
Run this before each release, and whenever you add or change a unit.
"""
import os, re, sys, urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
data = open(os.path.join(ROOT, "src", "data.js"), encoding="utf-8").read()
UA = {"User-Agent": "Mozilla/5.0 (ck-ledger link check)"}


def get(url, method="GET"):
    req = urllib.request.Request(url, headers=UA, method=method)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, (r.read().decode("utf-8", "replace") if method == "GET" else "")


slugs = set(re.findall(r"\|((?:ckla|ckhg|cksci)-[a-z0-9_-]+|world-history)(?=[|\"])", data))
slugs |= {f"ckla-unit-{i:02d}-kindergarten-skills" for i in range(1, 11)}
pdfs = set(re.findall(r"(\d{4}/\d{2}/[A-Za-z0-9_.-]+\.pdf)", data))

sitemap = ""
for n in (1, 2, 3):
    try:
        sitemap += get(f"https://www.coreknowledge.org/library-sitemap{n}.xml")[1]
    except Exception as e:
        print(f"Could not read library-sitemap{n}.xml: {e}")

missing = sorted(s for s in slugs if f"/free-resource/{s}/" not in sitemap)
print(f"Unit pages: {len(slugs) - len(missing)} of {len(slugs)} found in the site index")
for s in missing:
    print("  MISSING page:", s)

bad = []
for p in sorted(pdfs):
    try:
        status, _ = get("https://www.coreknowledge.org/wp-content/uploads/" + p, "HEAD")
        if status >= 400:
            bad.append((p, status))
    except Exception as e:
        bad.append((p, str(e)))
print(f"Online Resources PDFs: {len(pdfs) - len(bad)} of {len(pdfs)} reachable")
for p, why in bad:
    print("  BROKEN pdf:", p, why)

sys.exit(1 if (missing or bad) else 0)
