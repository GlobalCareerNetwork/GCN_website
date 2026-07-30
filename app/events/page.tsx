import type { Metadata } from "next";
import EventsTimeline from "@/components/EventsTimeline";
import { getUpcomingEvents } from "@/lib/data/events";
import type { Event } from "@/lib/data/events";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Explore GCN at ASU's career development events — GlobeTalk, GlobeHack, career fairs, workshops, and networking opportunities for students and industry partners.";

export const metadata: Metadata = {
  title: "Events",
  ...pageMetadata("Events | GCN at ASU", description, "/events"),
};

// Arizona does not observe DST, so the local offset is always -07:00.
const ARIZONA_UTC_OFFSET = "-07:00";

type ParsedTime = {
  start: string; // 24-hour "HH:MM"
  end: string | null; // 24-hour "HH:MM"
};

function to24Hour(hourMinute: string, meridiem: string): string {
  const [hourStr, minuteStr] = hourMinute.split(":");
  let hour = Number(hourStr);
  const upperMeridiem = meridiem.toUpperCase();
  if (upperMeridiem === "PM" && hour !== 12) hour += 12;
  if (upperMeridiem === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minuteStr.padStart(2, "0")}`;
}

function parseEventTime(time: string): ParsedTime | null {
  if (!time) return null;

  const parts = time.split("-").map((part) => part.trim());

  if (parts.length === 1) {
    const singleMatch = parts[0].match(/^(\d{1,2}:\d{2})\s*(AM|PM)$/i);
    if (!singleMatch) return null;
    return { start: to24Hour(singleMatch[1], singleMatch[2]), end: null };
  }

  const [startRaw, endRaw] = parts;
  const endMatch = endRaw.match(/^(\d{1,2}:\d{2})\s*(AM|PM)$/i);
  if (!endMatch) return null;
  const endMeridiem = endMatch[2];

  const startMatch = startRaw.match(/^(\d{1,2}:\d{2})\s*(AM|PM)?$/i);
  if (!startMatch) return null;
  const startMeridiem = startMatch[2] ?? endMeridiem;

  return {
    start: to24Hour(startMatch[1], startMeridiem),
    end: to24Hour(endMatch[1], endMeridiem),
  };
}

type PlaceLocation = { "@type": "Place"; name: string };
type VirtualLocation = { "@type": "VirtualLocation"; name: string };

interface EventJsonLd {
  "@context": "https://schema.org";
  "@type": "Event";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  eventAttendanceMode: string;
  eventStatus: string;
  location: PlaceLocation | VirtualLocation | [PlaceLocation, VirtualLocation];
  image?: string;
  organizer: { "@type": "Organization"; name: string; url: string };
  offers?: { "@type": "Offer"; url: string; availability: string };
}

function buildAttendance(
  event: Event
): Pick<EventJsonLd, "eventAttendanceMode" | "location"> {
  const place: PlaceLocation = { "@type": "Place", name: event.location };
  const virtualLocation: VirtualLocation = {
    "@type": "VirtualLocation",
    name: event.location,
  };

  switch (event.attendanceMode) {
    case "virtual":
      return {
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        location: virtualLocation,
      };
    case "hybrid":
      return {
        eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
        location: [place, virtualLocation],
      };
    case "in-person":
      return {
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: place,
      };
  }
}

function buildEventJsonLd(event: Event): EventJsonLd {
  const parsedTime = parseEventTime(event.time);

  const startDate = parsedTime
    ? `${event.isoDate}T${parsedTime.start}:00${ARIZONA_UTC_OFFSET}`
    : event.isoDate;

  const jsonLd: EventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate,
    ...buildAttendance(event),
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  if (parsedTime?.end) {
    jsonLd.endDate = `${event.isoDate}T${parsedTime.end}:00${ARIZONA_UTC_OFFSET}`;
  }

  if (event.poster) {
    jsonLd.image = `${SITE_URL}${event.poster}`;
  }

  if (event.registrationUrl) {
    jsonLd.offers = {
      "@type": "Offer",
      url: event.registrationUrl,
      availability: "https://schema.org/InStock",
    };
  }

  return jsonLd;
}

const eventsJsonLd = getUpcomingEvents().map(buildEventJsonLd);

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />
      <EventsTimeline />
    </>
  );
}
