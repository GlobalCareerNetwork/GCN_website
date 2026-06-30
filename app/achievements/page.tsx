import type { Metadata } from "next";

export const metadata: Metadata = { title: "Achievements" };

export default function AchievementsPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>Achievements page — coming soon.</p>
    </div>
  );
}
