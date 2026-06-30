import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

function SectionEyebrow({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="font-black shrink-0"
        style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
      >
        {num}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
      <span
        className="font-bold shrink-0 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
      >
        {children}
      </span>
    </div>
  );
}

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
      {/* ── Newspaper section header — full width ── */}
      <div
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div
          className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4"
        >
          <span
            className="font-black uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            Feature
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            About GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
          </span>
        </div>
      </div>

      {/* ── 2-column newspaper article layout with vertical rule ── */}
      <div className="mx-auto max-w-7xl px-6">
        {/* grid-cols-[1fr_1px_1fr] puts a 1px separator column between the two articles */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">

          {/* ── Article 1: Who We Are ── */}
          <Reveal delay={0}>
            <div className="py-10 md:pr-10">
              <SectionEyebrow num="01">Who We Are</SectionEyebrow>
              <h2
                id="who-we-are-heading"
                className="font-bold mb-4 leading-snug"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-black-soft)",
                  fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                One of ASU&apos;s leading student-led career organizations
              </h2>
              <p className="gcn-body-col" style={{ color: "var(--color-gray-muted)" }}>
                Founded two years ago by five students, the Global Career Network has grown
                into one of ASU&apos;s leading student-led career organizations, with a community
                of nearly 2,000 members across 88 countries. We exist to close the gap between
                academic preparation and industry readiness — connecting students directly with
                the mentors, employers, and opportunities that shape real careers.
              </p>
            </div>
          </Reveal>

          {/* ── Vertical rule (visible on md+) ── */}
          <div
            className="hidden md:block"
            style={{ background: "var(--color-gray-border)" }}
            aria-hidden="true"
          />

          {/* ── Article 2: What We Do ── */}
          <Reveal delay={120}>
            <div className="py-10 md:pl-10 border-t md:border-t-0" style={{ borderColor: "var(--color-gray-border)" }}>
              <SectionEyebrow num="02">What We Do</SectionEyebrow>
              <h2
                className="font-bold mb-4 leading-snug"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "var(--color-black-soft)",
                  fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Bridge between ASU talent and global industry
              </h2>
              <p className="gcn-body-col" style={{ color: "var(--color-gray-muted)" }}>
                We build the bridge between ASU talent and global industry through high-impact
                programming: flagship events like GlobeTalk, our TEDx-style speaker series;
                GlobeHack and GlobeStrat, our hackathon and case-competition formats; and direct
                partner engagements, including workshops with organizations like AWS. Beyond
                events, we provide hands-on career support — resume mentorship, interview
                preparation, and ongoing guidance — so every member leaves equipped, not just
                informed.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
