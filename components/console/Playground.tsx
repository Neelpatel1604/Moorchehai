"use client";

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
  ArrowRight,
  Copy,
  Download,
  Info,
  MessageSquare,
  RotateCcw,
  Save,
  SendHorizonal,
  Settings,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Sliders,
  CheckCircle,
  Timer,
  Trash2
} from "lucide-react";

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
  
  // Model parameters
  const [systemPrompt, setSystemPrompt] = useState(
    "You are Moorcheh AI, an edge-optimized assistant. You're designed to run efficiently on edge devices with low latency and high privacy. Be concise and helpful in your responses."
  );
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState("moorcheh-1");
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
  
  return (
    <div className="flex flex-col h-screen">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white font-saira">Playground</h1>
            <div className="flex space-x-2">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="moorcheh-1">Moorcheh-1</SelectItem>
                  <SelectItem value="moorcheh-1-mini">Moorcheh-1 Mini</SelectItem>
                  <SelectItem value="moorcheh-1-vision">Moorcheh-1 Vision</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={clearConversation}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={saveConversation}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          <TabsList className="bg-gray-700 text-gray-300">
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
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - conversation history */}
          <div className="w-64 border-r border-gray-700 bg-gray-900 p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Chat History</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => setSelectedConversation("new")}
                className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
                  selectedConversation === "new" 
                    ? "bg-[#1e40af] text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                + New Chat
              </button>
              
              {conversations.map(convo => (
                <button
                  key={convo.id}
                  onClick={() => loadConversation(convo.id)}
                  className={`w-full text-left p-3 rounded-md text-sm transition-colors ${
                    selectedConversation === convo.id 
                      ? "bg-[#1e40af] text-white" 
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="font-medium truncate">{convo.name}</div>
                  <div className="text-xs opacity-70 truncate mt-1">{convo.preview}</div>
                  <div className="text-xs opacity-50 mt-1">{convo.date}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex">
            <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0 data-[state=active]:flex">
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-auto bg-gray-900">
                <div className="max-w-3xl mx-auto space-y-4">
                  {messages.map((message, index) => (
                    message.role !== "system" && (
                      <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                        <div 
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "assistant" 
                              ? "bg-gray-800 text-white" 
                              : "bg-[#1e40af] text-white"
                          }`}
                        >
                          <div className="prose prose-invert">
                            {message.content}
                          </div>
                          <div className="flex justify-end mt-2 text-xs text-gray-400">
                            <div className="flex space-x-2">
                              <button className="opacity-50 hover:opacity-100">
                                <Copy className="h-3 w-3" />
                              </button>
                              {message.role === "assistant" && (
                                <>
                                  <button className="opacity-50 hover:opacity-100">
                                    <ThumbsUp className="h-3 w-3" />
                                  </button>
                                  <button className="opacity-50 hover:opacity-100">
                                    <ThumbsDown className="h-3 w-3" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-4 bg-gray-800 text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#1e40af] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[#1e40af] rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-[#1e40af] rounded-full animate-pulse delay-300"></div>
                          <span className="text-sm text-gray-400 ml-2">Generating response...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef}></div>
                </div>
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Message Moorcheh AI..."
                      className="w-full p-4 pr-24 bg-gray-700 border-gray-600 text-white resize-none overflow-hidden"
                      rows={3}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button
                      className="absolute right-2 bottom-2 bg-[#1e40af] hover:bg-blue-800 text-white"
                      onClick={sendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <SendHorizonal className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center">
                              <Info className="h-3 w-3 mr-1" />
                              Moorcheh AI runs on your devices for enhanced privacy
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Messages may be saved for training
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">Response time: ~250ms</span>
                      <Timer className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="flex-1 p-6 bg-gray-900 overflow-auto m-0">
              <div className="max-w-3xl mx-auto">
                <Card className="bg-gray-800 border-gray-700 mb-6">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">System Prompt</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      The system prompt helps set the behavior of the assistant. It's included at the beginning of the conversation.
                    </p>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="w-full bg-gray-700 border-gray-600 text-white"
                      rows={5}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => setSystemPrompt("You are Moorcheh AI, an edge-optimized assistant. You're designed to run efficiently on edge devices with low latency and high privacy. Be concise and helpful in your responses.")}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset to Default
                      </Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Model Parameters</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-gray-300">Temperature: {temperature}</label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                Controls randomness: Lower values are more deterministic, higher values more creative
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Slider
                          value={[temperature]}
                          onValueChange={(value) => setTemperature(value[0])}
                          max={1}
                          step={0.1}
                          className="[&>span]:bg-[#1e40af]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Precise (0)</span>
                          <span>Balanced (0.7)</span>
                          <span>Creative (1)</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-gray-300">Max Tokens: {maxTokens}</label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                Maximum length of response in tokens
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Slider
                          value={[maxTokens]}
                          onValueChange={(value) => setMaxTokens(value[0])}
                          min={256}
                          max={4096}
                          step={256}
                          className="[&>span]:bg-[#1e40af]"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>256</span>
                          <span>2048</span>
                          <span>4096</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-300">Enable streaming</label>
                          <p className="text-xs text-gray-500 mt-1">Show the response as it's being generated</p>
                        </div>
                        <Switch
                          checked={streamingEnabled}
                          onCheckedChange={setStreamingEnabled}
                          className="data-[state=checked]:bg-[#1e40af]"
                        />
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Advanced Settings</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs text-gray-400">Top P</label>
                            <Input 
                              type="number" 
                              value={0.9} 
                              className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-gray-400">Frequency Penalty</label>
                            <Input 
                              type="number" 
                              value={0.1} 
                              className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-gray-400">Presence Penalty</label>
                            <Input 
                              type="number" 
                              value={0.1} 
                              className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs text-gray-400">Stop Sequences</label>
                            <Input 
                              placeholder="Separated by commas" 
                              className="bg-gray-700 border-gray-600 text-white h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
} 