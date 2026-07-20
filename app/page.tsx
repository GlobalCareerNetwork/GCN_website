import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import PresidentsNote from "@/components/PresidentsNote";
import StatsBlock from "@/components/StatsBlock";
import PhotoMarquee from "@/components/PhotoMarquee";
import SponsorLogoWall from "@/components/SponsorLogoWall";
import SectionDivider from "@/components/SectionDivider";
import ClosingStatement from "@/components/ClosingStatement";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_INSTAGRAM } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/gcn-globe-mark.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [SOCIAL_INSTAGRAM],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <WhoWeAre />
      <WhatWeDo />
      <PresidentsNote />
      <StatsBlock />
      <SectionDivider />
      <PhotoMarquee />
      <SponsorLogoWall />
      <ClosingStatement />
    </>
  );
}
