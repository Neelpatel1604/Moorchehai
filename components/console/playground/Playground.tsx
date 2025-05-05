'use client';
import { useRef, useEffect } from "react";
import {usePlaygroundState} from '@/hooks/usePlaygroundState';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Settings, Save, RotateCcw, PanelLeft, PanelLeftClose } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {ConversationSidebar} from './ConversationSidebar';
import {ChatArea} from './ChatArea';
import {MessageInput} from './MessageInput';
import {SettingPanel} from './SettingPanel';

export function Playground() {
  const state = usePlaygroundState();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [state.conversations, state.selectedConversation]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      const originalDisplay = footer.style.display;
      footer.style.display = 'none';
      return () => {
        if (footer) footer.style.display = originalDisplay;
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {state.sidebarVisible && (
          <ConversationSidebar
            conversations={state.conversations}
            selectedConversation={state.selectedConversation}
            onSelectConversation={state.loadConversation}
            onCreateNewChat={state.createNewChat}
            onDeleteConversation={state.deleteConversation}
          />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="bg-black border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="mr-3 text-gray-400 hover:text-white hover:bg-gray-900"
                onClick={state.toggleSidebar}
              >
                {state.sidebarVisible ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
              </Button>
              <Select value={state.model} onValueChange={state.setModel}>
                <SelectTrigger className="bg-gray-900 border-gray-800 text-white w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white max-h-80 overflow-y-auto">
                  <SelectItem value="amazon.nova-pro-v1:0">amazon.nova-pro-v1:0</SelectItem>
                  <SelectItem value="anthropic.claude-3-7-sonnet-20250219-v1:0">anthropic.claude-3-7-sonnet-20250219-v1:0</SelectItem>
                  {/* Add other model options as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Tabs value={state.activeTab} onValueChange={state.setActiveTab} className="flex items-center">
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
                      onClick={state.saveConversation}
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
                      onClick={state.clearConversation}
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
          <Tabs value={state.activeTab} onValueChange={state.setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsContent value="chat" className="h-full flex flex-col">
              <ChatArea
                messages={state.messages}
                isLoading={state.isLoading}
                copyMessage={state.copyMessage}
                toggleLike={state.toggleLike}
                toggleDislike={state.toggleDislike}
                likedMessages={state.likedMessages}
                dislikedMessages={state.dislikedMessages}
                copySuccess={state.copySuccess}
                kioskMode={state.kioskMode}
              />
              <MessageInput
                input={state.input}
                setInput={state.setInput}
                sendMessage={state.sendMessage}
                kioskMode={state.kioskMode}
                setKioskMode={state.setKioskMode}
                isLoading={state.isLoading}
                inputRef={inputRef as React.RefObject<HTMLInputElement>}
              />
            </TabsContent>
            <TabsContent value="settings" className="h-full overflow-hidden">
              <SettingPanel
                systemPrompt={state.systemPrompt}
                setSystemPrompt={state.setSystemPrompt}
                contextFooter={state.contextFooter}
                setContextFooter={state.setContextFooter}
                noContextFooter={state.noContextFooter}
                setNoContextFooter={state.setNoContextFooter}
                promptHeader={state.promptHeader}
                setPromptHeader={state.setPromptHeader}
                temperature={state.temperature}
                setTemperature={state.setTemperature}
                maxTokens={state.maxTokens}
                setMaxTokens={state.setMaxTokens}
                streamingEnabled={state.streamingEnabled}
                setStreamingEnabled={state.setStreamingEnabled}
                kioskMode={state.kioskMode}
                setKioskMode={state.setKioskMode}
                jsonMode={state.jsonMode}
                setJsonMode={state.setJsonMode}
                edgeOptimization={state.edgeOptimization}
                setEdgeOptimization={state.setEdgeOptimization}
                saveSettings={state.saveSettings}
                resetSettings={state.resetSettings}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}