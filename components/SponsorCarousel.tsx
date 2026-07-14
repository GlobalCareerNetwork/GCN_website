"use client";

import Image from "next/image";

const SPONSORS = [
  { src: "/images/sponsors/amazon.png",       alt: "Amazon",        width: 120, height: 40 },
  { src: "/images/sponsors/nvidia.png",       alt: "NVIDIA",        width: 120, height: 40 },
  { src: "/images/sponsors/intel.png",        alt: "Intel",         width: 100, height: 40 },
  { src: "/images/sponsors/jpmc.svg",         alt: "JPMorgan Chase",width: 120, height: 40 },
  { src: "/images/sponsors/pwc.png",          alt: "PwC",           width: 80,  height: 40 },
  { src: "/images/sponsors/bain.svg",         alt: "Bain & Company",width: 100, height: 40 },
  { src: "/images/sponsors/schwab.png",       alt: "Charles Schwab",width: 130, height: 40 },
  { src: "/images/sponsors/tsmc.png",         alt: "TSMC",          width: 100, height: 40 },
  { src: "/images/sponsors/perplexity.png",   alt: "Perplexity AI", width: 140, height: 40 },
  { src: "/images/sponsors/forage.png",       alt: "Forage",        width: 110, height: 40 },
  { src: "/images/sponsors/acggo.png",        alt: "ACGGO",         width: 110, height: 40 },
  { src: "/images/sponsors/flex-tech.png",    alt: "Flex Tech",     width: 110, height: 40 },
  { src: "/images/sponsors/product-hunt.png", alt: "Product Hunt",  width: 130, height: 40 },
  { src: "/images/sponsors/shamrock.png",     alt: "Shamrock",      width: 120, height: 40 },
];

export default function SponsorCarousel() {
  const strip = [...SPONSORS, ...SPONSORS];

  return (
    <section
      className="py-14 overflow-hidden"
      style={{ background: "#fff", borderTop: "1px solid var(--color-gray-border)" }}
      aria-label="Our sponsors and partners"
    >
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
          Sponsors &amp; Partners
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--color-gray-muted)" }}>
          Organizations that support international students at ASU
        </p>
      </div>

      {/* Scrolling track — opposite direction to photo marquee for visual interest */}
      <div
        className="relative flex"
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
            className="flex-shrink-0 mx-6 flex items-center justify-center transition-all"
            style={{ width: "140px", height: "56px", filter: "grayscale(1) opacity(0.55)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.filter = "grayscale(0) opacity(1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.filter = "grayscale(1) opacity(0.55)";
            }}
          >
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              width={sponsor.width}
              height={sponsor.height}
              className="object-contain max-h-10"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
