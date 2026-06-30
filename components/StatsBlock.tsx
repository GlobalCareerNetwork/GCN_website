"use client";

// Tiled stats block — 4 cells, 3 colors, no gaps, no outer border-radius.
// Secondary tone --color-stats-ink (#3D3926, deep warm olive) used here only.

import { useEffect, useRef, useState } from "react";

interface StatDef {
  raw: number;
  suffix: string;
  label: string;
  bg: string;
  fg: string;
  labelFg: string;
}

const STATS: StatDef[] = [
  { raw: 2000, suffix: "+", label: "Members",          bg: "var(--color-stats-ink)",    fg: "#F5F1E8",                    labelFg: "rgba(245,241,232,0.6)" },
  { raw: 88,   suffix: "",  label: "Countries",         bg: "var(--color-surface-white)", fg: "var(--color-black-soft)",    labelFg: "var(--color-gray-muted)" },
  { raw: 300,  suffix: "+", label: "Avg Attendees",     bg: "var(--color-brand-red)",    fg: "#fff",                       labelFg: "rgba(255,255,255,0.7)" },
  { raw: 12,   suffix: "+", label: "Events / Semester", bg: "var(--color-stats-ink)",    fg: "#F5F1E8",                    labelFg: "rgba(245,241,232,0.6)" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function fmtNumber(n: number) {
  return n.toLocaleString("en-US");
}

export default function StatsBlock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[] | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        const duration = 1400;
        const startTime = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = easeOutCubic(progress);
          setCounts(STATS.map((s) => Math.round(s.raw * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 w-full overflow-hidden"
      aria-label="GCN impact statistics"
      role="list"
    >
      {STATS.map(({ raw, suffix, label, bg, fg, labelFg }, i) => (
        <div
          key={label}
          role="listitem"
          className="flex flex-col items-start justify-end px-8 py-10 md:px-10 md:py-14"
          style={{ background: bg }}
        >
          <p
            className="font-extrabold leading-none tracking-tight tabular-nums"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              color: fg,
            }}
          >
            {counts !== null
              ? `${fmtNumber(counts[i])}${suffix}`
              : `${fmtNumber(raw)}${suffix}`}
          </p>
          <p
            className="mt-3 text-sm font-medium uppercase tracking-widest"
            style={{ color: labelFg }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
