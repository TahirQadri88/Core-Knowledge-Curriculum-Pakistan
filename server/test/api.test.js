// Tests for the family sync API. Run: node --test server/test   (Node 22 or newer; no installs needed)
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { handle } from "../app.js";
import { _resetKeyCache } from "../auth.js";
import { d1 } from "./d1.js";

const CLIENT_ID = "test-client.apps.googleusercontent.com";
const ORIGIN = "https://ilmtrack.pages.dev";
let keys, jwks;

before(async () => {
  keys = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  jwks = { keys: [{ ...(await crypto.subtle.exportKey("jwk", keys.publicKey)), kid: "k1", alg: "RS256", use: "sig" }] };
});
const fakeFetch = async () => new Response(JSON.stringify(jwks));
const b64 = o => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
async function googleToken(sub, over = {}, signer) {
  const t = Math.floor(Date.now() / 1000);
  const head = b64({ alg: "RS256", kid: "k1", typ: "JWT" });
  const body = b64({ iss: "https://accounts.google.com", aud: CLIENT_ID, sub, email: sub + "@example.com", email_verified: true, given_name: "Parent " + sub, iat: t, exp: t + 3600, ...over });
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", (signer || keys).privateKey, new TextEncoder().encode(head + "." + body));
  return head + "." + body + "." + Buffer.from(sig).toString("base64url");
}

function world() {
  _resetKeyCache();
  const env = { DB: d1(), GOOGLE_CLIENT_ID: CLIENT_ID };
  // a "phone": keeps its own cookie, like a browser
  const phone = (ip = "1.1.1.1") => {
    let cookie = "";
    const call = async (method, path, body, extra = {}) => {
      const headers = { "Content-Type": "application/json", "X-Ilm": "1", Origin: ORIGIN, "CF-Connecting-IP": ip, ...(cookie ? { Cookie: cookie } : {}), ...extra };
      const r = await handle(new Request(ORIGIN + path, { method, headers, body: method === "GET" ? undefined : JSON.stringify(body || {}) }), env, { fetch: fakeFetch });
      const sc = r.headers.get("Set-Cookie"); if (sc) cookie = sc.split(";")[0].endsWith("=") ? "" : sc.split(";")[0];
      return { status: r.status, body: await r.json() };
    };
    return { call, get: p => call("GET", p), post: (p, b, x) => call("POST", p, b, x), signIn: async sub => call("POST", "/api/auth/google", { credential: await googleToken(sub) }) };
  };
  return { env, phone };
}
const child = (name, grade = 4) => ({ name, grade, age: 9, books: [], routine: { items: [] }, quran: { read: "", khatm: 0 } });

async function familyWithParent(w) {
  const mum = w.phone(); await mum.signIn("mum");
  const f = (await mum.post("/api/family", { name: "Qadri family" })).body.family;
  await mum.post("/api/sync", { family: f, since: 0, children: [{ id: "s1", doc: child("Aisha") }] });
  return { mum, f };
}

test("signed-out requests see nothing and cannot write", async () => {
  const w = world(); const { f } = await familyWithParent(w);
  const stranger = w.phone("9.9.9.9");
  assert.deepEqual((await stranger.get("/api/me")).body, { user: null, families: [] });
  assert.equal((await stranger.post("/api/sync", { family: f, since: 0 })).status, 401);
  assert.equal((await stranger.post("/api/invite", { family: f })).status, 401);
});

test("Google sign-in checks the signature, the app id and the expiry", async () => {
  const w = world(); const p = w.phone();
  const other = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
  assert.equal((await p.post("/api/auth/google", { credential: await googleToken("x", {}, other) })).status, 401, "wrong signing key");
  assert.equal((await p.post("/api/auth/google", { credential: await googleToken("x", { aud: "someone-else" }) })).status, 401, "token for another app");
  assert.equal((await p.post("/api/auth/google", { credential: await googleToken("x", { exp: Math.floor(Date.now() / 1000) - 600 }) })).status, 401, "expired");
  assert.equal((await p.post("/api/auth/google", { credential: await googleToken("x", { iss: "evil.example" }) })).status, 401, "wrong issuer");
  assert.equal((await p.post("/api/auth/google", { credential: "not.a.token" })).status, 401);
  const ok = await p.signIn("x");
  assert.equal(ok.status, 200); assert.equal(ok.body.user.kind, "google");
  assert.equal((await p.get("/api/me")).body.user.name, "Parent x");
});

test("a stranger who is signed in cannot read or change another family", async () => {
  const w = world(); const { f } = await familyWithParent(w);
  const stranger = w.phone("9.9.9.9"); await stranger.signIn("stranger");
  assert.equal((await stranger.post("/api/sync", { family: f, since: 0 })).status, 404);
  assert.equal((await stranger.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:la-4-2", v: { st: "done" } }] })).status, 404);
  assert.equal((await stranger.post("/api/invite", { family: f })).status, 404);
  assert.equal((await stranger.post("/api/members", { family: f })).status, 404);
  assert.equal((await stranger.post("/api/family/delete", { family: f })).status, 404);
});

test("requests from another website are refused", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  assert.equal((await mum.post("/api/sync", { family: f, since: 0 }, { Origin: "https://evil.example" })).status, 403);
  assert.equal((await mum.post("/api/sync", { family: f, since: 0 }, { "X-Ilm": "" })).status, 403);
});

test("a child's phone joins with a one-time code and may only tick", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const inv = await mum.post("/api/invite", { family: f, role: "child" });
  assert.match(inv.body.code, /^[2-9A-HJKMNP-Z]{5}-[2-9A-HJKMNP-Z]{5}$/);
  const kid = w.phone("2.2.2.2");
  const j = await kid.post("/api/join", { code: inv.body.code.toLowerCase().replace("-", " "), name: "Aisha’s tablet" });
  assert.equal(j.status, 200); assert.equal(j.body.user.kind, "device"); assert.equal(j.body.families[0].role, "child");
  // allowed: ticks, notes, routine, Qur'an
  for (const k of ["s:ncp-sci-4-1", "n:ncp-sci-4-1", "r:2026-10-12:r-abc", "q:112"])
    assert.equal((await kid.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k, v: { st: "done" } }] })).status, 200, k);
  // not allowed: character levels, child details, deleting, invites, members
  assert.equal((await kid.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "cv:ch-emo-1", v: { lv: 3 } }] })).status, 403);
  assert.equal((await kid.post("/api/sync", { family: f, since: 0, children: [{ id: "s1", doc: child("Renamed") }] })).status, 403);
  assert.equal((await kid.post("/api/sync", { family: f, since: 0, children: [{ id: "s1", deleted: true }] })).status, 403);
  assert.equal((await kid.post("/api/invite", { family: f, role: "parent" })).status, 403);
  assert.equal((await kid.post("/api/members", { family: f })).status, 403);
  // the parent sees the child's tick
  const pulled = await mum.post("/api/sync", { family: f, since: 0 });
  assert.ok(pulled.body.marks.some(m => m.k === "s:ncp-sci-4-1" && m.v.st === "done"));
});

test("a code works once, expires, and wrong codes are slowed down", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const code = (await mum.post("/api/invite", { family: f, role: "child" })).body.code;
  assert.equal((await w.phone("3.3.3.3").post("/api/join", { code })).status, 200);
  assert.equal((await w.phone("3.3.3.4").post("/api/join", { code })).status, 404, "used code");
  const old = (await mum.post("/api/invite", { family: f, role: "child" })).body.code;
  w.env.DB.raw.exec("UPDATE invites SET expires = 1 WHERE used_by IS NULL");
  assert.equal((await w.phone("3.3.3.5").post("/api/join", { code: old })).status, 404, "expired code");
  const guesser = w.phone("6.6.6.6");
  for (let i = 0; i < 20; i++) assert.equal((await guesser.post("/api/join", { code: "AAAAA-AAAAA" })).status, 404);
  const fresh = (await mum.post("/api/invite", { family: f, role: "child" })).body.code;
  assert.equal((await guesser.post("/api/join", { code: fresh })).status, 429, "blocked after 20 wrong codes in an hour");
  assert.equal((await w.phone("7.7.7.7").post("/api/join", { code: fresh })).status, 200, "other addresses are not blocked");
});

test("a parent code needs Google sign-in and cannot be used by a child's phone", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const code = (await mum.post("/api/invite", { family: f, role: "parent" })).body.code;
  const kidCode = (await mum.post("/api/invite", { family: f, role: "child" })).body.code;
  const kid = w.phone("2.2.2.2"); await kid.post("/api/join", { code: kidCode });
  assert.equal((await kid.post("/api/join", { code })).status, 401);
  const dad = w.phone("4.4.4.4"); await dad.signIn("dad");
  const j = await dad.post("/api/join", { code });
  assert.equal(j.status, 200); assert.equal(j.body.families[0].role, "parent");
  assert.equal((await dad.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "cv:ch-emo-1", v: { lv: 2 } }] })).status, 200);
});

test("cancelled invites stop working", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const code = (await mum.post("/api/invite", { family: f, role: "child" })).body.code;
  await mum.post("/api/invites/cancel", { family: f });
  assert.equal((await w.phone("5.5.5.5").post("/api/join", { code })).status, 404);
});

test("the owner cannot be removed; a removed child's phone loses access", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const dad = w.phone("4.4.4.4"); await dad.signIn("dad");
  await dad.post("/api/join", { code: (await mum.post("/api/invite", { family: f, role: "parent" })).body.code });
  const owner = (await mum.get("/api/me")).body.user.id;
  assert.equal((await dad.post("/api/members/remove", { family: f, user: owner })).status, 403);
  assert.equal((await mum.post("/api/members/remove", { family: f, user: owner })).status, 403, "owner cannot leave");
  const kid = w.phone("2.2.2.2"); await kid.post("/api/join", { code: (await mum.post("/api/invite", { family: f, role: "child" })).body.code });
  const kidId = (await kid.get("/api/me")).body.user.id;
  assert.equal((await kid.post("/api/members/remove", { family: f, user: (await dad.get("/api/me")).body.user.id })).status, 403, "child cannot remove a parent");
  assert.equal((await dad.post("/api/members/remove", { family: f, user: kidId })).status, 200);
  assert.equal((await kid.post("/api/sync", { family: f, since: 0 })).status, 401, "signed out once in no family");
});

test("only the owner can delete the family, and then nothing is left", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const dad = w.phone("4.4.4.4"); await dad.signIn("dad");
  await dad.post("/api/join", { code: (await mum.post("/api/invite", { family: f, role: "parent" })).body.code });
  await mum.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:la-4-2", v: { st: "done" } }] });
  assert.equal((await dad.post("/api/family/delete", { family: f })).status, 403);
  assert.equal((await mum.post("/api/family/delete", { family: f })).status, 200);
  for (const t of ["families", "members", "children", "marks", "invites"])
    assert.equal(w.env.DB.raw.prepare(`SELECT COUNT(*) AS n FROM ${t}`).get().n, 0, t);
  assert.deepEqual((await dad.get("/api/me")).body.families, []);
});

test("two phones ticking different things never overwrite each other; the latest change to one thing wins", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const dad = w.phone("4.4.4.4"); await dad.signIn("dad");
  await dad.post("/api/join", { code: (await mum.post("/api/invite", { family: f, role: "parent" })).body.code });
  await mum.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:a", v: { st: "done" } }] });
  await dad.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:b", v: { st: "done" } }] });
  await new Promise(r => setTimeout(r, 5));
  await dad.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:a", v: null }] });
  const all = (await mum.post("/api/sync", { family: f, since: 0 })).body.marks;
  assert.equal(all.find(m => m.k === "s:b").v.st, "done");
  assert.equal(all.find(m => m.k === "s:a").v, null, "untick from the other phone wins");
});

test("sync only sends what changed since the last cursor", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const first = await mum.post("/api/sync", { family: f, since: 0, marks: [{ c: "s1", k: "s:x", v: 1 }] });
  assert.equal(first.body.children.length, 1);
  const again = await mum.post("/api/sync", { family: f, since: first.body.cursor });
  assert.equal(again.body.marks.length, 0); assert.equal(again.body.children.length, 0);
  await new Promise(r => setTimeout(r, 5));
  await mum.post("/api/sync", { family: f, since: first.body.cursor, marks: [{ c: "s1", k: "s:y", v: 1 }] });
  const next = await mum.post("/api/sync", { family: f, since: first.body.cursor });
  assert.deepEqual(next.body.marks.map(m => m.k), ["s:y"]);
});

test("bad input is rejected", async () => {
  const w = world(); const { mum, f } = await familyWithParent(w);
  const bad = async b => (await mum.post("/api/sync", { family: f, since: 0, ...b })).status;
  assert.equal(await bad({ marks: [{ c: "s1", k: "evil:1", v: 1 }] }), 400, "unknown key kind");
  assert.equal(await bad({ marks: [{ c: "nobody", k: "s:a", v: 1 }] }), 400, "unknown child");
  assert.equal(await bad({ marks: [{ c: "s1", k: "s:'; DROP TABLE marks;--", v: 1 }] }), 400);
  assert.equal(await bad({ children: [{ id: "s2", doc: { name: "", grade: 4 } }] }), 400);
  assert.equal(await bad({ children: [{ id: "s2", doc: { name: "Ali", grade: 12 } }] }), 400);
  assert.equal(await bad({ marks: [{ c: "s1", k: "n:a", v: "x".repeat(5000) }] }), 413);
  assert.equal((await mum.post("/api/family", { name: "x" }, { "Content-Length": String(600 * 1024) })).status, 413);
  assert.equal((await mum.post("/api/nothing-here")).status, 404);
  // unknown fields in a child's details are dropped, known ones kept
  await mum.post("/api/sync", { family: f, since: 0, children: [{ id: "s3", doc: { ...child("Hamza", 0), secret: "x" } }] });
  const doc = (await mum.post("/api/sync", { family: f, since: 0 })).body.children.find(c => c.id === "s3").doc;
  assert.equal(doc.secret, undefined); assert.equal(doc.name, "Hamza");
});

test("without a database the site says sync is not set up", async () => {
  const r = await handle(new Request(ORIGIN + "/api/me"), {});
  assert.equal(r.status, 503);
});
