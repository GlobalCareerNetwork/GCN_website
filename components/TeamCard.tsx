"use client";

import { useRef } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

interface TeamCardProps {
  member: TeamMember;
  priority?: boolean;
}

export default function TeamCard({ member, priority = false }: TeamCardProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const detailsId = `team-card-details-${member.id}`;
  const headingId = `${detailsId}-heading`;
  const nameSize = member.name.length > 20 ? "compact" : member.name.length > 13 ? "long" : "normal";
  const mobilePhotoSize = member.department === "Executive" ? "min(25vw, 148px)" : "min(38vw, 148px)";
  const initials = member.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join("");

  return (
    <article className="gcn-team-tile">
      <button
        ref={triggerRef}
        type="button"
        className="gcn-team-profile-trigger"
        aria-haspopup="dialog"
        aria-controls={detailsId}
        aria-label={`View profile for ${member.name}, ${member.role}`}
        onClick={() => dialogRef.current?.showModal()}
      >
        <span className="gcn-team-photo-stage">
          <span className="gcn-team-portrait">
            {member.photo ? (
              <Image
                src={member.photo}
                alt=""
                fill
                sizes={`(max-width: 767px) ${mobilePhotoSize}, (max-width: 1023px) 164px, 176px`}
                priority={priority}
                className="object-cover object-top"
                style={{ objectPosition: member.photoPosition }}
              />
            ) : (
              <span className="gcn-team-initials" aria-hidden="true">{initials}</span>
            )}
          </span>
        </span>
        <span className="gcn-team-caption">
          <span className="gcn-team-caption-name" data-name-size={nameSize}>{member.name}</span>
          <span className="gcn-team-caption-role">{member.role}</span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id={detailsId}
        className="gcn-team-profile"
        aria-labelledby={headingId}
        onClose={() => triggerRef.current?.focus({ preventScroll: true })}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="gcn-team-profile-panel">
          <div className="gcn-team-profile-header">
            <div>
              <h2 id={headingId}>{member.name}</h2>
              <p>{member.role}</p>
            </div>
            <form method="dialog">
              <button type="submit" className="gcn-team-profile-close" aria-label="Close profile">&times;</button>
            </form>
          </div>

          <div className="gcn-team-profile-body">
            {(member.major || member.year) && (
              <dl className="gcn-team-profile-meta">
                {member.major && <div><dt>Major</dt><dd>{member.major}</dd></div>}
                {member.year && <div><dt>Expected graduation</dt><dd>{member.year}</dd></div>}
              </dl>
            )}
            {member.bio && (
              <div className="gcn-team-profile-bio">
                <h3>Short bio</h3>
                <p>{member.bio}</p>
              </div>
            )}
            {(member.linkedinUrl || member.email) && (
              <div className="gcn-team-profile-links">
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                )}
                {member.email && <a href={`mailto:${member.email}`}>{member.email}</a>}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </article>
  );
}
