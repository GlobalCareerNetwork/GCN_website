import type { Metadata } from "next";
import EventsTimeline from "@/components/EventsTimeline";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return <EventsTimeline />;
}
