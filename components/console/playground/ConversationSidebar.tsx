'use client';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Plus, TerminalSquare, Trash2 } from 'lucide-react';
import { Conversation } from './types';

interface Props {
  conversations: Conversation[];
  selectedConversation: string;
  onSelectConversation: (id: string) => void;
  onCreateNewChat: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ConversationSidebar({
  conversations,
  selectedConversation,
  onSelectConversation,
  onCreateNewChat,
  onDeleteConversation,
}: Props) {
  return (
    <div className="w-64 border-r border-gray-800 bg-black p-4 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-200 text-sm">Conversations</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-900"
                onClick={onCreateNewChat}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>New Chat</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Button
        onClick={onCreateNewChat}
        className="w-full justify-start mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Chat
      </Button>
      <ScrollArea className="flex-1 pr-1 -mr-2">
        <div className="space-y-1">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => onSelectConversation(convo.id)}
              className={`w-full text-left p-2.5 rounded-md text-sm transition-colors group ${
                selectedConversation === convo.id ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-900'
              }`}
            >
              <div className="font-medium truncate flex items-center justify-between">
                <div className="flex items-center">
                  <TerminalSquare className="h-3 w-3 mr-2 text-gray-500" />
                  <span>{convo.name}</span>
                </div>
                <div className="flex">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(convo.id);
                    }}
                    className="h-5 w-5 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-full"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
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
  );
}