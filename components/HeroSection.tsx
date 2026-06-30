import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

const MINI_STATS = [
  { value: "2,000+", label: "Members" },
  { value: "88",     label: "Countries" },
  { value: "12+",    label: "Events / Semester" },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--color-surface)",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      aria-labelledby="hero-headline"
    >
      {/* Subtle brand-red ambient glow near globe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 75% 45%, rgba(158,34,26,0.07) 0%, transparent 58%)",
          pointerEvents: "none",
        }}
      />

      <div aria-hidden="true" className="gcn-grain-overlay" />

      <div
        className="relative mx-auto max-w-7xl w-full px-6 py-16 md:py-20"
        style={{ zIndex: 10 }}
      >
        {/* ── Newspaper masthead bar ── */}
        <div
          className="hero-anim flex items-center justify-between mb-3"
          style={{ "--delay": "0.04s" } as CSSProperties}
        >
          <span
            className="font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
          </span>
          <span
            className="font-bold uppercase hidden sm:block"
            style={{ fontSize: "10px", letterSpacing: "0.16em", color: "var(--color-gray-muted)" }}
          >
            Global Career Network
          </span>
          <span
            className="font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-gray-muted)" }}
          >
            Est.&nbsp;2022
          </span>
        </div>

        {/* Top rule */}
        <div
          className="hero-anim mb-10 h-px"
          style={{ "--delay": "0.08s", background: "rgba(12,12,14,0.18)" } as CSSProperties}
        />

        {/* 2-column grid: headline left, globe right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-8 md:gap-16 items-center">

          {/* ── Left: headline, body, CTAs, stats ── */}
          <div>
            {/* Eyebrow label */}
            <div
              className="hero-anim flex items-center gap-3 mb-6"
              style={{ "--delay": "0.12s" } as CSSProperties}
            >
              <span
                className="font-black uppercase shrink-0"
                style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
              >
                01
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.14)" }} />
              <span
                className="font-bold uppercase shrink-0"
                style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
              >
                Student Career Network
              </span>
            </div>

            {/* Playfair Display editorial headline */}
            <h1
              id="hero-headline"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                color: "var(--color-black-soft)",
              }}
            >
              <span
                className="hero-word"
                style={{ "--delay": "0.18s", display: "block" } as CSSProperties}
              >
                Empowering Your
              </span>
              <span
                className="hero-word"
                style={
                  {
                    "--delay": "0.30s",
                    display: "block",
                    color: "var(--color-brand-red)",
                  } as CSSProperties
                }
              >
                Global Career
              </span>
              <span
                className="hero-word"
                style={{ "--delay": "0.42s", display: "block" } as CSSProperties}
              >
                Journey.
              </span>
            </h1>

            {/* Rule below headline */}
            <div
              className="hero-anim mt-8 mb-7 h-px"
              style={
                { "--delay": "0.52s", background: "rgba(12,12,14,0.14)" } as CSSProperties
              }
            />

            {/* Body text + CTAs */}
            <div
              className="hero-anim flex flex-col md:flex-row md:items-end justify-between gap-6"
              style={{ "--delay": "0.60s" } as CSSProperties}
            >
              <p
                className="gcn-body-col"
                style={{ color: "var(--color-gray-muted)", maxWidth: "300px" }}
              >
                Connecting international students at ASU with professional
                opportunities, resume mentorship, and a global network of
                industry leaders.
              </p>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/join"
                  className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background: "var(--color-brand-red)",
                    boxShadow: "0 4px 20px rgba(158,34,26,0.30)",
                    outlineColor: "var(--color-brand-red)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.20) 50%, transparent 100%)",
                      animation: "gcn-shimmer-sweep 2.8s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />
                  Join GCN Today
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.03]"
                  style={{
                    color: "var(--color-black-soft)",
                    borderColor: "rgba(12,12,14,0.22)",
                    background: "transparent",
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

            {/* Mini stats strip */}
            <div
              className="hero-anim mt-8 pt-6 flex flex-wrap gap-10"
              style={
                {
                  "--delay": "0.72s",
                  borderTop: "1px solid rgba(12,12,14,0.10)",
                } as CSSProperties
              }
            >
              {MINI_STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span
                    className="font-extrabold leading-none tabular-nums"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.75rem",
                      letterSpacing: "-0.02em",
                      color: "var(--color-black-soft)",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="font-semibold uppercase"
                    style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Globe — fully contained in grid column ── */}
          <div
            className="hero-fade hidden md:flex flex-col items-center justify-center"
            style={{ "--delay": "0.85s" } as CSSProperties}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "1 / 1",
              }}
            >
              <GlobeWrapper className="w-full h-full" />
              <p
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs flex items-center gap-1.5 select-none"
                style={{ color: "var(--color-gray-muted)", opacity: 0.5, whiteSpace: "nowrap" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="3" cy="6" r="2" fill="currentColor" opacity="0.4" />
                  <circle cx="9" cy="6" r="2" fill="currentColor" opacity="0.4" />
                </svg>
                Drag to rotate
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
