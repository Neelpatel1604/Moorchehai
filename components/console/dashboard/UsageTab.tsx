'use client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { UsageTabProps } from "./types";
import { weeklyChartConfig, pieChartConfig, costChartConfig } from "@/utils/dashboarddata";

export function UsageTab({ isLoading, weeklyUsageData, modelUsage, requestDistributionData, costAnalysisData }: UsageTabProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Weekly Usage Trends</h3>
        <div className="h-72 bg-gray-800 rounded-md p-4">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-l-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ChartContainer
              config={weeklyChartConfig}
              className="h-full w-full"
            >
              <AreaChart
                data={weeklyUsageData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => {
                    return value.slice(5);
                  }}
                />
                <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      nameKey="requests"
                      labelFormatter={(value) => `Date: ${value}`}
                    />
                  }
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800 p-6">
        <h3 className="text-lg font-medium text-white mb-6">Model Usage</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-3 text-sm font-medium text-gray-400">Model</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Requests</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Tokens</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Cost (USD)</th>
                <th className="pb-3 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modelUsage.map((item, index) => (
                <tr key={index} className="border-b border-gray-800/50">
                  <td className="py-3 text-white">{item.model}</td>
                  <td className="py-3 text-gray-300">{item.requests.toLocaleString()}</td>
                  <td className="py-3 text-gray-300">{item.tokens.toLocaleString()}</td>
                  <td className="py-3 text-gray-300">${item.cost}</td>
                  <td className="py-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      <BarChart className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Request Distribution</h3>
          <div className="h-56 bg-gray-800 rounded-md p-4 flex items-center justify-center" role="figure" aria-label="Request Distribution Pie Chart">
            <ChartContainer
              config={pieChartConfig}
              className="h-48 w-48"
            >
              <RechartsPieChart>
                <Pie
                  data={requestDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="requests"
                  nameKey="type"
                  label={({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
                    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                    return (
                      <text x={x} y={y} fill="#e5e7eb" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    );
                  }}
                >
                  {requestDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      index === 0 ? "#3b82f6" : 
                      index === 1 ? "#a855f7" : 
                      index === 2 ? "#10b981" : "#f59e0b"
                    } />
                  ))}
                </Pie>
                <RechartsTooltip 
                  content={({active, payload}) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                          <p className="font-medium text-white">{data.type}</p>
                          <p className="text-gray-400">{`${data.percentage}% (${data.requests} requests)`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartsPieChart>
            </ChartContainer>
          </div>
          <div className="flex justify-center mt-4 gap-4 text-xs text-gray-400">
            {requestDistributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  index === 0 ? 'bg-blue-500' : 
                  index === 1 ? 'bg-purple-500' : 
                  index === 2 ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <span>{item.type} ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="text-lg font-medium text-white mb-4">Cost Analysis</h3>
          <div className="h-56 bg-gray-800 rounded-md p-4 flex flex-col" role="figure" aria-label="Cost Analysis Stacked Bar Chart">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-white">$128.45</span>
              <span className="text-sm text-gray-400 ml-2">this month</span>
            </div>
            <ChartContainer
              config={costChartConfig}
              className="flex-1 h-full w-full"
            >
              <RechartsBarChart
                data={costAnalysisData}
                margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="compute" stackId="a" fill="#3b82f6" />
                <Bar dataKey="storage" stackId="a" fill="#a855f7" />
                <Bar dataKey="api" stackId="a" fill="#10b981" />
                <RechartsTooltip 
                  content={({active, payload, label}) => {
                    if (active && payload && payload.length) {
                      const total = payload.reduce((sum, entry) => sum + (Number(entry.value) || 0), 0);
                      return (
                        <div className="bg-gray-900 border border-gray-800 rounded px-3 py-2 text-xs">
                          <p className="font-medium text-white">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} className="text-gray-400">
                              {entry.name}: ${Number(entry.value).toFixed(2) || '0.00'}
                            </p>
                          ))}
                          <p className="text-white mt-1 border-t border-gray-700 pt-1">
                            Total: ${total.toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartsBarChart>
            </ChartContainer>
            <div className="flex justify-center gap-4 text-xs text-gray-400 mt-2">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                <span>Compute</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-1"></div>
                <span>Storage</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span>API</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}