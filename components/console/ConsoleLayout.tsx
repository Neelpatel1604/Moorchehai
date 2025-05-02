"use client";

import { ReactNode, useState, useEffect } from "react";
import { Home, Key, MessageSquare, Clock, FileText, Settings, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface ConsoleLayoutProps {
  children: ReactNode;
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  const pathname = usePathname();
  const [isGuestMode, setIsGuestMode] = useState(false);
  
  useEffect(() => {
    const guestMode = localStorage.getItem("consoleGuestMode") === "true";
    const authenticated = localStorage.getItem("consoleAuthenticated") === "true";
    
    setIsGuestMode(guestMode && !authenticated);
  }, []);
  
  const navItems = [
    { label: "Dashboard", href: "/console", icon: Home },
    { label: "API Keys", href: "/console/api-keys", icon: Key },
    { label: "Playground", href: "/console/playground", icon: MessageSquare },
    { label: "Chat History", href: "/console/history", icon: Clock },
    { label: "Documents", href: "/console/documents", icon: FileText },
    { label: "Settings", href: "/console/settings", icon: Settings },
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 text-white">
        <div className="mb-6">
          <h1 className="font-saira text-2xl font-bold text-white">Moorcheh Console</h1>
        </div>
        
        {isGuestMode && (
          <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-md text-yellow-500 text-sm flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>You're in guest mode with limited access</span>
          </div>
        )}
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-[#1e40af] text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 px-4">
            Model: <span className="font-medium text-white">Moorcheh-1</span>
          </p>
          <p className="text-xs text-gray-500 px-4 mt-1">
            Version 1.0
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 