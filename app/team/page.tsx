import type { Metadata } from "next";

export const metadata: Metadata = { title: "Executive Board" };

// Stage 4 — org tree + flip cards
export default function TeamPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>Team page — built in Stage 4.</p>
    </div>
  );
}
