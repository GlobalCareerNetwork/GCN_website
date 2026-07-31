import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";

const LETTER_BODY = [
  `My name is Keshava Olagappaa Subramanian, and I have the privilege of serving as the
   President of the Global Career Network at Arizona State University. Thank you for taking
   the time to read our proposal.`,
  `Moving halfway across the world to study at ASU was exciting, but it also came with
   uncertainty. Like many students, I arrived with big dreams but very few connections. I soon
   realized that success isn't just about working hard, it's about having the right people to
   guide you, encourage you, and open doors you didn't even know existed.`,
  `That's why GCN means so much to me.`,
  `Our goal is simple: to make sure no student has to navigate their career journey alone.
   Through networking events, mentorship, employer partnerships, and professional development
   opportunities, we help students build confidence, meaningful connections, and a path toward
   their future.`,
  `Your support helps us create those opportunities for hundreds of students across ASU. More
   importantly, it shows students that their ambitions matter and that there are people who
   believe in their potential.`,
  `Thank you for considering partnering with the Global Career Network. We truly appreciate
   your time and hope you'll join us in making a lasting difference in students' lives.`,
];

const letterParaStyle = {
  fontSize: "16.5px",
  lineHeight: 1.85,
  color: "rgba(255,255,255,0.72)",
} as const;

// Full-width homepage section — "03 President's Note".
// Inverted dark treatment (matches Footer / StatsBlock dark tiles) so this reads as a
// distinct featured moment rather than another light editorial section. A genuine
// editorial letter (not a testimonial card): salutation, letter body, and a text-only
// italic signature, set beside a large portrait + letter-margin rule.
export default function PresidentsNote() {
  return (
    <section
      className="gcn-president-stage"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "var(--color-black-soft)",
      }}
      aria-labelledby="presidents-note-heading"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionEyebrow num="03" dark>
            President&apos;s Note
          </SectionEyebrow>
        </Reveal>

        {/* ── Pull quote — the visual anchor of the section ── */}
        <Reveal delay={80}>
          <div className="relative mb-14 md:mb-20" style={{ maxWidth: "30rem" }}>
            <span
              aria-hidden="true"
              className="block select-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(5rem, 11vw, 8rem)",
                lineHeight: 0.5,
                color: "var(--color-brand-red)",
                opacity: 0.45,
              }}
            >
              &ldquo;
            </span>
            <h2
              id="presidents-note-heading"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              No student should have to navigate their{" "}
              <span className="gcn-gradient-text">career journey</span> alone.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="grid grid-cols-1 md:grid-cols-[190px_1px_1fr] gap-10 md:gap-14">

            {/* ── Portrait — enlarged, given room to breathe ── */}
            {/* align-self: start keeps this grid cell from stretching to the letter
                column's height (default grid align-items: stretch), which is what was
                forcing the aspect-ratio square into a tall vertical strip. */}
            <div className="flex justify-center md:justify-start" style={{ alignSelf: "start" }}>
              <div
                className="relative overflow-hidden shrink-0 w-full"
                style={{
                  maxWidth: "190px",
                  aspectRatio: "1 / 1",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Image
                  src="/images/team/keshava.png"
                  alt="Keshava Olagappaa Subramanian, President of the Global Career Network"
                  fill
                  sizes="190px"
                  className="object-cover object-top"
                  style={{ filter: "grayscale(0.25) contrast(1.05)" }}
                />
              </div>
            </div>

            {/* Letter-margin rule */}
            <div
              className="hidden md:block w-px"
              style={{ background: "rgba(255,255,255,0.14)" }}
              aria-hidden="true"
            />

            {/* ── Letter body ── */}
            <article style={{ maxWidth: "64ch" }}>
              <p className="mb-8" style={letterParaStyle}>
                Dear Valued Partner,
              </p>

              {LETTER_BODY.map((paragraph, i) => (
                <p key={i} className="mb-6 last:mb-0" style={letterParaStyle}>
                  {paragraph.replace(/\s+/g, " ").trim()}
                </p>
              ))}

              <div className="mt-10">
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "1.15rem",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  Warmly,
                </p>
                <address className="mt-3" style={{ fontStyle: "normal" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontWeight: 700,
                      fontSize: "1.6rem",
                      color: "#fff",
                    }}
                  >
                    Keshava Olagappaa Subramanian
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: "13px", letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)" }}
                  >
                    President, Global Career Network
                  </p>
                </address>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
