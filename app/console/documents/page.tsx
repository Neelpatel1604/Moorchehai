import { ConsoleLayout } from "@/components/console/ConsoleLayout";

export default function DocumentsPage() {
  return (
    <ConsoleLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white font-saira mb-6">Documents</h1>
        <div className="bg-gray-800 border-gray-700 rounded-lg p-6">
          <p className="text-gray-400">Your uploaded documents will be displayed here.</p>
        </div>
      </div>
    </ConsoleLayout>
  );
} 