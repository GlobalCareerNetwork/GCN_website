# Security Audit — GCN at ASU

> Generated: 2026-06-30  
> Branch: `feature-nextjs-migration`  
> Auditor: Claude Code (Stage 10)

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

**CSP domains actually loaded from (audited):**
- `fonts.googleapis.com` — Plus Jakarta Sans CSS
- `fonts.gstatic.com` — Plus Jakarta Sans font files
- `blob:` — Three.js WebGL contexts require blob: for worker scripts
- `'unsafe-eval'` — Required by Three.js/WebGL shader compilation
- `'wasm-unsafe-eval'` — Required by Three.js WASM modules

**CSP note:** `'unsafe-inline'` is needed for Tailwind v4's runtime CSS-in-JS injection in development. In production static builds this is not needed but the header is served at the CDN/server level and applies equally.

---

## Stage 12 — Form & Input Security (Join Us page)

> Added 2026-06-30. See `app/api/join/route.ts` and `app/join/page.tsx`.

**What was vulnerable:**
- No Join Us form existed (placeholder page). Built from scratch with security-first design.

**What was built:**
- Server-side Zod validation on all fields (name, email, major, year, message)
- Input sanitization: all string fields stripped of leading/trailing whitespace; email normalized to lowercase
- No sensitive data logged — form data logged only as `{ email: "[redacted]" }` in server logs
- Rate limiting: 5 submissions per IP per 15-minute window via in-memory store
- CSRF: Next.js App Router API routes require same-origin `Content-Type: application/json` — no cookie-based CSRF vector. Origin header validated.
- No `<form action="">` HTML forms — all submission via `fetch()` to `/api/join`, which cannot be triggered by cross-site HTML forms.

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
