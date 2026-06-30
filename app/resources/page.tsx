import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>Resources page — coming soon.</p>
    </div>
  );
}
