"use client";

import { useEffect, useRef } from "react";

export default function ExperienceLayer() {
  const progressRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const halo = haloRef.current;
    if (!progress || !halo) return;

    let frame = 0;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
    };

    const updatePointer = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        halo.style.transform = `translate3d(${event.clientX - 110}px, ${event.clientY - 110}px, 0)`;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <>
      <div className="gcn-scroll-progress" ref={progressRef} aria-hidden="true" />
      <div className="gcn-cursor-halo" ref={haloRef} aria-hidden="true" />
    </>
  );
}
