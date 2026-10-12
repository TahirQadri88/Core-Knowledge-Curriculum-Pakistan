# Backend plan: free family sync on Cloudflare (Pages Functions + D1)

Goal: a family signs in once, and every parent's and child's phone shows the same progress. The app keeps working offline, and keeps working exactly as now for families who never sign in.

Chosen by the owner on 12 October 2026 instead of the earlier Firebase plan: one account (the site is already on Cloudflare Pages), the same address for app and API, and higher free limits.

## Free limits (checked on developers.cloudflare.com, 12 October 2026)
- Pages Functions / Workers: 100,000 requests a day, 10 ms CPU per request.
- D1: 5 GB storage, 5 million rows read and 100,000 rows written a day.
- Workers KV was rejected: 1,000 writes a day on the free plan.
- One tick is one row written. A family ticking 50 things a day writes about 50 rows, so the free plan covers roughly 2,000 active families a day. If a daily limit is reached, sync pauses until the next day; phones keep working.

## Parts
- `server/schema.sql`: the D1 tables. Pasted once into the D1 console for each database.
- `server/auth.js`: Google sign-in check, sessions, cookies, invite codes.
- `server/app.js`: the API. `functions/api/[[path]].js` hands every `/api/...` request to it.
- `server/test/`: tests, run with `node --test server/test/api.test.js` (Node 22 or newer, nothing to install). `server/test/d1.js` stands in for D1 using Node's built-in SQLite.
- Bindings are set in the Cloudflare dashboard, not in a `wrangler.toml`: D1 database bound as `DB` (production `ilmtrack`, preview `ilmtrack-preview`) and a variable `GOOGLE_CLIENT_ID`.

## Sign-in
- Parents: "Sign in with Google" (Google Identity Services). The browser gets a signed ID token; the server checks the signature with Google's public keys, the issuer, the audience (our client ID) and the expiry, then sets its own session cookie: `it_s`, HttpOnly, Secure, SameSite=Lax, Path=/api, 60 days. Only a SHA-256 hash of the session token is stored.
- No secret key exists anywhere. The Google client ID is public by design.
- Children's phones: a parent makes a one-time code (10 characters, no look-alike letters, shown as `K7QXM-4TPRA`, valid 7 days). Opening the invite link or typing the code on the child's phone creates a "device" user and signs that phone in. No Google account is needed for children.
- A parent code (for a second parent) needs Google sign-in first.
- Risk to test early: Google sign-in inside an installed iPhone home-screen app. Fallback: a parent code typed on that phone after signing in through Safari.

## Roles
- Parent: everything. Child details, books, routine items, character levels, invites, removing members.
- Child (owner's choice: ticks only): may change ticks (`s:`), notes (`n:`), routine ticks (`r:`) and Qur'an marks (`q:`). May not change character levels, child details, books, invites or members.
- The owner (who created the family) cannot be removed. Only the owner can delete the family.

## Data
- `users`, `sessions`, `families`, `members` (parent or child), `invites` (hashed codes), `attempts` (wrong-code counter).
- `children`: one JSON document per child with name, age, class, school-year start, track, books, own objectives, own character items, routine items, Qur'an reading stage and khatms. Unknown fields are dropped.
- `marks`: one row per tick or value, so two phones changing different things never overwrite each other. Keys:
  - `s:<id>` status
  - `n:<id>` note
  - `cv:<id>` character level
  - `q:<surah>` hifz
  - `r:<date>:<routine item>` routine tick
  - `v = NULL` means removed.

## Sync
- The phone's localStorage stays the main copy. Each change is saved on the phone first. The app finds what changed by comparing every child with a snapshot of what was last synced (`ckledger.sync`), so no edit can be missed.
- When a phone joins or creates a family, its first sync only downloads. After that it sends its own changes, so an old copy never overwrites newer family data.
- A child's phone sends only ticks, notes, Qur'an marks and routine ticks. Its other changes stay on that phone.
- `POST /api/sync { family, since, children, marks }`: the server applies the phone's queued changes, then returns every child and mark changed after `since`, plus a new `cursor`.
- The server stamps each write with its own clock, and the last write to arrive wins. More than 5,000 changed rows come back in pages (`more: true`).
- Sync runs when the app opens, when it comes back to the foreground, after changes (batched), and every few minutes while open.
- Status shown: "Saved on this phone", "Synced", "Offline, will sync later".
- First sign-in asks "Add this phone's children to the family?" and never uploads without asking.
- Backups (copy and paste) keep working for everyone.

## Safety
- Every request with family data checks membership; a non-member gets "not found".
- Cross-site protection: every write must carry the header `X-Ilm: 1`, and the Origin must be our own site.
- Limits:

  | What | Limit |
  | --- | --- |
  | Request size | 512 KB |
  | Child details | 64 KB each |
  | One value | 4 KB |
  | Changes per sync | 2,000 |
  | Families owned per user | 5 |
  | Members per family | 20 |
  | Children per family | 30 |
  | Open invites per family | 20 |

- Wrong codes are limited to 20 an hour per network address.
- All SQL uses bound parameters; ids and keys are checked against strict patterns.
- Data kept: first names, classes and progress, plus the parent's Google name and email. No ads, no tracking.
- The owner can delete the family, which removes all its rows.

## Tests (`server/test/api.test.js`, all must pass before any deploy)
- **Access:** signed-out and stranger requests are refused. Requests from another website are refused.
- **Google sign-in:** rejects a wrong signing key, another app's token, an expired token and a wrong issuer.
- **Codes:**
  - A child's phone joins with a code.
  - A code works once and expires.
  - Cancelled codes stop working.
  - Wrong codes are blocked after 20 an hour, for that address only.
  - Parent codes need Google sign-in.
- **Roles:** a child's phone can tick but not change character levels, child details, invites or members.
- **Members and family:**
  - The owner cannot be removed.
  - A removed child's phone is signed out.
  - Only the owner deletes the family, and nothing is left.
- **Sync:**
  - Two phones' different ticks both survive.
  - The latest change to the same thing wins.
  - Sync returns only what changed.
  - Bad input is rejected.
  - Without a database, the site says sync is not set up.

## Order of work
1. Done: server, tables and tests (no app change).
2. Done: the app side. It has a Family section under More, sync status in the header, the Google client ID read from `/api/config`, and snapshot-based change detection. It is tested end to end with `scripts/test_sync.py`.
3. Owner setup in Cloudflare and Google (SETUP.md section 4), then a live test on two phones, one of them an installed iPhone app.
4. Later, optional: delete a user's own account; export all family data as a file.
