'use client';
import { useState, useEffect, useRef } from "react";
import { TabsContainer } from './TabsContainer';
import { 
  generateHourlyData, 
  generateModelUsageData, 
  generateSampleChatData, 
  weeklyUsageData, 
  requestDistributionData, 
  costAnalysisData 
} from '@/utils/dashboarddata';

export function Dashboard() {
  const activeTab = "overview";
  const [hourlyData] = useState(() => generateHourlyData());
  const [modelUsage] = useState(() => generateModelUsageData());
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages] = useState(() => generateSampleChatData());
  const [chatInput, setChatInput] = useState("");
  const isBotTyping = false;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    // Chat functionality implementation
  };

  const handleClearChat = () => {
    // Chat clear functionality
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Main content */}
      <main className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">Monitor your Edge AI usage and performance metrics</p>
          </div>
          
          {/* Tabs */}
          <TabsContainer
            initialTab={activeTab}
            isLoading={isLoading}
            hourlyData={hourlyData}
            modelUsage={modelUsage}
            weeklyUsageData={weeklyUsageData}
            requestDistributionData={requestDistributionData}
            costAnalysisData={costAnalysisData}
            chatMessages={chatMessages}
            chatInput={chatInput}
            isBotTyping={isBotTyping}
            setChatInput={setChatInput}
            handleSendMessage={handleSendMessage}
            handleClearChat={handleClearChat}
            messagesEndRef={messagesEndRef}
            inputRef={inputRef}
          />
        </div>
      </main>
    </div>
  );
}