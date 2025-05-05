import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";

interface SettingPanelProps {
  systemPrompt: string;
  setSystemPrompt: (value: string) => void;
  contextFooter: string;
  setContextFooter: (value: string) => void;
  noContextFooter: string;
  setNoContextFooter: (value: string) => void;
  promptHeader: string;
  setPromptHeader: (value: string) => void;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  streamingEnabled: boolean;
  setStreamingEnabled: (value: boolean) => void;
  kioskMode: boolean;
  setKioskMode: (value: boolean) => void;
  jsonMode: boolean;
  setJsonMode: (value: boolean) => void;
  edgeOptimization: boolean;
  setEdgeOptimization: (value: boolean) => void;
  saveSettings: () => void;
  resetSettings: () => void;
}

export function SettingPanel(props: SettingPanelProps) {
  return (
    <ScrollArea className="h-full px-4 pb-24">
      <div className="max-w-2xl mx-auto py-4">
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
                  value={props.systemPrompt}
                  onChange={e => props.setSystemPrompt(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white h-32"
                  placeholder="Enter system prompt..."
                />
                <p className="text-xs text-gray-500 mt-1">Defines the AI &apos;s personality and basic instructions</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="context-footer" className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">Context Footer</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-3">
                <Textarea
                  value={props.contextFooter}
                  onChange={e => props.setContextFooter(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white h-24"
                  placeholder="Enter context footer..."
                />
                <p className="text-xs text-gray-500 mt-1">Text to add after responses when relevant context is found</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="no-context-footer" className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">No Context Footer</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-3">
                <Textarea
                  value={props.noContextFooter}
                  onChange={e => props.setNoContextFooter(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white h-24"
                  placeholder="Enter no context footer..."
                />
                <p className="text-xs text-gray-500 mt-1">Text to add after responses when no relevant context is found</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="prompt-header" className="border-gray-800">
              <AccordionTrigger className="hover:bg-gray-900 rounded-md px-3 py-2 text-gray-200">Prompt Header</AccordionTrigger>
              <AccordionContent className="pt-2 pb-4 px-3">
                <Textarea
                  value={props.promptHeader}
                  onChange={e => props.setPromptHeader(e.target.value)}
                  className="bg-gray-900 border-gray-800 text-white h-24"
                  placeholder="Enter prompt header..."
                />
                <p className="text-xs text-gray-500 mt-1">Text to prepend to user queries when using context</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Separator className="bg-gray-800 my-8" />
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-white">Model Parameters</h2>
            <p className="text-sm text-gray-400">Adjust how the AI generates responses</p>
          </div>
          <div className="space-y-10">
            <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-white">Temperature: {props.temperature.toFixed(1)}</Label>
                <span className="text-xs text-gray-300 px-2 py-1 bg-gray-800 rounded-full">
                  {props.temperature < 0.3 ? "More precise" : props.temperature > 0.7 ? "More creative" : "Balanced"}
                </span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[props.temperature]}
                onValueChange={value => props.setTemperature(value[0])}
                className="mt-1 [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-gradient-to-r [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:from-blue-600 [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:to-purple-600 [&>span>span]:bg-gradient-to-r [&>span>span]:from-blue-600 [&>span>span]:to-purple-600 [&>span>span]:border-2 [&>span>span]:border-white"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Precise (0.0)</span>
                <span>Balanced (0.5)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
            <div className="space-y-4 bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Label className="text-white">Max Tokens: {props.maxTokens}</Label>
                <span className="text-xs text-gray-300 px-2 py-1 bg-gray-800 rounded-full">
                  {props.maxTokens < 512 ? "Brief responses" : props.maxTokens > 2048 ? "Detailed responses" : "Standard responses"}
                </span>
              </div>
              <Slider
                min={128}
                max={4096}
                step={128}
                value={[props.maxTokens]}
                onValueChange={value => props.setMaxTokens(value[0])}
                className="mt-1 [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:bg-gradient-to-r [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:from-blue-600 [&>[data-orientation=horizontal]>[data-orientation=horizontal]]:to-purple-600 [&>span>span]:bg-gradient-to-r [&>span>span]:from-blue-600 [&>span>span]:to-purple-600 [&>span>span]:border-2 [&>span>span]:border-white"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Brief (128)</span>
                <span>Standard (1024)</span>
                <span>Detailed (4096)</span>
              </div>
            </div>
          </div>
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mt-8">
            <Card className="bg-gray-900 border-gray-800 p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Streaming</Label>
                  <Switch
                    checked={props.streamingEnabled}
                    onCheckedChange={props.setStreamingEnabled}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600"
                  />
                </div>
                <p className="text-xs text-gray-400">Show responses as they &apos;re generated</p>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white">JSON Mode</Label>
                  <Switch
                    checked={props.jsonMode}
                    onCheckedChange={props.setJsonMode}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600"
                  />
                </div>
                <p className="text-xs text-gray-400">Return responses in JSON format</p>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-800 p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Edge Optimization</Label>
                  <Switch
                    checked={props.edgeOptimization}
                    onCheckedChange={props.setEdgeOptimization}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 border-gray-600"
                  />
                </div>
                <p className="text-xs text-gray-400">Run AI locally for improved privacy/speed</p>
              </div>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-8 mt-8">
          <Button
            variant="outline"
            onClick={props.resetSettings}
            className="border-gray-800 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Defaults
          </Button>
          <Button
            onClick={props.saveSettings}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}