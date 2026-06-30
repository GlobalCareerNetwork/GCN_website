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
    accentBg: "rgba(184,137,42,0.07)",
    badgeBg: "rgba(184,137,42,0.12)",
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
    accentBg: "rgba(112,112,112,0.06)",
    badgeBg: "rgba(112,112,112,0.1)",
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
    accentBg: "rgba(155,106,58,0.07)",
    badgeBg: "rgba(155,106,58,0.1)",
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
    accent: "#6B7280",
    accentBg: "rgba(107,114,128,0.05)",
    badgeBg: "var(--color-brand-red-light)",
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

// ── Partnership benefits ──────────────────────────────────────────────────────
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

// ── Programs ──────────────────────────────────────────────────────────────────
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

// ── Impact ────────────────────────────────────────────────────────────────────
const IMPACT = [
  "Growing network of students & professionals",
  "Industry experts & guest speakers",
  "Partnerships with startups, corporations & community organizations",
  "Diverse and inclusive professional community",
];

// ── Checkmark icon ─────────────────────────────────────────────────────────────
function Check({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <circle cx="7.5" cy="7.5" r="7" fill={color} opacity="0.12" />
      <path d="M4.5 7.5l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SponsorPage() {
  return (
    <div style={{ background: "var(--color-surface)" }}>

      {/* ── HERO HEADER ── */}
      <section
        className="py-20 md:py-28 text-center"
        style={{ background: "var(--color-surface-white)", borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="sponsor-heading"
      >
        <div className="mx-auto max-w-4xl px-6">
          <p
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border mb-6"
            style={{
              background: "var(--color-brand-red-light)",
              borderColor: "rgba(158,34,26,0.2)",
              color: "var(--color-brand-red)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
            Partnership Opportunities
          </p>

          <h1
            id="sponsor-heading"
            className="font-extrabold tracking-tight leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              color: "var(--color-black-soft)",
            }}
          >
            2026 Sponsorship Opportunities
          </h1>

          <p
            className="text-xl font-medium mb-10"
            style={{ color: "var(--color-brand-red)" }}
          >
            Connect. Learn. Succeed.
          </p>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {[
              { value: "2,000+", label: "Student & Professional Community Members" },
              { value: "ASU", label: "Arizona State University Student Organization" },
              { value: "Events", label: "Career Development, Networking & Innovation" },
              { value: "Direct", label: "Access to Emerging Talent" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-1 px-4 py-4 rounded-xl"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-gray-border)",
                }}
              >
                <span
                  className="font-extrabold leading-none"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", color: "var(--color-brand-red)" }}
                >
                  {value}
                </span>
                <span className="text-xs leading-snug" style={{ color: "var(--color-gray-muted)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PARTNER ── */}
      <section
        className="py-16"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="why-partner-heading"
      >
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--color-brand-red)" }}
              >
                Why Partner With GCN
              </p>
              <h2
                id="why-partner-heading"
                className="text-2xl md:text-3xl font-extrabold tracking-tight mb-5 leading-snug"
                style={{ color: "var(--color-black-soft)" }}
              >
                Invest in the next generation of global talent
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-gray-muted)" }}>
                Global Career Network (GCN) connects students, professionals, founders, and
                organizations through career-focused events, mentorship programs, networking
                opportunities, and innovation initiatives. By partnering with GCN, your
                organization gains access to a highly engaged community of future leaders while
                supporting professional growth and career development.
              </p>
            </div>

            {/* Partnership Benefits grid */}
            <div className="grid grid-cols-2 gap-3">
              {BENEFITS.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--color-gray-border)",
                  }}
                >
                  <span style={{ color: "var(--color-brand-red)" }}>{icon}</span>
                  <span className="text-sm font-semibold" style={{ color: "var(--color-black-soft)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPONSORSHIP TIERS ── */}
      <section
        className="py-16"
        aria-labelledby="tiers-heading"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-4">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-brand-red)" }}
            >
              Sponsorship Tiers
            </p>
            <h2
              id="tiers-heading"
              className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4"
              style={{ color: "var(--color-black-soft)" }}
            >
              Choose your partnership level
            </h2>
          </div>

          {/* ── SCOPE NOTE — clearly visible, not buried ── */}
          <div
            className="flex items-start gap-3 px-5 py-4 rounded-xl mb-10 mx-auto max-w-3xl"
            style={{
              background: "rgba(184,137,42,0.06)",
              border: "1px solid rgba(184,137,42,0.25)",
            }}
            role="note"
            aria-label="Sponsorship scope clarification"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="9" cy="9" r="7.5" stroke="#B8892A" strokeWidth="1.4" />
              <path d="M9 8v5M9 6v.5" stroke="#B8892A" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p className="text-sm leading-relaxed" style={{ color: "#6B4E10" }}>
              <strong>Sponsorship scope:</strong> Each tier listed below applies to a{" "}
              <strong>single featured GCN event</strong> (e.g., GlobeTalk or GlobeHack), not a
              full-year club sponsorship. If you&apos;re interested in an ongoing, year-round
              partnership, please contact us directly to discuss custom arrangements.
            </p>
          </div>

          {/* Tier cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: `1px solid var(--color-gray-border)`,
                  borderTop: `3px solid ${tier.borderColor}`,
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                {/* Card header */}
                <div
                  className="px-6 pt-6 pb-5"
                  style={{ background: tier.accentBg, borderBottom: "1px solid var(--color-gray-border)" }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3
                      className="font-extrabold text-lg leading-tight"
                      style={{ fontFamily: "var(--font-display)", color: "var(--color-black-soft)" }}
                    >
                      {tier.name}
                    </h3>
                    <span
                      className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                      style={{ background: tier.badgeBg, color: tier.badgeFg }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ fontFamily: "var(--font-display)", color: tier.accent }}
                  >
                    {tier.price}
                  </p>
                </div>

                {/* Benefits list */}
                <ul className="flex flex-col gap-3 px-6 py-5 flex-1 list-none m-0 p-6">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-gray-text)" }}>
                      <Check color={tier.accent} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-6 pb-6">
                  <a
                    href="mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20—%20GCN%20at%20ASU"
                    className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{
                      background: tier.accentBg,
                      border: `1px solid ${tier.borderColor}`,
                      color: tier.accent === "#707070" ? "#4A4A4A" : tier.accent,
                    }}
                  >
                    Inquire About {tier.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS & INITIATIVES ── */}
      <section
        className="py-16"
        style={{ background: "var(--color-surface-white)", borderTop: "1px solid var(--color-gray-border)", borderBottom: "1px solid var(--color-gray-border)" }}
        aria-labelledby="programs-heading"
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-red)" }}>
              What We Run
            </p>
            <h2
              id="programs-heading"
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ color: "var(--color-black-soft)" }}
            >
              GCN Programs &amp; Initiatives
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROGRAMS.map(({ label, icon, items }) => (
              <div
                key={label}
                className="flex flex-col gap-3 p-5 rounded-2xl"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-gray-border)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-brand-red-light)", color: "var(--color-brand-red)" }}
                >
                  {icon}
                </div>
                <p className="font-bold text-sm" style={{ color: "var(--color-black-soft)" }}>{label}</p>
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
      <section className="py-14" aria-labelledby="impact-heading">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-red)" }}>
              Our Impact
            </p>
            <h2
              id="impact-heading"
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "var(--color-black-soft)" }}
            >
              A community built on real outcomes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {IMPACT.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{ background: "#fff", border: "1px solid var(--color-gray-border)" }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--color-brand-red)" }}
                />
                <p className="text-sm font-medium" style={{ color: "var(--color-black-soft)" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        className="py-20"
        style={{
          background: "var(--color-black-soft)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2
            id="cta-heading"
            className="font-extrabold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#fff",
            }}
          >
            Let&apos;s Build the Future Together
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
            Partner with GCN to support student success, strengthen your brand, and connect
            with tomorrow&apos;s talent.
          </p>

          {/* Contact options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Primary: email */}
            <a
              href="mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20—%20GCN%20at%20ASU"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "var(--color-brand-red)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Email Us to Inquire
            </a>

            {/* Secondary: Instagram */}
            <a
              href="https://www.instagram.com/gcn.asu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              @gcn.asu
            </a>

            {/* Back to main site */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-85"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Visit GCN Website
            </Link>
          </div>

          {/* TODO: Cal.com booking — Stage 8 pending (awaiting CAL_COM_API_KEY + booking slug credentials) */}
          {/* Once Stage 8 is complete, replace this block with the real Cal.com embed or booking link button */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px dashed rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.35)",
            }}
            aria-label="Schedule a call — coming soon"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="11" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1 5h11M4.5 1v1.5M8.5 1v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Schedule a call — booking link coming soon
          </div>

          {/* Contact details */}
          <p className="mt-8 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            globalcareernetwork.club@gmail.com · @gcn.asu · Arizona State University
          </p>
        </div>
      </section>

    </div>
  );
}
