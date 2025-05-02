import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Edge AI for <span className="text-[#1e40af]">Small and Medium Enterprises</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Deploy powerful AI solutions at the edge with Moorcheh - no complex infrastructure required.
          </p>
          <div className="mt-8 flex justify-center space-x-3">
            <Button className="bg-[#1e40af] hover:bg-blue-800">Get Started</Button>
            <Button variant="outline" className="border-[#1e40af] text-[#1e40af]">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 