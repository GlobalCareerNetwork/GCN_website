# Deployment Guide

This site deploys to **Vercel**. It is not live yet as of 2026-07-20 — once it's ready, it will
replace the club's old site at `gcn-asu.com`. This doc walks through every step a teammate needs,
with no prior Vercel experience required.

---

## 1. First-time setup: creating the Vercel project

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login is easiest).
2. Click **Import Project**, then select the `GlobalCareerNetwork/GCN_website` GitHub repo.
   - If it's not listed, click "Adjust GitHub App Permissions" and grant Vercel access to the
     `GlobalCareerNetwork` org.
3. Vercel auto-detects Next.js — leave the default build settings:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (default)
   - **Output Directory:** (default, leave blank)
   - **Install Command:** `npm install` (default)
4. **Environment variables:** none are required to deploy today. When the Cal.com booking feature
   is built (see `.env.example` and `CLAUDE.md`'s "Known Pending Items"), add `CAL_COM_API_KEY`
   and `CAL_COM_BOOKING_SLUG` here under **Settings → Environment Variables** — never commit real
   values to the repo.
5. Click **Deploy**. First deploy takes ~1-2 minutes. You'll get a URL like
   `gcn-website-xyz.vercel.app`.

## 2. Pointing the production domain at `gcn-asu.com`

The old GCN site currently lives at `gcn-asu.com`. When this Next.js site is ready to go live:

1. In the Vercel project, go to **Settings → Domains**.
2. Add `gcn-asu.com` (and `www.gcn-asu.com` if used).
3. Vercel shows the DNS records to set (usually an `A` record to Vercel's IP or a `CNAME`).
   Whoever manages the domain's DNS (registrar or previous host) needs to update those records.
4. DNS propagation can take a few minutes to a few hours. Vercel auto-issues an SSL cert once DNS
   resolves.
5. **Before cutting over:** confirm with whoever owns the current `gcn-asu.com` hosting that it's
   OK to repoint DNS — this takes the old site down and this one live in its place. This is a
   real, externally-visible, hard-to-reverse action — don't do it without a heads-up to the team.
6. After cutover, update `SITE_URL` in `lib/site.ts` if it doesn't already say `https://gcn-asu.com`
   (it does by default — see `SEO_GUIDE.md` for what else depends on this constant).

## 3. Normal redeploys

Vercel auto-deploys on every push:

- **Push to `main`** → deploys to production (the live domain).
- **Push to any other branch / open a PR** → Vercel creates a unique **preview URL** for that
  branch, posted as a comment on the PR. Use this to check a change before merging — click the
  preview link, click around, confirm nothing looks broken.
- No manual deploy step is ever needed. If you want to force a redeploy without a new commit
  (e.g. after changing an environment variable), go to the Vercel dashboard → **Deployments** →
  the three-dot menu on the latest deployment → **Redeploy**.

## 4. Rolling back a bad deploy

If a production deploy breaks something:

1. Go to the Vercel dashboard → your project → **Deployments**.
2. Find the last known-good deployment (before the bad one).
3. Click the three-dot menu → **Promote to Production**.
4. This is instant — no rebuild needed, no git revert required (though you should still fix and
   revert the bad commit in git afterward so the next deploy doesn't reintroduce the issue).

## 5. Testing a branch before merging

Every PR gets its own preview URL automatically (see §3). Use that link to:
- Click through the pages that changed.
- Check the browser console for errors (right-click → Inspect → Console tab).
- Confirm on both desktop and mobile widths (browser devtools → toggle device toolbar).

## 6. CI checks

`.github/workflows/ci.yml` runs on every PR and push to `main`: type check, lint, and a full
production build. A red X on a PR means one of those failed — click "Details" on the GitHub check
to see which step and why. Merging is not blocked automatically unless branch protection is
enabled (see `SECURITY_AUDIT.md`'s recommendation to turn this on).
