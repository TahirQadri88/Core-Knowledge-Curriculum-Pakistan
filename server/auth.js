// Sign-in helpers for the Cloudflare Pages Functions backend.
// Google sign-in: the browser gets a signed ID token from Google; we check its signature with Google's public keys,
// then issue our own session cookie. No secret is needed: the Google client ID is public by design.

const enc = new TextEncoder();
export const SESSION_DAYS = 60;
export const COOKIE = "it_s";
const GOOGLE_CERTS = "https://www.googleapis.com/oauth2/v3/certs";
const GOOGLE_ISS = ["accounts.google.com", "https://accounts.google.com"];

export const now = () => Date.now();

export function randomId(bytes = 16) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...a)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Invite codes: 10 characters, no look-alikes (0/O, 1/I/L), shown in two groups of five, e.g. "K7QXM-4TPRA".
const CODE_ABC = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export function inviteCode() {
  const a = crypto.getRandomValues(new Uint8Array(10));
  const s = [...a].map(b => CODE_ABC[b % CODE_ABC.length]).join("");
  return s.slice(0, 5) + "-" + s.slice(5);
}
export const normCode = c => String(c || "").toUpperCase().replace(/[^0-9A-Z]/g, "");

export async function sha256(text) {
  const h = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join("");
}

const b64urlBytes = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), c => c.charCodeAt(0));
const b64urlJson = s => JSON.parse(new TextDecoder().decode(b64urlBytes(s)));

let certCache = { at: 0, keys: [] };
export async function googleKeys(fetchFn = fetch) {
  if (certCache.keys.length && now() - certCache.at < 3600e3) return certCache.keys;
  const r = await fetchFn(GOOGLE_CERTS);
  if (!r.ok) throw new Error("could not load Google keys");
  const j = await r.json();
  certCache = { at: now(), keys: j.keys || [] };
  return certCache.keys;
}
export const _resetKeyCache = () => { certCache = { at: 0, keys: [] }; };

// Returns { sub, email, name } or throws.
export async function verifyGoogleToken(token, clientId, fetchFn = fetch) {
  if (!clientId) throw new Error("GOOGLE_CLIENT_ID is not set");
  const parts = String(token || "").split(".");
  if (parts.length !== 3) throw new Error("bad token");
  const header = b64urlJson(parts[0]), body = b64urlJson(parts[1]);
  if (header.alg !== "RS256") throw new Error("bad algorithm");
  const jwk = (await googleKeys(fetchFn)).find(k => k.kid === header.kid);
  if (!jwk) throw new Error("unknown key");
  const key = await crypto.subtle.importKey("jwk", { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(parts[2]), enc.encode(parts[0] + "." + parts[1]));
  if (!ok) throw new Error("bad signature");
  const t = now() / 1000;
  if (!GOOGLE_ISS.includes(body.iss)) throw new Error("bad issuer");
  if (body.aud !== clientId) throw new Error("wrong app");
  if (!(body.exp > t - 60)) throw new Error("expired");
  if (body.iat && body.iat > t + 300) throw new Error("issued in the future");
  if (!body.sub) throw new Error("no subject");
  return { sub: String(body.sub), email: body.email && body.email_verified !== false ? String(body.email) : null, name: String(body.given_name || body.name || "Parent").slice(0, 60) };
}

export function sessionCookie(token, maxAgeSec = SESSION_DAYS * 86400) {
  return `${COOKIE}=${token}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAgeSec}`;
}
export function readCookie(request, name = COOKIE) {
  const h = request.headers.get("Cookie") || "";
  for (const part of h.split(";")) { const [k, ...v] = part.trim().split("="); if (k === name) return v.join("="); }
  return null;
}

export async function newSession(DB, userId) {
  const token = randomId(32);
  await DB.prepare("INSERT INTO sessions (token_hash, user_id, expires) VALUES (?, ?, ?)")
    .bind(await sha256(token), userId, now() + SESSION_DAYS * 86400e3).run();
  return token;
}
export async function sessionUser(DB, request) {
  const token = readCookie(request);
  if (!token || token.length > 100) return null;
  return await DB.prepare("SELECT u.id, u.name, u.email, u.google_sub FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires > ?")
    .bind(await sha256(token), now()).first();
}
export async function endSession(DB, request) {
  const token = readCookie(request);
  if (token) await DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
}
