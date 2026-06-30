import HeroSection from "@/components/HeroSection";
import TextTicker from "@/components/TextTicker";
import WhoWeAre from "@/components/WhoWeAre";
import StatsBlock from "@/components/StatsBlock";
import PhotoMarquee from "@/components/PhotoMarquee";
import SponsorLogoWall from "@/components/SponsorLogoWall";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TextTicker />
      <WhoWeAre />
      <StatsBlock />
      <TextTicker />
      <PhotoMarquee />
      <SponsorLogoWall />
    </>
  );
}
