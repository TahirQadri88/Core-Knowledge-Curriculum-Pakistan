// Cloudflare Pages Function: every request to /api/... is handled by server/app.js.
// Needs a D1 binding named DB and a variable GOOGLE_CLIENT_ID (set in the Pages project settings; see SETUP.md).
import { handle } from "../../server/app.js";

export const onRequest = ctx => handle(ctx.request, ctx.env);
