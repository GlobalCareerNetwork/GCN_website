"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

interface SponsorMotionLayerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function SponsorMotionLayer({
  children,
  className,
  style,
}: SponsorMotionLayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.dataset.sponsorReady = "true";

    const updateScrollProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      root.style.setProperty("--sponsor-scroll-progress", progress.toFixed(5));
      root.style.setProperty("--sponsor-scroll-shift", `${(progress * 100).toFixed(2)}%`);
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-sponsor-reveal]")
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => {
        item.dataset.visible = "true";
      });
      return () => window.removeEventListener("scroll", updateScrollProgress);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.14,
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const root = rootRef.current;
    if (!root || event.pointerType === "touch") return;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
      root.style.setProperty("--sponsor-pointer-x", `${x.toFixed(2)}%`);
      root.style.setProperty("--sponsor-pointer-y", `${y.toFixed(2)}%`);
    });
  };

  return (
    <div
      ref={rootRef}
      className={className}
      style={style}
      data-sponsor-ready="false"
      onPointerMove={handlePointerMove}
    >
      {children}
    </div>
  );
}
