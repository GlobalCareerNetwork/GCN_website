import Reveal from "@/components/Reveal";

// Closing community statement — the last word on the homepage before the footer.
export default function ClosingStatement() {
  return (
    <section
      className="gcn-closing-stage relative overflow-hidden"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-labelledby="closing-statement-heading"
    >
      <div aria-hidden="true" className="gcn-grain-overlay" />
      <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-5 mb-10" aria-hidden="true">
            <div style={{ width: "56px", height: "1px", background: "var(--color-brand-red)", opacity: 0.35 }} />
            <span style={{ color: "var(--color-brand-red)", fontSize: "13px", lineHeight: 1 }}>✦</span>
            <div style={{ width: "56px", height: "1px", background: "var(--color-brand-red)", opacity: 0.35 }} />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            id="closing-statement-heading"
            className="mb-8 gcn-gradient-text"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            We meet students where they are.
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p
            className="mx-auto"
            style={{
              maxWidth: "58ch",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--color-gray-text)",
            }}
          >
            Some discover us over a free drink outside Starbucks. Others come for a
            panel, a workshop, or a hackathon. Whatever brings them to GCN, we make
            sure they leave with more than just an event. They leave with people
            they&apos;ll recognize on campus, conversations they&apos;ll remember, and a
            community they&apos;ll keep coming back to!
          </p>
        </Reveal>
      </div>
    </section>
  );
}
