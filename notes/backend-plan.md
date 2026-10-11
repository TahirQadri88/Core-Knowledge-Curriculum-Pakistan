# Backend plan: free family sync with Firebase (Spark plan)

Goal: a family signs in once, and every parent's and child's phone shows the same progress, while the app keeps working offline exactly as it does now.

## Why Firebase Spark
Checked on firebase.google.com/pricing, 12 October 2026:
- No payment method needed.
- Cloud Firestore: 1 GiB stored, 50,000 document reads, 20,000 writes and 20,000 deletes per day, 10 GiB/month egress.
- Authentication: 50,000 monthly active users. Phone sign-in is not available on Spark, so use Google sign-in (and optionally email link).
- Cloud Functions are not available on Spark. All logic stays in the browser and in security rules.
- Firestore's web SDK has an offline cache, so the app still works without a connection and syncs later.

Supabase's free plan was rejected because free projects pause after one week of inactivity (supabase.com/pricing, same date).

A family of 4 children ticking 30 items a day uses about 120 writes. The limits cover thousands of families.

## Data model
```
families/{familyId}
  name: string
  owner: uid
  members: { <uid>: "parent" | "student" }
  parentCode: string (random, at least 10 chars, members only)
  studentCode: string (random, at least 10 chars, members only)
  lastJoin: string (the code the most recent joiner used)
  createdAt: timestamp

families/{familyId}/students/{studentId}
  the same student object the app keeps in localStorage today:
  name, age, grade, start, track, status, notes, custom, books, cv, ccustom
  plus updatedAt (server timestamp) and updatedBy (uid)
```
One document per child keeps reads low (one read per child on open). Firestore's 1 MiB document limit allows hundreds of notes per child; if notes ever grow past that, move them to a `notes` subcollection.

## Sync rules
- localStorage stays the first copy. The app must keep working signed out, as it does now.
- Signed in: write single fields with field paths, for example `updateDoc(ref, { "status.la-4-2": {...} })`. Two phones ticking different units then never overwrite each other.
- On first sign-in, offer "Add this phone's students to the family". Never upload silently.
- Show a small sync state: Saved on this phone / Synced / Offline, will sync later.
- Backups (copy/paste JSON) keep working for families who never sign in.

## Joining a family
- A parent creates the family. The app makes `parentCode` and `studentCode` with `crypto.getRandomValues`.
- The invite is a link: `https://<user>.github.io/ck-ledger/#join-<familyId>-<code>` (a bare hash token, letters, digits and dashes only).
- The joiner signs in, and the app writes `members.<uid>` and `lastJoin: <code>` to the family. The security rules accept that write only when the code matches and the joiner adds only themselves.
- A parent can make new codes at any time, which stops old links working.

## Roles
- Parent: everything, including the character levels and deleting students.
- Student: reads the family's students, and may tick units and write notes (`status`, `notes`), nothing else.

## Security rules
Draft in `firebase/firestore.rules`. They must be tested in the Firestore emulator with `@firebase/rules-unit-testing` before deploying. Cases to cover:
- A stranger cannot read or write a family or its students.
- A joiner with the wrong code cannot add themselves; with the right code they can add only themselves, with the matching role.
- A student cannot change `cv`, `books`, `name`, `grade` or delete a student; a parent can.
- Nobody can remove the owner.

## Front-end wiring
- Load the Firebase modular SDK from `https://www.gstatic.com/firebasejs/<pinned version>/` only in the GitHub Pages build (`docs/`). The claude.ai artifact build stays local-only, since its content policy blocks that host.
- Put the web config in `src/firebase-config.js`. The web config is public by design; protection comes from the security rules. Never commit a service-account key.
- Use `initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })`.
- Google sign-in: use `signInWithPopup`, and fall back to `signInWithRedirect` when the popup is blocked (installed iPhone apps often block popups).
- In Firebase Authentication → Settings → Authorized domains, add `<user>.github.io`.
- Update the service worker cache list to include the Firebase SDK files, and bump `CACHE`.

## Later, optional
- App Check (reCAPTCHA Enterprise) to stop other sites using the web config.
- Restrict the browser API key to the GitHub Pages domain in Google Cloud console.
