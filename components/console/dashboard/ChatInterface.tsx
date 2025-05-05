'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Bot, User, Send, Trash2 } from 'lucide-react';
import { ChatMessage } from './types';

// Generate bot response based on user input
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

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({  }: ChatInterfaceProps) {
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
  );
}

// Helper function to generate sample chat data
function generateSampleChatData(): ChatMessage[] {
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
}