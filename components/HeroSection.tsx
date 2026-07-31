import Link from "next/link";
import GlobeWrapper from "@/components/GlobeWrapper";
import type { CSSProperties } from "react";

const HIGHLIGHTS = [
  { value: "2,000+", label: "Students Connected" },
  { value: "88", label: "Countries Represented" },
  { value: "12+", label: "Career Events Each Semester" },
];

const TRUST_INDICATORS = [
  "Official ASU Student Organization",
  "Supported by ASU Career Services",
];

export default function HeroSection() {
  return (
    <section id="hero" className="gcn-hero" aria-labelledby="hero-headline">
      <div className="gcn-world-grid" aria-hidden="true" />

      <div className="gcn-hero-shell">
        <div
          className="gcn-hero-meta hero-anim"
          style={{ "--delay": "0.04s" } as CSSProperties}
        >
          <span>ASU · Tempe, Arizona</span>
          <span>Student-led since 2022</span>
          <span className="hidden sm:inline">33.42° N · 111.93° W</span>
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
              <span className="hero-word" style={{ "--delay": "0.18s" } as CSSProperties}>
                <span className="gcn-hero-initial">G</span>lobal{" "}
                <span className="gcn-hero-initial">C</span>areer{" "}
                <span className="gcn-hero-initial">N</span>etwork
              </span>
            </h1>

            <div
              className="gcn-hero-intro hero-anim"
              style={{ "--delay": "0.52s" } as CSSProperties}
            >
              <p>
                Helping international and globally minded students land internships,
                build professional networks, and launch successful careers.
              </p>
              <div className="gcn-hero-actions">
                <Link href="/join" className="gcn-btn gcn-btn-primary gcn-action">
                  Join GCN <span aria-hidden="true">→</span>
                </Link>
                <Link href="/events" className="gcn-btn gcn-action gcn-action-ghost">
                  View events <span aria-hidden="true">→</span>
                </Link>
              </div>
              <ul className="gcn-hero-trust" aria-label="GCN trust indicators">
                {TRUST_INDICATORS.map((indicator) => (
                  <li key={indicator}>
                    <span aria-hidden="true">✓</span>
                    {indicator}
                  </li>
                ))}
              </ul>
            </div>

            <dl
              className="gcn-hero-highlights hero-anim"
              style={{ "--delay": "0.62s" } as CSSProperties}
            >
              {HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <dt>{item.value}</dt>
                  <dd>{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="gcn-hero-globe hero-fade"
            style={{ "--delay": "0.36s" } as CSSProperties}
          >
            <GlobeWrapper className="gcn-globe-canvas" />
            <div className="gcn-globe-frame" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
