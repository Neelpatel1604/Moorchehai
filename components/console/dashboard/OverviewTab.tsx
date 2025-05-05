'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  Key,
  MessageSquare,
  Clock,
  Book,
  User,
  Bot,
  Send,
  Trash2,
  Sparkles
} from "lucide-react";
import { QuickStatCard } from "./QuickStatCard";
import { QuickAccessCard } from "./QuickAccessCard";
import { ActivityItem } from "./ActivityItem";
import { OverviewTabProps } from "./types";

export function OverviewTab({
  isLoading,
  hourlyData,
  chatMessages,
  chatInput,
  isBotTyping,
  setChatInput,
  handleSendMessage,
  handleClearChat,
  messagesEndRef,
  inputRef,
  setActiveTab
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStatCard 
          title="Total Requests" 
          value="23,456" 
          change="+12%" 
          positive={true}
          icon={Activity}
        />
        <QuickStatCard 
          title="Average Latency" 
          value="245ms" 
          change="-18%" 
          positive={true}
          icon={Clock}
        />
        <QuickStatCard 
          title="Active API Keys" 
          value="3" 
          change="0%" 
          positive={true}
          icon={Key}
        />
        <QuickStatCard 
          title="Chat Sessions" 
          value="158" 
          change="+24%" 
          positive={true}
          icon={MessageSquare}
        />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage chart */}
        <Card className="bg-gray-900 border-gray-800 p-6 col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-white">Request Volume</h3>
              <p className="text-sm text-gray-400">Hourly requests over the past 24 hours</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-800 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white"
              onClick={() => setActiveTab("usage")}
            >
              View Details
            </Button>
          </div>
          
          {isLoading ? (
            <div className="bg-gray-800 rounded-md h-64 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-md h-64 p-4">
              <div className="h-full flex flex-col">
                {/* Axis labels */}
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">Requests</span>
                  <span className="text-xs text-gray-500">200</span>
                </div>
                
                {/* Chart grid */}
                <div className="relative flex-1">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="border-t border-gray-700 w-full" />
                    ))}
                  </div>
                  
                  {/* Bars */}
                  <div className="h-full flex items-end justify-between gap-1 relative z-10">
                    {hourlyData.slice(0, 24).map((hour, index) => (
                      <div key={index} className="flex flex-col items-center flex-1 group">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm relative"
                          style={{ height: `${(hour.requests / 200) * 100}%` }}
                        >
                          {/* Tooltip on hover */}
                          <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity">
                            {hour.requests} requests
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">
                          {index % 3 === 0 ? hour.hour : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        {/* Quick actions */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <QuickAccessCard 
              title="API Keys" 
              description="Create and manage your API keys" 
              Icon={Key} 
              href="/console/api-keys" 
            />
            <QuickAccessCard 
              title="Playground" 
              description="Test and experiment with Moorcheh AI" 
              Icon={Sparkles} 
              href="/console/playground" 
            />
            <QuickAccessCard 
              title="Documents" 
              description="Upload and manage your documents" 
              Icon={Book} 
              href="/console/documents" 
            />
            <QuickAccessCard 
              title="Documentation" 
              description="Read guides and API reference" 
              Icon={Book} 
              href="/console/docs" 
            />
          </div>
        </Card>
        
        {/* Recent activity */}
        <Card className="bg-gray-900 border-gray-800 p-6 col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-gray-900"
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            <ActivityItem
              title="API Key Created"
              description="New key generated for Production environment"
              time="10 minutes ago"
            />
            <ActivityItem
              title="Model Invocation"
              description="anthropic.claude-3-7-sonnet-20250219-v1:0 - 42 requests"
              time="25 minutes ago"
            />
            <ActivityItem
              title="Document Uploaded"
              description="customer-feedback.csv (2.4 MB)"
              time="1 hour ago"
            />
            <ActivityItem
              title="Config Updated"
              description="Modified system prompt for edge deployment"
              time="3 hours ago"
            />
          </div>
        </Card>
        
        {/* Chat section */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={handleClearChat}
              aria-label="Clear chat history"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[300px] flex flex-col" role="region" aria-label="Chat interface">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2" role="log" aria-live="polite">
              {chatMessages?.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                      <Bot className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 group relative ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                    role="article"
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block group-hover:opacity-0 transition-opacity">
                      {message.timestamp}
                    </span>
                    {/* Timestamp tooltip */}
                    <div className="absolute opacity-0 group-hover:opacity-100 top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity z-10">
                      {message.timestamp}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                      <User className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}
              {isBotTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                    <Bot className="h-5 w-5 text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-1" aria-label="Bot is typing">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="mt-4 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={chatInput || ''}
                onChange={(e) => setChatInput?.(e.target.value)}
                placeholder="Ask about your dashboard..."
                className="flex-1 bg-gray-800 border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage?.()}
                aria-label="Type your message"
                disabled={isBotTyping}
              />
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleSendMessage}
                disabled={isBotTyping}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}