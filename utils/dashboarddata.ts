import { 
    HourlyData, 
    ModelUsage, 
    ChatMessage, 
    RequestDistribution, 
    WeeklyUsage, 
    CostAnalysis, 
    ChartConfig 
  } from "@/components/console/dashboard/types";
  
  // Generate hourly data for the dashboard
  export const generateHourlyData = (): HourlyData[] => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      requests: Math.floor(Math.random() * 200) + 10,
      latency: Math.floor(Math.random() * 100) + 50
    }));
  };
  
  // Generate model usage data
  export const generateModelUsageData = (): ModelUsage[] => {
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
  export const generateSampleChatData = (): ChatMessage[] => {
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
  
  // Generate bot response based on user input
  export const generateBotResponse = (userMessage: string): string => {
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
  
  // Sample data for Request Distribution
  export const requestDistributionData: RequestDistribution[] = [
    { type: "Chat", percentage: 40, requests: 9344 },
    { type: "Search", percentage: 30, requests: 7008 },
    { type: "Document", percentage: 20, requests: 4672 },
    { type: "Other", percentage: 10, requests: 2336 }
  ];
  
  // Sample data for Weekly Usage Trends
  export const weeklyUsageData: WeeklyUsage[] = [
    { date: "2025-04-27", requests: 2800 },
    { date: "2025-04-28", requests: 3200 },
    { date: "2025-04-29", requests: 3000 },
    { date: "2025-04-30", requests: 3500 },
    { date: "2025-05-01", requests: 3800 },
    { date: "2025-05-02", requests: 3600 },
    { date: "2025-05-03", requests: 4000 }
  ];
  
  // Sample data for Cost Analysis
  export const costAnalysisData: CostAnalysis[] = [
    { date: "Week 1", compute: 25.50, storage: 10.20, api: 15.30 },
    { date: "Week 2", compute: 30.75, storage: 12.10, api: 18.45 },
    { date: "Week 3", compute: 28.20, storage: 11.50, api: 16.80 },
    { date: "Week 4", compute: 35.10, storage: 13.75, api: 20.25 }
  ];
  
  // Chart configs for Recharts
  export const weeklyChartConfig: ChartConfig = {
    requests: {
      label: "Requests",
      color: "hsl(var(--primary))"
    }
  };
  
  export const pieChartConfig: ChartConfig = {
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
  };
  
  export const costChartConfig: ChartConfig = {
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
  };