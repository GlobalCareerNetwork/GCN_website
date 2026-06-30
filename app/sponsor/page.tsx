import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsor GCN",
  description:
    "Partner with Global Career Network at ASU. Sponsorship opportunities connecting your organization with 2,000+ students and professionals.",
};

// ── Tier data ─────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: "Gold Sponsor",
    price: "$1,500+",
    badge: "GOLD",
    accent: "#B8892A",
    accentBg: "rgba(184,137,42,0.05)",
    badgeFg: "#8A6515",
    borderColor: "#B8892A",
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
    accent: "#707070",
    accentBg: "rgba(112,112,112,0.04)",
    badgeFg: "#4A4A4A",
    borderColor: "#909090",
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
    accent: "#9B6A3A",
    accentBg: "rgba(155,106,58,0.05)",
    badgeFg: "#7A4E22",
    borderColor: "#9B6A3A",
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
    accent: "var(--color-brand-red)",
    accentBg: "rgba(158,34,26,0.03)",
    badgeFg: "var(--color-brand-red)",
    borderColor: "var(--color-brand-red)",
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 5v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Talent Recruitment",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M15 9l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Social Media Exposure",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 8h16M7 2v2M13 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Community Impact",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 17s-7-4.35-7-9a7 7 0 0114 0c0 4.65-7 9-7 9z" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    label: "Speaking Opportunities",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
  "Growing network of students & professionals",
  "Industry experts & guest speakers",
  "Partnerships with startups, corporations & community organizations",
  "Diverse and inclusive professional community",
];

// ── Shared eyebrow component ──────────────────────────────────────────────────
function SectionEyebrow({ num, label, right }: { num: string; label: string; right?: string }) {
  return (
    <div
      className="flex items-center gap-4 py-2.5"
      style={{ borderBottom: "1px solid var(--color-gray-border)" }}
    >
      <span
        className="font-black uppercase shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
      >
        {num}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
      <span
        className="font-bold uppercase shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
      >
        {label}
      </span>
      {right && (
        <>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            {right}
          </span>
        </>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SponsorPage() {
  return (
    <div style={{ background: "var(--color-surface)" }}>

      {/* ── NEWSPAPER MASTHEAD HEADER ── */}
      <div
        style={{
          borderBottom: "2px solid var(--color-black-soft)",
          background: "var(--color-surface-white)",
        }}
      >
        {/* Top eyebrow rule */}
        <div
          className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4"
          style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        >
          <span className="font-black uppercase shrink-0" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Partnership Opportunities
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Arizona State University
          </span>
        </div>

        {/* Masthead */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 items-stretch">
            {/* Left: headline */}
            <div className="md:pr-10">
              <p className="font-bold uppercase mb-2" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}>
                2026 Sponsorship Listings
              </p>
              <h1
                id="sponsor-heading"
                className="font-bold leading-none mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                  letterSpacing: "-0.025em",
                  color: "var(--color-black-soft)",
                }}
              >
                Invest in the Next Generation of Global Talent
              </h1>
              <p className="text-base font-medium" style={{ color: "var(--color-brand-red)" }}>
                Connect. Learn. Succeed.
              </p>
            </div>

            {/* Vertical rule */}
            <div
              className="hidden md:block"
              style={{ background: "var(--color-gray-border)" }}
              aria-hidden="true"
            />

            {/* Right: quick stats as newspaper-style fact box */}
            <div className="md:pl-10 pt-6 md:pt-0">
              <p className="font-bold uppercase mb-4" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-gray-muted)" }}>
                At a Glance
              </p>
              <div className="grid grid-cols-2 gap-0 overflow-hidden" style={{ border: "1px solid var(--color-gray-border)" }}>
                {[
                  { value: "2,000+", label: "Community Members" },
                  { value: "ASU", label: "Arizona State University" },
                  { value: "Events", label: "Career Dev, Networking & Innovation" },
                  { value: "Direct", label: "Access to Emerging Talent" },
                ].map(({ value, label }, i) => (
                  <div
                    key={label}
                    className="px-4 py-3"
                    style={{
                      borderLeft: i % 2 === 1 ? "1px solid var(--color-gray-border)" : undefined,
                      borderTop: i >= 2 ? "1px solid var(--color-gray-border)" : undefined,
                    }}
                  >
                    <p
                      className="font-bold leading-none"
                      style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-brand-red)" }}
                    >
                      {value}
                    </p>
                    <p className="text-xs mt-1 leading-snug" style={{ color: "var(--color-gray-muted)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY PARTNER ── */}
      <section
        className="py-0"
        style={{ borderBottom: "1px solid var(--color-gray-border)", background: "#fff" }}
        aria-labelledby="why-partner-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow num="01" label="Why Partner With GCN" right="Partnership Benefits" />

          <div className="grid md:grid-cols-[1fr_1px_1fr] gap-0 items-start py-10">
            {/* Left: article text */}
            <div className="md:pr-10">
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
                Invest in the next generation of global talent
              </h2>
              <p className="gcn-body-col" style={{ color: "var(--color-gray-muted)" }}>
                Global Career Network (GCN) connects students, professionals, founders, and
                organizations through career-focused events, mentorship programs, networking
                opportunities, and innovation initiatives. By partnering with GCN, your
                organization gains access to a highly engaged community of future leaders while
                supporting professional growth and career development.
              </p>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block" style={{ background: "var(--color-gray-border)" }} aria-hidden="true" />

            {/* Right: benefits as list */}
            <div className="md:pl-10 pt-6 md:pt-0">
              <div className="grid grid-cols-1 gap-0">
                {BENEFITS.map(({ label, icon }, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 py-3"
                    style={{ borderTop: i > 0 ? "1px solid var(--color-gray-border)" : undefined }}
                  >
                    <span style={{ color: "var(--color-brand-red)", flexShrink: 0 }}>{icon}</span>
                    <span className="text-sm font-semibold" style={{ color: "var(--color-black-soft)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORSHIP TIERS — newspaper classified layout ── */}
      <section
        className="py-0"
        aria-labelledby="tiers-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow num="02" label="Sponsorship Tiers — 2026 Season" right="Classified Listings" />

          {/* Scope note */}
          <div
            className="flex items-start gap-3 py-4 my-4"
            style={{
              borderTop: "1px solid var(--color-gray-border)",
              borderBottom: "1px solid var(--color-gray-border)",
            }}
            role="note"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="9" cy="9" r="7.5" stroke="#B8892A" strokeWidth="1.4" />
              <path d="M9 8v5M9 6v.5" stroke="#B8892A" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: "#6B4E10" }}>
              <strong>Sponsorship scope:</strong> Each tier listed below applies to a{" "}
              <strong>single featured GCN event</strong> (e.g., GlobeTalk or GlobeHack), not a
              full-year club sponsorship. For ongoing year-round partnerships, contact us directly
              to discuss custom arrangements.
            </p>
          </div>

          {/* ── Classified grid — 2×2 with hairline rules ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden mb-10"
            style={{
              border: "1px solid var(--color-gray-border)",
              borderTop: "2px solid var(--color-black-soft)",
            }}
          >
            {TIERS.map((tier, i) => {
              const isSecondCol = i % 2 === 1;
              const isSecondRow = i >= 2;
              const accentColor = typeof tier.accent === "string" ? tier.accent : "#9e221a";
              return (
                <div
                  key={tier.name}
                  className="flex flex-col p-6"
                  style={{
                    borderLeft: isSecondCol ? "1px solid var(--color-gray-border)" : undefined,
                    borderTop: isSecondRow ? "1px solid var(--color-gray-border)" : undefined,
                    background: tier.accentBg,
                  }}
                >
                  {/* Tier header */}
                  <div
                    className="pb-4 mb-4"
                    style={{ borderBottom: "1px solid var(--color-gray-border)" }}
                  >
                    <p
                      className="font-black uppercase mb-1"
                      style={{ fontSize: "10px", letterSpacing: "0.26em", color: accentColor }}
                    >
                      {tier.badge}
                    </p>
                    <p
                      className="font-bold leading-tight mb-2"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.15rem",
                        color: "var(--color-black-soft)",
                      }}
                    >
                      {tier.name}
                    </p>
                    <p
                      className="font-bold"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.5rem",
                        color: accentColor,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {tier.price}
                    </p>
                  </div>

                  {/* Benefits — classified-style dash list */}
                  <ul className="flex flex-col gap-2 flex-1">
                    {tier.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: "var(--color-gray-text)" }}
                      >
                        <span
                          className="font-bold flex-shrink-0 mt-px"
                          style={{ color: accentColor, fontSize: "12px" }}
                        >
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20—%20GCN%20at%20ASU"
                    className="mt-5 block text-center py-2 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
                    style={{
                      border: `1px solid ${accentColor}`,
                      color: accentColor,
                      letterSpacing: "0.14em",
                    }}
                  >
                    Inquire About {tier.badge} →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS & INITIATIVES ── */}
      <section
        className="py-0"
        style={{ background: "var(--color-surface-white)", borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="programs-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow num="03" label="GCN Programs & Initiatives" right="What We Run" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden py-8 gap-0"
            style={{ borderTop: "none" }}
          >
            {PROGRAMS.map(({ label, icon, items }, i) => (
              <div
                key={label}
                className="flex flex-col gap-3 p-5"
                style={{ borderLeft: i > 0 ? "1px solid var(--color-gray-border)" : undefined }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ color: "var(--color-brand-red)" }}
                >
                  {icon}
                </div>
                <p
                  className="font-bold text-sm uppercase tracking-wide"
                  style={{ fontSize: "11px", letterSpacing: "0.14em", color: "var(--color-black-soft)" }}
                >
                  {label}
                </p>
                <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-muted)" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--color-brand-red)", opacity: 0.5 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR IMPACT ── */}
      <section
        className="py-0"
        aria-labelledby="impact-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <SectionEyebrow num="04" label="Our Impact" right="Community Built on Real Outcomes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden my-6 gap-0"
            style={{ border: "1px solid var(--color-gray-border)" }}
          >
            {IMPACT.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  borderLeft: i % 2 === 1 ? "1px solid var(--color-gray-border)" : undefined,
                  borderTop: i >= 2 ? "1px solid var(--color-gray-border)" : undefined,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--color-brand-red)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--color-black-soft)" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        className="py-20"
        style={{ background: "var(--color-black-soft)", borderTop: "none" }}
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Masthead CTA eyebrow */}
          <div
            className="flex items-center gap-4 mb-10 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          >
            <span className="font-black uppercase shrink-0" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
              GCN
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            <span className="font-bold uppercase shrink-0" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.4)" }}>
              Get in Touch
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 items-start">
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
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Partner with GCN to support student success, strengthen your brand, and connect
                with tomorrow&apos;s talent.
              </p>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block" style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />

            {/* Right: CTAs */}
            <div className="md:pl-12 pt-8 md:pt-0 flex flex-col gap-4">
              <a
                href="mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20—%20GCN%20at%20ASU"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide transition-opacity hover:opacity-85 self-start"
                style={{ background: "var(--color-brand-red)", letterSpacing: "0.12em" }}
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
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-85 self-start"
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
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-85 self-start"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.12em",
                }}
              >
                Visit GCN Website
              </Link>

              {/* TODO: Cal.com booking — Stage 8 pending */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs self-start"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px dashed rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.28)",
                }}
                aria-label="Schedule a call — coming soon"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="11" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1 5h11M4.5 1v1.5M8.5 1v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Schedule a call — booking link coming soon
              </div>

              <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
                globalcareernetwork.club@gmail.com · @gcn.asu · Arizona State University
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
