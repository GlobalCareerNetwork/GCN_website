import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

// Editorial eyebrow: "01 ——————— WHO WE ARE"
function SectionEyebrow({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
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
      className="py-20"
      style={{
        background: "linear-gradient(180deg, #fff 0%, #f5f3ff 100%)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-labelledby="who-we-are-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* ── Who We Are ── */}
          <Reveal delay={0}>
            <div>
              <SectionEyebrow num="01">Who We Are</SectionEyebrow>
              <h2
                id="who-we-are-heading"
                className="font-extrabold tracking-tight mb-5 leading-snug"
                style={{
                  color: "var(--color-black-soft)",
                  fontSize: "clamp(1.6rem, 2.8vw, 2rem)",
                  letterSpacing: "-0.02em",
                }}
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
          </Reveal>

          {/* ── What We Do ── */}
          <Reveal delay={120}>
            <div>
              <SectionEyebrow num="02">What We Do</SectionEyebrow>
              <h2
                className="font-extrabold tracking-tight mb-5 leading-snug"
                style={{
                  color: "var(--color-black-soft)",
                  fontSize: "clamp(1.6rem, 2.8vw, 2rem)",
                  letterSpacing: "-0.02em",
                }}
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
          </Reveal>

        </div>
      </div>
    </section>
  );
}
