"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  /** Use en-US thousands separators (e.g. 2,000) */
  format?: boolean;
  durationMs?: number;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animated stat counter — counts from 0 to `end` when scrolled into view.
 * Fires once; respects prefers-reduced-motion (shows the final value immediately).
 */
export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  format = true,
  durationMs = 1400,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        function tick(now: number) {
          if (start === null) start = now;
          const progress = Math.min(Math.max((now - start) / durationMs, 0), 1);
          setDisplay(Math.round(end * easeOutCubic(progress)));
          if (progress < 1) raf = requestAnimationFrame(tick);
        }
        setDisplay(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format ? display.toLocaleString("en-US") : String(display)}
      {suffix}
    </span>
  );
}
