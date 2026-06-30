import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join Us" };

export default function JoinPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>Join page — coming soon.</p>
    </div>
  );
}
