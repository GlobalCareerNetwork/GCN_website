import TeamCard from "@/components/TeamCard";
import TeamMotionSection from "@/components/TeamMotionSection";
import { getExecutiveBoard, teamData } from "@/lib/data/team";
import type { CSSProperties } from "react";

export default function OrgTree() {
  const executives = getExecutiveBoard();
  const members = teamData.filter((member) => member.department !== "Executive");

  return (
    <div className="gcn-team-page">
      <TeamMotionSection className="gcn-team-poster-shell">
        <section className="gcn-team-poster" aria-labelledby="team-heading">
          <header className="gcn-team-poster-header">
            <h1 id="team-heading" className="gcn-team-poster-title">
              <span>MEET</span>
              <em>the team</em>
            </h1>
            <p className="mt-5 text-center text-sm font-medium" style={{ color: "var(--color-gray-text)" }}>
              Click on each person to learn more!
            </p>
          </header>

          {[executives, members].map((group, groupIndex) => {
            const isExecutive = groupIndex === 0;
            return (
              <div
                key={isExecutive ? "executives" : "members"}
                className={isExecutive ? "gcn-team-poster-grid gcn-team-poster-grid-executive" : "gcn-team-poster-grid"}
                role="group"
                aria-label={isExecutive ? "Executive board" : "Team members"}
              >
                {group.map((member, index) => (
                  <div
                    key={member.id}
                    className="gcn-team-motion-item"
                    style={{ "--gcn-team-delay": `${(index + (isExecutive ? 0 : executives.length)) * 55}ms` } as CSSProperties}
                  >
                    <TeamCard member={member} priority={isExecutive} />
                  </div>
                ))}
              </div>
            );
          })}
        </section>
      </TeamMotionSection>
    </div>
  );
}
