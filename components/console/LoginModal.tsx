"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface LoginModalProps {
  isOpen: boolean;
  onLogin: () => void;
  onSkip: () => void;
}

export function LoginModal({ isOpen, onLogin, onSkip }: LoginModalProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <Card className="bg-gray-800 border-gray-700 p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-white">Welcome to Moorcheh Console</h2>
        <p className="text-gray-300 mb-6">
          Sign in to access your developer console, API keys, and Edge AI tools.
        </p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              className="mt-1 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="mt-1 bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
        
        <div className="mt-8 flex flex-col space-y-3">
          <Button 
            className="bg-[#1e40af] hover:bg-blue-800 text-white"
            onClick={onLogin}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={onSkip}
          >
            Continue as Guest (Limited Access)
          </Button>
        </div>
      </Card>
    </div>
  );
} 