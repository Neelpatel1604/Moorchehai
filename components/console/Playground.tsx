'use client';
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  AlertCircle,
  Cpu,
  Copy,
  Download,
  Info,
  MessageSquare,
  RotateCcw,
  Save,
  Send,
  Settings,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Timer,
  Trash2,
  ChevronDown,
  Sparkles,
  Zap,
  CheckCircle2,
  Command as CommandIcon,
  Clock,
  ChevronRight,
  Bookmark,
  TerminalSquare,
  Archive,
  Plus,
  MoreHorizontal,
  PanelLeft,
  PanelLeftClose,
  Mic,
  FileText,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Type definitions for better code organization
type Role = "system" | "user" | "assistant";
type Metadata = {
  id: string;
  score: number;
  label: string;
  source: string;
  page: number;
  content: string;
}

interface Message {
  role: Role;
  content: string;
  metadata?: Metadata[];
}

interface Conversation {
  id: string;
  name: string;
  date: string;
  preview: string;
  messages: Message[];
}

export function Playground() {
  // System prompts configuration
  const defaultSystemPrompt = "You are Moorcheh AI, an edge-optimized assistant. You're designed to run efficiently on edge devices with low latency and high privacy. Be concise and helpful in your responses.";
  const defaultContextFooter = "If you don't find information about this in the provided context, please let me know.";
  const defaultNoContextFooter = "I don't have information about this in my context. Please upload relevant documents to help me answer your question.";
  const defaultPromptHeader = "Answer the following question based only on the provided context: ";

  // State management
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "system", 
      content: defaultSystemPrompt
    },
    { 
      role: "assistant", 
      content: "Hello! I'm Moorcheh AI, ready to assist you. How can I help you today?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState("new");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const [dislikedMessages, setDislikedMessages] = useState<Set<number>>(new Set());
  
  // Model parameters
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [contextFooter, setContextFooter] = useState(defaultContextFooter);
  const [noContextFooter, setNoContextFooter] = useState(defaultNoContextFooter);
  const [promptHeader, setPromptHeader] = useState(defaultPromptHeader);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("anthropic.claude-3-7-sonnet-20250219-v1:0");
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [kioskMode, setKioskMode] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [edgeOptimization, setEdgeOptimization] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample document metadata for simulation
  const sampleMetadata = [
    {
      id: "doc1", 
      score: 0.9456, 
      label: "High Relevance", 
      source: "edge_computing.pdf", 
      page: 4, 
      content: "Edge computing is a distributed computing paradigm that brings computation and data storage closer to the location where it is needed..."
    },
    {
      id: "doc2", 
      score: 0.7821, 
      label: "Medium Relevance", 
      source: "ai_models.docx", 
      page: 12, 
      content: "Optimizing AI models for edge devices requires careful consideration of model size, latency requirements, and hardware constraints..."
    },
    {
      id: "doc3", 
      score: 0.4732, 
      label: "Low Relevance", 
      source: "data_privacy.pdf", 
      page: 7, 
      content: "Edge deployment of AI models can significantly enhance privacy by processing sensitive data locally without transmitting it to cloud servers..."
    },
    {
      id: "doc4", 
      score: 0.1245, 
      label: "Very Low Relevance", 
      source: "deployment_guide.txt", 
      page: 2, 
      content: "The deployment process involves configuring the runtime environment, optimizing model parameters, and setting up monitoring tools..."
    }
  ];
  
  // Load conversations from local storage
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("moorcheh-conversations");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved conversations:", e);
        }
      }
    }
    return [
      { id: "1", name: "Edge AI Implementation", date: "2024-05-01", preview: "How do I implement edge AI in my application?", messages: [] },
      { id: "2", name: "Server Configuration", date: "2024-04-28", preview: "What's the best server setup for Moorcheh AI?", messages: [] },
      { id: "3", name: "Deployment Strategy", date: "2024-04-25", preview: "Can you help with a deployment strategy for my edge devices?", messages: [] }
    ];
  });

  // Save conversations to local storage when they change
  useEffect(() => {
    localStorage.setItem("moorcheh-conversations", JSON.stringify(conversations));
  }, [conversations]);

  // Save current messages to localStorage
  useEffect(() => {
    if (selectedConversation !== "new") {
      const updatedConversations = conversations.map(convo => 
        convo.id === selectedConversation ? { ...convo, messages: messages } : convo
      );
      setConversations(updatedConversations);
    } else {
      localStorage.setItem("moorcheh-current-chat", JSON.stringify(messages));
    }
  }, [messages]);

  // Load settings from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("moorcheh-settings");
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setSystemPrompt(settings.systemPrompt || defaultSystemPrompt);
          setContextFooter(settings.contextFooter || defaultContextFooter);
          setNoContextFooter(settings.noContextFooter || defaultNoContextFooter);
          setPromptHeader(settings.promptHeader || defaultPromptHeader);
          setTemperature(settings.temperature || 0.7);
          setMaxTokens(settings.maxTokens || 1024);
          setModel(settings.model || "anthropic.claude-3-7-sonnet-20250219-v1:0");
          setStreamingEnabled(settings.streamingEnabled !== undefined ? settings.streamingEnabled : true);
          setKioskMode(settings.kioskMode || false);
          setJsonMode(settings.jsonMode || false);
          setEdgeOptimization(settings.edgeOptimization !== undefined ? settings.edgeOptimization : true);
        } catch (e) {
          console.error("Failed to parse saved settings:", e);
        }
      }
    }
    
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Save settings to local storage
  const saveSettings = () => {
    const settings = {
      systemPrompt,
      contextFooter,
      noContextFooter,
      promptHeader,
      temperature,
      maxTokens,
      model,
      streamingEnabled,
      kioskMode,
      jsonMode,
      edgeOptimization
    };
    localStorage.setItem("moorcheh-settings", JSON.stringify(settings));
    
    // Show a success message (could be implemented more elegantly with a toast)
    alert("Settings saved successfully!");
  };
  
  // Reset settings to defaults
  const resetSettings = () => {
    setSystemPrompt(defaultSystemPrompt);
    setContextFooter(defaultContextFooter);
    setNoContextFooter(defaultNoContextFooter);
    setPromptHeader(defaultPromptHeader);
    setTemperature(0.7);
    setMaxTokens(1024);
    setStreamingEnabled(true);
    setKioskMode(false);
    setJsonMode(false);
    setEdgeOptimization(true);
  };
  
  // Send a message
  const sendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const responseContent = `Here's a response to your query about "${input}". In a real implementation, this would come from the Moorcheh AI model. The response would be generated based on your query and the system prompt, with the temperature and other parameters affecting the output.`;
      
      // Create response with or without metadata based on kiosk mode
      const newResponse: Message = { 
        role: "assistant", 
        content: kioskMode ? `Kiosk Mode: ${responseContent}` : responseContent,
        metadata: kioskMode ? sampleMetadata : undefined
      };
      
      setMessages([...newMessages, newResponse]);
      setIsLoading(false);
      
      // If this is a new conversation, create a new entry in conversations
      if (selectedConversation === "new" && newMessages.length === 2) { // First user message
        const newId = Date.now().toString();
        const newConvo: Conversation = {
          id: newId,
          name: input.length > 20 ? input.substring(0, 20) + "..." : input,
          date: new Date().toISOString().split('T')[0],
          preview: input,
          messages: [...newMessages, newResponse]
        };
        
        setConversations([newConvo, ...conversations]);
        setSelectedConversation(newId);
      }
    }, 1500);
  };
  
  // Create a new conversation
  const createNewChat = () => {
    setMessages([
      { 
        role: "system", 
        content: systemPrompt 
      },
      { 
        role: "assistant", 
        content: "Hello! I'm Moorcheh AI, ready to assist you. How can I help you today?" 
      }
    ]);
    setSelectedConversation("new");
    
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  // Clear conversation
  const clearConversation = () => {
    if (window.confirm("Are you sure you want to reset this conversation?")) {
      setMessages([
        { 
          role: "system", 
          content: systemPrompt 
        },
        { 
          role: "assistant", 
          content: "Hello! I'm Moorcheh AI, ready to assist you. How can I help you today?" 
        }
      ]);
      
      // If this was a saved conversation, update it
      if (selectedConversation !== "new") {
        const updatedConversations = conversations.map(convo => 
          convo.id === selectedConversation 
            ? { 
                ...convo, 
                messages: [
                  { role: "system", content: systemPrompt },
                  { role: "assistant", content: "Hello! I'm Moorcheh AI, ready to assist you. How can I help you today?" }
                ] 
              } 
            : convo
        );
        setConversations(updatedConversations);
      }
    }
  };
  
  // Save conversation
  const saveConversation = () => {
    if (selectedConversation === "new") {
      const name = prompt("Enter a name for this conversation:", "New Conversation");
      if (name) {
        const newId = Date.now().toString();
        const preview = messages.find(m => m.role === "user")?.content || "New conversation";
        
        const newConvo: Conversation = {
          id: newId,
          name,
          date: new Date().toISOString().split('T')[0],
          preview: preview.length > 30 ? preview.substring(0, 30) + "..." : preview,
          messages: [...messages]
        };
        
        setConversations([newConvo, ...conversations]);
        setSelectedConversation(newId);
      }
    } else {
      // Update existing conversation
      const updatedConversations = conversations.map(convo => 
        convo.id === selectedConversation 
          ? { ...convo, messages: [...messages] } 
          : convo
      );
      setConversations(updatedConversations);
      alert("Conversation updated successfully!");
    }
  };
  
  // Load conversation
  const loadConversation = (id: string) => {
    if (id === "new") {
      createNewChat();
      return;
    }
    
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setSelectedConversation(id);
      if (conversation.messages && conversation.messages.length > 0) {
        setMessages(conversation.messages);
      } else {
        // If no messages stored, initialize with default
        setMessages([
          { role: "system", content: systemPrompt },
          { role: "assistant", content: "Hello! I'm Moorcheh AI, ready to assist you. How can I help you today?" }
        ]);
      }
    }
  };

  // Copy message content
  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(`msg-${index}`);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  // Toggle like/dislike for a message
  const toggleLike = (index: number) => {
    const newLiked = new Set(likedMessages);
    const newDisliked = new Set(dislikedMessages);
    
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      newDisliked.delete(index); // Remove from disliked if present
    }
    
    setLikedMessages(newLiked);
    setDislikedMessages(newDisliked);
  };
  
  const toggleDislike = (index: number) => {
    const newLiked = new Set(likedMessages);
    const newDisliked = new Set(dislikedMessages);
    
    if (newDisliked.has(index)) {
      newDisliked.delete(index);
    } else {
      newDisliked.add(index);
      newLiked.delete(index); // Remove from liked if present
    }
    
    setLikedMessages(newLiked);
    setDislikedMessages(newDisliked);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 mr-3 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Moorcheh</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="/console" className="text-sm font-medium text-white">Dashboard</a>
              <a href="/console/playground" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Playground</a>
              <a href="/console/documents" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documents</a>
              <a href="/console/api-keys" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">API Keys</a>
              <a href="/console/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</a>
            </nav>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - conversation history */}
        {sidebarVisible && (
          <div className="w-64 border-r border-gray-800 bg-black p-4 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-200 text-sm">Conversations</h3>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-900">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Archive All</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-900">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Create Folder</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <Button 
              onClick={createNewChat}
              className={`w-full justify-start mb-3 ${
                selectedConversation === "new" 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            
            <ScrollArea className="flex-1 pr-1 -mr-2">
              <div className="space-y-1">
                {conversations.map(convo => (
                  <button
                    key={convo.id}
                    onClick={() => loadConversation(convo.id)}
                    className={`w-full text-left p-2.5 rounded-md text-sm transition-colors group ${
                      selectedConversation === convo.id 
                        ? "bg-gray-800 text-white" 
                        : "text-gray-300 hover:bg-gray-900"
                    }`}
                  >
                    <div className="font-medium truncate flex items-center justify-between">
                      <div className="flex items-center">
                        <TerminalSquare className="h-3 w-3 mr-2 text-gray-500" />
                        <span>{convo.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-5 w-5 p-0 text-gray-500 hover:text-white hover:bg-gray-700 rounded-full ${
                          selectedConversation === convo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs opacity-70 truncate mt-1">{convo.preview}</div>
                    <div className="text-xs opacity-50 mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {convo.date}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-black border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button 
                variant="ghost"
                size="sm"
                className="mr-3 text-gray-400 hover:text-white hover:bg-gray-900"
                onClick={toggleSidebar}
              >
                {sidebarVisible ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
              </Button>
              
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-gray-900 border-gray-800 text-white w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white max-h-80 overflow-y-auto">
                  {/* Amazon Models */}
                  <SelectItem value="amazon.nova-pro-v1:0">amazon.nova-pro-v1:0</SelectItem>
                  <SelectItem value="amazon.nova-premier-v1:0:8k">amazon.nova-premier-v1:0:8k</SelectItem>
                  <SelectItem value="amazon.nova-premier-v1:0:20k">amazon.nova-premier-v1:0:20k</SelectItem>
                  <SelectItem value="amazon.nova-premier-v1:0:1000k">amazon.nova-premier-v1:0:1000k</SelectItem>
                  <SelectItem value="amazon.nova-premier-v1:0:mm">amazon.nova-premier-v1:0:mm</SelectItem>
                  <SelectItem value="amazon.nova-premier-v1:0">amazon.nova-premier-v1:0</SelectItem>
                  <SelectItem value="amazon.nova-lite-v1:0">amazon.nova-lite-v1:0</SelectItem>
                  <SelectItem value="amazon.nova-micro-v1:0">amazon.nova-micro-v1:0</SelectItem>
                  
                  {/* Anthropic Models */}
                  <SelectItem value="anthropic.claude-3-5-sonnet-20240620-v1:0">anthropic.claude-3-5-sonnet-20240620-v1:0</SelectItem>
                  <SelectItem value="anthropic.claude-3-7-sonnet-20250219-v1:0">anthropic.claude-3-7-sonnet-20250219-v1:0</SelectItem>
                  <SelectItem value="anthropic.claude-3-haiku-20240307-v1:0:200k">anthropic.claude-3-haiku-20240307-v1:0:200k</SelectItem>
                  <SelectItem value="anthropic.claude-3-haiku-20240307-v1:0">anthropic.claude-3-haiku-20240307-v1:0</SelectItem>
                  <SelectItem value="anthropic.claude-3-5-sonnet-20241022-v2:0">anthropic.claude-3-5-sonnet-20241022-v2:0</SelectItem>
                  <SelectItem value="anthropic.claude-3-5-haiku-20241022-v1:0">anthropic.claude-3-5-haiku-20241022-v1:0</SelectItem>
                  
                  {/* DeepSeek Models */}
                  <SelectItem value="deepseek.r1-v1:0">deepseek.r1-v1:0</SelectItem>
                  
                  {/* Mistral Models */}
                  <SelectItem value="mistral.pixtral-large-2502-v1:0">mistral.pixtral-large-2502-v1:0</SelectItem>
                  
                  {/* Meta Models */}
                  <SelectItem value="meta.llama3-1-8b-instruct-v1:0:128k">meta.llama3-1-8b-instruct-v1:0:128k</SelectItem>
                  <SelectItem value="meta.llama3-1-8b-instruct-v1:0">meta.llama3-1-8b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-1-70b-instruct-v1:0:128k">meta.llama3-1-70b-instruct-v1:0:128k</SelectItem>
                  <SelectItem value="meta.llama3-1-70b-instruct-v1:0">meta.llama3-1-70b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-1-405b-instruct-v1:0">meta.llama3-1-405b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-2-11b-instruct-v1:0">meta.llama3-2-11b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-2-90b-instruct-v1:0">meta.llama3-2-90b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-2-1b-instruct-v1:0">meta.llama3-2-1b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-2-3b-instruct-v1:0">meta.llama3-2-3b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama3-3-70b-instruct-v1:0">meta.llama3-3-70b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama4-scout-17b-instruct-v1:0:128k">meta.llama4-scout-17b-instruct-v1:0:128k</SelectItem>
                  <SelectItem value="meta.llama4-scout-17b-instruct-v1:0:10m">meta.llama4-scout-17b-instruct-v1:0:10m</SelectItem>
                  <SelectItem value="meta.llama4-scout-17b-instruct-v1:0">meta.llama4-scout-17b-instruct-v1:0</SelectItem>
                  <SelectItem value="meta.llama4-maverick-17b-instruct-v1:0:128k">meta.llama4-maverick-17b-instruct-v1:0:128k</SelectItem>
                  <SelectItem value="meta.llama4-maverick-17b-instruct-v1:0:1m">meta.llama4-maverick-17b-instruct-v1:0:1m</SelectItem>
                  <SelectItem value="meta.llama4-maverick-17b-instruct-v1:0">meta.llama4-maverick-17b-instruct-v1:0</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Tabs defaultValue="chat" className="flex items-center">
                <TabsList className="bg-gray-900 border border-gray-800">
                  <TabsTrigger 
                    value="chat" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-gray-800 bg-gray-900 hover:bg-gray-800 hover:text-white text-gray-400"
                      onClick={saveConversation}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Save Conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-gray-800 bg-gray-900 hover:bg-gray-800 hover:text-white text-gray-400"
                      onClick={clearConversation}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Reset Conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <Tabs defaultValue="chat" className="flex-1 flex flex-col">
            <TabsContent value="chat" className="flex-1 flex flex-col">
              {/* Messages container */}
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-4xl mx-auto space-y-6">
                  {messages.filter(m => m.role !== "system").map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`
                        ${message.role === "user" ? "bg-gray-800" : "bg-gray-900"} 
                        p-4 rounded-xl max-w-[85%] relative group
                      `}>
                        {message.role === "user" ? (
                          <div>
                            <div className="font-semibold text-gray-300 mb-1 flex items-center">
                              <span>Question:</span>
                            </div>
                            <div className="text-white whitespace-pre-wrap">{message.content}</div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-gray-300 mb-1 flex items-center">
                              <span>Response:</span>
                            </div>
                            <div className="text-white whitespace-pre-wrap">
                              {message.content}
                            </div>
                            
                            {/* Metadata section for kiosk mode */}
                            {kioskMode && message.metadata && message.metadata.length > 0 && (
                              <div className="mt-4 pt-3 border-t border-gray-700">
                                <h4 className="text-sm font-medium text-gray-300 mb-2">Metadata:</h4>
                                <div className="space-y-3">
                                  {message.metadata.map((meta, metaIndex) => (
                                    <div 
                                      key={metaIndex} 
                                      className="bg-gray-800 rounded-md p-3 text-sm"
                                    >
                                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                        <div>
                                          <span className="text-gray-400">ID: </span>
                                          <span className="text-gray-200">{meta.id}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">Score: </span>
                                          <span className="text-gray-200">{meta.score.toFixed(4)}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">Label: </span>
                                          <Badge 
                                            className={`
                                              ${meta.score > 0.8 ? 'bg-green-800 hover:bg-green-700' :
                                                meta.score > 0.5 ? 'bg-blue-800 hover:bg-blue-700' :
                                                meta.score > 0.3 ? 'bg-yellow-800 hover:bg-yellow-700' :
                                                'bg-gray-800 hover:bg-gray-700'}
                                            `}
                                          >
                                            {meta.label}
                                          </Badge>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">Source: </span>
                                          <span className="text-blue-400">{meta.source}</span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">Page: </span>
                                          <span className="text-gray-200">{meta.page}</span>
                                        </div>
                                      </div>
                                      <div className="text-gray-300 text-xs">
                                        <span className="text-gray-400">Content: </span>
                                        {meta.content.length > 100 
                                          ? `${meta.content.substring(0, 100)}...` 
                                          : meta.content
                                        }
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Action buttons */}
                            <div className="flex mt-3 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
                                onClick={() => copyMessage(message.content, index)}
                              >
                                {copySuccess === `msg-${index}` ? (
                                  <Check className="h-4 w-4 mr-1" />
                                ) : (
                                  <Copy className="h-4 w-4 mr-1" />
                                )}
                                {copySuccess === `msg-${index}` ? "Copied" : "Copy"}
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${likedMessages.has(index) ? 'text-green-500' : 'text-gray-400 hover:text-white'} hover:bg-gray-800`}
                                onClick={() => toggleLike(index)}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {likedMessages.has(index) ? "Liked" : "Like"}
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-8 px-2 ${dislikedMessages.has(index) ? 'text-red-500' : 'text-gray-400 hover:text-white'} hover:bg-gray-800`}
                                onClick={() => toggleDislike(index)}
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                {dislikedMessages.has(index) ? "Disliked" : "Dislike"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-900 p-4 rounded-xl max-w-[85%]">
                        <div className="text-white">
                          <div className="flex space-x-2 items-center text-sm text-gray-400">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                            <span className="ml-2">Moorcheh AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Reference for scrolling to bottom */}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="p-4 border-t border-gray-800 bg-black">
                <div className="max-w-4xl mx-auto">
                  <div className="relative">
                    <div className="flex">
                      <Input
                        ref={inputRef}
                        placeholder="Send a message..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-gray-900 border-gray-800 text-white focus-visible:ring-blue-500 pr-10"
                      />
                      <Button 
                        onClick={sendMessage} 
                        disabled={!input.trim() || isLoading} 
                        className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    </div>
                    <div className="absolute right-[72px] top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
                            >
                              <Mic className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Voice Input (Coming Soon)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Upload Document</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex justify-center mt-2">
                    <p className="text-xs text-gray-500">
                      {edgeOptimization ? (
                        <span className="flex items-center">
                          <Zap className="h-3 w-3 mr-1 text-green-500" />
                          Edge Optimized: Running at low latency on your device
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <CommandIcon className="h-3 w-3 mr-1 text-blue-500" />
                          Cloud Mode: Processing with full capabilities
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 overflow-auto p-4">
              <div className="max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-white">System Prompt Settings</h2>
                    <p className="text-sm text-gray-400">Configure how the AI interprets and responds to queries</p>
                  </div>
                  
                  <Accordion type="single" collapsible defaultValue="system-prompt" className="space-y-4">
                    <AccordionItem value="system-prompt" className="border-gray-800">
                      <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">System Prompt</AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 px-3">
                        <Textarea 
                          value={systemPrompt} 
                          onChange={e => setSystemPrompt(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white h-32"
                          placeholder="Enter system prompt..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Defines the AI's personality and basic instructions
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="context-footer" className="border-gray-800">
                      <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">Context Footer</AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 px-3">
                        <Textarea 
                          value={contextFooter} 
                          onChange={e => setContextFooter(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white h-24"
                          placeholder="Enter context footer..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Text to add after responses when relevant context is found
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="no-context-footer" className="border-gray-800">
                      <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">No Context Footer</AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 px-3">
                        <Textarea 
                          value={noContextFooter} 
                          onChange={e => setNoContextFooter(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white h-24"
                          placeholder="Enter no context footer..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Text to add after responses when no relevant context is found
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="prompt-header" className="border-gray-800">
                      <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">Prompt Header</AccordionTrigger>
                      <AccordionContent className="pt-2 pb-4 px-3">
                        <Textarea 
                          value={promptHeader} 
                          onChange={e => setPromptHeader(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white h-24"
                          placeholder="Enter prompt header..."
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Text to prepend to user queries when using context
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-medium text-white">Model Parameters</h2>
                      <p className="text-sm text-gray-400">Adjust how the AI generates responses</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-white">Temperature: {temperature.toFixed(1)}</Label>
                          <span className="text-xs text-gray-400">
                            {temperature < 0.3 ? "More precise" : 
                             temperature > 0.7 ? "More creative" : "Balanced"}
                          </span>
                        </div>
                        <Slider 
                          min={0} 
                          max={1} 
                          step={0.1} 
                          value={[temperature]} 
                          onValueChange={value => setTemperature(value[0])}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-white">Max Tokens: {maxTokens}</Label>
                          <span className="text-xs text-gray-400">
                            {maxTokens < 512 ? "Brief responses" : 
                             maxTokens > 2048 ? "Detailed responses" : "Standard responses"}
                          </span>
                        </div>
                        <Slider 
                          min={128} 
                          max={4096} 
                          step={128} 
                          value={[maxTokens]} 
                          onValueChange={value => setMaxTokens(value[0])}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">Streaming</Label>
                            <Switch 
                              checked={streamingEnabled} 
                              onCheckedChange={setStreamingEnabled}
                            />
                          </div>
                          <p className="text-xs text-gray-400">
                            Show responses as they're generated
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">Kiosk Mode</Label>
                            <Switch 
                              checked={kioskMode} 
                              onCheckedChange={setKioskMode}
                            />
                          </div>
                          <p className="text-xs text-gray-400">
                            Only answer from uploaded documents
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">JSON Mode</Label>
                            <Switch 
                              checked={jsonMode} 
                              onCheckedChange={setJsonMode}
                            />
                          </div>
                          <p className="text-xs text-gray-400">
                            Return responses in JSON format
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-white">Edge Optimization</Label>
                            <Switch 
                              checked={edgeOptimization} 
                              onCheckedChange={setEdgeOptimization}
                            />
                          </div>
                          <p className="text-xs text-gray-400">
                            Run AI locally for improved privacy/speed
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={resetSettings}
                      className="border-gray-800 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset Defaults
                    </Button>
                    <Button
                      onClick={saveSettings}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
