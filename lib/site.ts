// Single source of truth for the site's canonical domain.
//
// The production domain is not live yet — this site will eventually replace
// the old GCN site at this same URL. Once deployed, update SITE_URL here (and
// nowhere else) to switch every canonical link, sitemap entry, robots.txt
// reference, and Open Graph tag across the app. See SEO_GUIDE.md.
export const SITE_URL = "https://gcn-asu.com";

export const SITE_NAME = "Global Career Network at ASU";

export const SITE_DESCRIPTION =
  "Connecting international students at ASU with professional opportunities, resume mentorship, career guidance, and a global network of industry leaders.";

export const SOCIAL_INSTAGRAM = "https://www.instagram.com/gcn.asu";

export const SOCIAL_LINKEDIN = "https://www.linkedin.com/company/global-career-network";

export const JOIN_SUNDEVIL_CENTRAL_URL =
  "https://sundevilcentral.eoss.asu.edu/globalcareernetwork/club_signup";

// Next.js metadata objects don't deep-merge between the root layout and a
// page — setting a page-level `openGraph`/`twitter` REPLACES the root's
// entire object, dropping fields like `images`/`type` you didn't repeat. This
// helper builds the full, consistent block for a page in one call so every
// route stays correct without hand-repeating og:image/twitter:card everywhere.
export function pageMetadata(title: string, description: string, path: string) {
  return {
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website" as const,
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1731,
          height: 909,
          alt: "Global Career Network — Careers Without Borders",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: ["/og.png"],
    },
  };
}
