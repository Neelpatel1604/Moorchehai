import { HeroSection } from "./HeroSection";
import { FeaturedResearchSection } from "./FeaturedResearchSection";
import { InitiativesSection } from "./InitiativesSection";
import { CTASection } from "./CTASection";

export function ResearchPage() {
  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      <HeroSection />
      <FeaturedResearchSection />
      <InitiativesSection />
      <CTASection />
    </div>
  );
} 