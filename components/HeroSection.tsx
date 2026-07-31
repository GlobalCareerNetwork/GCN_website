import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

const SIGNALS = [
  "88 countries represented",
  "2,000+ members",
  "12+ events every semester",
  "Built by students for students",
];

export default function HeroSection() {
  return (
    <section className="gcn-hero" aria-labelledby="hero-headline">
      <div className="gcn-world-grid" aria-hidden="true" />
      <div className="gcn-hero-radar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="gcn-grain-overlay" aria-hidden="true" />

      <div className="gcn-hero-shell">
        <div
          className="gcn-hero-meta hero-anim"
          style={{ "--delay": "0.04s" } as CSSProperties}
        >
          <span>ASU · Tempe, Arizona</span>
          <span>Student-led since 2022</span>
          <span className="hidden sm:inline">34.42° N · 111.93° W</span>
        </div>

        <div className="gcn-hero-stage">
          <div className="gcn-hero-copy">
            <p
              className="gcn-kicker hero-anim"
              style={{ "--delay": "0.12s" } as CSSProperties}
            >
              Careers without borders
            </p>

            <h1 id="hero-headline" className="gcn-hero-title">
              <span
                className="hero-word"
                style={{ "--delay": "0.18s" } as CSSProperties}
              >
                Global
              </span>
              <span
                className="hero-word gcn-hero-title-outline"
                style={{ "--delay": "0.28s" } as CSSProperties}
              >
                Career
              </span>
              <span
                className="hero-word"
                style={{ "--delay": "0.38s" } as CSSProperties}
              >
                Network
              </span>
            </h1>

            <div
              className="gcn-hero-intro hero-anim"
              style={{ "--delay": "0.52s" } as CSSProperties}
            >
              <p>
                The student-built network connecting international ambition
                with people, practice, and opportunity at Arizona State.
              </p>
              <div className="gcn-hero-actions">
                <Link href="/join" className="gcn-btn gcn-btn-primary gcn-action">
                  Enter the network <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/events" className="gcn-btn gcn-action gcn-action-ghost">
                  Explore the chronicle <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className="gcn-hero-globe hero-fade"
            style={{ "--delay": "0.36s" } as CSSProperties}
          >
            <div className="gcn-globe-orbit gcn-globe-orbit-a" aria-hidden="true" />
            <div className="gcn-globe-orbit gcn-globe-orbit-b" aria-hidden="true" />
            <GlobeWrapper className="gcn-globe-canvas" />
            <div className="gcn-globe-caption">
              <span className="gcn-live-dot" aria-hidden="true" />
              Global signal active
            </div>
          </div>

          <div className="gcn-hero-index hero-anim" style={{ "--delay": "0.7s" } as CSSProperties}>
            <span>01</span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      <div className="gcn-signal-rail" aria-label="GCN at a glance">
        <div className="gcn-signal-track">
          {[...SIGNALS, ...SIGNALS].map((signal, index) => (
            <span key={`${signal}-${index}`}>
              {signal}
              <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
