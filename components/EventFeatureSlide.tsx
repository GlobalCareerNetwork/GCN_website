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

function renderDescription({ description, descriptionHighlights }: Event) {
  if (!descriptionHighlights?.length) return description;

  const phrases = descriptionHighlights.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${phrases.join("|")})`, "g");

  return description.split(pattern).map((text, index) =>
    index % 2 === 0 ? text : (
      <strong key={index} className="font-black" style={{ color: "var(--color-brand-red)" }}>
        {text}
      </strong>
    )
  );
}

export default function EventFeatureSlide({ event, index, total, isActive, setRef }: EventFeatureSlideProps) {
  const eventDetails = [event.date || event.semester, event.time, event.location].filter(Boolean).join(" · ");

  return (
    <div
      ref={setRef}
      className="gcn-event-slide relative w-full flex flex-col md:flex-row"
      aria-label={`Event ${index + 1} of ${total}: ${event.name}`}
      style={{
        opacity: isActive ? 1 : 0.4,
        transition: "opacity 0.5s var(--ease-enter)",
      }}
    >
      <div
        className={`gcn-event-timeline-divider${isActive ? " is-active" : ""}`}
        aria-hidden="true"
      >
        <span />
      </div>

      {/* ── Left half: framed, contained poster (flip card) ── */}
      <div className="gcn-event-poster-side relative w-full md:w-1/2 h-[46%] md:h-full shrink-0 p-4 md:p-8">
        <EventPosterFlip event={event} />
      </div>

      {/* ── Right half: newspaper article panel ── */}
      <div
        className="gcn-event-article-panel relative w-full md:w-1/2 min-h-0 flex flex-1 flex-col"
        style={{
          background: "var(--color-surface-white)",
        }}
      >
        {/* Article body */}
        <div data-event-article className="relative flex-1 flex flex-col px-8 md:pl-12 md:pr-20 py-8 overflow-y-auto">
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
          {eventDetails && (
            <p
              className="uppercase"
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: "12.5px",
                letterSpacing: "0.1em",
                color: "var(--color-gray-text)",
              }}
            >
              {eventDetails}
            </p>
          )}

          {(event.description || event.outcome) && <div className="gcn-rule-full my-5" />}

          <div className="mx-auto w-full" style={{ maxWidth: "52ch" }}>
            {event.description && (
              <p
                className="gcn-body-article gcn-dropcap"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700, color: "var(--color-black-soft)" }}
              >
                {renderDescription(event)}
              </p>
            )}

            {event.outcome && (
              <>
                {event.description && <div className="gcn-rule-full my-5" />}
                <p
                  className="gcn-body-article"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontStyle: "italic", color: "var(--color-stats-ink)" }}
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
