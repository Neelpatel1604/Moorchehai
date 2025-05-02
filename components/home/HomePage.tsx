import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import { CTASection } from "./CTASection";

export function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </div>
  );
} 