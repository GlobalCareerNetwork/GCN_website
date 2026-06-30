import TeamCard from "@/components/TeamCard";
import {
  teamData,
  getExecutiveBoard,
  getMembersByDepartment,
  type Department,
} from "@/lib/data/team";

// Departments shown in the grid (Executive handled separately in exec row)
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
    <div className="mx-auto max-w-6xl px-6 py-16">

      {/* ── Page header ── */}
      <div className="text-center mb-14">
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border mb-4"
          style={{
            background: "var(--color-brand-red-light)",
            borderColor: "rgba(158,34,26,0.2)",
            color: "var(--color-brand-red)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
          Our Team
        </p>
        <h1
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
          style={{ color: "var(--color-black-soft)" }}
        >
          Executive Board
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-gray-muted)" }}>
          Meet the student leaders who plan events, manage outreach, and build
          the professional community that supports international students at ASU.
        </p>
      </div>

      {/* ── Exec row ── */}
      <div className="relative flex justify-center gap-10 mb-2">
        {exec.map((member) => (
          <TeamCard key={member.id} member={member} size="large" />
        ))}
      </div>

      {/* ── SVG connector: exec → departments ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "60px" }} aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 60"
        >
          {/* Vertical drop from center of exec row */}
          <line x1="50" y1="0" x2="50" y2="30" stroke="var(--color-brand-red)" strokeWidth="0.5" opacity="0.4" />
          {/* Horizontal bar across dept positions */}
          <line x1="10" y1="30" x2="90" y2="30" stroke="var(--color-brand-red)" strokeWidth="0.5" opacity="0.4" />
          {/* Drop lines to each dept — 5 depts, evenly spaced ~10,27.5,45,62.5,80 */}
          {[10, 27.5, 45, 62.5, 80].map((x, i) => (
            <line key={i} x1={x} y1="30" x2={x} y2="60" stroke="var(--color-brand-red)" strokeWidth="0.5" opacity="0.4" />
          ))}
        </svg>
      </div>

      {/* ── Department sections ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {allDepts.map((dept) => {
          const members = getMembersByDepartment(dept);
          return (
            <div key={dept} className="flex flex-col items-center gap-4">
              {/* Dept label */}
              <div
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
                style={{
                  background: "var(--color-brand-red-light)",
                  borderColor: "rgba(158,34,26,0.2)",
                  color: "var(--color-brand-red)",
                }}
              >
                {DEPT_LABELS[dept]}
              </div>

              {/* Member cards */}
              <div className="flex flex-col gap-4 items-center">
                {members.map((member) => (
                  <TeamCard key={member.id} member={member} size="normal" />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Stats row ── */}
      <div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl p-6"
        style={{
          background: "#fff",
          border: "1px solid var(--color-gray-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {[
          { value: String(teamData.length), label: "Team Members" },
          { value: String(allDepts.length), label: "Departments" },
          { value: "1", label: "Exec Leadership" },
          { value: "5", label: "Team Leads" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p
              className="text-3xl font-extrabold"
              style={{ color: "var(--color-brand-red)" }}
            >
              {value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-gray-muted)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
