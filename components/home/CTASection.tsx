import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <div className="bg-[#1e40af]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block text-white opacity-75">Start integrating Moorcheh today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow group">
            <Button className="bg-white text-[#1e40af] hover:bg-gray-50 font-medium px-6 py-2 text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 group-hover:gap-3">
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow group">
            <Button variant="outline" className="border-white text-blue hover:bg-white/20 font-medium px-6 py-2 text-sm transition-all duration-300 hover:scale-105 group-hover:border-opacity-100 border-opacity-70">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 