import Image from "next/image";
import type { ReactNode } from "react";

interface SectionEyebrowProps {
  num: string;
  label: string;
  right?: string;
}

export function SponsorSectionEyebrow({ num, label, right }: SectionEyebrowProps) {
  return (
    <div
      className="flex items-center gap-4 py-2.5"
      style={{ borderBottom: "1px solid var(--color-gray-border)" }}
    >
      <span
        className="font-black uppercase shrink-0"
        style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
      >
        {num}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
      <span
        className="font-bold uppercase shrink-0"
        style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
      >
        {label}
      </span>
      {right && (
        <>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0 hidden sm:block"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            {right}
          </span>
        </>
      )}
    </div>
  );
}

export function SponsorStatCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="gcn-sponsor-stat-card">
      <span aria-hidden="true">{icon}</span>
      <p>{value}</p>
      <small>{label}</small>
    </div>
  );
}

export function SponsorSignalChip({ children }: { children: ReactNode }) {
  return <span className="gcn-sponsor-signal-chip">{children}</span>;
}

export function SponsorBenefitPill({
  label,
  icon,
}: {
  label: string;
  icon: ReactNode;
}) {
  return (
    <div className="gcn-sponsor-benefit-pill">
      <span aria-hidden="true">{icon}</span>
      <strong>{label}</strong>
    </div>
  );
}

export function SponsorLogoGrid({
  logos,
}: {
  logos: readonly { src: string; alt: string }[];
}) {
  return (
    <div className="gcn-sponsor-logo-grid" aria-label="Selected sponsor and partner logos">
      {logos.map((logo) => (
        <div key={logo.alt} className="gcn-sponsor-logo-card">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={140}
            height={48}
            className="object-contain"
            style={{ maxWidth: "100%", height: "auto", maxHeight: "34px" }}
          />
        </div>
      ))}
    </div>
  );
}

export function SponsorProgramCard({
  label,
  icon,
  items,
  index,
}: {
  label: string;
  icon: ReactNode;
  items: readonly string[];
  index: number;
}) {
  return (
    <div
      className="gcn-sponsor-program-card flex flex-col gap-4 p-5"
      style={{ borderLeft: index > 0 ? "1px solid var(--color-gray-border)" : undefined }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center flex-shrink-0"
        style={{ color: "var(--color-brand-red)" }}
      >
        {icon}
      </div>
      <p
        className="font-bold uppercase tracking-wide mt-1"
        style={{ fontSize: "12px", letterSpacing: "0.14em", color: "var(--color-black-soft)" }}
      >
        {label}
      </p>
      <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-gray-muted)" }}>
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "var(--color-brand-red)", opacity: 0.5 }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SponsorImpactItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="gcn-sponsor-impact-item">
      <p className="font-bold text-sm mb-1" style={{ color: "var(--color-black-soft)" }}>
        {title}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-gray-text)" }}>
        {description}
      </p>
    </div>
  );
}

export function SponsorScrollProgress() {
  return (
    <div
      className="gcn-sponsor-scroll-progress"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50%",
        right: "1rem",
        transform: "translateY(-50%)",
      }}
    >
      <span />
    </div>
  );
}
