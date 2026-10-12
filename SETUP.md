# Ilm Track: setup with Claude Code

How to put this project on GitHub, publish it free with GitHub Pages and Cloudflare Pages, add free family sync on Cloudflare, and keep building it with Claude Code from a phone.

What you need: a GitHub account connected to Claude Code, a paid Claude plan that includes Claude Code, a free Cloudflare account, and a Google account (for the sign-in client ID). No payment card is needed for any of them.

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

### Short address: ilmtrack.pages.dev (Cloudflare Pages, free)
The same app is also published at **https://ilmtrack.pages.dev** from `main`. Set it up once:
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**. Allow Cloudflare to see this repository, then pick it.
2. Project name: `ilmtrack`. Production branch: `main`.
3. Framework preset: **None**. Build command: `python3 build.py`. Build output directory: `docs`.
4. **Save and Deploy**. Cloudflare installs Pillow from `requirements.txt`, runs the build and publishes `docs/`. Later pushes to `main` publish automatically; pushes to other branches get their own preview addresses.

Saved progress belongs to the address it was made on. To move a child's progress from the GitHub Pages address: open the old address, **More → Backup → Copy backup**, then open ilmtrack.pages.dev, **More → Backup → paste → Restore from text**.

## 3. First Claude Code session

Open Claude Code, start a session on the `ck-ledger` repository, and send:

```
Read CLAUDE.md, SETUP.md and the notes folder. Install what the build and tests need
(pip install pillow playwright, then python -m playwright install chromium).
Run python3 build.py, python3 scripts/test_app.py and python3 scripts/check_links.py.
Report the state of the project and anything that fails. Do not change code yet.
```

`CLAUDE.md` holds the project rules Claude Code follows in every session: verify every unit on coreknowledge.org, never renumber saved ids, keep the app offline-first, test before pushing, plain writing, and proper Islamic titles and salutations.

## 4. Set up family sync (Cloudflare D1 and Google sign-in)

Family sync lets every parent's and child's phone show the same progress. It runs only on **ilmtrack.pages.dev**; the GitHub Pages address stays a phone-only copy. Design and limits: `notes/backend-plan.md`. Free limits (checked 12 October 2026): 100,000 requests and 100,000 database writes a day, 5 GB stored. Nothing here needs a secret key or a payment card. Never paste a password, API token or private key into Claude Code or the repository.

Dashboard names change from time to time; if a button is named slightly differently, pick the closest one.

**4.1 Create the two databases**
1. Cloudflare dashboard → **Storage & Databases** → **D1 SQL Database** → **Create database**.
2. Name `ilmtrack`. Location: **Asia-Pacific** if offered. Create.
3. Repeat with the name `ilmtrack-preview` (used by test branches, so testing never touches real family data).

**4.2 Create the tables**
For each database: open it → **Console** → paste the whole of `server/schema.sql` from the repository → **Execute**. Running it again later is safe.

**4.3 Get a Google sign-in client ID** (free, about 5 minutes)
1. Open https://console.cloud.google.com → project picker → **New project** → name `ilmtrack` → Create.
2. **Google Auth Platform** (or **APIs & Services → OAuth consent screen**) → **Get started**. App name `Ilm Track`, your support email, audience **External**, your contact email → Create. Then **Audience → Publish app** so any family can sign in. Only the basic name and email are used, which needs no Google review.
3. **Clients** (or **Credentials**) → **Create client** → type **Web application** → name `Ilm Track`.
4. **Authorised JavaScript origins** → add `https://ilmtrack.pages.dev`. To test sign-in on a branch preview, also add that preview's address as Cloudflare shows it (for example `https://claude-ck-ledger-setup-gu.ilmtrack.pages.dev`).
5. Create, and copy the **Client ID** (it ends in `.apps.googleusercontent.com`). It is public by design. There is no need to copy the client secret; the app never uses it.

**4.4 Connect them to the Pages project**
1. **Workers & Pages** → `ilmtrack` → **Settings** → **Bindings** → **Add** → **D1 database**. Variable name `DB`, database `ilmtrack`. Do this for **Production**, then switch to **Preview** and bind `DB` to `ilmtrack-preview`.
2. **Settings** → **Variables and Secrets** → **Add**: name `GOOGLE_CLIENT_ID`, type Text, value = the Client ID. Add it for both Production and Preview.
3. **Deployments** → latest deployment → **Retry deployment**, so the new settings are used.
4. Check: open https://ilmtrack.pages.dev/api/me. It should show `{"user":null,"families":[]}`. If it says sync is not set up, the `DB` binding is missing.

## 5. Finish and test family sync with Claude Code

The server, tables and their tests are in the repository (`server/`, `functions/api/`). Run the server tests any time with `node --test server/test/api.test.js`.

**5.1 Connect the app** (Claude Code builds this part)
```
Add family sync to the app as described in notes/backend-plan.md, step 2.
The Google client ID is <paste it here>. Keep signed-out use working exactly as now.
Run the server tests and the browser test, bump the cache, then commit and push.
```

**5.2 Test with two phones**
1. Phone 1: open https://ilmtrack.pages.dev, sign in with Google, create the family, add a child.
2. On phone 1, make a **child code**. On phone 2, open the invite link or type the code.
3. Tick a goal on phone 2 and check it appears on phone 1.
4. Turn mobile data off on phone 2, tick something, turn data on, and check it reaches phone 1.
5. On an iPhone, install the app to the home screen and try Google sign-in there too.

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
| `requirements.txt` | Python packages the build needs (Pillow), used by Cloudflare Pages |
| `docs/` | Generated app (the Pages workflow rebuilds it); do not edit by hand |
| `.github/workflows/pages.yml` | Publishes `main` and `claude/...` branches to GitHub Pages |
| `scripts/test_app.py` | Browser smoke test |
| `scripts/check_links.py` | Checks every unit link on coreknowledge.org |
| `server/` | Family sync API (`app.js`, `auth.js`), D1 tables (`schema.sql`) and their tests |
| `functions/api/[[path]].js` | Cloudflare Pages Function that sends `/api/...` requests to `server/app.js` |
| `notes/backend-plan.md` | Family sync design: sign-in, roles, data, sync, safety, tests |
| `notes/decisions.md` | What was verified, where, and when |
| `notes/background.md` | How the project started and key facts used |
| `.claude/skills/hig-*` | Apple HIG design skills (HIG Doctor, MIT) |
| `.claude/apple-design-context.md` | Tells the HIG skills this is a web PWA and what to keep |

Sources: Cloudflare D1 pricing https://developers.cloudflare.com/d1/platform/pricing/ · Workers pricing https://developers.cloudflare.com/workers/platform/pricing/ · Claude Code setup https://code.claude.com/docs/en/setup
