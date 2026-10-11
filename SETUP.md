# Core Knowledge Ledger: setup with Claude Code

How to put this project on GitHub, publish it free with GitHub Pages, add a free Firebase backend for family sync, and keep building it with Claude Code from a phone.

What you need: a GitHub account connected to Claude Code, a paid Claude plan that includes Claude Code, and a Google account for Firebase. No payment card is needed for GitHub Pages or Firebase.

---

## 1. Create the repository

1. In the GitHub app or at https://github.com/new:
   - Repository name: `ck-ledger`
   - Visibility: **Public** (free GitHub Pages needs a public repository)
   - Tick **Add a README file**
   - Tap **Create repository**
2. Put the project files in it. Pick one:
   - **From the Claude chat (easiest on a phone):** reply in the chat where you got this zip with `repo created: <your-username>/ck-ledger`, and Claude pushes the whole project for you.
   - **From a computer:** unzip `ck-ledger-project.zip`, open the repository on github.com, choose **Add file → Upload files**, drag in everything *inside* the `ck-ledger` folder (not the folder itself), and commit.

   Uploading the zip itself through GitHub does not unpack it, so do not upload the `.zip` file.

## 2. Publish the app with GitHub Pages

1. In the repository: **Settings → Pages**.
2. Source: **GitHub Actions**. The workflow in `.github/workflows/pages.yml` does the rest.
3. After a few minutes the app is live at `https://<your-username>.github.io/ck-ledger/`.
4. On a phone, open that link and tap **Install app** at the top. On Android this opens Chrome's install prompt; on iPhone it shows the three Safari steps (Share, then **Add to Home Screen**). It works offline after the first visit.
5. On the first visit the app asks two questions: the child's name and class. Tap **Start** and that class's school books are added. The app then opens **Class goals**: what Pakistan's National Curriculum expects by the end of that class. Use **Add child** for brothers and sisters.

### Testing a branch before it goes to main
A push to `main` or to any `claude/...` branch publishes that branch at the same address within a few minutes. The last push is what is live. Test the new feature there, then merge the branch into `main` so `main` matches what is live.

## 3. First Claude Code session

Open Claude Code, start a session on the `ck-ledger` repository, and send:

```
Read CLAUDE.md, SETUP.md and the notes folder. Install what the build and tests need
(pip install pillow playwright, then python -m playwright install chromium).
Run python3 build.py, python3 scripts/test_app.py and python3 scripts/check_links.py.
Report the state of the project and anything that fails. Do not change code yet.
```

`CLAUDE.md` holds the project rules Claude Code follows in every session: verify every unit on coreknowledge.org, never renumber saved ids, keep the app offline-first, test before pushing, plain writing, and proper Islamic titles and salutations.

## 4. Set up Firebase (free Spark plan)

Why Firebase: no card, projects are not paused when unused, and Firestore has offline sync built in. Free limits (checked 12 October 2026): 1 GiB stored, 50,000 reads and 20,000 writes per day, 50,000 users per month. Phone-number sign-in and Cloud Functions are not on the free plan, so families sign in with Google and all access control lives in the security rules. If a daily limit is ever reached, syncing pauses until the next day; the app keeps working on the phone.

Open https://console.firebase.google.com in your phone browser. Switching the browser to **desktop site** makes the console easier to use.

1. **Add project** → name `ck-ledger` → turn **off** Google Analytics → create. It starts on the free Spark plan.
2. **Build → Authentication → Get started → Sign-in method → Google → Enable** → choose your support email → **Save**.
3. **Authentication → Settings → Authorized domains → Add domain** → `<your-username>.github.io`.
4. **Build → Firestore Database → Create database** → location **asia-south1 (Mumbai)** (closest to Karachi; it cannot be changed later) → **Start in production mode** → create.
5. **Project settings (gear icon) → General → Your apps → Web (`</>`)** → nickname `ck-ledger` → leave Firebase Hosting unticked → **Register app** → copy the `firebaseConfig` block.

The `firebaseConfig` block is public by design and safe to put in the code. Never paste a service-account key or any private key into Claude Code or the repository.

## 5. Build the backend with Claude Code

Send these one at a time. Wait for each to finish and check its report before sending the next.

**5.1 Test the security rules first**
```
Write emulator tests for firebase/firestore.rules using @firebase/rules-unit-testing,
covering every case listed in notes/backend-plan.md. Run them in the Firestore emulator.
Fix the rules until all tests pass, then commit and push. Show me the test results.
```

**5.2 Add family sync**
```
Implement Firebase sync as described in notes/backend-plan.md.
Here is the web config:
<paste the firebaseConfig block here>
Keep signed-out use working exactly as now. Add Google sign-in, family creation,
and invite links for parents and students. Write single fields with field paths.
Rebuild docs/, bump the service worker cache, run the browser test, then commit and push.
```

**5.3 Publish the rules** (only after 5.1 passed)

In the Firebase console: **Firestore Database → Rules** → replace everything with the contents of `firebase/firestore.rules` from the repository → **Publish**.

**5.4 Test with two phones**
1. Phone 1: open the app, sign in with Google, create the family, add a student.
2. Copy the **parent invite link** and open it on phone 2. Sign in there.
3. Tick a unit on phone 1 and check it appears on phone 2.
4. Turn mobile data off on phone 2, tick something, turn data on, and check it reaches phone 1.

## 6. Everyday work

Ask Claude Code in plain words, then finish each change with:

```
Build, run the browser test, run the link check if data changed, then commit and push.
```

Examples:
- `Add an Urdu option for the interface.`
- `Add a weekly timetable view based on notes/background.md.`
- `Here is the Contents page of Oxford International Primary Science Book 4: ... Add it as a book template parents can pick.`
- `Add a term report screen for each child.`

Pushed changes reach GitHub Pages in a few minutes. Installed phones pick up the new version the next time the app is opened online, because the build bumps the offline cache version.

## 6a. Apple design skills (already installed in this project)

The project includes the 14 Apple Human Interface Guidelines skills from HIG Doctor (Raintree Technology, MIT licence; Apple's guideline text in each `references/` folder is © Apple Inc.). They sit in `.claude/skills/hig-*`, and `.claude/apple-design-context.md` tells them this is a web app for iPhone and Android, so they translate native advice into web code instead of suggesting SwiftUI.

Because they are committed in the repository, they load in every Claude Code session on this repo, including phone and browser (cloud) sessions. Plugins installed with `/plugin` do **not** load in cloud sessions, which is why the skills are copied into the repo.

Use them with prompts like:
```
Review the Core Knowledge tab against the hig-foundations, hig-components-layout and
hig-components-controls skills. List the problems first; change nothing until I approve.
```
```
Check touch targets, dark mode contrast and Dynamic Type-style text scaling against the HIG skills,
then fix what fails. Keep the existing colour tokens and fonts.
```

**To add the same skills to another repository from your phone**, open a Claude Code session on that repo and send:
```
Clone https://github.com/raintree-technology/hig-doctor, copy every folder in its skills/ directory
into this repo's .claude/skills/, add its LICENSE as .claude/skills/HIG-DOCTOR-LICENSE.txt,
then run the hig-project-context skill to create .claude/apple-design-context.md for this project.
Commit and push.
```

**On a computer with Claude Code in the terminal** (local sessions only), you can install them as a plugin instead:
```
/plugin marketplace add raintree-technology/hig-doctor
/plugin install apple-hig-skills@apple-hig-skills
```

**To update** the copies in this repo later: `Replace .claude/skills/hig-* with the latest from raintree-technology/hig-doctor, keep apple-design-context.md, then commit.`

## 7. Moving existing progress

Progress recorded in the earlier claude.ai version of the app lives only in that browser. To move it:
1. In the old version: **Backup → Copy backup**.
2. In the GitHub Pages app: **More → Backup → paste → Restore from text**.

## 8. If something goes wrong

| Problem | What to do |
| --- | --- |
| GitHub Pages shows 404 | Check Settings → Pages uses source **GitHub Actions**, and that the latest **Deploy to GitHub Pages** run on the Actions tab is green. Wait a few minutes after the first publish. |
| Google sign-in fails with "unauthorized domain" | Add `<your-username>.github.io` under Authentication → Settings → Authorized domains. |
| Sign-in popup does nothing on iPhone home-screen app | Ask Claude Code: `Fall back to signInWithRedirect when the popup is blocked.` |
| Sync stops with a quota message | A daily free limit was reached; it resets the next day. Ask Claude Code to check for code that writes in a loop. |
| A unit link opens a missing page | Ask Claude Code: `Run scripts/check_links.py and fix any missing unit pages from coreknowledge.org.` |
| Old version still showing after an update | Close the app fully and reopen it while online. |

## Files in this project

| Path | What it is |
| --- | --- |
| `CLAUDE.md` | Project rules Claude Code reads every session |
| `SETUP.md` | This guide |
| `src/app.html` | The app: HTML, CSS and JavaScript |
| `src/data.js` | National Curriculum class goals, Core Knowledge units, school book list and chapters, character list |
| `build.py` | Builds `docs/` (the live app) and `build/` (single-file version and zip) |
| `docs/` | Generated app (the Pages workflow rebuilds it); do not edit by hand |
| `.github/workflows/pages.yml` | Publishes `main` and `claude/...` branches to GitHub Pages |
| `scripts/test_app.py` | Browser smoke test |
| `scripts/check_links.py` | Checks every unit link on coreknowledge.org |
| `firebase/firestore.rules` | Draft security rules (test before publishing) |
| `notes/backend-plan.md` | Firebase design: data model, sync, roles, joining |
| `notes/decisions.md` | What was verified, where, and when |
| `notes/background.md` | How the project started and key facts used |
| `.claude/skills/hig-*` | Apple HIG design skills (HIG Doctor, MIT) |
| `.claude/apple-design-context.md` | Tells the HIG skills this is a web PWA and what to keep |

Sources: Firebase pricing https://firebase.google.com/pricing · Supabase pricing https://supabase.com/pricing · Claude Code setup https://code.claude.com/docs/en/setup
