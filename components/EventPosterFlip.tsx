"use client";

import { useState } from "react";
import Image from "next/image";
import type { Event } from "@/lib/data/events";

interface EventPosterFlipProps {
  event: Event;
}

export default function EventPosterFlip({ event }: EventPosterFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full cursor-pointer select-none"
      style={{ perspective: "1800px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={flipped}
      aria-label={`${event.name} poster — press Enter to reveal outcome`}
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
          className="absolute inset-0 flex items-center justify-center p-1"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--color-surface)",
            border: "2px solid var(--color-black-soft)",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              border: "1px solid var(--color-gray-border)",
              padding: "32px 24px",
            }}
          >
            {event.poster ? (
              <div className="relative w-full h-full">
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  sizes="50vw"
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
                    fontFamily: "var(--font-blackletter)",
                    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)",
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
          <span
            className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 font-bold uppercase"
            style={{ fontSize: "9.5px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Tap to flip
          </span>
        </div>

        {/* ── BACK: outcome / stats on aged paper ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-5 px-10 md:px-14"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--color-surface)",
            border: "2px solid var(--color-black-soft)",
          }}
        >
          <div className="gcn-grain-overlay" aria-hidden="true" />
          <p
            className="font-black uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            Outcome
          </p>
          {event.outcome && (
            <p
              className="gcn-body-col"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-black-soft)", fontSize: "1.02rem" }}
            >
              {event.outcome}
            </p>
          )}
          {event.highlightStat && (
            <p
              className="font-bold leading-tight text-center"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                color: "var(--color-brand-red)",
                textTransform: "capitalize",
              }}
            >
              {event.highlightStat}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
