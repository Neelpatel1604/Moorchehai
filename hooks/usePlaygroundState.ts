'use client';
import { useState, useEffect, useRef } from 'react';
import { Message, Conversation } from '@/components/console/playground/types';

export function usePlaygroundState() {
  // Default prompts (same as in original code)
  const defaultSystemPrompt = "Base your answers on the context provided in the following context block and on our chat history. When using context chunks, prioritize information from chunks with higher relevance labels. Pay special attention to content labeled as 'Close Match' or 'Very High Relevance' as these are most likely to contain the most pertinent information for answering the query. Each piece of context includes: - A Score (0-1) where 1 means highly relevant and 0 means less relevant - A Label indicating the level of relevance ('Close Match', 'Very High Relevance', 'High Relevance', 'Good Relevance', 'Low Relevance', 'Very Low Relevance', 'Irrelevant') - The text of the context chunk Give more weight to information from contexts with higher relevance scores when formulating your answer. If contexts have conflicting information, prefer information from the more relevant (higher-scoring) contexts. When analyzing the provided context, consider both the relevance scores and their corresponding labels: - Close Match (score >= 0.8): Indicates near-perfect relevance to the query - Very High Relevance (0.4 <= score < 0.8): Strongly related content - High Relevance (0.2 <= score < 0.4): Significantly related content - Good Relevance (0.1 <= score < 0.2): Moderately related content - Low Relevance (0.05 <= score < 0.1): Minimally related content - Very Low Relevance (0.01 <= score < 0.05): Barely related content - Irrelevant (score < 0.01): No meaningful relation to the query If all the context provided are labeled as Irrelevant then you should answer: \"Unfortunately most of the retrieved context are not relevant to your query\" DO NOT answer with anything other than the markdown output, and do not include the <question> or <context> within your answer and do not make up your own markdown elements. <context> {context} </context>"; // Truncated for brevity
  const defaultContextFooter = "Base your answers on the context provided in the following context block and on our chat history. When using context chunks, prioritize information from chunks with higher relevance labels. Pay special attention to content labeled as 'Close Match' or 'Very High Relevance' as these are most likely to contain the most pertinent information for answering the query. Each piece of context includes: - A Score (0-1) where 1 means highly relevant and 0 means less relevant - A Label indicating the level of relevance ('Close Match', 'Very High Relevance', 'High Relevance', 'Good Relevance', 'Low Relevance', 'Very Low Relevance', 'Irrelevant') - The text of the context chunk Give more weight to information from contexts with higher relevance scores when formulating your answer. If contexts have conflicting information, prefer information from the more relevant (higher-scoring) contexts. When analyzing the provided context, consider both the relevance scores and their corresponding labels: - Close Match (score >= 0.8): Indicates near-perfect relevance to the query - Very High Relevance (0.4 <= score < 0.8): Strongly related content - High Relevance (0.2 <= score < 0.4): Significantly related content - Good Relevance (0.1 <= score < 0.2): Moderately related content - Low Relevance (0.05 <= score < 0.1): Minimally related content - Very Low Relevance (0.01 <= score < 0.05): Barely related content - Irrelevant (score < 0.01): No meaningful relation to the query If all the context provided are labeled as Irrelevant then you should answer: \"Unfortunately most of the retrieved context are not relevant to your query\" DO NOT answer with anything other than the markdown output, and do not include the <question> or <context> within your answer and do not make up your own markdown elements. <context> {context} </context>"; // Truncated
  const defaultNoContextFooter = "Unfortunately no context was retrieved for this query. You should answer to the best of your capabilites, but you should warn the user that no context was found. In your response, suggest the user to upload documents so that you can reply with a factual answer. You can use our chat history to remember details about our previous conversations. DO NOT answer with anything other than the markdown output, and do not include the <question> or <context> within your answer and do not make up your own markdown elements."; // Truncated
  const defaultPromptHeader = "Your goal is to answer the question provided in the following question block <question> {question} </question> Important instructions: You always answer the question with markdown formatting and nothing else. You will be penalized if you do not answer with markdown when it would be possible. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You do not support html in markdown. You will be penalized if you use html tags. You do not support images and never include images. You will be penalized if you render images. It's important you always admit if you don't know something. Do not make anything up. Do not answer with anything other than the markdown output."; // Truncated

  // State variables
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: defaultSystemPrompt },
    { role: 'assistant', content: 'Hello! I\'m Moorcheh AI, ready to assist you. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState('new');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const [dislikedMessages, setDislikedMessages] = useState<Set<number>>(new Set());
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [contextFooter, setContextFooter] = useState(defaultContextFooter);
  const [noContextFooter, setNoContextFooter] = useState(defaultNoContextFooter);
  const [promptHeader, setPromptHeader] = useState(defaultPromptHeader);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [model, setModel] = useState('anthropic.claude-3-7-sonnet-20250219-v1:0');
  const [streamingEnabled, setStreamingEnabled] = useState(true);
  const [kioskMode, setKioskMode] = useState(false);
  const [jsonMode, setJsonMode] = useState(false);
  const [edgeOptimization, setEdgeOptimization] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moorcheh-conversations');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved conversations:', e);
        }
      }
    }
    return [];
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample metadata (same as original)
  const sampleMetadata = [
    {
      id: 'doc1',
      score: 0.9456,
      label: 'High Relevance',
      source: 'edge_computing.pdf',
      page: 4,
      content: 'Edge computing is a distributed computing paradigm...',
    },
    // ... (other metadata items)
  ];

  // Effects
  useEffect(() => {
    localStorage.setItem('moorcheh-conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (selectedConversation !== 'new') {
      localStorage.setItem('moorcheh-conversations', JSON.stringify(conversations));
    } else {
      localStorage.setItem('moorcheh-current-chat', JSON.stringify(messages));
    }
  }, [messages, selectedConversation]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('moorcheh-settings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setSystemPrompt(settings.systemPrompt || defaultSystemPrompt);
          setContextFooter(settings.contextFooter || defaultContextFooter);
          setNoContextFooter(settings.noContextFooter || defaultNoContextFooter);
          setPromptHeader(settings.promptHeader || defaultPromptHeader);
          setTemperature(settings.temperature || 0.7);
          setMaxTokens(settings.maxTokens || 1024);
          setModel(settings.model || 'anthropic.claude-3-7-sonnet-20250219-v1:0');
          setStreamingEnabled(settings.streamingEnabled !== undefined ? settings.streamingEnabled : true);
          setKioskMode(settings.kioskMode || false);
          setJsonMode(settings.jsonMode || false);
          setEdgeOptimization(settings.edgeOptimization !== undefined ? settings.edgeOptimization : true);
        } catch (e) {
          console.error('Failed to parse saved settings:', e);
        }
      }
    }
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Functions
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
      edgeOptimization,
    };
    localStorage.setItem('moorcheh-settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

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

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user' as const, content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const responseContent = `Here's a response to your query about "${input}"...`;
      const assistantMessage: Message = {
        role: 'assistant' as const,
        content: kioskMode ? `Kiosk Mode: ${responseContent}` : responseContent,
        metadata: kioskMode ? sampleMetadata : undefined,
      };
      
      const newMessages = [...updatedMessages, assistantMessage];
      setMessages(newMessages);
      setIsLoading(false);

      if (selectedConversation === 'new' && messages.length === 2) {
        const newId = Date.now().toString();
        const newConvo: Conversation = {
          id: newId,
          name: input.length > 20 ? input.substring(0, 20) + '...' : input,
          date: new Date().toISOString().split('T')[0],
          preview: input,
          messages: newMessages,
        };
        setConversations(prevConversations => [newConvo, ...prevConversations]);
        setSelectedConversation(newId);
      }
    }, 1500);
  };

  const createNewChat = () => {
    setMessages([
      { role: 'system', content: systemPrompt },
      { role: 'assistant', content: 'Hello! I\'m Moorcheh AI, ready to assist you. How can I help you today?' },
    ]);
    setSelectedConversation('new');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const clearConversation = () => {
    if (window.confirm('Are you sure you want to reset this conversation?')) {
      setMessages([
        { role: 'system', content: systemPrompt },
        { role: 'assistant', content: 'Hello! I\'m Moorcheh AI, ready to assist you. How can I help you today?' },
      ]);
      if (selectedConversation !== 'new') {
        setConversations(prevConversations => prevConversations.map((convo) =>
          convo.id === selectedConversation
            ? {
                ...convo,
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'assistant', content: 'Hello! I\'m Moorcheh AI, ready to assist you. How can I help you today?' },
                ],
              }
            : convo
        ));
      }
    }
  };

  const saveConversation = () => {
    if (selectedConversation === 'new') {
      const name = prompt('Enter a name for this conversation:', 'New Conversation');
      if (name) {
        const newId = Date.now().toString();
        const preview = messages.find((m) => m.role === 'user')?.content || 'New conversation';
        const newConvo: Conversation = {
          id: newId,
          name,
          date: new Date().toISOString().split('T')[0],
          preview: preview.length > 30 ? preview.substring(0, 30) + '...' : preview,
          messages: [...messages],
        };
        setConversations([newConvo, ...conversations]);
        setSelectedConversation(newId);
      }
    } else {
      const updatedConversations = conversations.map((convo) =>
        convo.id === selectedConversation ? { ...convo, messages: [...messages] } : convo
      );
      setConversations(updatedConversations);
      alert('Conversation updated successfully!');
    }
  };

  const loadConversation = (id: string) => {
    if (id === 'new') {
      createNewChat();
      return;
    }
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setSelectedConversation(id);
      setMessages(conversation.messages.length > 0 ? conversation.messages : [
        { role: 'system', content: systemPrompt },
        { role: 'assistant', content: 'Hello! I\'m Moorcheh AI, ready to assist you. How can I help you today?' },
      ]);
    }
  };

  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(`msg-${index}`);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const toggleLike = (index: number) => {
    const newLiked = new Set(likedMessages);
    const newDisliked = new Set(dislikedMessages);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
      newDisliked.delete(index);
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
      newLiked.delete(index);
    }
    setLikedMessages(newLiked);
    setDislikedMessages(newDisliked);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteConversation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const updatedConversations = conversations.filter((convo) => convo.id !== id);
      setConversations(updatedConversations);
      if (id === selectedConversation) {
        createNewChat();
      }
      localStorage.setItem('moorcheh-conversations', JSON.stringify(updatedConversations));
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    isLoading,
    setIsLoading,
    selectedConversation,
    setSelectedConversation,
    sidebarVisible,
    setSidebarVisible,
    copySuccess,
    setCopySuccess,
    likedMessages,
    setLikedMessages,
    dislikedMessages,
    setDislikedMessages,
    systemPrompt,
    setSystemPrompt,
    contextFooter,
    setContextFooter,
    noContextFooter,
    setNoContextFooter,
    promptHeader,
    setPromptHeader,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    model,
    setModel,
    streamingEnabled,
    setStreamingEnabled,
    kioskMode,
    setKioskMode,
    jsonMode,
    setJsonMode,
    edgeOptimization,
    setEdgeOptimization,
    conversations,
    setConversations,
    inputRef,
    messagesEndRef,
    saveSettings,
    resetSettings,
    sendMessage,
    createNewChat,
    clearConversation,
    saveConversation,
    loadConversation,
    copyMessage,
    toggleLike,
    toggleDislike,
    toggleSidebar,
    handleKeyDown,
    deleteConversation,
    activeTab,
    setActiveTab,
  };
}