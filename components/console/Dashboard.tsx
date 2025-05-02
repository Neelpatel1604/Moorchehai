import { Card } from "@/components/ui/card";
import { 
  MessageSquare, 
  Key, 
  FileText, 
  BarChart, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white font-saira">Dashboard</h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="API Usage" 
          value="2,456" 
          label="requests this month" 
          icon={BarChart} 
          href="/console/usage" 
        />
        
        <StatCard 
          title="API Keys" 
          value="3" 
          label="active keys" 
          icon={Key} 
          href="/console/api-keys" 
        />
        
        <StatCard 
          title="Chat Sessions" 
          value="158" 
          label="total chats" 
          icon={MessageSquare} 
          href="/console/history" 
        />
        
        <StatCard 
          title="Documents" 
          value="12" 
          label="uploaded files" 
          icon={FileText} 
          href="/console/documents" 
        />
        
        <StatCard 
          title="Average Response" 
          value="1.2s" 
          label="response time" 
          icon={Clock} 
          href="/console/metrics" 
        />
      </div>
      
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4 font-saira">Getting Started</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-3">Create your first API key</h3>
            <p className="text-gray-300 mb-4">
              Generate an API key to start integrating Moorcheh's edge AI capabilities into your applications.
            </p>
            <a 
              href="/console/api-keys" 
              className="text-[#1e40af] hover:text-blue-500 font-medium flex items-center"
            >
              Create API Key <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-3">Try the playground</h3>
            <p className="text-gray-300 mb-4">
              Experiment with our models in real-time using the interactive playground.
            </p>
            <a 
              href="/console/playground" 
              className="text-[#1e40af] hover:text-blue-500 font-medium flex items-center"
            >
              Open Playground <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

function StatCard({ title, value, label, icon: Icon, href }: StatCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
        </div>
        <div className="p-2 bg-gray-700 rounded-md">
          <Icon className="h-5 w-5 text-[#1e40af]" />
        </div>
      </div>
    </Card>
  );
} 