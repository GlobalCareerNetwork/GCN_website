import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import PresidentsNote from "@/components/PresidentsNote";
import StatsBlock from "@/components/StatsBlock";
import PhotoMarquee from "@/components/PhotoMarquee";
import SponsorLogoWall from "@/components/SponsorLogoWall";
import SectionDivider from "@/components/SectionDivider";
import ClosingStatement from "@/components/ClosingStatement";

export default function HomePage() {
  return (
    <>
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
