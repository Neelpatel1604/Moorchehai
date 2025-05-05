
'use client';
import { Card } from "@/components/ui/card";
import { QuickStatCardProps } from "./types";

export function QuickStatCard({ title, value, change, positive, icon: Icon }: QuickStatCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          <div className={`mt-1 flex items-center text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
            <span className="ml-2 text-gray-500 text-xs">vs. last week</span>
          </div>
        </div>
        <div className="p-2 rounded-md bg-gradient-to-br from-blue-600/20 to-purple-600/20">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
      </div>
    </Card>
  );
}