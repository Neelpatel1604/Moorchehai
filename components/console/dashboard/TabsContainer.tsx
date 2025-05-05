'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from './OverviewTab';
import { UsageTab } from './UsageTab';
import { PerformanceTab } from './Performance';
import { 
  HourlyData, 
  ModelUsage, 
  WeeklyUsage, 
  RequestDistribution, 
  CostAnalysis, 
  ChatMessage 
} from './types';  // Adjust the path if needed, based on your file structure

interface TabsContainerProps {
  initialTab?: string;
  isLoading: boolean;
  hourlyData: HourlyData[];
  modelUsage: ModelUsage[];
  weeklyUsageData: WeeklyUsage[];
  requestDistributionData: RequestDistribution[];
  costAnalysisData: CostAnalysis[];
  chatMessages: ChatMessage[];
  chatInput: string;
  isBotTyping: boolean;
  setChatInput: (input: string) => void;
  handleSendMessage: () => void;
  handleClearChat: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function TabsContainer({ 
  initialTab = "overview", 
  isLoading,
  hourlyData,
  modelUsage,
  weeklyUsageData,
  requestDistributionData,
  costAnalysisData,
  chatMessages,
  chatInput,
  isBotTyping,
  setChatInput,
  handleSendMessage,
  handleClearChat,
  messagesEndRef,
  inputRef
}: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="bg-gray-900 border border-gray-800">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="usage" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
        >
          Usage
        </TabsTrigger>
        <TabsTrigger 
          value="performance" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
        >
          Performance
        </TabsTrigger>
      </TabsList>
      
      {/* Overview Tab Content */}
      <TabsContent value="overview" className="space-y-8">
        <OverviewTab 
          isLoading={isLoading} 
          hourlyData={hourlyData} 
          setActiveTab={setActiveTab}
          chatMessages={chatMessages}
          chatInput={chatInput}
          isBotTyping={isBotTyping}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          handleClearChat={handleClearChat}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
        />
      </TabsContent>
      
      {/* Usage Tab Content */}
      <TabsContent value="usage" className="space-y-6">
        <UsageTab 
          isLoading={isLoading} 
          modelUsage={modelUsage}
          weeklyUsageData={weeklyUsageData}
          requestDistributionData={requestDistributionData}
          costAnalysisData={costAnalysisData}
        />
      </TabsContent>
      
      {/* Performance Tab Content */}
      <TabsContent value="performance" className="space-y-6">
        <PerformanceTab 
          isLoading={isLoading} 
          hourlyData={hourlyData} 
          modelUsage={modelUsage} 
        />
      </TabsContent>
    </Tabs>
  );
}