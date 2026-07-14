import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";

// Standalone full-width homepage section — "01 Who We Are".
// Split out from the former combined About GCN block so the story about who
// GCN is gets its own spacious editorial spread rather than a cramped column.
export default function WhoWeAre() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--color-gray-border)",
        borderBottom: "1px solid var(--color-gray-border)",
        background: "#fff",
      }}
      aria-labelledby="who-we-are-heading"
    >
      {/* ── Newspaper masthead strip — introduces the "About GCN" story arc ── */}
      <div style={{ borderBottom: "1px solid var(--color-gray-border)" }}>
        <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4">
          <span
            className="font-black uppercase shrink-0"
            style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            Feature
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            About GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0 hidden sm:block"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
          </span>
        </div>
      </div>

      {/* ── Editorial spread: heading column + body column ── */}
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 md:gap-16 items-start">

          {/* ── Heading column ── */}
          <Reveal delay={0}>
            <div className="relative">
              {/* Oversized watermark numeral — restrained editorial texture, not a graphic */}
              <span
                aria-hidden="true"
                className="absolute select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(7rem, 16vw, 12rem)",
                  lineHeight: 1,
                  color: "var(--color-brand-red)",
                  opacity: 0.06,
                  top: "-1.2rem",
                  left: "-0.5rem",
                  zIndex: 0,
                }}
              >
                01
              </span>
              <div className="relative" style={{ zIndex: 1 }}>
                <SectionEyebrow num="01">Who We Are</SectionEyebrow>
                <h2
                  id="who-we-are-heading"
                  className="leading-snug"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-black-soft)",
                    fontSize: "clamp(2rem, 3.6vw, 2.9rem)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  One of ASU&apos;s leading student-led career organizations
                </h2>
              </div>
            </div>
          </Reveal>

          {/* ── Body column ── */}
          <Reveal delay={120}>
            <div style={{ maxWidth: "62ch" }}>
              <p className="gcn-body-col" style={{ color: "var(--color-gray-muted)" }}>
                GCN was built on a simple belief: career growth happens faster when you have
                people willing to help you along the way. Everything we do, from weekly tabling
                sessions to flagship conferences, is organized by students who remember what it
                felt like to be new on campus, uncertain about recruiting, or unsure where to
                begin.
              </p>
              <p className="gcn-body-col mt-5" style={{ color: "var(--color-gray-muted)" }}>
                That&apos;s why our community has always focused on conversations before numbers.
                We celebrate attendance, partnerships, and milestones, but we&apos;re most proud
                of the students who return, not because they have to, but because they found
                mentors, teammates, and friends here. As our community has grown across dozens
                of majors and 88 countries, that sense of belonging has remained at the center
                of everything we do.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
