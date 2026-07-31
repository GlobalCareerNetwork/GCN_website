"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { raw: 2000, suffix: "+", label: "Members in the network" },
  { raw: 88, suffix: "", label: "Countries represented" },
  { raw: 300, suffix: "+", label: "People at flagship events" },
  { raw: 12, suffix: "+", label: "Events every semester" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function StatsBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[] | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1400, 1);
          const eased = easeOutCubic(progress);
          setCounts(STATS.map((stat) => Math.round(stat.raw * eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="gcn-impact-ledger"
      aria-labelledby="impact-ledger-heading"
    >
      <div className="gcn-impact-ledger-head">
        <p className="gcn-kicker">The network in motion</p>
        <h2 id="impact-ledger-heading">
          A local community with
          <br />
          <em>global velocity.</em>
        </h2>
        <span aria-hidden="true">04 / IMPACT</span>
      </div>

      <div className="gcn-impact-grid" role="list" aria-label="GCN impact statistics">
        {STATS.map(({ raw, suffix, label }, index) => (
          <div key={label} className="gcn-impact-stat" role="listitem">
            <span className="gcn-impact-index">0{index + 1}</span>
            <p>
              {(counts?.[index] ?? raw).toLocaleString("en-US")}
              {suffix}
            </p>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
