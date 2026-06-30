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
  { raw: 2000, suffix: "+", label: "Members",          bg: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", fg: "#fff",                    labelFg: "rgba(199,210,254,0.75)" },
  { raw: 88,   suffix: "",  label: "Countries",         bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", fg: "var(--color-black-soft)", labelFg: "#2563EB" },
  { raw: 300,  suffix: "+", label: "Avg Attendees",     bg: "linear-gradient(135deg, #9e221a 0%, #ea580c 100%)", fg: "#fff",                    labelFg: "rgba(255,210,180,0.85)" },
  { raw: 12,   suffix: "+", label: "Events / Semester", bg: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)", fg: "#fff",                    labelFg: "rgba(167,243,208,0.75)" },
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
          className="flex flex-col items-start justify-end px-8 py-10 md:px-10 md:py-14 gcn-stats-tile"
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
