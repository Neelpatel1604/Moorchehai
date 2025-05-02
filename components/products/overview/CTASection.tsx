import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="bg-[#1e40af]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block text-white opacity-75">Explore our pricing plans.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button className="bg-white text-[#1e40af] hover:bg-gray-100">
              View Pricing
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 