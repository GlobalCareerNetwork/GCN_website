import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

// Stage 5 — year-toggle timeline with keyboard nav
export default function EventsPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>Events page — built in Stage 5.</p>
    </div>
  );
}
