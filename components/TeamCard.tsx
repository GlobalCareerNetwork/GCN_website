"use client";

import { useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/data/team";

interface TeamCardProps {
  member: TeamMember;
  size?: "large" | "normal";
}

export default function TeamCard({ member, size = "normal" }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false);

  const isLarge = size === "large";
  const cardW = isLarge ? "w-[220px]" : "w-[180px]";
  const cardH = isLarge ? "h-[260px]" : "h-[220px]";

  return (
    <div
      className={`${cardW} ${cardH} cursor-pointer select-none`}
      style={{
        perspective: "900px",
        transform: flipped ? "translateY(-8px)" : "translateY(0)",
        transition: "transform 0.25s var(--ease-fast), box-shadow 0.25s var(--ease-fast)",
        boxShadow: flipped
          ? "0 20px 60px rgba(124,58,237,0.28), 0 8px 24px rgba(37,99,235,0.18)"
          : undefined,
      }}
      // Hover-to-flip on pointer devices; tap-to-flip on touch
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={flipped}
      aria-label={`${member.name}, ${member.role} — press Enter to reveal details`}
    >
      {/* Flip container */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "#fff",
            border: "1px solid var(--color-gray-border)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {/* Photo */}
          <div className="relative flex-1 overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes={isLarge ? "220px" : "180px"}
              className="object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/team/placeholder.png";
              }}
            />
            {/* Gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
              }}
            />
          </div>
          {/* Name / role */}
          <div className="px-3 py-2.5">
            <p
              className="font-semibold text-sm leading-tight"
              style={{ color: "var(--color-black-soft)" }}
            >
              {member.name}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--color-brand-red)" }}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-between p-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, #0C0C0E 0%, #1e1b4b 100%)",
            border: "1px solid rgba(124,58,237,0.4)",
            boxShadow: "0 0 0 1px rgba(124,58,237,0.15), var(--shadow-hover)",
          }}
        >
          <div className="flex flex-col gap-2">
            <p
              className="font-bold text-sm leading-tight text-white"
            >
              {member.name}
            </p>
            <p style={{ color: "var(--color-brand-red)", fontSize: "11px", fontWeight: 600 }}>
              {member.role}
            </p>
            {member.major && (
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                {member.major}
                {member.year ? ` · ${member.year}` : ""}
              </p>
            )}
            <p
              className="text-xs leading-relaxed mt-1"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {member.bio}
            </p>
          </div>

          {/* LinkedIn button */}
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--color-brand-red)", color: "#fff" }}
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          ) : (
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
              No LinkedIn yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
