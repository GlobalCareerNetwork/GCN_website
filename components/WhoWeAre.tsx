import type { ReactNode } from "react";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border mb-4"
      style={{
        background: "var(--color-brand-red-light)",
        borderColor: "rgba(158,34,26,0.2)",
        color: "var(--color-brand-red)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
      {children}
    </p>
  );
}

export default function WhoWeAre() {
  return (
    <section
      className="py-20"
      style={{ background: "#fff", borderTop: "1px solid var(--color-gray-border)" }}
      aria-labelledby="who-we-are-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* ── Who We Are ── */}
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2
              id="who-we-are-heading"
              className="text-2xl md:text-3xl font-extrabold tracking-tight mb-5 leading-snug"
              style={{ color: "var(--color-black-soft)" }}
            >
              One of ASU&apos;s leading student-led career organizations
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-gray-muted)" }}>
              Founded two years ago by five students, the Global Career Network has grown into one
              of ASU&apos;s leading student-led career organizations, with a community of nearly 2,000
              members across 88 countries. We exist to close the gap between academic preparation
              and industry readiness — connecting students directly with the mentors, employers,
              and opportunities that shape real careers.
            </p>

          </div>

          {/* ── What We Do ── */}
          <div>
            <SectionLabel>What We Do</SectionLabel>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight mb-5 leading-snug"
              style={{ color: "var(--color-black-soft)" }}
            >
              Bridge between ASU talent and global industry
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-gray-muted)" }}>
              We build the bridge between ASU talent and global industry through high-impact
              programming: flagship events like GlobeTalk, our TEDx-style speaker series; GlobeHack
              and GlobeStrat, our hackathon and case-competition formats; and direct partner
              engagements, including workshops with organizations like AWS. Beyond events, we
              provide hands-on career support — resume mentorship, interview preparation, and
              ongoing guidance — so every member leaves equipped, not just informed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
