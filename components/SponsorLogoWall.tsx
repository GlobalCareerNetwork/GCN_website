"use client";

import Image from "next/image";

const SPONSORS = [
  { src: "/images/sponsors/amazon.png",       alt: "Amazon" },
  { src: "/images/sponsors/nvidia.png",       alt: "NVIDIA" },
  { src: "/images/sponsors/intel.png",        alt: "Intel" },
  { src: "/images/sponsors/jpmc.svg",         alt: "JPMorgan Chase" },
  { src: "/images/sponsors/pwc.png",          alt: "PwC" },
  { src: "/images/sponsors/bain.svg",         alt: "Bain & Company" },
  { src: "/images/sponsors/schwab.png",       alt: "Charles Schwab" },
  { src: "/images/sponsors/tsmc.png",         alt: "TSMC" },
  { src: "/images/sponsors/perplexity.png",   alt: "Perplexity AI" },
  { src: "/images/sponsors/forage.png",       alt: "Forage" },
  { src: "/images/sponsors/acggo.png",        alt: "ACGGO" },
  { src: "/images/sponsors/flex-tech.png",    alt: "Flex Tech" },
  { src: "/images/sponsors/product-hunt.png", alt: "Product Hunt" },
  { src: "/images/sponsors/shamrock.png",     alt: "Shamrock" },
];

export default function SponsorLogoWall() {
  const strip = [...SPONSORS, ...SPONSORS];

  return (
    <section
      className="py-14 overflow-hidden"
      style={{
        background: "var(--color-surface-white)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-label="Our sponsors and partners"
    >
      {/* Section label */}
      <div className="text-center mb-8 px-6">
        <p
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border"
          style={{
            background: "var(--color-brand-red-light)",
            borderColor: "rgba(158,34,26,0.2)",
            color: "var(--color-brand-red)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-red)" }} />
          Our Partners
        </p>
        <p className="mt-3 text-sm" style={{ color: "var(--color-gray-muted)" }}>
          Organizations that invest in GCN&apos;s mission
        </p>
      </div>

      {/* Marquee track — scrolls opposite direction to photo marquee */}
      <div
        className="relative flex items-center"
        style={{
          animation: "gcn-marquee-reverse 35s linear infinite",
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
        {strip.map((sponsor, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 mx-6 flex items-center justify-center"
            style={{ width: "120px", height: "48px" }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={120}
              height={48}
              className="object-contain w-auto"
              style={{
                maxHeight: "40px",
                filter: "grayscale(1) opacity(0.45)",
                transition: "filter 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) opacity(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1) opacity(0.45)";
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
