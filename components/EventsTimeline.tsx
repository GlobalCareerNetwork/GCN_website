"use client";

import { useState, useRef, useEffect } from "react";
import { eventsData, ACADEMIC_YEARS, getEventsByYear, type AcademicYear, type Event } from "@/lib/data/events";

// ── Category icon map ─────────────────────────────────────────────────────
function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    Workshop: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 3V2M11 3V2M1 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Panel: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="4" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 13c0-2.21 3.582-4 7-4s7 1.79 7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    Networking: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="2.5" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="13.5" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="13.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 4.5L5.5 6.5M11 4.5L10.5 6.5M8 10.5V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    Competition: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    Practice: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 12L6 8l3 3 5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    "Info Session": (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  };
  return <>{icons[category] ?? icons["Info Session"]}</>;
}

// ── Single event card ─────────────────────────────────────────────────────
function EventCard({ event, focused }: { event: Event; focused: boolean }) {
  const isPast = event.status === "past";
  const isTentative = event.status === "tentative";

  return (
    <div
      className="relative flex gap-5 rounded-2xl p-5 transition-all"
      style={{
        background: isPast ? "var(--color-surface-muted)" : "#fff",
        border: `1px solid ${focused ? "var(--color-brand-red)" : "var(--color-gray-border)"}`,
        boxShadow: focused ? "0 0 0 2px rgba(158,34,26,0.18), var(--shadow-soft)" : "var(--shadow-soft)",
        opacity: isPast ? 0.7 : 1,
      }}
    >
      {/* Left: date + icon */}
      <div className="flex flex-col items-center gap-2 min-w-[56px]">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: isPast ? "var(--color-surface)" : "var(--color-brand-red-light)",
            color: isPast ? "var(--color-gray-muted)" : "var(--color-brand-red)",
            border: `1px solid ${isPast ? "var(--color-gray-border)" : "rgba(158,34,26,0.2)"}`,
          }}
        >
          <CategoryIcon category={event.category} />
        </div>
        <span
          className="text-xs font-semibold text-center leading-tight"
          style={{ color: "var(--color-gray-muted)" }}
        >
          {event.date}
        </span>
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-2 mb-1.5">
          <h3
            className="text-base font-bold leading-snug"
            style={{ color: isPast ? "var(--color-gray-text)" : "var(--color-black-soft)" }}
          >
            {event.name}
          </h3>
          <div className="flex gap-1.5 flex-wrap">
            {isPast && (
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "var(--color-surface)", color: "var(--color-gray-muted)", border: "1px solid var(--color-gray-border)" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Past
              </span>
            )}
            {isTentative && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(224,154,48,0.12)", color: "#B07B10", border: "1px solid rgba(224,154,48,0.25)" }}
              >
                Tentative
              </span>
            )}
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: "var(--color-brand-red-light)", color: "var(--color-brand-red)", border: "1px solid rgba(158,34,26,0.15)" }}
            >
              {event.category}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-gray-muted)" }}>
          {event.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--color-gray-muted)" }}>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <path d="M5.5 1C3.5 1 2 2.5 2 4.5 2 7 5.5 10 5.5 10S9 7 9 4.5C9 2.5 7.5 1 5.5 1z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="5.5" cy="4.5" r="1" fill="currentColor" />
              </svg>
              {event.location}
            </span>
          )}
          {event.time && (
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5.5 3v2.5l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {event.time}
            </span>
          )}
          {event.attendeeCount !== null && (
            <span className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                <circle cx="4" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M1 9c0-1.65 1.34-3 3-3s3 1.35 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="8" cy="3.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
                <path d="M8 6.5c1 0 2 .7 2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              {event.attendeeCount} attended
            </span>
          )}
        </div>

        {/* CTA for upcoming */}
        {!isPast && event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--color-brand-red)" }}
          >
            Register
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M1 5h8M5.5 1.5L9 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main timeline component ───────────────────────────────────────────────

const YEAR_LABELS: Record<AcademicYear, string> = {
  "24-25": "AY 2024–25",
  "25-26": "AY 2025–26",
  "26-27": "AY 2026–27",
};

export default function EventsTimeline() {
  const availableYears = ACADEMIC_YEARS.filter((y) => getEventsByYear(y).length > 0);
  const [activeYear, setActiveYear] = useState<AcademicYear>(availableYears[availableYears.length - 1]);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const events = getEventsByYear(activeYear);

  // Draw spine + stagger cards when the list enters the viewport
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("timeline-drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIdx((prev) => {
        const next = prev === null ? 0 : Math.min(prev + 1, events.length - 1);
        setTimeout(() => {
          const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-event-card]");
          cards?.[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          cards?.[next]?.focus();
        }, 0);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIdx((prev) => {
        const next = prev === null ? 0 : Math.max(prev - 1, 0);
        setTimeout(() => {
          const cards = listRef.current?.querySelectorAll<HTMLElement>("[data-event-card]");
          cards?.[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          cards?.[next]?.focus();
        }, 0);
        return next;
      });
    } else if (e.key === "Escape") {
      setFocusedIdx(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      {/* ── Page header ── */}
      <div className="text-center mb-10">
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border mb-4"
          style={{
            background: "var(--color-brand-red-light)",
            borderColor: "rgba(158,34,26,0.2)",
            color: "var(--color-brand-red)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
          Events
        </p>
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: "var(--color-black-soft)" }}
        >
          Club Events Timeline
        </h1>
        <p className="text-base" style={{ color: "var(--color-gray-muted)" }}>
          Workshops, networking events, and competitions for international students at ASU.
        </p>
      </div>

      {/* ── Year toggle ── */}
      <div
        className="flex justify-center mb-10"
        role="group"
        aria-label="Filter events by academic year"
      >
        <div
          className="inline-flex rounded-xl p-1 gap-1"
          style={{ background: "var(--color-surface-muted)", border: "1px solid var(--color-gray-border)" }}
        >
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => { setActiveYear(year); setFocusedIdx(null); }}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
              style={{
                background: activeYear === year ? "var(--color-brand-red)" : "transparent",
                color: activeYear === year ? "#fff" : "var(--color-gray-text)",
                outlineColor: "var(--color-brand-red)",
              }}
              aria-pressed={activeYear === year}
            >
              {YEAR_LABELS[year]}
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard nav hint */}
      <p
        className="text-center text-xs mb-6"
        style={{ color: "var(--color-gray-muted)", opacity: 0.7 }}
      >
        Use{" "}
        <kbd className="px-1.5 py-0.5 rounded text-xs font-mono border" style={{ borderColor: "var(--color-gray-border)" }}>↑</kbd>
        {" / "}
        <kbd className="px-1.5 py-0.5 rounded text-xs font-mono border" style={{ borderColor: "var(--color-gray-border)" }}>↓</kbd>
        {" "}arrow keys to navigate events
      </p>

      {/* ── Timeline list ── */}
      <div
        ref={listRef}
        className="relative flex flex-col gap-4"
        onKeyDown={handleKeyDown}
        aria-label={`Events for ${YEAR_LABELS[activeYear]}`}
      >
        {/* Vertical spine — draws top-to-bottom when timeline-drawn class is added */}
        <div
          className="timeline-spine absolute left-[27px] top-5 bottom-5 w-px pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, var(--color-brand-red-light), var(--color-gray-border))" }}
        />

        {events.map((event, idx) => (
          <div
            key={event.id}
            data-event-card
            style={{ "--card-index": idx } as React.CSSProperties}
            tabIndex={0}
            onFocus={() => setFocusedIdx(idx)}
            onBlur={() => setFocusedIdx((prev) => (prev === idx ? null : prev))}
            className="focus-visible:outline-none"
            role="article"
            aria-label={event.name}
          >
            <EventCard event={event} focused={focusedIdx === idx} />
          </div>
        ))}

        {events.length === 0 && (
          <p className="text-center py-12" style={{ color: "var(--color-gray-muted)" }}>
            No events for this academic year yet.
          </p>
        )}
      </div>

      {/* ── Summary stats ── */}
      <div
        className="mt-10 grid grid-cols-3 gap-4 rounded-2xl p-5"
        style={{ background: "#fff", border: "1px solid var(--color-gray-border)", boxShadow: "var(--shadow-soft)" }}
      >
        {[
          { value: String(eventsData.filter((e) => e.status === "past").length), label: "Events Held" },
          {
            value: String(eventsData.filter((e) => e.status === "past").reduce((acc, e) => acc + (e.attendeeCount ?? 0), 0)),
            label: "Total Attendees",
          },
          { value: String(eventsData.filter((e) => e.status === "upcoming").length), label: "Upcoming" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-extrabold" style={{ color: "var(--color-brand-red)" }}>{value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--color-gray-muted)" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
