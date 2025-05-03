"use client";

import { ReactNode } from "react";
import { Cpu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ConsoleLayoutProps {
  children: ReactNode;
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  const pathname = usePathname();

  // Helper function to check if a path is active (including subpaths)
  const isActivePath = (path: string) => {
    if (path === '/console' && pathname === '/console') {
      return true;
    }
    return path !== '/console' && pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header with navigation */}
      <header className="border-b border-gray-800 bg-gray-950 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 mr-3 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Moorcheh</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/console" 
                className={`text-sm font-medium ${
                  isActivePath('/console') && pathname === '/console'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/console/playground" 
                className={`text-sm font-medium ${
                  isActivePath('/console/playground')
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                Playground
              </Link>
              <Link 
                href="/console/documents" 
                className={`text-sm font-medium ${
                  isActivePath('/console/documents')
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                Documents
              </Link>
              <Link 
                href="/console/api-keys" 
                className={`text-sm font-medium ${
                  isActivePath('/console/api-keys')
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                API Keys
              </Link>
              <Link 
                href="/console/docs" 
                className={`text-sm font-medium ${
                  isActivePath('/console/docs')
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'text-gray-400 hover:text-white transition-colors'
                }`}
              >
                Documentation
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 