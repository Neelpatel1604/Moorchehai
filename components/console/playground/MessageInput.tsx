import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface MessageInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
  kioskMode: boolean;
  setKioskMode: (value: boolean) => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function MessageInput({
  input,
  setInput,
  sendMessage,
  kioskMode,
  setKioskMode,
  isLoading,
  inputRef
}: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="border-t border-gray-800 bg-black z-20 w-full">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative">
          <div className="flex items-center">
            <Input
              ref={inputRef}
              placeholder="Send a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-gray-900 border-gray-800 text-white focus-visible:ring-blue-500"
            />
            <div className="flex items-center ml-2">
              <div className="flex items-center mr-2">
                <Switch
                  id="chat-kiosk-mode"
                  checked={kioskMode}
                  onCheckedChange={setKioskMode}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600"
                />
                <Label htmlFor="chat-kiosk-mode" className="text-white text-xs cursor-pointer ml-2">
                  Kiosk
                </Label>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}