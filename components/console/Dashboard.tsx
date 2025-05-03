'use client';
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Key,
  MessageSquare,
  Clock,
  ChevronRight,
  Book,
  User,
  Bot,
  Send,
  Trash2,
  Sparkles,
  BarChart
} from "lucide-react";

// Fix the Recharts imports
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Generate hourly data for the dashboard
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    requests: Math.floor(Math.random() * 200) + 10,
    latency: Math.floor(Math.random() * 100) + 50
  }));
};

// Generate model usage data
const generateModelUsageData = () => {
  const models = [
    'anthropic.claude-3-7-sonnet-20250219-v1:0',
    'meta.llama3-1-70b-instruct-v1:0',
    'amazon.nova-premier-v1:0',
    'deepseek.r1-v1:0',
    'mistral.pixtral-large-2502-v1:0'
  ];
  
  return models.map(model => ({
    model,
    requests: Math.floor(Math.random() * 1000) + 100,
    tokens: Math.floor(Math.random() * 100000) + 10000,
    cost: (Math.random() * 20 + 1).toFixed(2)
  }));
};

// Generate sample chat data
interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}

const generateSampleChatData = (): ChatMessage[] => {
  return [
    {
      id: '1',
      sender: 'user',
      content: 'Can you analyze my recent API usage?',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      sender: 'bot',
      content: 'Sure! Your API usage shows 23,456 requests this week. Want a detailed breakdown?',
      timestamp: '10:32 AM',
    },
    {
      id: '3',
      sender: 'user',
      content: 'Yes, please show me the model usage.',
      timestamp: '10:35 AM',
    },
    {
      id: '4',
      sender: 'bot',
      content: 'Check the Usage tab for a detailed model usage table, including requests and costs.',
      timestamp: '10:36 AM',
    },
  ];
};

// Sample data for Request Distribution
const requestDistributionData = [
  { type: "Chat", percentage: 40, requests: 9344 },
  { type: "Search", percentage: 30, requests: 7008 },
  { type: "Document", percentage: 20, requests: 4672 },
  { type: "Other", percentage: 10, requests: 2336 }
];

// Sample data for Weekly Usage Trends
const weeklyUsageData = [
  { date: "2025-04-27", requests: 2800 },
  { date: "2025-04-28", requests: 3200 },
  { date: "2025-04-29", requests: 3000 },
  { date: "2025-04-30", requests: 3500 },
  { date: "2025-05-01", requests: 3800 },
  { date: "2025-05-02", requests: 3600 },
  { date: "2025-05-03", requests: 4000 }
];

// Sample data for Cost Analysis
const costAnalysisData = [
  { date: "Week 1", compute: 25.50, storage: 10.20, api: 15.30 },
  { date: "Week 2", compute: 30.75, storage: 12.10, api: 18.45 },
  { date: "Week 3", compute: 28.20, storage: 11.50, api: 16.80 },
  { date: "Week 4", compute: 35.10, storage: 13.75, api: 20.25 }
];

// Chart configs for Recharts
const weeklyChartConfig = {
  requests: {
    label: "Requests",
    color: "hsl(var(--primary))"
  }
} satisfies ChartConfig;

const pieChartConfig = {
  chat: {
    label: "Chat",
    color: "#3b82f6"
  },
  search: {
    label: "Search",
    color: "#a855f7"
  },
  document: {
    label: "Document",
    color: "#10b981"
  },
  other: {
    label: "Other",
    color: "#f59e0b"
  }
} satisfies ChartConfig;

const costChartConfig = {
  compute: {
    label: "Compute",
    color: "#3b82f6"
  },
  storage: {
    label: "Storage",
    color: "#a855f7"
  },
  api: {
    label: "API",
    color: "#10b981"
  }
} satisfies ChartConfig;

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hourlyData] = useState(() => generateHourlyData());
  const [modelUsage] = useState(() => generateModelUsageData());
  const [isLoading, setIsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    // Create default messages first
    const defaultMessages = generateSampleChatData();
    
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      return savedMessages ? JSON.parse(savedMessages) : defaultMessages;
    }
    
    return defaultMessages;
  });
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Persist chat messages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Focus input on mount for accessibility
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Generate dynamic bot response based on user input
  const generateBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes('usage')) {
      return 'Your API usage details are in the Usage tab, showing 23,456 requests and model-specific stats. Want me to summarize the top models?';
    } else if (lowercaseMessage.includes('performance')) {
      return 'The Performance tab shows 99.9% uptime and 245ms average latency. Would you like a breakdown of model response times?';
    } else if (lowercaseMessage.includes('api key')) {
      return 'You have 3 active API keys. Manage them in the API Keys section via Quick Actions. Need help generating a new key?';
    } else {
      return 'Thanks for your message! For detailed analytics, check the Usage or Performance tabs, or ask about specific metrics like "usage" or "performance".';
    }
  };

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!chatInput.trim() || isBotTyping) return;

    const newMessage: ChatMessage = {
      id: `${chatMessages.length + 1}`,
      sender: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');
    setIsBotTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `${chatMessages.length + 2}`,
        sender: 'bot',
        content: generateBotResponse(newMessage.content),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1000);
  };

  // Clear chat history
  const handleClearChat = () => {
    setChatMessages(generateSampleChatData());
    localStorage.setItem('chatMessages', JSON.stringify(generateSampleChatData()));
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
                      {chatMessages.map((message) => (
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
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask about your dashboard..."
                        className="flex-1 bg-gray-800 border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
            </TabsContent>
            
            {/* Usage Tab Content */}
            <TabsContent value="usage" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Weekly Usage Trends</h3>
                <div className="h-72 bg-gray-800 rounded-md p-4">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <ChartContainer
                      config={weeklyChartConfig}
                      className="h-full w-full"
                    >
                      <AreaChart
                        data={weeklyUsageData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#9ca3af"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => {
                            return value.slice(5);
                          }}
                        />
                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              nameKey="requests"
                              labelFormatter={(value) => `Date: ${value}`}
                            />
                          }
                        />
                        <Area 
                          type="monotone" 
                          dataKey="requests" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorRequests)" 
                        />
                      </AreaChart>
                    </ChartContainer>
                  )}
                </div>
              </Card>
              
            <Card className="bg-gray-900 border-gray-800 p-6">
                <h3 className="text-lg font-medium text-white mb-6">Model Usage</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-800">
                        <th className="pb-3 text-sm font-medium text-gray-400">Model</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Requests</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Tokens</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Cost (USD)</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelUsage.map((item, index) => (
                        <tr key={index} className="border-b border-gray-800/50">
                          <td className="py-3 text-white">{item.model}</td>
                          <td className="py-3 text-gray-300">{item.requests.toLocaleString()}</td>
                          <td className="py-3 text-gray-300">{item.tokens.toLocaleString()}</td>
                          <td className="py-3 text-gray-300">${item.cost}</td>
                          <td className="py-3">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-gray-400 hover:text-white hover:bg-gray-800"
                            >
                              <BarChart className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Request Distribution</h3>
                  <div className="h-56 bg-gray-800 rounded-md p-4 flex items-center justify-center" role="figure" aria-label="Request Distribution Pie Chart">
                    <ChartContainer
                      config={pieChartConfig}
                      className="h-48 w-48"
                    >
                      <RechartsPieChart>
                        <Pie
                          data={requestDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="requests"
                          nameKey="type"
                          label={({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                            const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                            const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                            return (
                              <text x={x} y={y} fill="#e5e7eb" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                {`${(percent * 100).toFixed(0)}%`}
                              </text>
                            );
                          }}
                        >
                          {requestDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={
                              index === 0 ? "#3b82f6" : 
                              index === 1 ? "#a855f7" : 
                              index === 2 ? "#10b981" : "#f59e0b"
                            } />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          content={({active, payload}) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                                  <p className="font-medium text-white">{data.type}</p>
                                  <p className="text-gray-400">{`${data.percentage}% (${data.requests} requests)`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RechartsPieChart>
                    </ChartContainer>
                  </div>
                  <div className="flex justify-center mt-4 gap-4 text-xs text-gray-400">
                    {requestDistributionData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-1 ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-purple-500' : 
                          index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span>{item.type} ({item.percentage}%)</span>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Cost Analysis</h3>
                  <div className="h-56 bg-gray-800 rounded-md p-4 flex flex-col" role="figure" aria-label="Cost Analysis Stacked Bar Chart">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-white">$128.45</span>
                      <span className="text-sm text-gray-400 ml-2">this month</span>
                    </div>
                    <ChartContainer
                      config={costChartConfig}
                      className="flex-1 h-full w-full"
                    >
                      <RechartsBarChart
                        data={costAnalysisData}
                        margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#9ca3af"
                          tickLine={false}
                          axisLine={false}
                        />
                        <Bar dataKey="compute" stackId="a" fill="#3b82f6" />
                        <Bar dataKey="storage" stackId="a" fill="#a855f7" />
                        <Bar dataKey="api" stackId="a" fill="#10b981" />
                        <RechartsTooltip 
                          content={({active, payload, label}) => {
                            if (active && payload && payload.length) {
                              const total = payload.reduce((sum, entry) => sum + (Number(entry.value) || 0), 0);
                              return (
                                <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                                  <p className="font-medium text-white">{label}</p>
                                  {payload.map((entry, index) => (
                                    <p key={index} className="text-gray-400">
                                      {entry.name}: ${Number(entry.value).toFixed(2) || '0.00'}
                                    </p>
                                  ))}
                                  <p className="text-white mt-1 border-t border-gray-700 pt-1">
                                    Total: ${total.toFixed(2)}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RechartsBarChart>
                    </ChartContainer>
                    <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                        <span>Compute</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                        <span>Storage</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        <span>API</span>
                      </div>
                </div>
              </div>
            </Card>
          </div>
            </TabsContent>
            
            {/* Performance Tab Content */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 mb-3">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="10" 
                          strokeDasharray="283" 
                          strokeDashoffset="1"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">99.9%</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white">API Uptime</h3>
                    <p className="text-sm text-gray-400">Last 30 days</p>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 mb-3">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="10" 
                          strokeDasharray="283" 
                          strokeDashoffset="175"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">245</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white">Avg. Latency (ms)</h3>
                    <p className="text-sm text-gray-400">Last 24 hours</p>
                  </div>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 mb-3">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="10" 
                          strokeDasharray="283" 
                          strokeDashoffset="4"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">98.7%</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white">Success Rate</h3>
                    <p className="text-sm text-gray-400">API requests</p>
                  </div>
                </Card>
              </div>
              
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Performance Metrics</h3>
                <div className="h-72 bg-gray-800 rounded-md p-4">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <ChartContainer
                      config={{
                        latency: { label: "Latency", color: "#3b82f6" },
                        requests: { label: "Requests", color: "#a855f7" }
                      }}
                      className="h-full w-full"
                    >
                      <RechartsLineChart
                        data={hourlyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                        <XAxis 
                          dataKey="hour" 
                          stroke="#9ca3af"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          content={({active, payload, label}) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                                  <p className="font-medium text-white">Time: {label}</p>
                                  <p className="text-gray-400">
                                    Latency: {payload[0].value}ms
                                  </p>
                                  <p className="text-gray-400">
                                    Requests: {payload[1].value}
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="latency" 
                          stroke="#3b82f6" 
                          dot={false}
                          strokeWidth={2} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="requests" 
                          stroke="#a855f7" 
                          dot={false} 
                          strokeWidth={2}
                        />
                      </RechartsLineChart>
                    </ChartContainer>
                  )}
                  <div className="flex justify-between text-sm mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-400">Latency</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-gray-400">Request Volume</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Time Range:</span>
                      <select className="ml-2 bg-gray-700 border-none rounded text-white text-sm px-2 py-1">
                        <option>24 hours</option>
                        <option>7 days</option>
                        <option>30 days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h3 className="text-lg font-medium text-white mb-4">Model Response Times</h3>
                <div className="space-y-4">
                  {modelUsage.map((model, index) => {
                    const randomLatency = Math.floor(Math.random() * 400) + 100;
                    const percentage = (randomLatency / 1000) * 100;
                    const colorClass = randomLatency < 200 
                      ? 'from-green-500 to-green-400' 
                      : randomLatency < 500 ? 'from-yellow-500 to-yellow-400' : 'from-red-500 to-red-400';
                      
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-300">{model.model}</span>
                          <span className="text-sm font-medium text-white">{randomLatency}ms</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${colorClass} group relative`}
                            style={{ width: `${percentage}%` }}
                          >
                            <div className="absolute invisible group-hover:visible right-0 top-0 transform translate-y-[-24px] translate-x-[8px] bg-gray-900 text-xs text-white rounded px-1.5 py-0.5">
                              {randomLatency}ms
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

interface QuickStatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

function QuickStatCard({ title, value, change, positive, icon: Icon }: QuickStatCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          <div className={`mt-1 flex items-center text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
            <span className="ml-2 text-gray-500 text-xs">vs. last week</span>
          </div>
        </div>
        <div className="p-2 rounded-md bg-gradient-to-br from-blue-600/20 to-purple-600/20">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
      </div>
    </Card>
  );
}

interface QuickAccessCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  href: string;
}

function QuickAccessCard({ title, description, Icon, href }: QuickAccessCardProps) {
  return (
    <a 
      href={href}
      className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
    >
      <div className="mr-3 p-2 rounded-md bg-gradient-to-br from-blue-600/20 to-purple-600/20">
        <Icon className="h-5 w-5 text-blue-400" />
        </div>
        <div className="flex-1">
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
    </a>
  );
}

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

function ActivityItem({ title, description, time }: ActivityItemProps) {
  return (
    <div className="flex items-start pb-3 border-b border-gray-800/50 last:border-0 last:pb-0">
      <div className="mr-3 mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
        </div>
      <div className="text-xs text-gray-500 flex items-center">
        <Clock className="h-3 w-3 mr-1" />
        {time}
      </div>
    </div>
  );
}
