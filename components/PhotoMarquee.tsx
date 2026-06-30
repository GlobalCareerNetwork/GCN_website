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
        background: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #fdf4ff 100%)",
        borderTop: "1px solid rgba(124,58,237,0.1)",
      }}
      aria-label="GCN team photo gallery"
    >
      {/* Section label */}
      <div className="text-center mb-8 px-6">
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border"
          style={{
            background: "linear-gradient(135deg, var(--color-brand-red-light), rgba(124,58,237,0.1))",
            borderColor: "rgba(124,58,237,0.22)",
            color: "var(--color-brand-red)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
          Our People
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: "var(--color-gray-muted)" }}
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
              className="flex-shrink-0 mx-2 rounded-2xl overflow-hidden"
              style={{
                width: "160px",
                height: "200px",
                border: "1px solid rgba(124,58,237,0.15)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.08)",
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
