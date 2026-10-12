// Ilm Track family sync API, run by Cloudflare Pages Functions (functions/api/[[path]].js) with a D1 database bound as DB.
// Every request that reads or writes family data checks that the signed-in user is a member of that family,
// and child phones may only change ticks, notes, routine ticks and Qur'an marks. See notes/backend-plan.md.
import { now, randomId, inviteCode, normCode, sha256, verifyGoogleToken, sessionCookie, newSession, sessionUser, endSession } from "./auth.js";

const MAX_BODY = 512 * 1024;
const INVITE_DAYS = 7;
const LIMITS = { familiesOwned: 5, members: 20, children: 30, openInvites: 20, changes: 2000, pull: 5000, docBytes: 64 * 1024, markBytes: 4 * 1024, failsPerHour: 20 };
const ID = /^[A-Za-z0-9_-]{1,40}$/;
const MARK = /^(s|n|cv|q|r):[A-Za-z0-9_.:-]{1,90}$/;
const CHILD_MAY = new Set(["s", "n", "q", "r"]);
const DOC_KEYS = ["name", "age", "grade", "start", "track", "custom", "books", "ccustom", "quran", "routine"];

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }
const fail = (status, msg) => { throw new HttpError(status, msg); };
const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers } });

async function readBody(request) {
  const len = +(request.headers.get("Content-Length") || 0);
  if (len > MAX_BODY) fail(413, "Request too large");
  const text = await request.text();
  if (text.length > MAX_BODY) fail(413, "Request too large");
  if (!text) return {};
  try { const b = JSON.parse(text); if (b && typeof b === "object" && !Array.isArray(b)) return b; } catch (e) {}
  fail(400, "Bad request");
}

// Cross-site protection: writes must come from our own page (same origin) and carry our custom header,
// which a page on another site cannot add without a CORS preflight that we never approve.
function checkOrigin(request) {
  if (request.method === "GET") return;
  if (request.headers.get("X-Ilm") !== "1") fail(403, "Forbidden");
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) fail(403, "Forbidden");
}

async function role(DB, familyId, userId) {
  if (!ID.test(String(familyId || ""))) fail(400, "Bad family");
  const m = await DB.prepare("SELECT role FROM members WHERE family_id = ? AND user_id = ?").bind(familyId, userId).first();
  if (!m) fail(404, "Family not found");
  return m.role;
}
const needUser = u => { if (!u) fail(401, "Please sign in"); return u; };
const needParent = r => { if (r !== "parent") fail(403, "Only a parent can do this"); };

async function me(DB, user) {
  const fams = await DB.prepare("SELECT f.id, f.name, f.owner, m.role FROM members m JOIN families f ON f.id = m.family_id WHERE m.user_id = ? ORDER BY f.created")
    .bind(user.id).all();
  return { user: { id: user.id, name: user.name, email: user.email || null, kind: user.google_sub ? "google" : "device" },
    families: fams.results.map(f => ({ id: f.id, name: f.name, role: f.role, owner: f.owner === user.id })) };
}

function cleanDoc(doc) {
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) fail(400, "Bad child");
  const out = {};
  for (const k of DOC_KEYS) if (doc[k] !== undefined) out[k] = doc[k];
  if (typeof out.name !== "string" || !out.name.trim()) fail(400, "Bad child");
  out.name = out.name.slice(0, 40);
  if (!Number.isInteger(out.grade) || out.grade < 0 || out.grade > 8) fail(400, "Bad child");
  const s = JSON.stringify(out);
  if (s.length > LIMITS.docBytes) fail(413, "Child details too large");
  return s;
}

async function tooManyFails(DB, ip) {
  const r = await DB.prepare("SELECT n FROM attempts WHERE ip = ? AND hour = ?").bind(ip, Math.floor(now() / 3600e3)).first();
  return (r?.n || 0) >= LIMITS.failsPerHour;
}
async function noteFail(DB, ip) {
  const hour = Math.floor(now() / 3600e3);
  await DB.batch([
    DB.prepare("INSERT INTO attempts (ip, hour, n) VALUES (?, ?, 1) ON CONFLICT (ip, hour) DO UPDATE SET n = n + 1").bind(ip, hour),
    DB.prepare("DELETE FROM attempts WHERE hour < ?").bind(hour - 24)]);
}

const routes = {
  "GET /api/me": async ({ DB, user }) => json(user ? await me(DB, user) : { user: null, families: [] }),

  "POST /api/auth/google": async ({ DB, env, body, deps }) => {
    let g;
    try { g = await verifyGoogleToken(body.credential, env.GOOGLE_CLIENT_ID, deps.fetch); } catch (e) { fail(401, "Google sign-in could not be checked"); }
    let u = await DB.prepare("SELECT id FROM users WHERE google_sub = ?").bind(g.sub).first();
    if (u) await DB.prepare("UPDATE users SET email = ?, name = ? WHERE id = ?").bind(g.email, g.name, u.id).run();
    else { u = { id: "u-" + randomId(12) }; await DB.prepare("INSERT INTO users (id, google_sub, email, name, created) VALUES (?, ?, ?, ?, ?)").bind(u.id, g.sub, g.email, g.name, now()).run(); }
    const token = await newSession(DB, u.id);
    const user = await DB.prepare("SELECT id, name, email, google_sub FROM users WHERE id = ?").bind(u.id).first();
    return json(await me(DB, user), 200, { "Set-Cookie": sessionCookie(token) });
  },

  "POST /api/auth/logout": async ({ DB, request }) => { await endSession(DB, request); return json({ ok: true }, 200, { "Set-Cookie": sessionCookie("", 0) }); },

  "POST /api/family": async ({ DB, user, body }) => {
    needUser(user); if (!user.google_sub) fail(403, "Sign in with Google to create a family");
    const n = await DB.prepare("SELECT COUNT(*) AS n FROM families WHERE owner = ?").bind(user.id).first();
    if (n.n >= LIMITS.familiesOwned) fail(429, "Too many families");
    const id = "f-" + randomId(12), name = String(body.name || "My family").trim().slice(0, 60) || "My family";
    await DB.batch([DB.prepare("INSERT INTO families (id, name, owner, created) VALUES (?, ?, ?, ?)").bind(id, name, user.id, now()),
      DB.prepare("INSERT INTO members (family_id, user_id, role, created) VALUES (?, ?, 'parent', ?)").bind(id, user.id, now())]);
    return json({ ...(await me(DB, user)), family: id });
  },

  "POST /api/invite": async ({ DB, user, body }) => {
    needUser(user); needParent(await role(DB, body.family, user.id));
    const r = body.role === "parent" ? "parent" : "child";
    const open = await DB.prepare("SELECT COUNT(*) AS n FROM invites WHERE family_id = ? AND used_by IS NULL AND expires > ?").bind(body.family, now()).first();
    if (open.n >= LIMITS.openInvites) fail(429, "Too many open invites. Cancel some first.");
    const code = inviteCode(), expires = now() + INVITE_DAYS * 86400e3;
    await DB.prepare("INSERT INTO invites (code_hash, family_id, role, created_by, expires) VALUES (?, ?, ?, ?, ?)")
      .bind(await sha256(normCode(code)), body.family, r, user.id, expires).run();
    return json({ code, role: r, expires });
  },

  "POST /api/invites/cancel": async ({ DB, user, body }) => {
    needUser(user); needParent(await role(DB, body.family, user.id));
    await DB.prepare("DELETE FROM invites WHERE family_id = ? AND used_by IS NULL").bind(body.family).run();
    return json({ ok: true });
  },

  "POST /api/join": async ({ DB, user, body, ip }) => {
    if (await tooManyFails(DB, ip)) fail(429, "Too many wrong codes. Try again in an hour.");
    const code = normCode(body.code);
    const inv = code.length === 10 ? await DB.prepare("SELECT * FROM invites WHERE code_hash = ?").bind(await sha256(code)).first() : null;
    if (!inv || inv.used_by || inv.expires <= now()) { await noteFail(DB, ip); fail(404, "That code is wrong, used or expired. Ask for a new one."); }
    if (inv.role === "parent" && !user?.google_sub) fail(401, "Sign in with Google first, then use the parent code.");
    const count = await DB.prepare("SELECT COUNT(*) AS n FROM members WHERE family_id = ?").bind(inv.family_id).first();
    let headers = {};
    if (!user) {
      const id = "d-" + randomId(12), name = String(body.name || "Child’s phone").trim().slice(0, 40) || "Child’s phone";
      await DB.prepare("INSERT INTO users (id, google_sub, email, name, created) VALUES (?, NULL, NULL, ?, ?)").bind(id, name, now()).run();
      headers = { "Set-Cookie": sessionCookie(await newSession(DB, id)) };
      user = { id, name, email: null, google_sub: null };
    }
    const existing = await DB.prepare("SELECT role FROM members WHERE family_id = ? AND user_id = ?").bind(inv.family_id, user.id).first();
    if (!existing && count.n >= LIMITS.members) fail(429, "This family already has the most members allowed.");
    // a used code never works again; joining never lowers a parent to a child
    const res = await DB.prepare("UPDATE invites SET used_by = ? WHERE code_hash = ? AND used_by IS NULL").bind(user.id, inv.code_hash).run();
    if (!res.meta?.changes) fail(404, "That code is wrong, used or expired. Ask for a new one.");
    if (!existing) await DB.prepare("INSERT INTO members (family_id, user_id, role, created) VALUES (?, ?, ?, ?)").bind(inv.family_id, user.id, inv.role, now()).run();
    else if (existing.role === "child" && inv.role === "parent") await DB.prepare("UPDATE members SET role = 'parent' WHERE family_id = ? AND user_id = ?").bind(inv.family_id, user.id).run();
    return json({ ...(await me(DB, user)), family: inv.family_id }, 200, headers);
  },

  "POST /api/members": async ({ DB, user, body }) => {
    needUser(user); needParent(await role(DB, body.family, user.id));
    const f = await DB.prepare("SELECT owner FROM families WHERE id = ?").bind(body.family).first();
    const rows = await DB.prepare("SELECT u.id, u.name, m.role, u.google_sub IS NOT NULL AS google FROM members m JOIN users u ON u.id = m.user_id WHERE m.family_id = ? ORDER BY m.created").bind(body.family).all();
    return json({ members: rows.results.map(r => ({ id: r.id, name: r.name, role: r.role, google: !!r.google, owner: r.id === f.owner, you: r.id === user.id })) });
  },

  "POST /api/members/remove": async ({ DB, user, body }) => {
    needUser(user); const r = await role(DB, body.family, user.id);
    const target = String(body.user || "");
    if (target !== user.id) needParent(r);
    const f = await DB.prepare("SELECT owner FROM families WHERE id = ?").bind(body.family).first();
    if (target === f.owner) fail(403, "The family owner cannot be removed. The owner can delete the family instead.");
    await DB.batch([DB.prepare("DELETE FROM members WHERE family_id = ? AND user_id = ?").bind(body.family, target),
      // a child's phone that now belongs to no family is signed out
      DB.prepare("DELETE FROM sessions WHERE user_id = ? AND user_id LIKE 'd-%' AND NOT EXISTS (SELECT 1 FROM members WHERE user_id = ?)").bind(target, target)]);
    return json({ ok: true });
  },

  "POST /api/family/delete": async ({ DB, user, body }) => {
    needUser(user); await role(DB, body.family, user.id);
    const f = await DB.prepare("SELECT owner, name FROM families WHERE id = ?").bind(body.family).first();
    if (f.owner !== user.id) fail(403, "Only the family owner can delete it");
    const id = body.family;
    await DB.batch(["marks", "children", "invites", "members"].map(t => DB.prepare(`DELETE FROM ${t} WHERE family_id = ?`).bind(id))
      .concat(DB.prepare("DELETE FROM families WHERE id = ?").bind(id)));
    return json({ ok: true });
  },

  // Push this phone's changes, then pull everything changed since the last sync. Last write to arrive wins.
  "POST /api/sync": async ({ DB, user, body }) => {
    needUser(user); const r = await role(DB, body.family, user.id); const fam = body.family;
    const kids = Array.isArray(body.children) ? body.children : [], marks = Array.isArray(body.marks) ? body.marks : [];
    if (kids.length + marks.length > LIMITS.changes) fail(413, "Too many changes at once");
    const t = now(); const stmts = [];
    const active = new Set((await DB.prepare("SELECT id FROM children WHERE family_id = ? AND deleted = 0").bind(fam).all()).results.map(x => x.id));
    if (kids.length) {
      needParent(r);
      const adding = new Set(kids.filter(k => k && !k.deleted && !active.has(k.id)).map(k => k.id));
      if (active.size + adding.size > LIMITS.children) fail(429, "Too many children in one family");
      for (const k of kids) {
        if (!ID.test(String(k?.id || ""))) fail(400, "Bad child");
        if (k.deleted) { stmts.push(DB.prepare("UPDATE children SET deleted = 1, doc = '{}', updated = ?, by_user = ? WHERE family_id = ? AND id = ?").bind(t, user.id, fam, k.id)); continue; }
        const doc = cleanDoc(k.doc);
        stmts.push(DB.prepare("INSERT INTO children (family_id, id, doc, deleted, updated, by_user) VALUES (?, ?, ?, 0, ?, ?) ON CONFLICT (family_id, id) DO UPDATE SET doc = excluded.doc, deleted = 0, updated = excluded.updated, by_user = excluded.by_user")
          .bind(fam, k.id, doc, t, user.id));
      }
    }
    if (marks.length) {
      const ok = new Set(active);
      kids.forEach(k => k.deleted ? ok.delete(k.id) : ok.add(k.id));
      for (const m of marks) {
        const k = String(m?.k || ""), c = String(m?.c || "");
        if (!MARK.test(k) || !ok.has(c)) fail(400, "Bad change");
        if (r === "child" && !CHILD_MAY.has(k.split(":")[0])) fail(403, "A child’s phone can only tick, add notes, and mark Qur’an and routine");
        const v = m.v === null || m.v === undefined ? null : JSON.stringify(m.v);
        if (v && v.length > LIMITS.markBytes) fail(413, "Change too large");
        stmts.push(DB.prepare("INSERT INTO marks (family_id, child_id, k, v, updated, by_user) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (family_id, child_id, k) DO UPDATE SET v = excluded.v, updated = excluded.updated, by_user = excluded.by_user")
          .bind(fam, c, k, v, t, user.id));
      }
    }
    for (let i = 0; i < stmts.length; i += 100) await DB.batch(stmts.slice(i, i + 100));
    const since = Number.isFinite(+body.since) ? +body.since : 0;
    const ch = await DB.prepare("SELECT id, doc, deleted, updated FROM children WHERE family_id = ? AND updated > ? ORDER BY updated").bind(fam, since).all();
    const mk = await DB.prepare("SELECT child_id AS c, k, v, updated FROM marks WHERE family_id = ? AND updated > ? ORDER BY updated LIMIT ?").bind(fam, since, LIMITS.pull + 1).all();
    const more = mk.results.length > LIMITS.pull; const rows = mk.results.slice(0, LIMITS.pull);
    // when there is more, resume one millisecond early so rows sharing the last timestamp are never skipped
    const cursor = more ? rows[rows.length - 1].updated - 1 : Math.max(t, since);
    return json({ role: r, cursor, more,
      children: ch.results.map(x => ({ id: x.id, deleted: !!x.deleted, doc: x.deleted ? null : JSON.parse(x.doc), updated: x.updated })),
      marks: rows.map(x => ({ c: x.c, k: x.k, v: x.v === null ? null : JSON.parse(x.v), updated: x.updated })) });
  }
};

export async function handle(request, env, deps = {}) {
  try {
    if (!env.DB) fail(503, "Family sync is not set up on this site yet");
    const url = new URL(request.url);
    const route = routes[`${request.method} ${url.pathname.replace(/\/+$/, "")}`];
    if (!route) fail(404, "Not found");
    checkOrigin(request);
    const body = request.method === "GET" ? {} : await readBody(request);
    const user = await sessionUser(env.DB, request);
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    return await route({ DB: env.DB, env, request, body, user, ip, deps: { fetch: deps.fetch || fetch } });
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.message }, e.status);
    console.error(e);
    return json({ error: "Something went wrong. Please try again." }, 500);
  }
}
