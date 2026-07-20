# SEO Guide

Everything here is meant to be doable by a teammate with no prior SEO/Next.js experience. If
you're just trying to understand what's already in place, see "What's already set up" below;
if you're trying to *do* something (verify Search Console, update a page's description), jump to
the matching section.

---

## The one constant that controls everything: `lib/site.ts`

`SITE_URL` in `lib/site.ts` is the single source of truth for the site's domain. It currently
points at `https://gcn-asu.com` (the old site's domain — this build will replace it there, see
`DEPLOYMENT.md`). Every canonical link, sitemap entry, `robots.txt` reference, and Open Graph URL
is derived from this one constant — change it there, nowhere else, if the domain ever changes.

## What's already set up

- **`app/robots.ts`** — generates `/robots.txt`, allows all crawlers, points to the sitemap.
- **`app/sitemap.ts`** — generates `/sitemap.xml` listing every real (non-placeholder) route. Add
  a new route here (one line) whenever you ship a new page — it's a plain array, not automatic.
- **`app/manifest.ts`** — generates `/manifest.webmanifest` (PWA metadata, icons, theme color).
- **Page metadata** — every route has a title, description, canonical URL, and Open Graph/Twitter
  card tags. The `pageMetadata()` helper in `lib/site.ts` builds all of this consistently — see
  "Adding metadata to a new page" below.
- **Structured data** — the homepage has a JSON-LD `Organization` schema (name, logo, social
  links) so Google can show a knowledge panel / rich result.
- **Favicon/app icons** — generated from `public/images/gcn-globe-mark.svg` at
  `app/icon.png` (192×192) and `app/apple-icon.png` (180×180, for iOS home screen).
- **Analytics** — Vercel Analytics, cookieless, no PII, just aggregate pageviews/referrers.

## Adding metadata to a new page

Every content page (not a "coming soon" placeholder) should export something like this:

```tsx
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

const description = "One or two sentences describing this specific page for search results.";

export const metadata: Metadata = {
  title: "Page Title",
  ...pageMetadata("Page Title | GCN at ASU", description, "/your-route"),
};
```

`pageMetadata()` fills in the canonical URL, Open Graph tags, and Twitter card consistently — you
only need to supply the title, description, and path. Then add the route to the `ROUTES` array in
`app/sitemap.ts` (skip this for placeholder/"coming soon" pages).

**For a placeholder page with no real content yet** (like `/achievements` and `/resources` today),
keep it out of search results instead of writing fake SEO copy for it:

```tsx
export const metadata: Metadata = { title: "Page Name", robots: { index: false, follow: true } };
```

Remove the `robots` line once the page has real content, and add it to the sitemap at that point.

## Finishing Google Search Console verification

No property exists yet for this site. Once the site is live at its real domain:

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add a property for `https://gcn-asu.com` (or whatever `SITE_URL` is at the time).
3. Choose the **HTML tag** verification method (not DNS — simpler for this setup). Google gives
   you a meta tag like `<meta name="google-site-verification" content="XXXXXXXX" />`.
4. In `app/layout.tsx`, add to the `metadata` object:
   ```ts
   verification: { google: "XXXXXXXX" },   // the content value only, not the whole tag
   ```
5. Deploy (push to `main`), then click **Verify** in Search Console.
6. Once verified, go to **Sitemaps** in the left nav and submit `https://gcn-asu.com/sitemap.xml`.
7. Give it a few days, then check **Pages** in Search Console to see indexing status.

## Finishing Bing Webmaster Tools verification

Same idea, different dashboard:

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Add the site. Bing can actually import verified properties directly from Google Search Console
   (look for an "Import from Google Search Console" option) — try that first, it's faster.
3. If verifying manually, Bing gives you a meta tag `<meta name="msvalidate.01" content="XXXX" />`.
   Add it to `app/layout.tsx`'s `metadata` object:
   ```ts
   verification: { google: "...", other: { "msvalidate.01": "XXXXXXXX" } },
   ```
4. Deploy, verify, then submit the sitemap the same way as Google (Bing also has a Sitemaps page).

## Checking the site is indexing correctly (after launch)

- **Google:** search `site:gcn-asu.com` — you should see the pages listed. Also check Search
  Console → **Pages** for any "excluded" or "error" pages.
- **Bing:** same idea with `site:gcn-asu.com` on bing.com, or check Bing Webmaster's Pages report.
- **Social previews:** paste a page URL into
  [Facebook's Sharing Debugger](https://developers.facebook.com/tools/debug/) or
  [Twitter/X's Card Validator](https://cards-dev.twitter.com/validator) to confirm the Open Graph
  image/title/description render correctly when the link is shared.
- **Structured data:** paste the homepage URL into
  [Google's Rich Results Test](https://search.google.com/test/rich-results) to confirm the
  `Organization` JSON-LD is valid.

## Local sanity checks (no external tools needed)

```bash
npm run dev
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/manifest.webmanifest
curl -s http://localhost:3000/ | grep -oE '<meta property="og:[^>]*>|<title>.*</title>'
```
