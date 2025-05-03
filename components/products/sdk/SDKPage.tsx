import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { InstallationSection } from "./InstallationSection";
import { QuickStartSection } from "./QuickStartSection";
import { APISection } from "./APISection";

export function SDKPage() {
  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <InstallationSection />
      <QuickStartSection />
      <APISection />
    </div>
  );
}
