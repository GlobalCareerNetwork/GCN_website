import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, pageMetadata } from "@/lib/site";

// Inter — clean, highly readable sans for body and UI (SIL OFL 1.1 license)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Cormorant Garamond — elegant display serif for headings and wordmarks (SIL OFL 1.1 license)
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Space Grotesk — accent font used sparingly for stat numbers, buttons, and
// badges only (SIL OFL 1.1 license). Never used for body copy or headings.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | GCN at ASU",
  },
  keywords: [
    "career network",
    "ASU",
    "international students",
    "professional development",
    "Arizona State University",
  ],
  ...pageMetadata(SITE_NAME, SITE_DESCRIPTION, "/"),
  robots: {
    index: true,
    follow: true,
  },
  // No Google Search Console / Bing Webmaster properties exist yet for this
  // domain. Once created, add a `verification: { google: "...", other: {
  // "msvalidate.01": "..." } }` field here with the real codes — see
  // SEO_GUIDE.md for the exact steps. Left out entirely for now so no empty
  // verification meta tags ship to production.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
