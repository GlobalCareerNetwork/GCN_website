import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: {
    default: "Global Career Network at ASU",
    template: "%s | GCN at ASU",
  },
  description:
    "Connecting international students at ASU with professional opportunities, resume mentorship, career guidance, and a global network of industry leaders.",
  keywords: [
    "career network",
    "ASU",
    "international students",
    "professional development",
    "Arizona State University",
  ],
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
      </body>
    </html>
  );
}
