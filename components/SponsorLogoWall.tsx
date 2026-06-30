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
  return (
    <section
      className="py-16"
      style={{
        background: "var(--color-surface-white)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-label="Our sponsors and partners"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Side label ── */}
          <div className="flex-shrink-0 lg:w-44 lg:pt-2">
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "var(--color-black-soft)",
              }}
            >
              Our
              <br />
              Partners
            </h2>
            <p className="mt-3 text-sm leading-snug" style={{ color: "var(--color-gray-muted)" }}>
              Organizations that invest in GCN&apos;s mission
            </p>
          </div>

          {/* ── Logo grid ── */}
          <div
            className="flex-1 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-7 items-center"
            role="list"
          >
            {SPONSORS.map((s) => (
              <div
                key={s.alt}
                role="listitem"
                className="flex items-center justify-center"
                style={{ height: "36px" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={100}
                  height={36}
                  className="object-contain w-auto"
                  style={{
                    maxHeight: "36px",
                    filter: "grayscale(1) opacity(0.5)",
                    transition: "filter 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) opacity(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "grayscale(1) opacity(0.5)";
                  }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
