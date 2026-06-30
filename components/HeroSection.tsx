import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

const SPARKLES: { style: CSSProperties; color: string; delay: string; size: number }[] = [
  { style: { top: "16%", left: "7%" },   color: "#2563EB", delay: "0s",   size: 8 },
  { style: { top: "74%", left: "11%" },  color: "#7C3AED", delay: "0.9s", size: 6 },
  { style: { top: "28%", right: "5%" },  color: "#EA580C", delay: "0.4s", size: 7 },
  { style: { top: "66%", right: "11%" }, color: "#0D9488", delay: "1.3s", size: 5 },
  { style: { top: "47%", left: "3%" },   color: "#D97706", delay: "1.7s", size: 6 },
  { style: { top: "21%", right: "23%" }, color: "#7C3AED", delay: "2.1s", size: 5 },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(-45deg, #F5F1E8, #EEF2FF, #FFF7ED, #F0FDF4, #F5F1E8)",
        backgroundSize: "400% 400%",
        animation: "gcn-bg-shift 18s ease infinite",
      }}
      aria-labelledby="hero-headline"
    >
      {/* ── Floating colour blobs ── */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue — top-left */}
        <div style={{ position: "absolute", width: "640px", height: "640px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, transparent 65%)", top: "-240px", left: "-200px", animation: "gcn-blob-a 14s ease-in-out infinite", willChange: "transform" }} />
        {/* Orange — top-right */}
        <div style={{ position: "absolute", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(234,88,12,0.20) 0%, transparent 65%)", top: "-100px", right: "-130px", animation: "gcn-blob-b 17s ease-in-out infinite 2s", willChange: "transform" }} />
        {/* Violet — bottom-centre */}
        <div style={{ position: "absolute", width: "460px", height: "460px", borderRadius: "50%", background: "radial-gradient(circle at center, rgba(124,58,237,0.16) 0%, transparent 65%)", bottom: "-130px", left: "28%", animation: "gcn-blob-c 11s ease-in-out infinite 1s", willChange: "transform" }} />
        {/* Teal — bottom-right */}
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

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* ── Left: copy ── */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div
            className="hero-anim inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border"
            style={
              {
                "--delay": "0.1s",
                background: "linear-gradient(135deg, var(--color-brand-red-light), rgba(37,99,235,0.1))",
                borderColor: "rgba(37,99,235,0.2)",
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
              className="hero-word gcn-gradient-text"
              style={{ "--delay": "0.37s" } as CSSProperties}
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
            {/* Primary — gradient fill + shimmer sweep + glow pulse */}
            <Link
              href="/join"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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

            {/* Secondary — blue-tinted */}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-[1.04]"
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
