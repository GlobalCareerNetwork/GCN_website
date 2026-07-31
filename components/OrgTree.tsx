import TeamCard from "@/components/TeamCard";
import TeamMotionSection from "@/components/TeamMotionSection";
import CountUp from "@/components/CountUp";
import type { CSSProperties } from "react";
import {
  teamData,
  getExecutiveBoard,
  getMembersByDepartment,
  type Department,
} from "@/lib/data/team";

const DEPT_LABELS: Record<Exclude<Department, "Executive">, string> = {
  Operations: "Operations",
  Outreach: "Outreach",
  Technical: "Technical",
  Finance: "Finance",
  Marketing: "Marketing",
};

export default function OrgTree() {
  const exec = getExecutiveBoard();
  const allDepts = (Object.keys(DEPT_LABELS) as Exclude<Department, "Executive">[]);

  return (
    <div className="gcn-team-page gcn-team-motion-field" style={{ background: "var(--color-surface)" }}>

      {/* ── Newspaper masthead header ── */}
      <div
        className="gcn-page-masthead gcn-team-hero-motion"
        style={{
          borderBottom: "2px solid var(--color-black-soft)",
          background: "var(--color-surface-white)",
        }}
      >
        {/* Eyebrow rule */}
        <div
          className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4"
          style={{ borderBottom: "1px solid var(--color-gray-border)" }}
        >
          <span
            className="font-black uppercase shrink-0"
            style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            GCN
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Our People
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.12)" }} />
          <span
            className="font-bold uppercase shrink-0 hidden sm:block"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Arizona State University
          </span>
        </div>

        {/* Masthead content */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
            <div className="gcn-team-hero-copy">
              <p
                className="font-bold uppercase mb-2"
                style={{ fontSize: "12px", letterSpacing: "0.2em", color: "var(--color-brand-red)" }}
              >
                Executive Board
              </p>
              <h1
                className="gcn-masthead-title leading-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-black-soft)",
                }}
              >
                Meet the Team
              </h1>
            </div>
            <p
              className="gcn-team-hero-deck text-sm max-w-xs"
              style={{ color: "var(--color-gray-muted)", lineHeight: 1.6 }}
            >
              Student leaders who plan events, manage outreach, and build the
              professional community that supports international students at ASU.
            </p>
          </div>
        </div>
      </div>
      {/* Thin companion rule — completes the thick-thin double rule at bottom of masthead */}
      <div style={{ height: "1px", background: "rgba(12,12,14,0.22)", marginTop: "3px" }} />

      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* ── Section eyebrow: Executive Board ── */}
        <div
          className="gcn-team-section-rule flex items-center gap-4 mb-8"
          style={{ borderBottom: "1px solid var(--color-gray-border)", paddingBottom: "12px" }}
        >
          <span
            className="font-black uppercase"
            style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
          >
            01
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.10)" }} />
          <span
            className="font-bold uppercase"
            style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
          >
            Executive Board
          </span>
        </div>

        {/* ── Exec row: horizontal, left to right, all faces on one line ── */}
        <TeamMotionSection className="gcn-team-assembly flex flex-row flex-wrap items-start gap-10 mb-16">
          {exec.map((member, i) => (
            <div
              key={member.id}
              className="gcn-team-motion-item"
              style={{ "--gcn-team-delay": `${i * 90}ms` } as CSSProperties}
            >
              <TeamCard member={member} size="large" priority={i === 0} />
            </div>
          ))}
        </TeamMotionSection>

        {/* ── Department sections — stacked full-width, each a horizontal row ── */}
        {allDepts.map((dept, deptIdx) => {
          const members = getMembersByDepartment(dept);
          return (
            <TeamMotionSection key={dept} className="gcn-team-department mb-16">
              {/* Section eyebrow */}
              <div
                className="gcn-team-section-rule flex items-center gap-4 mb-8"
                style={{ borderBottom: "1px solid var(--color-gray-border)", paddingBottom: "12px" }}
              >
                <span
                  className="font-black uppercase"
                  style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
                >
                  {(deptIdx + 2).toString().padStart(2, "0")}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.10)" }} />
                <span
                  className="font-bold uppercase"
                  style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
                >
                  {DEPT_LABELS[dept]}
                </span>
              </div>

              {/* Member row — left to right, tops aligned so no face sits higher than another */}
              <div className="gcn-team-assembly flex flex-row flex-wrap items-start gap-8">
                {members.map((member, memberIdx) => (
                  <div
                    key={member.id}
                    className="gcn-team-motion-item"
                    style={{
                      "--gcn-team-delay": `${deptIdx * 55 + memberIdx * 85}ms`,
                    } as CSSProperties}
                  >
                    <TeamCard member={member} size="normal" />
                  </div>
                  ))}
              </div>
            </TeamMotionSection>
          );
        })}

        {/* ── Stats row ── */}
        <div
          className="mt-14 grid grid-cols-2 md:grid-cols-4 overflow-hidden"
          style={{
            border: "1px solid var(--color-gray-border)",
            borderTop: "2px solid var(--color-black-soft)",
          }}
        >
          {[
            { value: teamData.length, label: "Team Members" },
            { value: allDepts.length, label: "Departments" },
            { value: 2, label: "Exec Leadership" },
            { value: 5, label: "Team Leads" },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="text-center py-6"
              style={{
                borderLeft: i > 0 ? "1px solid var(--color-gray-border)" : undefined,
                borderTop: i >= 2 ? "1px solid var(--color-gray-border)" : undefined,
              }}
            >
              <p
                className="font-bold leading-none"
                style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", color: "var(--color-brand-red)" }}
              >
                <CountUp end={value} />
              </p>
              <p className="text-xs mt-2 uppercase tracking-wider" style={{ color: "var(--color-gray-muted)", letterSpacing: "0.16em" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
