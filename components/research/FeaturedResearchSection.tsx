import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FeaturedResearchSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Featured Research</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Latest Breakthroughs
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our team is constantly working on advancing the field of edge AI with novel algorithms and techniques.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ResearchCard
            title="EdgeRAG"
            subtitle="Serverless RAG on Edge Devices"
            description="A novel approach to running Retrieval-Augmented Generation on resource-constrained edge devices without cloud dependency."
            author="Dr. Sarah Chen"
            date="Published Oct 2023"
            initials="SC"
            href="/research/edge-rag"
          />
          
          <ResearchCard
            title="TinyLLM"
            subtitle="Efficient LLMs for Edge Devices"
            description="A compression framework that reduces LLM size by 95% while maintaining 90% of performance on common tasks."
            author="Dr. Michael Patel"
            date="Published Jan 2024"
            initials="MP"
            href="/research/tiny-llm"
          />
          
          <ResearchCard
            title="EdgeSync"
            subtitle="Distributed Learning at the Edge"
            description="A novel federated learning approach that enables edge devices to collaboratively learn without sharing raw data."
            author="Emma Rodriguez"
            date="Published Mar 2024"
            initials="ER"
            href="/research/edge-sync"
          />
        </div>
      </div>
    </div>
  );
}

interface ResearchCardProps {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  date: string;
  initials: string;
  href: string;
}

function ResearchCard({ title, subtitle, description, author, date, initials, href }: ResearchCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden border border-gray-200 rounded-lg">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <div className="text-4xl font-bold text-[#1e40af]">{title}</div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900">{subtitle}</h3>
        <p className="mt-3 text-base text-gray-500 flex-grow">
          {description}
        </p>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-[#1e40af] text-white flex items-center justify-center">{initials}</div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="border-[#1e40af] text-[#1e40af]">
            <Download className="h-4 w-4 mr-2" /> PDF
          </Button>
          <Link href={href} className="text-[#1e40af] hover:text-blue-800 font-medium flex items-center">
            Read more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
} 