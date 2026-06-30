// Testimonials — dark section with subtle repeating texture.
// TODO: real testimonials needed — replace placeholder content below
// before launch. Do NOT attribute fabricated quotes to real people.

const QUOTES = [
  {
    quote:
      "// TODO: real testimonial needed — contact partner/sponsor for permission to use a real quote before launch.",
    name: "Partner Representative",
    title: "Sponsor / Corporate Partner",
    initials: "?",
  },
  {
    quote:
      "// TODO: real testimonial needed — reach out to a GCN alumnus or past attendee for a genuine quote.",
    name: "GCN Alumnus",
    title: "ASU Graduate · Class of 20XX",
    initials: "?",
  },
  {
    quote:
      "// TODO: real testimonial needed — request a quote from an industry professional who has spoken at a GCN event.",
    name: "Industry Speaker",
    title: "Speaker · GlobeTalk 20XX",
    initials: "?",
  },
];

// Subtle repeating '+' texture via inline SVG data URI — dark sections only
const TEXTURE_BG = `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='14' y='19' text-anchor='middle' font-size='11' fill='rgba(255%2C255%2C255%2C0.04)' font-family='monospace'%3E%2B%3C/text%3E%3C/svg%3E")`;

export default function Testimonials() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: "var(--color-black-soft)",
        backgroundImage: TEXTURE_BG,
      }}
      aria-labelledby="testimonials-heading"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-brand-red)" }}
          >
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="font-extrabold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#fff",
            }}
          >
            Don&apos;t just take
            <br />
            our word for it.
          </h2>
        </div>

        {/* Cards — border only, no shadow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map(({ quote, name, title, initials }) => (
            <div
              key={name}
              className="flex flex-col justify-between p-7 rounded-none"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
              }}
            >
              {/* Quote mark */}
              <div>
                <p
                  className="text-4xl leading-none mb-5 select-none"
                  style={{ color: "var(--color-brand-red)" }}
                  aria-hidden="true"
                >
                  &ldquo;
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {quote}
                </p>
              </div>

              {/* Attribution */}
              <div className="flex items-center gap-3 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                {/* Headshot placeholder */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(158,34,26,0.25)",
                    color: "var(--color-brand-red)",
                    border: "1px solid rgba(158,34,26,0.35)",
                  }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#fff" }}>
                    {name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
