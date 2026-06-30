import HeroSection from "@/components/HeroSection";
import WhoWeAre from "@/components/WhoWeAre";
import StatsBlock from "@/components/StatsBlock";
import PhotoMarquee from "@/components/PhotoMarquee";
import Testimonials from "@/components/Testimonials";
import SponsorLogoWall from "@/components/SponsorLogoWall";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAre />
      <StatsBlock />
      <PhotoMarquee />
      <Testimonials />
      <SponsorLogoWall />
    </>
  );
}
