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
  color: "var(--color-gray-text)",
} as const;

// Full-width homepage section — "03 President's Note".
// A genuine editorial letter (not a testimonial card): salutation, letter body,
// and a text-only italic signature, set beside a restrained portrait + margin rule.
export default function PresidentsNote() {
  return (
    <section
      style={{
        borderTop: "1px solid var(--color-gray-border)",
        borderBottom: "1px solid var(--color-gray-border)",
        background: "var(--color-surface-white)",
      }}
      aria-labelledby="presidents-note-heading"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionEyebrow num="03">President&apos;s Note</SectionEyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2
            id="presidents-note-heading"
            className="mb-12 md:mb-16"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)",
              lineHeight: 1.22,
              letterSpacing: "-0.015em",
              color: "var(--color-black-soft)",
              maxWidth: "18ch",
            }}
          >
            No student should have to navigate their career journey alone.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div className="grid grid-cols-1 md:grid-cols-[96px_1fr] gap-8 md:gap-12">

            {/* ── Portrait + letter-margin rule ── */}
            <div className="flex md:flex-col items-center md:items-stretch gap-4 h-full">
              <div
                className="relative overflow-hidden shrink-0"
                style={{ width: "96px", height: "96px", border: "1px solid var(--color-gray-border)" }}
              >
                <Image
                  src="/images/team/keshava.png"
                  alt="Keshava Olagappaa Subramanian, President of the Global Career Network"
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                  style={{ filter: "grayscale(0.25) contrast(1.05)" }}
                />
              </div>
              <div
                className="hidden md:block flex-1 w-px mx-auto"
                style={{ background: "var(--color-gray-border)" }}
                aria-hidden="true"
              />
            </div>

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
                    color: "var(--color-gray-text)",
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
                      color: "var(--color-black-soft)",
                    }}
                  >
                    Keshava Olagappaa Subramanian
                  </p>
                  <p
                    className="mt-1"
                    style={{ fontSize: "13px", letterSpacing: "0.04em", color: "var(--color-gray-muted)" }}
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
