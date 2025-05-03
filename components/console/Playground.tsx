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
  PanelLeftClose
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

export function Playground() {
  // Chat state
  const [messages, setMessages] = useState([
    { 
      role: "system", 
      content: "You are Moorcheh AI, an edge-optimized assistant. You're designed to run efficiently on edge devices with low latency and high privacy. Be concise and helpful in your responses." 
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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // Model parameters
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Moorcheh AI, an edge-optimized assistant. You're designed to run efficiently on edge devices with low latency and high privacy. Be concise and helpful in your responses."
  );
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("anthropic.claude-3-7-sonnet-20250219-v1:0");
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  
  // Conversation history
  const [conversations, setConversations] = useState([
    { id: "1", name: "Edge AI Implementation", date: "2024-05-01", preview: "How do I implement edge AI in my application?" },
    { id: "2", name: "Server Configuration", date: "2024-04-28", preview: "What's the best server setup for Moorcheh AI?" },
    { id: "3", name: "Deployment Strategy", date: "2024-04-25", preview: "Can you help with a deployment strategy for my edge devices?" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
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
      setMessages([
        ...newMessages,
        { 
          role: "assistant", 
          content: `Here's a response to your query about "${input}". In a real implementation, this would come from the Moorcheh AI model. The response would be generated based on your query and the system prompt, with the temperature and other parameters affecting the output.`
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Clear conversation
  const clearConversation = () => {
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
  };
  
  // Save conversation
  const saveConversation = () => {
    // Implementation would save the current conversation
    console.log("Saving conversation");
  };
  
  // Load conversation
  const loadConversation = (id: string) => {
    setSelectedConversation(id);
    // Implementation would load the selected conversation
    console.log(`Loading conversation ${id}`);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
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
              <a href="/console" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Dashboard</a>
              <a href="/console/playground" className="text-sm font-medium text-white border-b-2 border-blue-500 pb-1">Playground</a>
              <a href="/console/api-keys" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">API Keys</a>
              <a href="/console/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</a>
            </nav>
            
            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <CommandIcon className="h-4 w-4 mr-2" />
              <span>Quick Actions</span>
            </Button>
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
              onClick={() => setSelectedConversation("new")}
              className="w-full justify-start mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                className="border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white"
                onClick={clearConversation}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white"
                onClick={saveConversation}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden data-[state=active]:flex-1 m-0 p-0">
              {/* Messages area */}
              <ScrollArea className="flex-1 p-4 space-y-6">
                {messages.map((message, index) => {
                  if (message.role === "system") return null;
                  
                  return (
                    <div 
                      key={index}
                      className={`flex ${message.role === "assistant" ? "bg-gray-950 rounded-xl p-4" : ""}`}
                    >
                      <div className={`flex-shrink-0 mr-4 mt-0.5 ${message.role === "assistant" ? "" : "mt-1"}`}>
                        {message.role === "assistant" ? (
                          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <Cpu className="h-5 w-5 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-white font-medium">U</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className={`text-sm font-medium mb-1 ${message.role === "assistant" ? "text-blue-500" : "text-purple-500"}`}>
                          {message.role === "assistant" ? "Moorcheh AI" : "You"}
                        </p>
                        <div className="text-gray-200 text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        {message.role === "assistant" && (
                          <div className="flex items-center mt-3 space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                              <Copy className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">Copy</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
                
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center">
                      <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Generating response...</p>
                    </div>
                  </div>
                )}
              </ScrollArea>
              
              {/* Input area */}
              <div className="p-4 border-t border-gray-800">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                  <Input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="pr-20 md:pr-24 py-4 md:py-6 bg-white border-gray-300 text-sm md:text-base"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
                  <Button 
                    type="button" 
                    size="icon"
                    variant="ghost"
                    disabled={isLoading}
                    className="text-gray-500 hover:text-gray-700 hidden md:flex"
                    onClick={() => alert('Voice input coming soon!')}
                  >
                    <Mic size={18} />
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={isLoading || !text.trim()}
                    className={`rounded-full px-2 md:px-3 h-8 ${text.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <Send size={16} className="mr-0 md:mr-1" />
                    <span className="hidden md:inline">{isLoading ? 'Sending...' : 'Send'}</span>
                  </Button>
                </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Timer className="h-3 w-3 mr-1" />
                      <span>Response time: ~0.5s</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="h-3 w-3 mr-1" />
                      <span>100% Available Credits</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="data-[state=active]:flex-1 overflow-auto m-0 p-6">
              <div className="max-w-3xl mx-auto space-y-8">
                <Card className="bg-gray-950 border-gray-800">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-500" />
                      Model Parameters
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="system-prompt" className="text-sm font-medium text-gray-300">System Prompt</Label>
                          <Badge variant="outline" className="text-xs font-normal text-gray-400 border-gray-700">Default</Badge>
                        </div>
                        <Textarea
                          id="system-prompt"
                          value={systemPrompt}
                          onChange={(e) => setSystemPrompt(e.target.value)}
                          className="bg-gray-900 border-gray-800 text-white h-24 resize-none"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="temperature" className="text-sm font-medium text-gray-300">Temperature</Label>
                            <span className="text-xs text-gray-400">{temperature}</span>
                          </div>
                          <Slider
                            id="temperature"
                            min={0}
                            max={1}
                            step={0.1}
                            value={[temperature]}
                            onValueChange={(value) => setTemperature(value[0])}
                            className="py-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>More Precise</span>
                            <span>More Creative</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="max-tokens" className="text-sm font-medium text-gray-300">Max Tokens</Label>
                            <span className="text-xs text-gray-400">{maxTokens}</span>
                          </div>
                          <Slider
                            id="max-tokens"
                            min={256}
                            max={4096}
                            step={256}
                            value={[maxTokens]}
                            onValueChange={(value) => setMaxTokens(value[0])}
                            className="py-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Shorter</span>
                            <span>Longer</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label htmlFor="streaming" className="text-sm font-medium text-gray-300 mb-1">Streaming</Label>
                          <span className="text-xs text-gray-500">Enable streaming responses</span>
                        </div>
                        <Switch
                          id="streaming"
                          checked={streamingEnabled}
                          onCheckedChange={setStreamingEnabled}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-950 border-gray-800">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-500" />
                      Advanced Options
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label className="text-sm font-medium text-gray-300 mb-1">JSON Mode</Label>
                          <span className="text-xs text-gray-500">Force model to return JSON responses</span>
                        </div>
                        <Switch className="data-[state=checked]:bg-blue-600" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <Label className="text-sm font-medium text-gray-300 mb-1">Moorcheh Edge Optimization</Label>
                          <span className="text-xs text-gray-500">Optimize responses for edge deployment</span>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-blue-600" />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div className="flex justify-between">
                        <Button variant="outline" className="border-gray-800 text-gray-300 hover:bg-gray-900 hover:text-white">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset to Default
                        </Button>
                        
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}