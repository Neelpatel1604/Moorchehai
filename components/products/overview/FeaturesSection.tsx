import { Shield, Zap } from "lucide-react";

export function FeaturesSection() {
  return (
    <div className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Key Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Moorcheh?
          </p>
        </div>
        
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <FeatureItem
              icon={<Zap className="h-6 w-6" />}
              title="Low Latency"
              description="Process data locally without cloud round-trips, achieving response times measured in milliseconds rather than seconds."
            />
            
            <FeatureItem
              icon={<Shield className="h-6 w-6" />}
              title="Privacy By Design"
              description="Keep sensitive data on-device, eliminating privacy risks associated with cloud processing and storage."
            />
            
            <FeatureItem
              iconPath="M13 10V3L4 14h7v7l9-11h-7z"
              title="Offline Operation"
              description="Run sophisticated AI workloads without an internet connection, ideal for remote locations or unstable networks."
            />
            
            <FeatureItem
              iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              title="Scalable Deployment"
              description="Easily manage AI deployments across hundreds or thousands of edge devices with our centralized management tools."
            />
          </dl>
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon?: React.ReactNode;
  iconPath?: string;
  title: string;
  description: string;
}

function FeatureItem({ icon, iconPath, title, description }: FeatureItemProps) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#1e40af] text-white">
          {icon || (
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
          )}
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{title}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {description}
      </dd>
    </div>
  );
} 