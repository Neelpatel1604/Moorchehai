'use client';
import { Button  } from '@/components/ui/button';
import {Badge } from '@/components/ui/badge';
import { Check, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { Message } from './types';

interface Props {
  message: Message;
  index: number;
  copyMessage: (content: string, index: number) => void;
  toggleLike: (index: number) => void;
  toggleDislike: (index: number) => void;
  kioskMode: boolean;
  isCopied: boolean;
  isLiked: boolean;
  isDisliked: boolean;
}

export function Message({
  message,
  index,
  copyMessage,
  toggleLike,
  toggleDislike,
  kioskMode,
  isCopied,
  isLiked,
  isDisliked,
}: Props) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          message.role === 'user' ? 'bg-gray-800' : 'bg-gray-900'
        } p-4 rounded-xl max-w-[85%] relative group`}
      >
        {message.role === 'user' ? (
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
            <div className="text-white whitespace-pre-wrap">{message.content}</div>
            {kioskMode && message.metadata && message.metadata.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Metadata:</h4>
                <div className="space-y-3">
                  {message.metadata.map((meta, metaIndex) => (
                    <div key={metaIndex} className="bg-gray-800 rounded-md p-3 text-sm">
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
                            className={`${
                              meta.score > 0.8
                                ? 'bg-green-800 hover:bg-green-700'
                                : meta.score > 0.5
                                ? 'bg-blue-800 hover:bg-blue-700'
                                : meta.score > 0.3
                                ? 'bg-yellow-800 hover:bg-yellow-700'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
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
                        {meta.content.length > 100 ? `${meta.content.substring(0, 100)}...` : meta.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex mt-3 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => copyMessage(message.content, index)}
              >
                {isCopied ? (
                  <Check className="h-4 w-4 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {isCopied ? 'Copied' : 'Copy'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'} hover:bg-gray-800`}
                onClick={() => toggleLike(index)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${isDisliked ? 'text-red-500' : 'text-gray-400 hover:text-white'} hover:bg-gray-800`}
                onClick={() => toggleDislike(index)}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                {isDisliked ? 'Disliked' : 'Dislike'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}