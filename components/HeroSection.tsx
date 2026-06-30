import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-surface)" }}
      aria-labelledby="hero-headline"
    >
      {/* Subtle radial glow behind the globe */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 w-[55%] h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(158,34,26,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ── Left: copy ── */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            className="hero-anim inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border"
            style={
              {
                "--delay": "0.1s",
                background: "var(--color-brand-red-light)",
                borderColor: "rgba(158,34,26,0.2)",
                color: "var(--color-brand-red)",
              } as CSSProperties
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--color-brand-red)" }}
            />
            Arizona State University
          </div>

          {/* Headline — word-split for staggered entrance */}
          <h1
            id="hero-headline"
            className="font-extrabold leading-[1.0] tracking-tight"
            style={{
              color: "var(--color-black-soft)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            }}
          >
            <span className="hero-word" style={{ "--delay": "0.2s" } as CSSProperties}>
              Empowering{" "}
            </span>
            <span className="hero-word" style={{ "--delay": "0.28s" } as CSSProperties}>
              Your{" "}
            </span>
            <span
              className="hero-word"
              style={
                {
                  "--delay": "0.37s",
                  color: "var(--color-brand-red)",
                } as CSSProperties
              }
            >
              Global Career
            </span>
            {" "}
            <span className="hero-word" style={{ "--delay": "0.47s" } as CSSProperties}>
              Journey
            </span>
          </h1>

          <p
            className="hero-anim text-lg leading-relaxed max-w-md"
            style={
              { "--delay": "0.6s", color: "var(--color-gray-muted)" } as CSSProperties
            }
          >
            Connecting international students at ASU with professional opportunities,
            resume mentorship, career guidance, and a global network of industry leaders.
          </p>

          {/* CTAs */}
          <div
            className="hero-anim flex flex-wrap gap-3 mt-2"
            style={{ "--delay": "0.75s" } as CSSProperties}
          >
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ background: "var(--color-brand-red)", outlineColor: "var(--color-brand-red)" }}
            >
              Join GCN Today
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.03] hover:border-transparent"
              style={{
                color: "var(--color-black-soft)",
                borderColor: "var(--color-gray-border)",
                background: "#fff",
              }}
            >
              Explore Events
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M1 6h12M5 1v2M9 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Right: globe — fades in last ── */}
        <div
          className="hero-fade relative flex items-center justify-center"
          style={{ "--delay": "0.9s" } as CSSProperties}
        >
          <GlobeWrapper className="w-full aspect-square max-w-[420px] mx-auto" />
          <p
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs flex items-center gap-1.5 pointer-events-none select-none"
            style={{ color: "var(--color-gray-muted)", opacity: 0.7 }}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="3" cy="6" r="2" fill="currentColor" opacity="0.4" />
              <circle cx="9" cy="6" r="2" fill="currentColor" opacity="0.4" />
            </svg>
            Drag to rotate
          </p>
        </div>
      </div>
    </section>
  );
}
