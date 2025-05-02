import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Interested in collaborating?</span>
          <span className="block text-[#1e40af]">Join our research network.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button className="bg-[#1e40af] hover:bg-blue-800">
              Contact Research Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 