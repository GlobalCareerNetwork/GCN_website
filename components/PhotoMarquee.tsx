"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

interface PhotoMarqueeProps {
  photos: { src: string; alt: string; position?: string }[];
}

export default function PhotoMarquee({ photos }: PhotoMarqueeProps) {
  const strip = [...photos, ...photos];

  return (
    <section
      className="gcn-people-rail py-16 overflow-hidden"
      aria-label="GCN team photo gallery"
    >
      <Reveal className="mb-8 px-6 mx-auto max-w-5xl">
        <h2
          className="text-center"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(1.35rem, 2.5vw, 1.8rem)",
            color: "var(--color-gray-text)",
          }}
        >
          The faces behind GCN at ASU
        </h2>
      </Reveal>

      {/* Edge-faded marquee wrapper */}
      <div className="gcn-marquee-fade overflow-hidden">
        <div
          className="gcn-people-strip relative flex"
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
              className="gcn-people-frame gcn-card-hover relative flex-shrink-0 mx-2 overflow-hidden"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={160}
                height={200}
                className="object-cover object-top w-full h-full"
                style={{ objectPosition: photo.position }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
