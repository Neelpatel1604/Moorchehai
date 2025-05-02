import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";
import { FeaturesSection } from "./FeaturesSection";
import { CTASection } from "./CTASection";

export function ProductsOverviewPage() {
  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      <HeroSection />
      <ProductsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
} 