"use client";

import { useState, useEffect } from "react";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { RestrictedAccess } from "@/components/console/RestrictedAccess";

export default function SettingsPage() {
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const guestMode = localStorage.getItem("consoleGuestMode") === "true";
    const authenticated = localStorage.getItem("consoleAuthenticated") === "true";
    
    setIsGuestMode(guestMode && !authenticated);
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return (
      <ConsoleLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
        </div>
      </ConsoleLayout>
    );
  }

  return (
    <ConsoleLayout>
      {isGuestMode ? (
        <RestrictedAccess />
      ) : (
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white font-saira mb-6">Settings</h1>
          <div className="bg-gray-800 border-gray-700 rounded-lg p-6">
            <p className="text-gray-400">Your account and application settings will be displayed here.</p>
          </div>
        </div>
      )}
    </ConsoleLayout>
  );
} 