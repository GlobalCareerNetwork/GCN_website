import type { Metadata } from "next";
import Link from "next/link";

// Placeholder page with no real content yet — kept out of search results until
// it's built out (see MEMORY/CLAUDE.md pending items). Remove `robots` once
// real content ships.
export const metadata: Metadata = {
  title: "Achievements",
  robots: { index: false, follow: true },
};

export default function AchievementsPage() {
  return (
    <div className="gcn-achievements-hold">
      <div className="gcn-world-grid" aria-hidden="true" />
      <div className="gcn-grain-overlay" aria-hidden="true" />
      <div className="gcn-achievements-hold-inner">
        <p className="gcn-kicker">The record is being assembled</p>
        <h1 className="gcn-masthead-title">Achievements</h1>
        <div className="gcn-achievements-note">
          <span>Field note · 2026</span>
          <p>
            We&apos;re documenting the outcomes behind the events, partnerships,
            and student stories that moved GCN forward. The full record is coming soon.
          </p>
          <Link href="/events" className="gcn-action gcn-btn-primary">
            Read the event chronicle <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
