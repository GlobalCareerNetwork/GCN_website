"use client";

import Image from "next/image";
import type { Event } from "@/lib/data/events";

interface EventFeatureSlideProps {
  event: Event;
  index: number;
  total: number;
  isActive: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

function truncateSentences(text: string, max: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+(?=\s|$)/g);
  if (!sentences || sentences.length <= max) return text;
  return sentences.slice(0, max).join(" ").trim();
}

function heroStat(highlightStat: string | null): string | null {
  if (!highlightStat) return null;
  return highlightStat.split("·")[0].trim();
}

export default function EventFeatureSlide({
  event,
  index,
  total,
  isActive,
  expanded,
  onToggleExpand,
  setRef,
}: EventFeatureSlideProps) {
  const hasPoster = Boolean(event.poster);
  const stat = heroStat(event.highlightStat);
  const stats = event.highlightStat ? event.highlightStat.split("·").map((s) => s.trim()) : [];
  const textColor = hasPoster ? "rgba(255,255,255,0.94)" : "var(--color-black-soft)";
  const mutedTextColor = hasPoster ? "rgba(255,255,255,0.78)" : "var(--color-gray-text)";

  return (
    <div
      ref={setRef}
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none"
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`Event ${index + 1} of ${total}: ${event.name} — press Enter to ${expanded ? "collapse" : "expand"} full details`}
      onClick={onToggleExpand}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleExpand();
        }
      }}
      style={{
        opacity: isActive ? 1 : 0.4,
        transition: "opacity 0.5s var(--ease-enter)",
      }}
    >
      {/* ── Background: full-bleed poster or typographic cover ── */}
      <div className="absolute inset-0">
        {event.poster ? (
          <>
            <Image
              src={event.poster}
              alt={event.name}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(12,12,14,0) 0%, rgba(12,12,14,0.08) 38%, rgba(12,12,14,0.58) 66%, rgba(12,12,14,0.94) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-center px-6"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="gcn-grain-overlay" aria-hidden="true" />
            <div className="gcn-halftone-overlay" style={{ opacity: 0.16 }} aria-hidden="true" />
            <h2
              className="leading-none"
              style={{
                fontFamily: "var(--font-blackletter)",
                fontSize: "clamp(3rem, 11vw, 8.5rem)",
                color: "var(--color-black-soft)",
              }}
            >
              {event.name}
            </h2>
          </div>
        )}
      </div>

      {/* ── Foreground overlay: eyebrow, headline, meta, description, hero stat ── */}
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
        <div className="relative flex flex-col px-6 sm:px-10 md:px-16 lg:px-20 pb-16 md:pb-20 pt-10">
          {stat && (
            <p
              className="text-right leading-none z-10"
              style={{
                marginBottom: "-0.08em",
                fontFamily: "var(--font-serif)",
                fontWeight: 800,
                fontSize: "clamp(2.6rem, 8vw, 6.5rem)",
                color: "var(--color-brand-red)",
                textTransform: "capitalize",
                textShadow: hasPoster
                  ? "0 0 2px rgba(255,255,255,0.9), 0 0 18px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.55)"
                  : "none",
                WebkitTextStroke: hasPoster ? "1px rgba(255,255,255,0.55)" : "none",
              }}
            >
              {stat}
            </p>
          )}

          <div className="relative z-0">
            <span
              className="inline-block font-black uppercase mb-4"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.2em",
                color: "#fff",
                background: "var(--color-brand-red)",
                padding: "5px 12px",
              }}
            >
              {event.semester}
            </span>
            {hasPoster && (
              <h2
                className="leading-[1.02] mb-4 max-w-3xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(2.4rem, 6.2vw, 5rem)",
                  color: textColor,
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                {event.name}
              </h2>
            )}
            <p
              className="uppercase mb-5"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: mutedTextColor,
              }}
            >
              {event.date}
              {event.time ? ` · ${event.time}` : ""} — {event.location}
            </p>
            <p
              className="gcn-body-col max-w-xl"
              style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: mutedTextColor }}
            >
              {truncateSentences(event.description, 2)}
            </p>
          </div>
        </div>
      </div>

      {/* ── "Flip to feature" expand panel ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 overflow-y-auto"
        style={{
          height: "60vh",
          background: "var(--color-surface)",
          transform: expanded ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.55s var(--ease-smooth)",
          boxShadow: "0 -24px 60px rgba(0,0,0,0.35)",
        }}
        aria-hidden={!expanded}
      >
        <div className="gcn-grain-overlay" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto px-6 md:px-14 py-10">
          <div className="gcn-double-rule mb-7" />
          <p
            className="font-black uppercase mb-3"
            style={{ fontSize: "10.5px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}
          >
            {event.semester} · Full Report
          </p>
          <h3
            className="leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
              color: "var(--color-black-soft)",
            }}
          >
            {event.name}
          </h3>
          <p
            className="uppercase mb-6"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontSize: "11.5px",
              letterSpacing: "0.1em",
              color: "var(--color-gray-muted)",
            }}
          >
            {event.date}
            {event.time ? ` · ${event.time}` : ""} — {event.location}
          </p>
          <p className="gcn-body-col mb-5" style={{ fontFamily: "var(--font-serif)", color: "var(--color-gray-text)" }}>
            {event.description}
          </p>
          {event.outcome && (
            <p
              className="gcn-body-col mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: "var(--color-gray-text)",
                opacity: 0.85,
              }}
            >
              {event.outcome}
            </p>
          )}
          {stats.length > 0 && (
            <div className="flex flex-wrap gap-x-10 gap-y-3 pt-5" style={{ borderTop: "1px solid var(--color-gray-border)" }}>
              {stats.map((s) => (
                <p
                  key={s}
                  className="font-bold leading-tight"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-brand-red)" }}
                >
                  {s}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
