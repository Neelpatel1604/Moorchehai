"use client";

import { useState, useEffect, ReactNode } from "react";
import { LoginModal } from "./LoginModal";
import { useRouter } from "next/navigation";

interface ConsoleAuthWrapperProps {
  children: ReactNode;
}

export function ConsoleAuthWrapper({ children }: ConsoleAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated (using localStorage in this example)
    const authStatus = localStorage.getItem("consoleAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setShowLoginModal(true);
    }
  }, []);

  const handleLogin = () => {
    // In a real app, you would validate credentials here
    localStorage.setItem("consoleAuthenticated", "true");
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleSkip = () => {
    // Allow limited access
    localStorage.setItem("consoleGuestMode", "true");
    setShowLoginModal(false);
  };

  // Show nothing while checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onLogin={handleLogin}
        onSkip={handleSkip}
      />
      {children}
    </>
  );
} 