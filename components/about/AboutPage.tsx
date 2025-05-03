import { HeroSection } from "./HeroSection";
import { MissionSection } from "./MissionSection";
import { ValuesSection } from "./ValuesSection";

export function AboutPage() {
  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
    </div>
  );
} 