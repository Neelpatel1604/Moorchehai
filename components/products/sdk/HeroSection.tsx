import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Moorcheh <span className="text-[#1e40af]">Python SDK</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              PyPI Version
            </span>
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
              MIT License
            </span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Python Version
            </span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Downloads
            </span>
          </div>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-500">
            Python SDK for interacting with the Moorcheh Semantic Search API v1. Providing ultra-fast, highly accurate vector similarity search based on information-theoretic principles.
          </p>
          <div className="mt-8 flex justify-center space-x-3">
            <div className="inline-flex rounded-md shadow group">
              <Link href="https://github.com/mjfekri/moorcheh-python-sdk" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#1e40af] text-white hover:bg-blue-800 font-medium px-6 py-2 text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 group-hover:gap-3">
                  GitHub Repo
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="inline-flex rounded-md shadow group">
              <Link href="https://pypi.org/project/moorcheh-sdk/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#1e40af] text-[#1e40af] hover:bg-blue-50 font-medium px-6 py-2 text-sm transition-all duration-300 hover:scale-105 hover:border-blue-700">
                  PyPI Package
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
