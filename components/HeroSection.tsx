import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

const SPARKLES: { style: CSSProperties; color: string; delay: string; size: number }[] = [
  { style: { top: "16%", left: "5%" },   color: "#2563EB", delay: "0s",   size: 7 },
  { style: { top: "80%", left: "8%" },   color: "#7C3AED", delay: "0.9s", size: 5 },
  { style: { top: "24%", right: "4%" },  color: "#EA580C", delay: "0.4s", size: 6 },
  { style: { top: "70%", right: "8%" },  color: "#0D9488", delay: "1.3s", size: 5 },
  { style: { top: "45%", left: "2.5%" }, color: "#D97706", delay: "1.7s", size: 5 },
  { style: { top: "55%", right: "18%" }, color: "#7C3AED", delay: "2.1s", size: 4 },
];

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
        background: "linear-gradient(-45deg, #F5F1E8, #EEF2FF, #FFF7ED, #F0FDF4, #F5F1E8)",
        backgroundSize: "400% 400%",
        animation: "gcn-bg-shift 18s ease infinite",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      aria-labelledby="hero-headline"
    >
      {/* ── Grain texture overlay ── */}
      <div
        aria-hidden="true"
        className="gcn-grain-overlay"
      />

      {/* ── Floating colour blobs ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, transparent 65%)", top: "-240px", left: "-200px", animation: "gcn-blob-a 14s ease-in-out infinite", willChange: "transform" }} />
        <div style={{ position: "absolute", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(234,88,12,0.20) 0%, transparent 65%)", top: "-100px", right: "-130px", animation: "gcn-blob-b 17s ease-in-out infinite 2s", willChange: "transform" }} />
        <div style={{ position: "absolute", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(124,58,237,0.16) 0%, transparent 65%)", bottom: "-130px", left: "28%", animation: "gcn-blob-c 11s ease-in-out infinite 1s", willChange: "transform" }} />
        <div style={{ position: "absolute", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(13,148,136,0.15) 0%, transparent 65%)", bottom: "30px", right: "6%", animation: "gcn-blob-a 15s ease-in-out infinite 3s", willChange: "transform" }} />
      </div>

      {/* ── Diamond sparkle dots ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPARKLES.map((dot, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              background: dot.color,
              borderRadius: "1px",
              animation: `gcn-sparkle 3.5s ease-in-out infinite ${dot.delay}`,
              willChange: "transform, opacity",
              ...dot.style,
            }}
          />
        ))}
      </div>

      {/* ── Globe — ambient layer behind text, desktop only ── */}
      <div
        className="hero-fade hidden md:block absolute pointer-events-none select-none"
        style={
          {
            "--delay": "0.75s",
            right: "-50px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "560px",
            height: "560px",
            zIndex: 0,
            opacity: 0.92,
          } as CSSProperties
        }
        aria-hidden="true"
      >
        <GlobeWrapper className="w-full h-full" />
        <p
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs flex items-center gap-1.5 select-none"
          style={{ color: "var(--color-gray-muted)", opacity: 0.55 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="3" cy="6" r="2" fill="currentColor" opacity="0.4" />
            <circle cx="9" cy="6" r="2" fill="currentColor" opacity="0.4" />
          </svg>
          Drag to rotate
        </p>
      </div>

      {/* ── Editorial content — z above globe ── */}
      <div className="relative mx-auto max-w-6xl w-full px-6 py-20 md:py-24" style={{ zIndex: 10 }}>

        {/* Metadata bar */}
        <div
          className="hero-anim flex items-center justify-between mb-4"
          style={{ "--delay": "0.04s" } as CSSProperties}
        >
          <span
            className="font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
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
          style={{ "--delay": "0.08s", background: "rgba(12,12,14,0.14)" } as CSSProperties}
        />

        {/* ── Poster headline ── */}
        <h1
          id="hero-headline"
          className="font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.4rem, 8.5vw, 7.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            color: "var(--color-black-soft)",
          }}
        >
          {/* Each word-group on its own block line for editorial stacking */}
          <span
            className="hero-word"
            style={{ "--delay": "0.18s", display: "block" } as CSSProperties}
          >
            Empowering Your
          </span>
          <span
            className="hero-word gcn-gradient-text"
            style={{ "--delay": "0.32s", display: "block" } as CSSProperties}
          >
            Global Career
          </span>
          <span
            className="hero-word"
            style={{ "--delay": "0.46s", display: "block" } as CSSProperties}
          >
            Journey.
          </span>
        </h1>

        {/* Bottom rule */}
        <div
          className="hero-anim mt-10 mb-8 h-px"
          style={{ "--delay": "0.58s", background: "rgba(12,12,14,0.14)" } as CSSProperties}
        />

        {/* Body paragraph + CTAs — flex row on desktop */}
        <div
          className="hero-anim flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ "--delay": "0.66s" } as CSSProperties}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-gray-muted)", maxWidth: "320px" }}
          >
            Connecting international students at ASU with professional
            opportunities, resume mentorship, and a global network of
            industry leaders.
          </p>

          <div className="flex flex-wrap gap-3 shrink-0">
            {/* Primary — shimmer + glow */}
            <Link
              href="/join"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                background: "linear-gradient(135deg, #9e221a 0%, #ea580c 55%, #d97706 100%)",
                backgroundSize: "200% 100%",
                animation: "gcn-bg-shift 4s ease infinite, gcn-glow-pulse 2.8s ease-in-out infinite",
                outlineColor: "var(--color-brand-red)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)",
                  animation: "gcn-shimmer-sweep 2.8s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />
              Join GCN Today
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Secondary */}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.04]"
              style={{
                color: "var(--color-black-soft)",
                borderColor: "rgba(37,99,235,0.35)",
                background: "rgba(37,99,235,0.05)",
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

        {/* ── Mini stats strip ── */}
        <div
          className="hero-anim mt-10 pt-7 flex flex-wrap gap-10"
          style={
            {
              "--delay": "0.8s",
              borderTop: "1px solid rgba(12,12,14,0.1)",
            } as CSSProperties
          }
        >
          {MINI_STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="font-extrabold leading-none tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.65rem",
                  letterSpacing: "-0.03em",
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
    </section>
  );
}
