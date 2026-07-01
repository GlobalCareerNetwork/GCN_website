"use client";

import { useState } from "react";
import { eventsData, getPastEvents, getUpcomingEvents, getEventsSortedByDate } from "@/lib/data/events";
import EventSlideshow from "./EventSlideshow";
import UpcomingEventsList from "./UpcomingEventsList";

type View = "past" | "future";

export default function EventsTimeline() {
  const [view, setView] = useState<View>("past");

  const pastEvents = getEventsSortedByDate(getPastEvents());
  const upcomingEvents = getEventsSortedByDate(getUpcomingEvents());

  return (
    <div style={{ background: "var(--color-surface)" }}>

      {/* ── Newspaper masthead ── */}
      <div style={{ background: "var(--color-surface-white)" }}>
        <div className="mx-auto max-w-5xl px-6 pt-12 pb-5 text-center">
          <h1
            className="leading-none mb-3"
            style={{
              fontFamily: "var(--font-blackletter)",
              fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
              letterSpacing: "0.01em",
              color: "var(--color-black-soft)",
            }}
          >
            The GCN Chronicle
          </h1>
          <p
            className="font-semibold"
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              fontSize: "11.5px",
              letterSpacing: "0.08em",
              color: "var(--color-gray-muted)",
            }}
          >
            Academic Year 2025–26 · Arizona State University
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="gcn-double-rule" />
        </div>
      </div>
      <div style={{ height: "1px", background: "rgba(12,12,14,0.22)" }} />

      {/* ── Past / Future toggle ── */}
      <div className="mx-auto max-w-5xl px-6 py-8 flex items-center gap-4">
        <span
          className="font-bold uppercase shrink-0"
          style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--color-gray-muted)" }}
        >
          View
        </span>
        <div className="inline-flex gap-0" role="group" aria-label="Toggle past or future events">
          {(["past", "future"] as View[]).map((v, i) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1"
              style={{
                background: view === v ? "var(--color-brand-red)" : "transparent",
                color: view === v ? "#fff" : "var(--color-gray-text)",
                border: "1px solid var(--color-gray-border)",
                borderLeft: i > 0 ? "none" : "1px solid var(--color-gray-border)",
                letterSpacing: "0.12em",
                outlineColor: "var(--color-brand-red)",
              }}
              aria-pressed={view === v}
            >
              {v === "past" ? "Past" : "Future"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      {view === "past" ? (
        <EventSlideshow events={pastEvents} />
      ) : (
        <div className="mx-auto max-w-5xl px-6 pb-12">
          <UpcomingEventsList events={upcomingEvents} />
        </div>
      )}

      {/* ── Summary stats — newspaper-style tally row ── */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div
          className="grid grid-cols-3 overflow-hidden"
          style={{
            border: "1px solid var(--color-gray-border)",
            borderTop: "2px solid var(--color-black-soft)",
          }}
        >
          {[
            { value: String(eventsData.filter((e) => e.status === "past").length), label: "Events Held" },
            {
              value: String(
                eventsData.filter((e) => e.status === "past").reduce((acc, e) => acc + (e.attendeeCount ?? 0), 0)
              ),
              label: "Total Attendees",
            },
            { value: String(eventsData.filter((e) => e.status === "upcoming").length), label: "Upcoming" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="text-center py-5"
              style={{ borderLeft: i > 0 ? "1px solid var(--color-gray-border)" : undefined }}
            >
              <p
                className="font-bold leading-none"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: "var(--color-brand-red)" }}
              >
                {value}
              </p>
              <p
                className="text-xs mt-2 uppercase tracking-wider"
                style={{ color: "var(--color-gray-muted)", letterSpacing: "0.16em" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
