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
            Our Partners
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
          Organizations that invest in GCN&apos;s mission
        </p>
      </div>

      {/* Edge-faded marquee wrapper */}
      <div className="gcn-marquee-fade overflow-hidden">
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
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "grayscale(0) opacity(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "grayscale(1) opacity(0.45)";
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
