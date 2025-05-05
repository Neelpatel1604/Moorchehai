"use client";
import { Suspense } from "react";
import { Dashboard } from "@/components/console/dashboard/index";

export default function ConsolePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    }>
      <Dashboard />
    </Suspense>
  );
} 