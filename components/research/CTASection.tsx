import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function CTASection() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Interested in collaborating?</span>
          <span className="block text-[#1e40af]">Join our research network.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow group">
            <Button className="bg-[#1e40af] text-white hover:bg-blue-800 font-medium px-6 py-2 text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2">
              <Mail className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
              Contact Research Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 