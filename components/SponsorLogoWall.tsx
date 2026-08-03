"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

type Sponsor = { src: string; alt: string; href: string };

const SPONSORS: Sponsor[] = [
  { src: "/images/sponsors/bain.svg", alt: "Bain & Company", href: "https://www.bain.com/" },
  { src: "/images/sponsors/amazon.png", alt: "Amazon", href: "https://www.amazon.com/" },
  { src: "/images/sponsors/shamrock.png", alt: "Shamrock Foods", href: "https://www.shamrockfoods.com/" },
  { src: "/images/sponsors/aws.png", alt: "AWS", href: "https://aws.amazon.com/" },
  { src: "/images/sponsors/jpmc.svg", alt: "J.P. Morgan", href: "https://www.jpmorgan.com/" },
  { src: "/images/sponsors/flex-tech.png", alt: "Flex Technology Group", href: "https://www.flextg.com/" },
  { src: "/images/sponsors/wap-sustainability.png", alt: "WAP Sustainability Consulting", href: "https://wapsustainability.com/" },
  { src: "/images/sponsors/syncron.jpg", alt: "Syncron", href: "https://www.syncron.com/" },
  { src: "/images/sponsors/insforge.jpeg", alt: "InsForge", href: "https://www.insforge.dev/" },
  { src: "/images/sponsors/acggo.png", alt: "ACGGO", href: "https://www.acggo.com/" },
  { src: "/images/sponsors/perplexity.png", alt: "Perplexity", href: "https://www.perplexity.ai/" },
  { src: "/images/sponsors/creative-minds.png", alt: "Creative Minds", href: "https://www.thecreativeminds.com/" },
  { src: "/images/sponsors/forage.png", alt: "Glasses icon logo", href: "https://www.theforage.com/" },
  { src: "/images/sponsors/asm-pacific-technology.png", alt: "ASM Pacific Technology", href: "https://www.asmpacific.com/" },
  { src: "/images/sponsors/panoramic-health.png", alt: "Panoramic Health", href: "https://panoramichealth.com/" },
  { src: "/images/sponsors/intel.png", alt: "Intel", href: "https://www.intel.com/" },
  { src: "/images/sponsors/ibm.png", alt: "IBM", href: "https://www.ibm.com/" },
  { src: "/images/sponsors/trucker-path.png", alt: "Trucker Path", href: "https://truckerpath.com/" },
  { src: "/images/sponsors/product-hunt.png", alt: "Product Hunt", href: "https://www.producthunt.com/" },
  { src: "/images/sponsors/schwab.png", alt: "Charles Schwab", href: "https://www.schwab.com/" },
  { src: "/images/sponsors/homer-farms.png", alt: "Homer Farms", href: "https://homerfarms.com/" },
  { src: "/images/sponsors/array-technologies.png", alt: "Array Technologies", href: "https://www.arraytechinc.com/" },
  { src: "/images/sponsors/devlabs.png", alt: "DevLabs", href: "https://www.devlabs.club/" },
  { src: "/images/sponsors/fly-for-good.png", alt: "All For One and One For All circular logo", href: "https://flyforgood.com/" },
  { src: "/images/sponsors/american-express.png", alt: "American Express", href: "https://www.americanexpress.com/" },
  { src: "/images/sponsors/inkd.png", alt: "Black silhouette logo", href: "https://inkdlondon.com/" },
  { src: "/images/sponsors/eleven-labs.webp", alt: "ElevenLabs", href: "https://elevenlabs.io/" },
  { src: "/images/sponsors/microsoft.png", alt: "Microsoft", href: "https://www.microsoft.com/" },
  { src: "/images/sponsors/nvidia.png", alt: "NVIDIA", href: "https://www.nvidia.com/" },
  { src: "/images/sponsors/asu-enterprise-technology.png", alt: "ASU Enterprise Technology", href: "https://enterprisetechnology.asu.edu/" },
  { src: "/images/sponsors/driverai.png", alt: "DriverAI", href: "https://www.driverai.io/" },
  { src: "/images/sponsors/asu-career-services.png", alt: "ASU Career Services", href: "https://eoss.asu.edu/cs" },
  { src: "/images/sponsors/asu-issc.jpeg", alt: "ASU International Students and Scholars Center", href: "https://iss.asu.edu/" },
  { src: "/images/sponsors/pwc.png", alt: "PwC", href: "https://www.pwc.com/" },
  { src: "/images/sponsors/sly-drink.png", alt: "Sly", href: "https://drinkonthesly.com/" },
  { src: "/images/sponsors/olipop.png", alt: "OLIPOP", href: "https://www.olipop.com/" },
  { src: "/images/sponsors/doordash.png", alt: "DoorDash", href: "https://www.doordash.com/" },
  { src: "/images/sponsors/tsmc.png", alt: "TSMC", href: "https://www.tsmc.com/" },
  { src: "/images/sponsors/lofty-official.png", alt: "Lofty", href: "https://www.lofty.com/" },
  { src: "/images/sponsors/moatable.png", alt: "Moatable", href: "https://www.moatable.com/" },
  { src: "/images/sponsors/vector.jpeg", alt: "Vector", href: "https://gotovector.com/" },
  { src: "/images/sponsors/hydrawav3.jpeg", alt: "HYDRAWAV3", href: "https://www.hydrawav3.com/" },
  { src: "/images/sponsors/square.png", alt: "Gold square icon logo", href: "https://squareup.com/" },
  { src: "/images/sponsors/google.png", alt: "Google", href: "https://www.google.com/" },
  { src: "/images/sponsors/red-bull.png", alt: "Red Bull", href: "https://www.redbull.com/" },
];

export default function SponsorLogoWall() {
  const strip = [...SPONSORS, ...SPONSORS];

  return (
    <section
      className="gcn-partner-rail py-14 overflow-hidden"
      style={{
        background: "var(--color-surface-white)",
        borderTop: "1px solid var(--color-gray-border)",
      }}
      aria-label="Our sponsors and partners"
    >
      {/* Section label — editorial eyebrow */}
      <Reveal className="mb-8 px-6 mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <div style={{ flex: 1, height: "1px", background: "rgba(12,12,14,0.16)" }} />
          <p
            className="font-black uppercase shrink-0"
            style={{
              fontSize: "12px",
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
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "15.5px",
            color: "var(--color-gray-text)",
          }}
        >
          Organizations that invest in GCN&apos;s mission
        </p>
      </Reveal>

      {/* Edge-faded marquee wrapper */}
      <div className="gcn-marquee-fade overflow-hidden">
        <div
          className="gcn-partner-track relative flex items-center"
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
            <a
              key={idx}
              className="gcn-partner-logo flex-shrink-0 mx-5 flex items-center justify-center"
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${sponsor.alt}`}
              style={{ width: "142px", height: "58px" }}
            >
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                width={132}
                height={54}
                className="gcn-partner-logo-image object-contain"
                style={{
                  width: "auto",
                  height: "42px",
                  maxWidth: "132px",
                }}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
