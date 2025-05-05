import { useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message as MessageType } from './types';
import {Message} from './Message';

interface ChatAreaProps {
  messages: MessageType[];
  isLoading: boolean;
  copyMessage: (content: string, index: number) => void;
  toggleLike: (index: number) => void;
  toggleDislike: (index: number) => void;
  likedMessages: Set<number>;
  dislikedMessages: Set<number>;
  copySuccess: string | null;
  kioskMode: boolean;
}

export function ChatArea({
  messages,
  isLoading,
  copyMessage,
  toggleLike,
  toggleDislike,
  likedMessages,
  dislikedMessages,
  copySuccess,
  kioskMode
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-hidden flex flex-col relative">
      <ScrollArea className="absolute inset-0 p-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.filter(m => m.role !== "system").map((message, index) => (
            <Message
              key={index}
              message={message}
              index={index}
              copyMessage={copyMessage}
              toggleLike={toggleLike}
              toggleDislike={toggleDislike}
              isLiked={likedMessages.has(index)}
              isDisliked={dislikedMessages.has(index)}
              isCopied={copySuccess === `msg-${index}`}
              kioskMode={kioskMode}
            />
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
          <div ref={messagesEndRef} className="pb-24" />
        </div>
      </ScrollArea>
    </div>
  );
}