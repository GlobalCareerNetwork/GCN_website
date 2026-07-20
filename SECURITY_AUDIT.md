# Security Audit — GCN at ASU

> Generated: 2026-06-30  
> Branch: `feature-nextjs-migration`  
> Auditor: Claude Code

---

## Stage 10 — Dependency & Supply Chain Audit

### npm audit results

| Severity | Count | Packages |
|----------|-------|----------|
| Critical | 0 | — |
| High     | 0 | — |
| Moderate | 2 | `postcss` (via `next`) |
| Low      | 0 | — |

#### CVE Detail: PostCSS XSS via unescaped `</style>` (GHSA-qx2v-qp2m-jg93)

- **Severity:** Moderate (CVSS 6.1)  
- **CWE:** CWE-79 (Cross-Site Scripting)  
- **Affected:** `postcss < 8.5.10`, vendored inside `node_modules/next/node_modules/postcss`  
- **Impact scope:** Build-time tooling only. PostCSS processes CSS during `next build` / `next dev`. The unescaped `</style>` output would only affect the dev server's HMR style injection — **not** the production static output served to end users.  
- **Fix attempted:** npm audit suggests `next@9.3.3`. This is a malformed advisory — v9.3.3 predates the vulnerable range and would be a catastrophic downgrade from v16. **Not applied.**  
- **Correct fix:** Upgrade to a Next.js release that vendors `postcss >= 8.5.10`. No such release exists in the v16 line as of 2026-06-30. This is tracked as an upstream Next.js issue.  
- **Residual risk:** Negligible in production. The static export contains no PostCSS runtime code. Monitor Next.js releases.

### npm outdated — packages more than 1 major behind

| Package | Current | Latest | Majors Behind | Action |
|---------|---------|--------|---------------|--------|
| `@types/node` | 20.x | 26.0.1 | 6 | **Updated to ^24** (matches Node 24 runtime) |
| `eslint` | 9.x | 10.6.0 | 1 | Flagged — exactly 1 major, monitor |
| `typescript` | 5.x | 6.0.3 | 1 | Flagged — exactly 1 major, monitor |

### packages updated in this stage

| Package | Before | After | Type |
|---------|--------|-------|------|
| `react` | 19.2.4 | 19.2.7 | Patch — safe |
| `react-dom` | 19.2.4 | 19.2.7 | Patch — safe |
| `@types/node` | 20.19.43 | 24.13.2 | Major — dev only, aligns with Node 24 runtime |

All 8 self-checks passed post-update. See commit history.

---

## Stage 11 — HTTP Security Headers

> See `next.config.ts` for implementation. Added 2026-06-30.

| Header | Value set | Purpose |
|--------|-----------|---------|
| `Content-Security-Policy` | See below | Restricts resource origins; prevents XSS via injected scripts/styles |
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking by blocking embedding in foreign iframes |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type sniffing attacks |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends full URL for same-origin, only origin for cross-origin |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | Forces HTTPS for 2 years; prevents SSL stripping |
| `Permissions-Policy` | See below | Disables unneeded browser features (camera, mic, geolocation) |

**CSP domains actually loaded from (re-audited 2026-07-20):**
- `fonts.googleapis.com` / `api.fontshare.com` — font CSS
- `fonts.gstatic.com` / `cdn.fontshare.com` — font files
- `blob:` — Three.js WebGL worker scripts
- `'unsafe-eval'` — Required by Three.js/WebGL shader compilation

**CSP note:** `'unsafe-inline'` on `script-src` is required because there's no CSP nonce middleware configured — without it the browser blocks every inline `<script>` Next.js emits for RSC hydration/streaming, breaking all client-side JS (the globe never mounts, scroll/flip handlers never attach). `'unsafe-inline'` on `style-src` covers Tailwind's inline styles.

**Correction (2026-07-20):** an earlier version of this doc listed `'wasm-unsafe-eval'` as an active CSP directive — that was never actually present in `next.config.ts` and has been removed from this doc to match the real config. Also fixed a live bug: `img-src` contained a stray `https://_next` entry (not a real external domain, just a copy-paste artifact) — removed; `'self'` already covers Next's own static assets.

---

## Stage 12 — Form & Input Security (Join Us page) — **superseded, 2026-07-20**

> Originally added 2026-06-30, describing `app/api/join/route.ts` and `app/join/page.tsx`.

**This section no longer reflects the deployed app.** The internal Join form/API route described
below was never merged to the branch that shipped — the "Join Us" flow was instead pivoted to an
external Sun Devil Central signup link (see `Navbar.tsx` / `HeroSection.tsx`, `JOIN_URL`). There is
currently **no first-party form or API route on this site at all**, which is a smaller attack
surface than a form would be, not a gap: no server-side input handling, no rate-limiting logic, and
no CSRF surface exist because there's nothing here that accepts user input. If an internal form is
ever reintroduced, re-apply the design below.

**Original design (kept for reference if a form is reintroduced):**
- Server-side Zod validation on all fields (name, email, major, year, message)
- Input sanitization: all string fields stripped of leading/trailing whitespace; email normalized to lowercase
- No sensitive data logged — form data logged only as `{ email: "[redacted]" }` in server logs
- Rate limiting: 5 submissions per IP per 15-minute window via in-memory store
- CSRF: Next.js App Router API routes require same-origin `Content-Type: application/json` — no cookie-based CSRF vector. Origin header validated.
- No `<form action="">` HTML forms — all submission via `fetch()` to `/api/join`, which cannot be triggered by cross-site HTML forms.

---

## Stage 15 — SEO/Security/Launch-Readiness Pass (2026-07-20)

**Dependency audit re-run:** `npm audit` still reports the same 2 moderate PostCSS advisories
(GHSA-qx2v-qp2m-jg93), vendored inside `next`, build-tooling only. No new highs/criticals. No fix
available yet without a major Next.js downgrade — unchanged from Stage 10's conclusion. Re-run
periodically with `npm audit` (see `SECURITY_AUDIT.md#how-to-re-run-this-audit` below).

**CSP fix:** removed the malformed `https://_next` entry from `img-src` (see correction note above).

**Traffic-spike resilience:** every route on this site is a static/SSG-friendly Next.js page with
no dynamic API routes — Vercel's CDN/edge cache absorbs burst traffic (e.g. an event announcement
driving a spike of visitors) without any custom rate-limiting code needed. Revisit this if a
dynamic endpoint (e.g. the pending Cal.com booking integration) is ever added — that would need
its own rate limiting, matching the design pattern in the superseded Stage 12 section above.

**Content-tampering / repo-access protection:** this is a GitHub repo setting, not application
code — recommend enabling branch protection on `main` (require PR review before merge) since
multiple people can push to this repo. Not enabled by an AI agent; a repo admin needs to do this
in GitHub settings (Settings → Branches → Branch protection rules).

**Analytics added:** `@vercel/analytics` — cookieless, no PII, aggregate pageview/referrer data
only.

**SEO surface added:** `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, Open Graph/Twitter
metadata across all routes, JSON-LD `Organization` schema on the homepage, real favicon/apple-icon
generated from `public/images/gcn-globe-mark.svg`. See `SEO_GUIDE.md`.

### How to re-run this audit
A teammate can redo the checks in this file without AI help:
1. `npm audit` — dependency vulnerabilities
2. Start the dev server (`npm run dev`), open browser devtools → Network tab → click any request →
   check Response Headers for `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`,
   `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options` are all present
3. `git log --oneline -20` — confirm no secrets were ever committed (`grep`-search history for
   `API_KEY`, `SECRET`, `PASSWORD` as a spot check)
4. Re-read this file top to bottom and cross out/update anything that no longer matches the code —
   stale security docs are worse than no docs.

---

## Stage 13 — Secrets & Environment Variable Audit

> Audited 2026-06-30.

**Git history scan:** No hardcoded API keys, tokens, passwords, or credentials found in any commit.

**Codebase scan:** No hardcoded secrets. All external service references (Cal.com — pending Stage 8) documented in `.env.example`.

**`.env*` in `.gitignore`:** Confirmed — `.env` and `.env.*` are ignored.

**`.env.example` created:** Documents all future required variables without real values.

---

## Stage 14 — Error Handling & Information Disclosure

> Audited 2026-06-30.

**What was audited:**
- 404 page: custom `/app/not-found.tsx` exists — no internal paths or stack traces exposed
- 500 / unhandled errors: Next.js production mode (`NODE_ENV=production`) suppresses detailed error overlays; full stack logged server-side only
- API route errors: all caught in try/catch; only generic messages returned to client
- Form validation errors: Zod error messages surfaced per-field (safe field names only); no internal paths or schema details leaked

**No changes needed** — error handling was correctly implemented in prior stages.
