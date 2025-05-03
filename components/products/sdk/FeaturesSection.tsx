import { Card } from "@/components/ui/card";
import { Database, Search, Trash2, Code, AlertTriangle, Grid3X3 } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Namespace Management",
      description: "Create, list, and delete text or vector namespaces with ease.",
      icon: <Database className="h-6 w-6" />,
    },
    {
      title: "Data Ingestion",
      description: "Upload text documents (with automatic embedding) or pre-computed vectors.",
      icon: <Grid3X3 className="h-6 w-6" />,
    },
    {
      title: "Semantic Search",
      description: "Perform fast and accurate similarity searches using text or vector queries.",
      icon: <Search className="h-6 w-6" />,
    },
    {
      title: "Data Deletion",
      description: "Remove specific documents or vectors from your namespaces by ID.",
      icon: <Trash2 className="h-6 w-6" />,
    },
    {
      title: "Pythonic Interface",
      description: "Object-oriented client with clear methods and type hinting.",
      icon: <Code className="h-6 w-6" />,
    },
    {
      title: "Error Handling",
      description: "Custom exceptions for specific API errors (Authentication, Not Found, etc.).",
      icon: <AlertTriangle className="h-6 w-6" />,
    },
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for semantic search
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Moorcheh SDK simplifies working with vector similarity search and analysis
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e40af] text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
