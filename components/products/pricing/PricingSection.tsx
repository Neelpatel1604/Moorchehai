import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          <PricingCard 
            tier="Starter"
            price="$99"
            description="Perfect for small businesses just getting started with edge AI."
            frequency="/month"
            features={[
              "Up to 5 edge devices",
              "Basic model deployment",
              "Standard support (email)",
              "1GB offline data storage",
              "Monthly updates"
            ]}
            buttonText="Get Started"
            buttonVariant="default"
          />
          
          <PricingCard 
            tier="Professional"
            price="$299"
            description="For growing businesses with more advanced edge AI needs."
            frequency="/month"
            featured={true}
            features={[
              "Up to 25 edge devices",
              "Advanced model customization",
              "Priority support (email & phone)",
              "10GB offline data storage",
              "Weekly updates",
              "Custom integrations",
              "Admin dashboard"
            ]}
            buttonText="Start Free Trial"
            buttonVariant="default"
          />
          
          <PricingCard 
            tier="Enterprise"
            price="Custom"
            description="For organizations requiring enterprise-grade features and support."
            frequency=""
            features={[
              "Unlimited edge devices",
              "Full customization options",
              "24/7 dedicated support",
              "Unlimited offline storage",
              "Custom update schedule",
              "Private deployment options",
              "Advanced security features",
              "Dedicated success manager"
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
          />
        </div>
      </div>
    </div>
  );
}

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  frequency: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  featured?: boolean;
}

function PricingCard({ 
  tier, 
  price, 
  description, 
  frequency, 
  features, 
  buttonText, 
  buttonVariant,
  featured = false 
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col rounded-lg shadow-sm divide-y divide-gray-200 ${
      featured ? 'border-2 border-[#1e40af] ring-2 ring-[#1e40af] relative' : 'border border-gray-200'
    }`}>
      {featured && (
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0">
          <span className="inline-flex rounded-full bg-[#1e40af] px-4 py-1 text-xs font-semibold text-white">
            Popular
          </span>
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">{tier}</h2>
        <p className="mt-4">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          <span className="text-base font-medium text-gray-500">{frequency}</span>
        </p>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <div className="mt-6">
          <Button 
            variant={buttonVariant} 
            className={`w-full ${buttonVariant === 'default' ? 'bg-[#1e40af] hover:bg-blue-800' : 'border-[#1e40af] text-[#1e40af]'}`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      
      <div className="py-6 px-6">
        <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
        <ul className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-sm text-gray-700">{feature}</p>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
} 