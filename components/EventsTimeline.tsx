"use client";

import { useState } from "react";
import { eventsData, getPastEvents, getUpcomingEvents, getEventsSortedByDate } from "@/lib/data/events";
import EventSlideshow from "./EventSlideshow";
import UpcomingEventsList from "./UpcomingEventsList";
import CountUp from "./CountUp";

type View = "past" | "future";

export default function EventsTimeline() {
  const [view, setView] = useState<View>("past");

  const pastEvents = getPastEvents();
  const upcomingEvents = getEventsSortedByDate(getUpcomingEvents());

  return (
    <div className="gcn-events-page">

      {/* ── Newspaper masthead ── */}
      <div className="gcn-page-masthead gcn-page-masthead-chronicle" style={{ background: "var(--color-brand-red)" }}>
        <div className="mx-auto max-w-5xl px-6 pt-12 pb-5 text-center">
          <h1
            className="gcn-masthead-title leading-none mb-3"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            The GCN Chronicle
          </h1>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <div className="gcn-double-rule" />
        </div>
      </div>
      <div style={{ height: "2px", background: "var(--color-brand-red)" }} />

      {/* ── Past / Future toggle ── */}
      <div className="mx-auto max-w-5xl px-6 py-8">
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
            borderTop: "3px solid var(--color-brand-red)",
            background: "var(--color-surface-white)",
          }}
        >
          {[
            { value: eventsData.filter((e) => e.status === "past").length, label: "Events Held" },
            {
              value: eventsData
                .filter((e) => e.status === "past")
                .reduce((acc, e) => acc + (e.attendeeCount ?? 0), 0),
              label: "Total Attendees",
            },
            { value: eventsData.filter((e) => e.status === "upcoming").length, label: "Upcoming" },
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
                <CountUp end={value} />
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
