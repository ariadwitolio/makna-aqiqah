# Deployment Guide

Architecture:

- **Website** — Next.js app in `apps/web/`, deployed to Cloudflare via OpenNext
  (`npm run deploy`, backed by `apps/web/wrangler.jsonc`). Note: the repo is
  set up for **Cloudflare Workers**, not Cloudflare Pages — `wrangler.jsonc`
  defines a Worker with a static assets binding. If you specifically need
  Pages instead, that's a separate `wrangler pages deploy` setup; everything
  below assumes the Workers path that's already configured.
- **Content** — Markdown files under `apps/web/content/`, tracked in this Git
  repo (`ariadwitolio/makna-aqiqah`). No database. Read via Node's `fs` in
  `lib/content/read.ts`, which only works at *build* time — Cloudflare
  Workers have no real filesystem at request time, so the homepage must be
  statically prerendered during `next build` and served from the prerendered
  cache (see "Why `npm run deploy` does three steps" below). **A content
  change (including one made through the CMS) only appears in production
  after a rebuild + redeploy** — there's no live/dynamic re-render.
- **Admin panel** — Decap CMS, static files at `apps/web/public/admin/`
  (served by the Next.js app itself at `/admin`).
- **Editor auth** — a small standalone Cloudflare Worker at
  `workers/decap-oauth/` brokers GitHub OAuth for Decap CMS. No Netlify
  Identity, no Git Gateway — just GitHub, gated to whoever has push access
  to the repo.
- **Admin gate** — `apps/web/middleware.ts` puts `/admin` behind a shared
  HTTP Basic Auth prompt *in front of* the GitHub OAuth login above, so the
  Decap CMS login screen isn't even reachable without a shared
  username/password first. Skipped on `localhost`.

```
apps/web/
  cms/config.template.yml       # source of truth for the CMS config
  scripts/generate-decap-config.mjs
  public/admin/
    index.html
    config.yml                  # generated — don't hand-edit
workers/decap-oauth/
  src/index.ts                  # GET /auth, GET /callback
  wrangler.jsonc
docs/DEPLOYMENT.md
```

## How the backend switch works

`apps/web/cms/config.template.yml` is the single source of truth for the CMS
config (collections, fields, backend). It's rendered into
`apps/web/public/admin/config.yml` by
`apps/web/scripts/generate-decap-config.mjs`, which runs automatically
before `dev` and `build` (via the `predev`/`prebuild` npm hooks).

The template sets:

```yaml
backend:
  name: github
  repo: ariadwitolio/makna-aqiqah
  branch: main
  base_url: __DECAP_AUTH_BASE_URL__ # replaced with NEXT_PUBLIC_DECAP_AUTH_BASE_URL
  auth_endpoint: auth

local_backend: true
```

`local_backend: true` is a built-in Decap CMS feature: when the admin page
is opened on `localhost`, Decap automatically talks to a local proxy server
instead of GitHub — no OAuth involved. In any other environment it uses the
real `github` backend, authenticated through the Worker at `base_url`.

## Local development

No OAuth, no Worker, no Netlify — just the local proxy:

```bash
npm run dev          # starts the Next.js app (apps/web) on localhost:3000
npm run cms:proxy     # starts decap-server on localhost:8081, in another terminal
```

Then open `http://localhost:3000/admin`. Decap CMS detects `localhost` and
routes reads/writes through `decap-server`, which commits straight to your
local working copy of the repo — no login screen at all.

`NEXT_PUBLIC_DECAP_AUTH_BASE_URL` doesn't need to be set for this to work
(the generator writes a harmless placeholder if it's missing), since
`local_backend` bypasses `base_url` entirely on localhost.

## GitHub OAuth App creation

Needed once, for production login:

1. Go to <https://github.com/settings/developers> → **New OAuth App**.
2. **Application name**: anything, e.g. "Makna Aqiqah CMS".
3. **Homepage URL**: your production site URL (or a placeholder until the
   domain exists).
4. **Authorization callback URL**: the Worker's URL + `/callback`, e.g.
   `https://decap-oauth.<your-subdomain>.workers.dev/callback` before you
   have a custom domain, or `https://cms-auth.yourdomain.com/callback`
   after.
5. Save, then generate a **Client Secret**. Keep the Client ID + Secret —
   you'll put them in the Worker's config in the next step.

Only people with push access to `ariadwitolio/makna-aqiqah` can actually
save content (the `github` backend writes via the authenticated user's own
GitHub permissions), so there's no separate user/invite system to manage.

## Cloudflare Worker deployment (OAuth relay)

```bash
cd workers/decap-oauth
npm install
```

Set the Client ID (not secret, fine to commit) in `wrangler.jsonc`'s `vars`,
or override at deploy time. Set the Client Secret as an actual Wrangler
secret (never commit it):

```bash
wrangler secret put GITHUB_CLIENT_SECRET
```

For local testing of the Worker itself:

```bash
cp .dev.vars.example .dev.vars   # fill in real values, gitignored
npm run dev                      # wrangler dev
```

Deploy:

```bash
npm run deploy                   # wrangler deploy
```

This prints the Worker's `*.workers.dev` URL — that's what
`NEXT_PUBLIC_DECAP_AUTH_BASE_URL` should point to (see below) until a custom
domain is attached.

## Admin Basic Auth gate

`/admin` requires a shared HTTP Basic Auth username/password before Decap's
own GitHub login even loads (see `apps/web/middleware.ts`). It's a second,
independent gate — visiting `/admin` in production always prompts for this
first, regardless of GitHub auth.

Set the credentials as Cloudflare secrets on the `apps/web` Worker (these
are read at request time, not baked into the build, so `wrangler secret put`
is enough — no rebuild needed to change them):

```bash
cd apps/web
wrangler secret put CMS_BASIC_AUTH_USER
wrangler secret put CMS_BASIC_AUTH_PASSWORD
```

Until both are set, every `/admin` request in production returns `500`
("not configured") rather than silently allowing access. On `localhost` the
gate is skipped entirely, so local dev needs no credentials.

Two Cloudflare-specific quirks this relies on, both already handled:

- **`wrangler.jsonc`'s `assets.run_worker_first: ["/admin", "/admin/*"]`** —
  by default, Cloudflare serves any request matching a real static file (like
  `/admin/index.html`) directly, bypassing the Worker — and therefore
  `middleware.ts` — entirely. This forces those paths through the Worker
  every time so the Basic Auth check actually runs. Both `/admin` (bare) and
  `/admin/*` are needed; `/admin/*` alone does not cover the bare path.
- **`middleware.ts` serves the asset itself after a successful check**, via
  `getCloudflareContext().env.ASSETS.fetch(...)`, instead of
  `NextResponse.next()`. `/admin` isn't a Next.js route (no `page.tsx`), so
  handing off to Next's own router has nothing to render and bounces forever
  between `/admin` and `/admin/`. It also explicitly requests
  `/admin/index.html` rather than `/admin/`, since re-entering
  `ASSETS.fetch()` with a directory-style path re-triggers Cloudflare's own
  index-resolution redirect back into the same request.

## Website deployment (Cloudflare)

```bash
cd apps/web
npm install
npm run deploy
```

`predeploy` regenerates `public/admin/config.yml` from the template using
whatever `NEXT_PUBLIC_DECAP_AUTH_BASE_URL` is set to (see Environment
Variables below) — make sure it's set in the shell/CI environment running
`npm run deploy`, not just in a local `.env` file that won't travel with a
Worker deploy (`.env.local` is fine for local machines, since the script
loads it itself).

### Why `npm run deploy` does three steps

`deploy` runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy &&
opennextjs-cloudflare populateCache remote` — all three, every time, from the
same build. Don't run `deploy`/`populateCache` against a stale `.open-next`
folder from a different build; each build gets a random build ID, and a
mismatched pairing serves stale/wrong cached content.

This exists because of two things working together:

1. `open-next.config.ts` sets `incrementalCache:
   static-assets-incremental-cache` (Cloudflare's ASSETS binding used as the
   cache store). Without it, the default is a no-op `"dummy"` cache, which
   means every request — even for a prerendered/static page — re-executes
   the page's render function inside the Worker. Since that render function
   reads `content/*.md` via `fs`, and Workers have no filesystem, it throws
   ("no such file or directory") and the homepage 500s in production even
   though it works fine locally and in the build log.
2. `populateCache remote` uploads the prerendered cache entries (generated
   during `build`, sitting in `.open-next/cache/`) so the deployed Worker
   serves them directly (`x-nextjs-cache: HIT`) instead of ever needing to
   re-render.

If you ever see the homepage 500 in production with a working local build,
suspect this pairing first — check `wrangler tail` for a `readAll` /
`no such file or directory` error, and redo build → deploy → populateCache
as one atomic sequence (which is exactly what `npm run deploy` now does).

## Domain configuration (once purchased)

Nothing in the code needs to change — every reference to a domain flows
through environment variables:

1. Add the domain to your Cloudflare account and route it to the `apps/web`
   Worker (Cloudflare dashboard → Workers & Pages → your worker → Domains &
   Routes), or add a `routes` entry to `apps/web/wrangler.jsonc`.
2. Optionally route a subdomain (e.g. `cms-auth.yourdomain.com`) to the
   `decap-oauth` Worker the same way, and add the equivalent `routes` entry
   in `workers/decap-oauth/wrangler.jsonc`.
3. Update the GitHub OAuth App's **Authorization callback URL** to match
   the new domain (`https://cms-auth.yourdomain.com/callback`).
4. Update `NEXT_PUBLIC_DECAP_AUTH_BASE_URL` to the new domain and redeploy
   `apps/web` so the regenerated `config.yml` points at it.

## Environment variables

| Variable                          | Used by                | Where it's set                                   |
| ---------------------------------- | ----------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_DECAP_AUTH_BASE_URL` | `apps/web` (build time) | `apps/web/.env.local` locally; CI/deploy env in prod |
| `CMS_BASIC_AUTH_USER`             | `apps/web` (runtime, middleware) | `wrangler secret put` in prod; unset locally (skipped on localhost) |
| `CMS_BASIC_AUTH_PASSWORD`         | `apps/web` (runtime, middleware) | `wrangler secret put` in prod; unset locally (skipped on localhost) |
| `GITHUB_CLIENT_ID`                | `workers/decap-oauth`   | `wrangler.jsonc` `vars` (not secret)               |
| `GITHUB_CLIENT_SECRET`            | `workers/decap-oauth`   | `wrangler secret put` in prod, `.dev.vars` locally  |

See `apps/web/.env.example` and `workers/decap-oauth/.dev.vars.example`.

## Migration plan: local → production, step by step

1. **Local dev** (already works): `npm run dev` + `npm run cms:proxy`,
   edit content at `/admin` with no auth.
2. **Create the GitHub OAuth App** (see above), pointed at the Worker's
   `*.workers.dev` URL as a placeholder callback.
3. **Deploy the Worker**: `cd workers/decap-oauth && npm install && wrangler
secret put GITHUB_CLIENT_SECRET && npm run deploy`. Note the resulting
   `*.workers.dev` URL.
4. **Set `NEXT_PUBLIC_DECAP_AUTH_BASE_URL`** to that Worker URL in your
   deploy environment.
5. **Set the Basic Auth secrets**: `cd apps/web && wrangler secret put
CMS_BASIC_AUTH_USER && wrangler secret put CMS_BASIC_AUTH_PASSWORD`.
6. **Deploy the website**: `npm run deploy` (from `apps/web`).
7. **Test production login**: open `https://<your-worker-or-domain>/admin`,
   enter the Basic Auth credentials when prompted, then click "Login with
   GitHub", authorize, and confirm you land back in the CMS.
8. **When the domain is purchased**: route both Workers to their
   subdomains, update the OAuth App's callback URL, update
   `NEXT_PUBLIC_DECAP_AUTH_BASE_URL`, redeploy `apps/web`. No other code
   changes required.
