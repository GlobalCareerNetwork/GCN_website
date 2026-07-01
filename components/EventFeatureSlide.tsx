"use client";

import type { Event } from "@/lib/data/events";
import EventPosterFlip from "./EventPosterFlip";

interface EventFeatureSlideProps {
  event: Event;
  index: number;
  total: number;
  isActive: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}

export default function EventFeatureSlide({ event, index, total, isActive, setRef }: EventFeatureSlideProps) {
  return (
    <div
      ref={setRef}
      className="relative w-full h-screen flex flex-col md:flex-row"
      aria-label={`Event ${index + 1} of ${total}: ${event.name}`}
      style={{
        opacity: isActive ? 1 : 0.4,
        transition: "opacity 0.5s var(--ease-enter)",
        background: "var(--color-surface)",
      }}
    >
      {/* ── Left half: framed, contained poster (flip card) ── */}
      <div className="relative w-full md:w-1/2 h-[46vh] md:h-screen p-4 md:p-8">
        <EventPosterFlip event={event} />
      </div>

      {/* ── Right half: newspaper article panel ── */}
      <div
        className="relative w-full md:w-1/2 min-h-[54vh] md:h-screen flex flex-col"
        style={{ borderLeft: "1px solid var(--color-gray-border)" }}
      >
        <div className="gcn-grain-overlay" aria-hidden="true" />

        {/* Three-column eyebrow masthead row */}
        <div
          className="relative flex items-center gap-4 px-6 md:px-10 py-3"
          style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        >
          <span
            className="font-black uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Event Chronicle
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
          </span>
        </div>

        {/* Article body */}
        <div className="relative flex-1 flex flex-col px-8 md:px-12 py-8 overflow-y-auto">
          <p
            className="font-black uppercase mb-3"
            style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}
          >
            {event.semester}
          </p>
          <h2
            className="leading-[1.05] mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.6vw, 3rem)",
              color: "var(--color-black-soft)",
            }}
          >
            {event.name}
          </h2>
          <p
            className="uppercase"
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

          <div className="gcn-rule-full my-5" />

          <div className="mx-auto w-full" style={{ maxWidth: "46ch" }}>
            <p
              className="gcn-body-col"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-gray-text)" }}
            >
              {event.description}
            </p>

            {event.outcome && (
              <>
                <div className="gcn-rule-full my-5" />
                <p
                  className="gcn-body-col"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-gray-text)" }}
                >
                  {event.outcome}
                </p>
              </>
            )}
          </div>

          {event.highlightStat && (
            <div className="mt-auto pt-6">
              <div className="gcn-rule-full mb-5" />
              <p
                className="font-bold leading-tight text-center"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                  color: "var(--color-brand-red)",
                  textTransform: "capitalize",
                }}
              >
                {event.highlightStat}
              </p>
              <div className="gcn-rule-full mt-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
