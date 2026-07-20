<div align="center">

# Global Career Network — Official Website

### The digital front door of ASU's largest career organization

*2,000+ members · career events, mentorship, and a global professional network*

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## About

**Global Career Network (GCN)** is Arizona State University's largest student-run career
organization — helping students land internships and full-time roles through recruiter events,
career workshops, and a powerful peer network.

This repository is GCN's **official public website**, built with Next.js (App Router). It's the
first touchpoint for prospective members, corporate sponsors, and campus partners. It will
eventually replace the club's older static site at `gcn-asu.com`.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, static prerendering)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (`@theme inline` in `app/globals.css` — no `tailwind.config.ts`)
- **3D:** `@react-three/fiber` / `@react-three/drei` (homepage globe, lazy-loaded client-only)
- **Analytics:** `@vercel/analytics` (cookieless, no PII)

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero, who-we-are, stats, sponsor logos |
| `/team` | Executive board org chart |
| `/events` | Event timeline/slideshow |
| `/sponsor` | Sponsorship tiers and partnership info |
| `/achievements` | Placeholder — not yet built (kept out of search results) |
| `/resources` | Placeholder — not yet built (kept out of search results) |

## Run locally

```bash
git clone https://github.com/GlobalCareerNetwork/GCN_website.git
cd GCN_website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required for
local development — see `.env.example` for the (currently unused, pending) Cal.com integration.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
node node_modules/typescript/bin/tsc --noEmit --project tsconfig.json   # type check
```

## Documentation

This repo is meant to be self-service — a teammate should be able to do any of the following
without needing AI help:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** — how to deploy to Vercel, cut over the production domain,
  redeploy, and roll back a bad release.
- **[SEO_GUIDE.md](./SEO_GUIDE.md)** — how to update page metadata, finish Google Search
  Console / Bing Webmaster verification, and confirm the site is indexing correctly.
- **[SECURITY_AUDIT.md](./SECURITY_AUDIT.md)** — current security posture and how to re-run the
  audit yourself.
- **[MIGRATION_MAP.md](./MIGRATION_MAP.md)** — historical record of the migration from the old
  static HTML site to this Next.js app.

## Contributing

Officers and members: open a PR against `main`. CI (`.github/workflows/ci.yml`) runs a type
check, lint, and production build on every PR.

---

<div align="center">

**Global Career Network @ Arizona State University**

Maintained by the GCN E-Board · President: [Keshava Olagappaa Subramanian](https://www.linkedin.com/in/keshava-olagappaa/)

</div>
