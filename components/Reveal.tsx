"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll-triggered fade-up reveal via IntersectionObserver.
 * - Elements already in the viewport on mount are shown immediately (no flash).
 * - Elements below the fold animate in when they enter view.
 * - Fires once; respects prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Skip animation for elements already in the viewport at mount time
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.95) return;

    // Hide instantly (no transition yet)
    el.style.opacity = "0";
    el.style.transform = "translateY(22px)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Set transition first, then change values in the next frame
        el.style.transition = `opacity 0.55s var(--ease-enter) ${delay}ms, transform 0.55s var(--ease-enter) ${delay}ms`;
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
        observer.disconnect();
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
