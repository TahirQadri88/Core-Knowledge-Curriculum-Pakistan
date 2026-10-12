// Local test server: the built app (docs/) plus the real family sync API (server/app.js) on Node's built-in SQLite.
// Used by scripts/test_app.py for the family sync checks, and handy for trying sync locally:
//   node --no-warnings scripts/dev_server.mjs 8787   then open http://localhost:8787
// Google sign-in cannot run here, so /__test/login?sub=<name> signs in a test parent with a token made by a local key.
// This route exists only in this file; the real site (functions/api) never has it.
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { handle } from "../server/app.js";
import { d1 } from "../server/test/d1.js";

const root = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "docs");
const port = +(process.argv[2] || 8787);
const CLIENT_ID = "local-test.apps.googleusercontent.com";
const keys = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const jwks = { keys: [{ ...(await crypto.subtle.exportKey("jwk", keys.publicKey)), kid: "local", alg: "RS256", use: "sig" }] };
const env = { DB: d1(), GOOGLE_CLIENT_ID: CLIENT_ID };
const deps = { fetch: async () => new Response(JSON.stringify(jwks)) };
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
async function token(sub) {
  const t = Math.floor(Date.now() / 1000), head = b64({ alg: "RS256", kid: "local" });
  const body = b64({ iss: "https://accounts.google.com", aud: CLIENT_ID, sub, email: sub + "@example.com", email_verified: true, given_name: sub[0].toUpperCase() + sub.slice(1), iat: t, exp: t + 3600 });
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", keys.privateKey, new TextEncoder().encode(head + "." + body));
  return head + "." + body + "." + Buffer.from(sig).toString("base64url");
}
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".md": "text/plain" };

http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost:" + port}`);
  const send = async r => { res.writeHead(r.status, Object.fromEntries(r.headers)); res.end(Buffer.from(await r.arrayBuffer())); };
  try {
    if (url.pathname === "/__test/login") {
      const r = await handle(new Request(url.origin + "/api/auth/google", { method: "POST", headers: { "Content-Type": "application/json", "X-Ilm": "1", Origin: url.origin },
        body: JSON.stringify({ credential: await token(url.searchParams.get("sub") || "parent") }) }), env, deps);
      return send(r);
    }
    if (url.pathname.startsWith("/api/")) {
      const chunks = []; for await (const c of req) chunks.push(c);
      const headers = new Headers(); for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
      headers.set("CF-Connecting-IP", req.socket.remoteAddress || "local");
      const r = await handle(new Request(url.href, { method: req.method, headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks) }), env, deps);
      return send(r);
    }
    const file = path.join(root, url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname));
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" }); res.end(data);
  } catch (e) { res.writeHead(404); res.end("not found"); }
}).listen(port, "127.0.0.1", () => console.log(`Ilm Track test server: http://localhost:${port}`));
