/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceLayer from "@/components/ExperienceLayer";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, pageMetadata } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ExperienceLayer />
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
