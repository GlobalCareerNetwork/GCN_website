"use client";

import { useEffect, useRef } from "react";

const SELECTOR = "a, button, [role='button'], input, textarea, select";

export default function CursorLayer() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const moveRing = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      ring.style.left = `${currentX}px`;
      ring.style.top = `${currentY}px`;
      frame = requestAnimationFrame(moveRing);
    };

    const updatePointer = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;
      document.body.dataset.gcnCursorVisible = "true";
    };

    const updateTarget = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      document.body.dataset.gcnCursor = target?.closest(SELECTOR) ? "active" : "idle";
    };

    const leaveWindow = () => {
      document.body.dataset.gcnCursorVisible = "false";
      document.body.dataset.gcnCursor = "idle";
    };

    frame = requestAnimationFrame(moveRing);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerover", updateTarget, { passive: true });
    window.addEventListener("pointerout", updateTarget, { passive: true });
    document.addEventListener("mouseleave", leaveWindow);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerover", updateTarget);
      window.removeEventListener("pointerout", updateTarget);
      document.removeEventListener("mouseleave", leaveWindow);
      delete document.body.dataset.gcnCursor;
      delete document.body.dataset.gcnCursorVisible;
    };
  }, []);

  return (
    <div className="gcn-cursor-layer" aria-hidden="true">
      <div className="gcn-cursor-ring" ref={ringRef} />
      <div className="gcn-cursor-dot" ref={dotRef} />
    </div>
  );
}
