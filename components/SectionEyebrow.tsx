import type { ReactNode } from "react";

interface SectionEyebrowProps {
  num: string;
  children: ReactNode;
  /** Flips the row (label first, numeral last) for mirrored/reversed section compositions. */
  reverse?: boolean;
}

// Numbered section label used across homepage editorial sections
// (Who We Are / What We Do / President's Note): "01 ── LABEL".
export default function SectionEyebrow({ num, children, reverse = false }: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${reverse ? "flex-row-reverse" : ""}`}>
      <span
        className="font-black shrink-0"
        style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
      >
        {num}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
      <span
        className="font-bold shrink-0 uppercase"
        style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
      >
        {children}
      </span>
    </div>
  );
}
