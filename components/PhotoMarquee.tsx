"use client";

import Image from "next/image";

// All 14 team member photos
const PHOTOS = [
  { src: "/images/team/angel.jpg",    alt: "Angel" },
  { src: "/images/team/anhiti.jpeg",  alt: "Anhiti" },
  { src: "/images/team/bao.jpg",      alt: "Bao" },
  { src: "/images/team/daksh.jpg",    alt: "Daksh" },
  { src: "/images/team/harry.png",    alt: "Harry" },
  { src: "/images/team/harshith.jpg", alt: "Harshith" },
  { src: "/images/team/henry.jpg",    alt: "Henry" },
  { src: "/images/team/jennifer.jpg", alt: "Jennifer" },
  { src: "/images/team/kendra.jpg",   alt: "Kendra" },
  { src: "/images/team/keshava.png",  alt: "Keshava" },
  { src: "/images/team/mahi.png",     alt: "Mahi" },
  { src: "/images/team/pushkar.jpeg", alt: "Pushkar" },
  { src: "/images/team/tanu.jpeg",    alt: "Tanu" },
  { src: "/images/team/vishnu.jpeg",  alt: "Vishnu" },
];

export default function PhotoMarquee() {
  const strip = [...PHOTOS, ...PHOTOS];

  return (
    <section
      className="py-16 overflow-hidden"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-label="GCN team photo gallery"
    >
      {/* Section label — editorial eyebrow */}
      <div className="mb-8 px-6 mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.16)" }} />
          <p
            className="font-black uppercase shrink-0"
            style={{
              fontSize: "11px",
              letterSpacing: "0.24em",
              color: "var(--color-brand-red)",
            }}
          >
            Our People
          </p>
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.16)" }} />
        </div>
        <p
          className="mt-3 text-center"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "15.5px",
            color: "var(--color-gray-text)",
          }}
        >
          The faces behind GCN at ASU
        </p>
      </div>

      {/* Edge-faded marquee wrapper */}
      <div className="gcn-marquee-fade overflow-hidden">
        <div
          className="relative flex"
          style={{
            animation: "gcn-marquee 30s linear infinite",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
          }}
          aria-hidden="true"
        >
          {strip.map((photo, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 mx-2 rounded-2xl overflow-hidden"
              style={{
                width: "160px",
                height: "200px",
                border: "1px solid var(--color-gray-border)",
                boxShadow: "0 4px 16px rgba(12,12,14,0.07)",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={160}
                height={200}
                className="object-cover object-top w-full h-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
