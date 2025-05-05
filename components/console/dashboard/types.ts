
// Base types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface ModelUsage {
  model: string;
  requests: number;
  tokens: number;
  cost: string;
}

export interface HourlyData {
  hour: string;
  requests: number;
  latency: number;
}

export interface RequestDistribution {
  type: string;
  percentage: number;
  requests: number;
}

export interface WeeklyUsage {
  date: string;
  requests: number;
}

export interface CostAnalysis {
  date: string;
  compute: number;
  storage: number;
  api: number;
}

// Props interfaces
export interface QuickStatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}

export interface QuickAccessCardProps {
  title: string;
  description: string;
  Icon: React.ElementType;
  href: string;
}

export interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
}

// Chart configs
export type ChartConfig = {
  [key: string]: {
    label: string;
    color: string;
  };
};

// Component props
export interface OverviewTabProps {
  isLoading: boolean;
  hourlyData: HourlyData[];
  setActiveTab: (tab: string) => void;
  chatMessages?: ChatMessage[];
  chatInput?: string;
  isBotTyping?: boolean;
  setChatInput?: (input: string) => void;
  handleSendMessage?: () => void;
  handleClearChat?: () => void;
  messagesEndRef?: React.RefObject<HTMLDivElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export interface UsageTabProps {
  isLoading: boolean;
  weeklyUsageData: WeeklyUsage[];
  modelUsage: ModelUsage[];
  requestDistributionData: RequestDistribution[];
  costAnalysisData: CostAnalysis[];
}

export interface PerformanceTabProps {
  isLoading: boolean;
  hourlyData: HourlyData[];
  modelUsage: ModelUsage[];
}

// Data generator functions types
export type GenerateHourlyData = () => HourlyData[];
export type GenerateModelUsageData = () => ModelUsage[];
export type GenerateSampleChatData = () => ChatMessage[];