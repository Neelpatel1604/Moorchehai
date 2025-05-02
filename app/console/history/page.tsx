import { ConsoleLayout } from "@/components/console/ConsoleLayout";

export default function HistoryPage() {
  return (
    <ConsoleLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white font-saira mb-6">Chat History</h1>
        <div className="bg-gray-800 border-gray-700 rounded-lg p-6">
          <p className="text-gray-400">Your chat history will be displayed here.</p>
        </div>
      </div>
    </ConsoleLayout>
  );
} 