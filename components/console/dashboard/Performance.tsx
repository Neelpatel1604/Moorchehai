'use client';
import { Card } from "@/components/ui/card";
import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { PerformanceTabProps } from "./types";

export function PerformanceTab({ isLoading, hourlyData, modelUsage }: PerformanceTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20 mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="10" 
                  strokeDasharray="283" 
                  strokeDashoffset="1"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">99.9%</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white">API Uptime</h3>
            <p className="text-sm text-gray-400">Last 30 days</p>
          </div>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20 mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="10" 
                  strokeDasharray="283" 
                  strokeDashoffset="175"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">245</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white">Avg. Latency (ms)</h3>
            <p className="text-sm text-gray-400">Last 24 hours</p>
          </div>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex flex-col items-center">
            <div className="relative h-20 w-20 mb-3">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="10" 
                  strokeDasharray="283" 
                  strokeDashoffset="4"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">98.7%</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white">Success Rate</h3>
            <p className="text-sm text-gray-400">API requests</p>
          </div>
        </Card>
      </div>
      
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Performance Metrics</h3>
        <div className="h-72 bg-gray-800 rounded-md p-4">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ChartContainer
              config={{
                latency: { label: "Latency", color: "#3b82f6" },
                requests: { label: "Requests", color: "#a855f7" }
              }}
              className="h-full w-full"
            >
              <RechartsLineChart
                data={hourlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  content={({active, payload, label}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                          <p className="font-medium text-white">Time: {label}</p>
                          <p className="text-gray-400">
                            Latency: {payload[0].value}ms
                          </p>
                          <p className="text-gray-400">
                            Requests: {payload[1].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#3b82f6" 
                  dot={false}
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#a855f7" 
                  dot={false} 
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ChartContainer>
          )}
          <div className="flex justify-between text-sm mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-gray-400">Latency</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-gray-400">Request Volume</span>
            </div>
            <div>
              <span className="text-gray-400">Time Range:</span>
              <select className="ml-2 bg-gray-700 border-none rounded text-white text-sm px-2 py-1">
                <option>24 hours</option>
                <option>7 days</option>
                <option>30 days</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Model Response Times</h3>
        <div className="space-y-4">
          {modelUsage.map((model, index) => {
            const randomLatency = Math.floor(Math.random() * 400) + 100;
            const percentage = (randomLatency / 1000) * 100;
            const colorClass = randomLatency < 200 
              ? 'from-green-500 to-green-400' 
              : randomLatency < 500 ? 'from-yellow-500 to-yellow-400' : 'from-red-500 to-red-400';
              
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{model.model}</span>
                  <span className="text-sm font-medium text-white">{randomLatency}ms</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${colorClass} group relative`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute invisible group-hover:visible right-0 top-0 transform translate-y-[-24px] translate-x-[8px] bg-gray-900 text-xs text-white rounded px-1.5 py-0.5">
                      {randomLatency}ms
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}