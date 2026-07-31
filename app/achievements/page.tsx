import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { getPastEvents, getEventsSortedByDate } from "@/lib/data/events";
import SectionEyebrow from "@/components/SectionEyebrow";
import StatsBlock from "@/components/StatsBlock";
import SponsorLogoWall from "@/components/SponsorLogoWall";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const achievementsDescription =
  "Real outcomes from GCN's events at ASU — internship offers, hackathon results, membership growth, and the partnerships our community has built.";

export const metadata: Metadata = {
  title: "Achievements",
  ...pageMetadata("Achievements | GCN at ASU", achievementsDescription, "/achievements"),
};

// Trim at the nearest word boundary rather than mid-word so excerpts never
// end on a chopped word.
function excerpt(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

const milestones = getEventsSortedByDate(
  getPastEvents().filter((event) => event.highlightStat !== null)
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AchievementsPage() {
  return (
    <div style={{ background: "var(--color-surface)" }}>

      {/* ── MASTHEAD HEADER ── */}
      <div
        style={{
          borderBottom: "2px solid var(--color-black-soft)",
          background: "var(--color-surface-white)",
        }}
      >
        <div
          className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4"
          style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        >
          <span className="font-black uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}>
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Milestones &amp; Impact
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span className="font-bold uppercase shrink-0 hidden sm:block" style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}>
            Arizona State University
          </span>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="font-bold uppercase mb-2" style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}>
            Our Track Record
          </p>
          <h1
            id="milestones-heading"
            className="mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(2.1rem, 4vw, 3.3rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-black-soft)",
              lineHeight: 1.08,
            }}
          >
            Achievements
          </h1>
          <p className="text-base font-medium max-w-2xl" style={{ color: "var(--color-brand-red)" }}>
            Real outcomes from GCN&apos;s events — the partnerships, internships, and milestones
            our community has built.
          </p>
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(12,12,14,0.22)", marginTop: "3px" }} />

      {/* ── STATS BLOCK — same animated tiles used on the homepage ── */}
      <StatsBlock />

      {/* ── MILESTONES ── */}
      <section
        className="py-0"
        aria-labelledby="milestones-heading"
        style={{ borderBottom: "1px solid var(--color-gray-border)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="py-6">
            <SectionEyebrow num="01">Milestones</SectionEyebrow>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {milestones.map((event) => (
              <Card key={event.id} className="gcn-card-hover h-full">
                <CardHeader>
                  <p
                    className="font-black uppercase"
                    style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-brand-red)" }}
                  >
                    {event.semester}
                  </p>
                  <CardTitle
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      lineHeight: 1.25,
                      color: "var(--color-black-soft)",
                    }}
                  >
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <p
                    className="font-extrabold"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      lineHeight: 1.2,
                      color: "var(--color-brand-red)",
                    }}
                  >
                    {event.highlightStat}
                  </p>
                  <CardDescription className="leading-relaxed" style={{ color: "var(--color-gray-text)" }}>
                    {excerpt(event.outcome ?? "", 150)}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS & COLLABORATORS — same sponsor wall used on the homepage ── */}
      <SponsorLogoWall />

    </div>
  );
}
