"use client";

import { useState } from "react";
import Image from "next/image";
import type { Event } from "@/lib/data/events";

interface EventPosterCardProps {
  event: Event;
}

export default function EventPosterCard({ event }: EventPosterCardProps) {
  const [flipped, setFlipped] = useState(false);
  const stats = event.highlightStat ? event.highlightStat.split("·").map((s) => s.trim()) : [];

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
        {/* ── FRONT: poster (or typographic placeholder) ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {event.poster ? (
            <>
              <Image
                src={event.poster}
                alt={event.name}
                fill
                sizes="50vw"
                className="object-cover"
                style={{ filter: "sepia(0.5) contrast(1.1) brightness(0.94)" }}
              />
              <div className="gcn-halftone-overlay" aria-hidden="true" />
            </>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              style={{ background: "var(--color-surface-white)" }}
            >
              <div className="gcn-grain-overlay" aria-hidden="true" />
              <p
                className="font-bold uppercase mb-4"
                style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
              >
                {event.semester}
              </p>
              <h3
                className="leading-tight"
                style={{
                  fontFamily: "var(--font-blackletter)",
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  color: "var(--color-black-soft)",
                }}
              >
                {event.name}
              </h3>
              <p
                className="mt-4 text-xs uppercase"
                style={{ letterSpacing: "0.16em", color: "var(--color-gray-muted)" }}
              >
                Poster coming soon
              </p>
            </div>
          )}
          {/* Bottom gradient so any overlaid caption stays legible */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)", zIndex: 3 }}
          />
        </div>

        {/* ── BACK: results card ── */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-5 px-10"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--color-surface)",
            border: "1px solid var(--color-gray-border)",
          }}
        >
          <div className="gcn-grain-overlay" aria-hidden="true" />
          <p
            className="font-bold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            Outcome
          </p>
          {event.outcome && (
            <p
              className="gcn-body-col"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-black-soft)", fontSize: "1rem" }}
            >
              {event.outcome}
            </p>
          )}
          {stats.length > 0 && (
            <div className="flex flex-col gap-2 pt-2" style={{ borderTop: "1px solid var(--color-gray-border)" }}>
              {stats.map((stat) => (
                <p
                  key={stat}
                  className="font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "var(--color-brand-red)" }}
                >
                  {stat}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
