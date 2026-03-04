import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import TechStack from "@/components/home/TechStack";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <PortfolioPreview />
      <TechStack />
      <Testimonials />
      <CallToAction />
    </>
  );
}
