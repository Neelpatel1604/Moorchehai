import { HeroSection } from "./HeroSection";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { CTASection } from "./CTASection";

export function PricingPage() {
  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      <HeroSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </div>
  );
} 