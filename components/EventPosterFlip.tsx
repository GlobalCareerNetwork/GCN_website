"use client";

import { useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import type { Event } from "@/lib/data/events";
import styles from "./EventPosterFlip.module.css";

interface EventPosterFlipProps {
  event: Event;
}

export default function EventPosterFlip({ event }: EventPosterFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const hasOutcome = Boolean(event.outcome || event.highlightStat);
  const flipControls = hasOutcome ? {
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse") setFlipped(true);
    },
    onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse") setFlipped(false);
    },
    onClick: () => setFlipped((value) => !value),
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setFlipped((value) => !value);
      }
    },
    role: "button",
    tabIndex: 0,
    "aria-expanded": flipped,
    "aria-label": `${event.name} poster, press Enter to reveal outcome`,
  } : undefined;

  return (
    <div
      className={`relative w-full h-full${hasOutcome ? " cursor-pointer select-none" : ""}`}
      style={{ perspective: "1800px" }}
      {...flipControls}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: framed poster (or typographic cover) ── */}
        <div
          aria-hidden={flipped}
          className="absolute inset-0 flex items-center justify-center p-1"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--color-surface-white)",
            border: "1px solid var(--color-black-soft)",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              border: "1px solid rgba(12,12,14,0.18)",
              padding: "32px 24px",
            }}
          >
            {event.poster ? (
              <div className="relative w-full h-full">
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain"
                  style={{ filter: "sepia(0.5) contrast(1.1) brightness(0.94)" }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center px-6">
                <div className="gcn-grain-overlay" aria-hidden="true" />
                <div style={{ width: "120px", height: "1px", background: "var(--color-black-soft)" }} />
                <h3
                  className="leading-tight my-6"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--color-black-soft)",
                  }}
                >
                  {event.name}
                </h3>
                <div style={{ width: "120px", height: "1px", background: "var(--color-black-soft)" }} />
              </div>
            )}
          </div>

          {/* Mobile-only interaction hint */}
          {hasOutcome && (
            <span
              className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 font-bold uppercase"
              style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
            >
              Tap to flip
            </span>
          )}
        </div>

        {/* ── BACK: event outcome and highlight ── */}
        {hasOutcome && (
          <div
            aria-hidden={!flipped}
            data-event-article
            className={`absolute inset-0 flex flex-col ${styles.outcome}`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "var(--color-surface-white)",
              border: "1px solid var(--color-black-soft)",
            }}
          >
            <div className="gcn-grain-overlay" aria-hidden="true" />
            <p
              className="font-black uppercase"
              style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
            >
              Outcome
            </p>
            {event.outcome && (
              <p
                className={styles.copy}
              >
                {event.outcome}
              </p>
            )}
            {event.highlightStat && (
              <p
                className={styles.highlight}
              >
                {event.highlightStat}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
