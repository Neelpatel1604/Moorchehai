import Link from "next/link";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FeatureSection() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Edge AI Made Simple
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Moorcheh provides cutting-edge AI capabilities that run locally on your devices.
          </p>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              icon={<Zap className="h-6 w-6" />}
              title="Serverless RAG"
              description="Deploy Retrieval-Augmented Generation without servers. Perfect for customer support and knowledge management."
              href="/products/rag"
            />
            
            <FeatureCard 
              icon={<Cpu className="h-6 w-6" />}
              title="Kiosk Mode"
              description="Transform any device into an AI-powered kiosk with offline capabilities and low latency responses."
              href="/products/kiosk"
            />
            
            <FeatureCard 
              icon={<Shield className="h-6 w-6" />}
              title="Privacy-First"
              description="Keep your data secure and private with on-device processing. No data leaves your environment."
              href="/products/privacy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Card className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e40af] text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-base text-gray-500">
        {description}
      </p>
      <div className="mt-4">
        <Link href={href} className="text-[#1e40af] hover:text-blue-800 font-medium flex items-center">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
} 