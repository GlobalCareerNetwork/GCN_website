import type { Metadata } from "next";

// Placeholder page with no real content yet — kept out of search results until
// it's built out. Remove `robots` once real content ships.
export const metadata: Metadata = {
  title: "Resources",
  robots: { index: false, follow: true },
};

export default function ResourcesPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-6 text-center">
      <p style={{ color: "var(--color-gray-muted)" }}>The Resources page is coming soon.</p>
    </div>
  );
}
