import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";

const SUPPORT_ROW = [
  { label: "Employer Connections", copy: "Direct access to recruiters, founders, and hiring teams." },
  { label: "Career Development", copy: "Resume, interview, and offer-negotiation preparation." },
  { label: "Student Community", copy: "A network of peers across dozens of majors and 88 countries." },
  { label: "Mentorship and Guidance", copy: "Upperclassmen and alumni who've walked the path first." },
];

// Standalone full-width homepage section — "02 What We Do".
// Mirrors WhoWeAre's composition (body/heading columns swap sides on desktop
// via CSS order, warmer surface tint) so the two About GCN sections read as a
// matched editorial pair rather than identical repeats.
export default function WhatWeDo() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--color-gray-border)",
        borderBottom: "1px solid var(--color-gray-border)",
        background: "var(--color-surface-muted)",
      }}
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 md:gap-16 items-start">

          {/* ── Heading column — comes first in DOM/reading order (a heading
               must precede the content it introduces for screen readers and
               keyboard users), but visually mirrors to the right on desktop
               via `order` so the composition reads as WhoWeAre's mirror. ── */}
          <Reveal delay={0} className="md:order-2">
            <div className="relative md:text-right">
              <span
                aria-hidden="true"
                className="absolute select-none pointer-events-none hidden md:block"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(7rem, 16vw, 12rem)",
                  lineHeight: 1,
                  color: "var(--color-brand-red)",
                  opacity: 0.06,
                  top: "-1.2rem",
                  right: "-0.5rem",
                  zIndex: 0,
                }}
              >
                02
              </span>
              <div className="relative" style={{ zIndex: 1 }}>
                <SectionEyebrow num="02" reverse>
                  What We Do
                </SectionEyebrow>
                <h2
                  id="what-we-do-heading"
                  className="leading-snug"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-black-soft)",
                    fontSize: "clamp(2rem, 3.6vw, 2.9rem)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  A bridge between ASU talent and global industry
                </h2>
              </div>
            </div>
          </Reveal>

          {/* ── Body column — visually sits on the left on desktop ── */}
          <Reveal delay={120} className="md:order-1">
            <div style={{ maxWidth: "62ch" }}>
              <p className="gcn-body-col" style={{ color: "var(--color-gray-muted)" }}>
                We create opportunities for students to meet professionals, recruiters,
                founders, alumni, and fellow students through panels, workshops, competitions,
                and networking events. But we also recognize that every student&apos;s journey
                looks different. Someone preparing for their first internship doesn&apos;t need
                the same guidance as someone recruiting for full-time roles, so we design
                programming that meets students where they are.
              </p>
              <p className="gcn-body-col mt-5" style={{ color: "var(--color-gray-muted)" }}>
                That same mindset carries into our everyday interactions. Whether it&apos;s a
                quick conversation at a Thursday tabling session or a discussion after a panel,
                we take the time to understand what students are looking for before pointing
                them toward opportunities. We believe meaningful communities are built one
                conversation at a time, and that philosophy continues to shape how GCN welcomes
                every new member.
              </p>
            </div>
          </Reveal>

        </div>

        {/* ── Understated supporting row — thin dividers, no cards ── */}
        <Reveal delay={200}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4 mt-16 md:mt-20 pt-10"
            style={{ borderTop: "1px solid var(--color-gray-border)" }}
          >
            {SUPPORT_ROW.map((item, i) => (
              <div
                key={item.label}
                className={`pr-6 pb-8 lg:pb-0 ${i % 2 === 1 ? "border-l pl-6" : ""} ${
                  i !== 0 ? "lg:border-l lg:pl-6" : "lg:border-l-0 lg:pl-0"
                }`}
                style={{ borderColor: "var(--color-gray-border)" }}
              >
                <p
                  className="font-bold uppercase mb-2"
                  style={{ fontSize: "11.5px", letterSpacing: "0.14em", color: "var(--color-brand-red)" }}
                >
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-gray-muted)" }}>
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
