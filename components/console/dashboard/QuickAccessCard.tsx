'use client';
import { ChevronRight } from "lucide-react";
import { QuickAccessCardProps } from "./types";

export function QuickAccessCard({ title, description, Icon, href }: QuickAccessCardProps) {
  return (
    <a 
      href={href}
      className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
    >
      <div className="mr-3 p-2 rounded-md bg-gradient-to-br from-blue-600/20 to-purple-600/20">
        <Icon className="h-5 w-5 text-blue-400" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
    </a>
  );
}