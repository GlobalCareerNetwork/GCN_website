import type { Metadata } from "next";
import Link from "next/link";
import {
  SponsorBenefitPill,
  SponsorImpactItem,
  SponsorLogoGrid,
  SponsorProgramCard,
  SponsorScrollProgress,
  SponsorSectionEyebrow,
  SponsorSignalChip,
  SponsorStatCard,
} from "@/components/SponsorAtoms";
import SponsorMotionLayer from "@/components/SponsorMotionLayer";
import SponsorTierSnap from "@/components/SponsorTierSnap";
import { pageMetadata } from "@/lib/site";

const sponsorDescription =
  "Partner with Global Career Network at ASU. Sponsorship opportunities connecting your organization with 2,000+ students and professionals.";

export const metadata: Metadata = {
  title: "Sponsor GCN",
  ...pageMetadata("Sponsor GCN | GCN at ASU", sponsorDescription, "/sponsor"),
};

// ── Tier data ─────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Gold Sponsor",
    price: "$1,500+",
    badge: "GOLD",
    metal: "gold",
    accent: "#B8872D",
    accentBg: "rgba(184,135,45,0.12)",
    foil: "#F4D27B",
    hero: true,
    popular: false,
    benefits: [
      "Premium logo placement on all major marketing materials",
      "Featured sponsor recognition throughout the year",
      "Dedicated company spotlight post",
      "Speaking opportunities at flagship events",
      "Priority recruiting access to GCN talent",
      "Event booth opportunities",
      "Exclusive networking opportunities",
      "Priority partnership consideration for future initiatives",
    ],
  },
  {
    name: "Silver Sponsor",
    price: "$1,000",
    badge: "SILVER",
    metal: "silver",
    accent: "#8D929A",
    accentBg: "rgba(141,146,154,0.13)",
    foil: "#D9DEE5",
    hero: false,
    popular: false,
    benefits: [
      "Logo placement across event promotions",
      "Featured sponsor recognition",
      "Dedicated social media spotlight",
      "Workshop or presentation opportunity",
      "Resume book access",
      "Recruiting support",
      "Participation in networking events",
    ],
  },
  {
    name: "Bronze Sponsor",
    price: "$500",
    badge: "BRONZE",
    metal: "bronze",
    accent: "#9A5A32",
    accentBg: "rgba(154,90,50,0.13)",
    foil: "#C98955",
    hero: false,
    popular: true,
    benefits: [
      "Logo placement on select event materials",
      "Social media recognition",
      "Access to participant resume book",
      "Opportunity to engage with students during events",
      "Sponsor acknowledgment during programming",
    ],
  },
  {
    name: "Community Partner",
    price: "In-Kind / Collaborative",
    badge: "PARTNER",
    metal: "partner",
    accent: "var(--color-brand-red)",
    accentBg: "rgba(158,34,26,0.03)",
    foil: "var(--color-brand-red-light)",
    hero: false,
    popular: false,
    benefits: [
      "Website recognition",
      "Community partner listing",
      "Event collaboration opportunities",
      "Mentorship and speaker participation",
      "Social media acknowledgment",
    ],
  },
] as const;

const BENEFITS = [
  {
    label: "Brand Visibility",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Talent Recruitment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 9l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Social Media Exposure",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="15" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 10h1m4.5-4.5L13 7m0 6-1.5-1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Event Engagement",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h16M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Community Impact",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 17s-7-4.35-7-9a7 7 0 0114 0c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Speaking Opportunities",
    icon: (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const PROGRAMS = [
  {
    label: "Career Development",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 18V9M11 18V4M18 18v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    items: ["Resume Reviews", "Workshops", "Professional Training"],
  },
  {
    label: "Networking Events",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="3.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="18.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="11" cy="19.5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.5 6.5L8.5 9M16.5 6.5L13.5 9M11 14v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    items: ["Industry Panels", "Career Fairs", "Alumni Connections"],
  },
  {
    label: "Innovation Programs",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2a7 7 0 00-3 13.32V17h6v-1.68A7 7 0 0011 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 20h6M9.5 17v3M12.5 17v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    items: ["Hackathons", "Startup Challenges", "Innovation Competitions"],
  },
  {
    label: "Community Building",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 19c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 12c2.21 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    items: ["Mentorship", "Leadership Development", "Professional Communities"],
  },
];

const IMPACT = [
  {
    title: "Expanding Network",
    description:
      "Since our founding in 2022, GCN has grown from a handful of international students into one of ASU's most active student-led professional communities, with new members and campus partnerships added every semester.",
  },
  {
    title: "Strategic Alliances",
    description:
      "Deep-level partnerships with leading startups, corporations, and community organizations to foster co-innovation.",
  },
  {
    title: "Expert Network",
    description:
      "Powered by industry leaders and guest speakers from top-tier firms for exclusive insights.",
  },
  {
    title: "Inclusive Community",
    description:
      "Building a diverse and inclusive professional collective committed to real-world outcomes.",
  },
];

const AT_A_GLANCE = [
  {
    value: "2,000+",
    label: "Community Members",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 17c0-3.03 2.46-5.5 5.5-5.5s5.5 2.47 5.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14.5" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M13 11.5c2.2 0 4 1.79 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "ASU",
    label: "Arizona State University",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 18s6-5.5 6-10.5A6 6 0 004 7.5C4 12.5 10 18 10 18z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    value: "Events",
    label: "Career Dev, Networking & Innovation",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h16M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "Direct",
    label: "Access to Emerging Talent",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="0.9" fill="currentColor" />
      </svg>
    ),
  },
];

const PARTNER_LOGOS = [
  { src: "/images/sponsors/amazon.png", alt: "Amazon" },
  { src: "/images/sponsors/nvidia.png", alt: "NVIDIA" },
  { src: "/images/sponsors/intel.png", alt: "Intel" },
  { src: "/images/sponsors/jpmc.svg", alt: "JPMorgan Chase" },
  { src: "/images/sponsors/pwc.png", alt: "PwC" },
  { src: "/images/sponsors/bain.svg", alt: "Bain & Company" },
  { src: "/images/sponsors/tsmc.png", alt: "TSMC" },
  { src: "/images/sponsors/perplexity.png", alt: "Perplexity AI" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SponsorPage() {
  return (
    <SponsorMotionLayer className="gcn-sponsor-page" style={{ background: "var(--color-surface)" }}>
      <SponsorScrollProgress />

      {/* ── Sponsor masthead starts immediately under navbar ── */}
      <div className="gcn-sponsor-kicker-row">
        <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4">
          <span className="font-black uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Partnership Opportunities
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0 hidden sm:block" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Arizona State University
          </span>
        </div>
      </div>

      {/* ── Sponsor headline ── */}
      <div
        className="gcn-page-masthead gcn-page-masthead-split gcn-sponsor-hero"
        style={{
          borderBottom: "2px solid var(--color-black-soft)",
          background: "var(--color-surface-white)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-16 items-stretch">
            {/* Left: headline */}
            <div className="gcn-sponsor-hero-copy">
              <p className="font-bold uppercase mb-2" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}>
                2026 Sponsorship Listings
              </p>
              <h1
                id="sponsor-heading"
                className="gcn-masthead-title mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(2.1rem, 4vw, 3.3rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-black-soft)",
                  lineHeight: 1.08,
                }}
              >
                Invest in the Next Generation of Global Talent
              </h1>
              <p className="text-base font-medium" style={{ color: "var(--color-brand-red)" }}>
                Connect. Learn. Succeed.
              </p>
              <div className="gcn-sponsor-signal" aria-hidden="true">
                <SponsorSignalChip>Brand visibility</SponsorSignalChip>
                <SponsorSignalChip>Recruiting access</SponsorSignalChip>
                <SponsorSignalChip>Speaker moments</SponsorSignalChip>
                <SponsorSignalChip>Event presence</SponsorSignalChip>
                <SponsorSignalChip>Talent pipeline</SponsorSignalChip>
                <SponsorSignalChip>Campus credibility</SponsorSignalChip>
              </div>
            </div>

            {/* Vertical rule */}
            <div
              className="hidden md:block"
              style={{ background: "var(--color-gray-border)" }}
              aria-hidden="true"
            />

            {/* Right: compact sponsorship facts */}
            <div className="gcn-sponsor-hero-facts">
              <p className="font-bold uppercase mb-4" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-gray-muted)" }}>
                At a Glance
              </p>
              <div className="gcn-sponsor-stat-grid">
                {AT_A_GLANCE.map(({ value, label, icon }) => (
                  <SponsorStatCard key={label} value={value} label={label} icon={icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ── WHY PARTNER ── */}
      <section
        id="sponsor-why"
        className="py-0"
        style={{ borderBottom: "1px solid var(--color-gray-border)", background: "#fff" }}
        aria-labelledby="why-partner-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SponsorSectionEyebrow num="01" label="Why Partner With GCN" right="Partnership Benefits" />
          </div>

          <div
            className="gcn-sponsor-benefit-grid grid md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-20 items-start py-14 md:py-16"
            data-sponsor-reveal
          >
            {/* Left: article text */}
            <div>
              <h2
                id="why-partner-heading"
                className="font-bold mb-4 leading-snug"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)",
                  color: "var(--color-black-soft)",
                  letterSpacing: "-0.01em",
                }}
              >
                Why partner with GCN?
              </h2>
              <p
                className="font-bold mb-3"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.05rem",
                  color: "var(--color-brand-red)",
                }}
              >
                Connecting Talent with Opportunity
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: "15.5px", color: "var(--color-gray-text)" }}
              >
                Global Career Network (GCN) actively bridges the gap between ambitious students,
                top-tier professionals, and innovative founders. Through career-accelerating
                events, high-impact mentorship, and strategic network-building, we cultivate the
                next generation of global market leaders.{" "}
                <strong>
                  <em>
                    Partner with GCN to connect directly with motivated, high-quality student
                    talent ready to contribute to your team.
                  </em>
                </strong>
              </p>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block" style={{ background: "var(--color-gray-border)" }} aria-hidden="true" />

            {/* Right: benefits — 2-col x 3-row grid with badged icons */}
            <div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-9">
                {BENEFITS.map(({ label, icon }) => (
                  <SponsorBenefitPill key={label} label={label} icon={icon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER PROOF ── */}
      <section
        id="sponsor-proof"
        className="gcn-sponsor-proof py-0"
        style={{ background: "var(--color-surface-white)", borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="partner-proof-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SponsorSectionEyebrow num="02" label="Partner Proof" right="Real GCN Ecosystem" />
          </div>

          <div className="gcn-sponsor-proof-grid" data-sponsor-reveal>
            <div>
              <p
                className="font-bold uppercase mb-3"
                style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}
              >
                Trusted rooms, real companies
              </p>
              <h2
                id="partner-proof-heading"
                className="font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.55rem, 2.8vw, 2.2rem)",
                  color: "var(--color-black-soft)",
                  letterSpacing: "-0.015em",
                }}
              >
                GCN programs have brought students into conversations with
                recognizable employers, sponsors, and industry communities.
              </h2>
            </div>

            <SponsorLogoGrid logos={PARTNER_LOGOS} />
          </div>
        </div>
      </section>

      {/* ── SPONSORSHIP TIERS — sticky snap experience ── */}
      <section
        id="sponsor-tiers"
        className="gcn-sponsor-tier-section py-0"
        aria-labelledby="tiers-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SponsorSectionEyebrow num="03" label="Sponsorship Tiers: 2026 Season" right="Focused Listings" />
          </div>

          {/* Scope note */}
          <div
            className="gcn-sponsor-scope-note flex items-start gap-3 py-4 my-4"
            data-sponsor-reveal
            style={{
              borderTop: "1px solid var(--color-gray-border)",
              borderBottom: "1px solid var(--color-gray-border)",
            }}
            role="note"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="9" cy="9" r="7.5" stroke="var(--color-brand-red)" strokeWidth="1.4" />
              <path d="M9 8v5M9 6v.5" stroke="var(--color-brand-red)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-brand-red-dark)" }}>
              <strong>Sponsorship scope:</strong> Each tier listed below applies to a{" "}
              <strong>single featured GCN event</strong> (e.g., GlobeTalk or GlobeHack), not a
              full-year club sponsorship. For ongoing year-round partnerships, contact us directly
              to discuss custom arrangements.
            </p>
          </div>

          <h2 id="tiers-heading" className="sr-only">
            Sponsorship tiers
          </h2>
          <SponsorTierSnap tiers={TIERS} />
        </div>
      </section>

      {/* ── PROGRAMS & INITIATIVES ── */}
      <section
        id="sponsor-programs"
        className="py-0"
        style={{ background: "var(--color-surface-white)", borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="programs-heading"
      >
        <h2 id="programs-heading" className="sr-only">
          GCN programs and initiatives
        </h2>
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SponsorSectionEyebrow num="04" label="GCN Programs & Initiatives" right="What We Run" />
          </div>
          <div
            className="gcn-sponsor-program-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden py-10 md:py-12 gap-0"
            data-sponsor-reveal
            style={{ borderTop: "none" }}
          >
            {PROGRAMS.map(({ label, icon, items }, i) => (
              <SponsorProgramCard
                key={label}
                label={label}
                icon={icon}
                items={items}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT — asymmetric split, no grid lines ── */}
      <section
        id="sponsor-impact"
        className="py-0"
        aria-labelledby="impact-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <h2 id="impact-heading" className="sr-only">
          Our impact
        </h2>
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SponsorSectionEyebrow num="05" label="Our Impact" right="Community Built on Real Outcomes" />
          </div>
          <div
            className="gcn-sponsor-impact-grid grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-10 md:gap-14 my-12 md:my-16 items-center"
            data-sponsor-reveal
          >
            {/* Left: metric badge */}
            <div className="flex flex-col items-start justify-center">
              <p
                className="font-extrabold leading-none"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "var(--color-brand-red)" }}
              >
                3+
              </p>
              <p className="font-bold uppercase mt-2" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
                Years Building the Community, Since 2022
              </p>
            </div>

            {/* Right: stacked value points */}
            <div className="flex flex-col gap-6">
              {IMPACT.map(({ title, description }) => (
                <SponsorImpactItem key={title} title={title} description={description} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        id="sponsor-contact"
        className="py-20 md:py-24"
        style={{ background: "var(--color-black-soft)", borderTop: "none" }}
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Masthead CTA eyebrow */}
          <div
            className="flex items-center gap-4 mb-10 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          >
            <span className="font-black uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
              GCN
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            <span className="font-bold uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)" }}>
              Get in Touch
            </span>
          </div>

          <div
            className="gcn-sponsor-cta-grid grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 items-start"
            data-sponsor-reveal
          >
            {/* Left: headline */}
            <div className="md:pr-12">
              <h2
                id="cta-heading"
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                Let&apos;s Build the Future Together
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                Partner with GCN to support student success, strengthen your brand, and connect
                with tomorrow&apos;s talent.
              </p>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />

            {/* Right: CTAs */}
            <div className="md:pl-12 pt-8 md:pt-0 flex flex-col gap-4">
              <a
                href="mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20(GCN%20at%20ASU)"
                className="gcn-btn gcn-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide self-start"
                style={{ letterSpacing: "0.12em" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Email Us to Inquire
              </a>

              <a
                href="https://www.instagram.com/gcn.asu"
                target="_blank"
                rel="noopener noreferrer"
                className="gcn-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-85 self-start"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  letterSpacing: "0.12em",
                }}
              >
                @gcn.asu
              </a>

              <Link
                href="/"
                className="gcn-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-85 self-start"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.78)",
                  letterSpacing: "0.12em",
                }}
              >
                Visit GCN Website
              </Link>

              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.72)" }}>
                globalcareernetwork.club@gmail.com · @gcn.asu · Arizona State University
              </p>
            </div>
          </div>
        </div>
      </section>

    </SponsorMotionLayer>
  );
}
