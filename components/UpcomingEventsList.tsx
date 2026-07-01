import type { Event } from "@/lib/data/events";

interface UpcomingEventsListProps {
  events: Event[];
}

export default function UpcomingEventsList({ events }: UpcomingEventsListProps) {
  if (events.length === 0) {
    return (
      <p className="text-center py-12" style={{ color: "var(--color-gray-muted)" }}>
        No upcoming events on the calendar yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {events.map((event, i) => (
        <article
          key={event.id}
          className="flex flex-wrap items-baseline gap-x-5 gap-y-1.5 py-5"
          style={{ borderTop: i > 0 ? "1px solid var(--color-gray-border)" : undefined }}
        >
          <p
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "10.5px", letterSpacing: "0.14em", color: "var(--color-brand-red)", minWidth: "108px" }}
          >
            {event.date}
          </p>
          <h3
            className="font-bold leading-snug"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem", color: "var(--color-black-soft)" }}
          >
            {event.name}
          </h3>
          {event.status === "tentative" && (
            <span
              className="text-xs px-2 py-0.5 font-medium uppercase"
              style={{
                background: "rgba(224,154,48,0.1)",
                color: "#B07B10",
                border: "1px solid rgba(224,154,48,0.22)",
                fontSize: "9px",
                letterSpacing: "0.12em",
              }}
            >
              Tentative
            </span>
          )}
          <p className="text-sm w-full" style={{ color: "var(--color-gray-muted)" }}>
            {event.time ? `${event.time} · ` : ""}
            {event.location} — {event.description}
          </p>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ color: "var(--color-brand-red)", letterSpacing: "0.1em" }}
            >
              Register
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M1 5h8M5.5 1.5L9 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
