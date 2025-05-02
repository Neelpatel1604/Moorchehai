"use client";

import { useEffect, useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoginModal } from "./LoginModal";

export function RestrictedAccess() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const handleLogin = () => {
    // In a real app, you would validate credentials here
    localStorage.setItem("consoleAuthenticated", "true");
    localStorage.removeItem("consoleGuestMode");
    window.location.reload();
  };
  
  const handleSkip = () => {
    setShowLoginModal(false);
  };
  
  return (
    <div className="p-8">
      <Card className="bg-gray-800 border-gray-700 p-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center mb-6">
            <Lock className="h-10 w-10 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-white font-saira mb-4">Restricted Access</h1>
          <p className="text-gray-300 mb-6 max-w-md">
            This feature is only available to authenticated users. Please sign in to access all Moorcheh Console features.
          </p>
          
          <Button 
            onClick={() => setShowLoginModal(true)}
            className="bg-[#1e40af] hover:bg-blue-800 text-white"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In Now
          </Button>
        </div>
      </Card>
      
      <LoginModal
        isOpen={showLoginModal}
        onLogin={handleLogin}
        onSkip={handleSkip}
      />
    </div>
  );
} 