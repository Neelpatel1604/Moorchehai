"use client";

import { useState, useEffect } from "react";
import { APIKeys } from "@/components/console/APIKeys";
import { RestrictedAccess } from "@/components/console/RestrictedAccess";

export default function APIKeysPage() {
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
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
        </div>
    );
  }
  
  return isGuestMode ? <RestrictedAccess /> : <APIKeys />;
} 