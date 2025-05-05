'use client';
import { Clock } from "lucide-react";
import { ActivityItemProps } from "./types";

export function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start pb-3 border-b border-gray-800/50 last:border-0 last:pb-0">
      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <div className="text-xs text-gray-500 flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {time}
      </div>
    </div>
  );
}