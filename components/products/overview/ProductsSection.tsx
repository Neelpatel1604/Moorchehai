import Link from "next/link";
import { ArrowRight, Cpu, Code, Server } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ProductsSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Our Offerings</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Edge AI for Every Need
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            From development tools to ready-to-deploy solutions, Moorcheh offers a comprehensive suite of edge AI products.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard 
            icon={<Cpu className="h-6 w-6" />}
            title="Moorcheh Chat Bot"
            description="Deploy AI assistants that run entirely on-device, perfect for customer service kiosks and offline applications."
            href="/products/chatbot"
          />
          
          <ProductCard 
            icon={<Code className="h-6 w-6" />}
            title="Moorcheh SDK"
            description="Developer tools for embedding edge AI capabilities into your applications with just a few lines of code."
            href="/products/sdk"
          />
          
          <ProductCard 
            icon={<Server className="h-6 w-6" />}
            title="Moorcheh on Edge"
            description="Complete edge AI infrastructure for businesses who need to deploy at scale across multiple devices and locations."
            href="/products/edge"
          />
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

function ProductCard({ icon, title, description, href }: ProductCardProps) {
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