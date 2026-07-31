"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

type SponsorTier = {
  name: string;
  price: string;
  badge: string;
  metal: string;
  accent: string;
  accentBg: string;
  foil: string;
  hero: boolean;
  popular: boolean;
  benefits: readonly string[];
};

interface SponsorTierSnapProps {
  tiers: readonly SponsorTier[];
}

const INQUIRY_HREF =
  "mailto:globalcareernetwork.club@gmail.com?subject=Sponsorship%20Inquiry%20(GCN%20at%20ASU)";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function SponsorTierSnap({ tiers }: SponsorTierSnapProps) {
  const snapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = snapRef.current;
    if (!root) return;

    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const nextIndex = panels.indexOf(visible.target as HTMLElement);
        if (nextIndex >= 0) setActiveIndex(nextIndex);
      },
      {
        root,
        threshold: [0.55, 0.72],
      }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const scrollToTier = (index: number) => {
    const panel = panelRefs.current[index];
    if (!panel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const handleSnapScroll = () => {
    const snap = snapRef.current;
    const shell = shellRef.current;
    if (!snap || !shell) return;

    const maxScroll = snap.scrollHeight - snap.clientHeight;
    const progress = maxScroll > 0 ? snap.scrollTop / maxScroll : 0;
    shell.style.setProperty("--tier-scroll-progress", progress.toFixed(4));
  };

  const handlePanelPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;

    const panel = event.currentTarget;
    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 3.5;
    const rotateX = (0.5 - y) * 2.5;

    panel.style.setProperty("--panel-x", `${(x * 100).toFixed(1)}%`);
    panel.style.setProperty("--panel-y", `${(y * 100).toFixed(1)}%`);
    panel.style.setProperty("--panel-tilt-x", `${rotateX.toFixed(2)}deg`);
    panel.style.setProperty("--panel-tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetPanelPointer = (event: PointerEvent<HTMLElement>) => {
    const panel = event.currentTarget;
    panel.style.setProperty("--panel-x", "50%");
    panel.style.setProperty("--panel-y", "36%");
    panel.style.setProperty("--panel-tilt-x", "0deg");
    panel.style.setProperty("--panel-tilt-y", "0deg");
  };

  return (
    <div
      ref={shellRef}
      className="gcn-tier-sticky-shell"
      data-sponsor-reveal
      data-active-tier={activeIndex}
    >
      <aside className="gcn-tier-rail" aria-label="Sponsorship tier navigation">
        <p className="gcn-tier-rail-kicker">Browse Tiers</p>
        <h3>One focused sponsorship level at a time.</h3>
        <p>
          Compare visibility, recruiting access, and event involvement without
          scanning a long pricing wall.
        </p>
        <div className="gcn-tier-live-meter" aria-hidden="true">
          <span />
        </div>
        <p className="gcn-tier-active-readout">
          Viewing {tiers[activeIndex].name} · {tiers[activeIndex].price}
        </p>

        <div className="gcn-tier-progress" aria-label="Sponsorship tier progress">
          {tiers.map((tier, index) => (
            <button
              key={tier.name}
              type="button"
              aria-current={activeIndex === index ? "true" : undefined}
              aria-controls={`sponsor-tier-${slugify(tier.name)}`}
              className="gcn-tier-progress-dot"
              data-metal={tier.metal}
              data-active={activeIndex === index ? "true" : "false"}
              onClick={() => scrollToTier(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {tier.badge}
            </button>
          ))}
        </div>

        <a className="gcn-tier-sticky-cta" href={INQUIRY_HREF}>
          Partner with GCN →
        </a>
      </aside>

      <div
        ref={snapRef}
        className="gcn-tier-snap"
        tabIndex={0}
        aria-label="Scrollable sponsorship tier cards"
        onScroll={handleSnapScroll}
      >
        {tiers.map((tier, index) => {
          const accentColor = typeof tier.accent === "string" ? tier.accent : "#9e221a";
          const tierId = `sponsor-tier-${slugify(tier.name)}`;

          return (
            <article
              key={tier.name}
              id={tierId}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              aria-labelledby={`${tierId}-heading`}
              className="gcn-tier-panel"
              data-metal={tier.metal}
              data-active={activeIndex === index ? "true" : "false"}
              onPointerMove={handlePanelPointerMove}
              onPointerLeave={resetPanelPointer}
              style={{
                "--tier-accent": accentColor,
                "--tier-bg": tier.hero ? "var(--color-surface-white)" : tier.accentBg,
                "--tier-foil": tier.foil,
                "--panel-x": "50%",
                "--panel-y": "36%",
                "--panel-tilt-x": "0deg",
                "--panel-tilt-y": "0deg",
              } as CSSProperties}
            >
              <div className="gcn-tier-panel-inner">
                <div className="gcn-tier-metal-orb" aria-hidden="true">
                  {tier.badge}
                </div>
                <div className="gcn-tier-panel-header">
                  <div>
                    <p className="gcn-tier-badge">{tier.badge}</p>
                    <h3 id={`${tierId}-heading`}>{tier.name}</h3>
                  </div>

                  {tier.popular && (
                    <span className="gcn-tier-popular">Most Popular</span>
                  )}
                </div>

                <p className="gcn-tier-price">{tier.price}</p>
                <div className="gcn-tier-metal-strip" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p className="gcn-tier-scope">
                  Single featured GCN event sponsorship. Custom year-round
                  partnerships available by inquiry.
                </p>

                <ul className="gcn-tier-benefits">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>
                      <span aria-hidden="true">♦</span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <a className="gcn-tier-inquiry" href={INQUIRY_HREF}>
                  Inquire About {tier.badge} →
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <a className="gcn-tier-mobile-cta" href={INQUIRY_HREF}>
        Partner with GCN →
      </a>
    </div>
  );
}
