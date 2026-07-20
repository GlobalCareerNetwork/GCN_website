import type { Metadata } from "next";
import EventsTimeline from "@/components/EventsTimeline";
import { pageMetadata } from "@/lib/site";

const description =
  "Explore GCN at ASU's career development events — GlobeTalk, GlobeHack, career fairs, workshops, and networking opportunities for students and industry partners.";

export const metadata: Metadata = {
  title: "Events",
  ...pageMetadata("Events | GCN at ASU", description, "/events"),
};

export default function EventsPage() {
  return <EventsTimeline />;
}
