'use client';
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  BarChart3,
  Key,
  MessageSquare,
  FileText,
  Clock,
  ArrowUpRight,
  Command,
  Cpu,
  Code,
  Info,
  ChevronRight
} from "lucide-react";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-500 mr-3 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Moorcheh</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="/console" className="text-sm font-medium text-white">Dashboard</a>
              <a href="/console/playground" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Playground</a>
              <a href="/console/api-keys" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">API Keys</a>
              <a href="/console/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Documentation</a>
            </nav>
            
            <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <Command className="h-4 w-4 mr-2" />
              <span>Quick Actions</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">Monitor your Edge AI usage and performance metrics</p>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="usage" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                Usage
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                Performance
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Quick stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <QuickStatCard 
              title="Total Requests" 
              value="23,456" 
              change="+12%" 
              positive={true}
              icon={Activity}
            />
            <QuickStatCard 
              title="Average Latency" 
              value="245ms" 
              change="-18%" 
              positive={true}
              icon={Clock}
            />
            <QuickStatCard 
              title="Active API Keys" 
              value="3" 
              change="0%" 
              positive={true}
              icon={Key}
            />
            <QuickStatCard 
              title="Chat Sessions" 
              value="158" 
              change="+24%" 
              positive={true}
              icon={MessageSquare}
            />
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Usage chart */}
            <Card className="bg-gray-900 border-gray-800 p-6 col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Request Volume</h3>
                  <p className="text-sm text-gray-400">Hourly requests over the past 24 hours</p>
                </div>
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  View Details
                </Button>
              </div>
              
              {/* Chart placeholder */}
              <div className="bg-gray-800 rounded-md h-64 flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-gray-600" />
                <span className="text-gray-500 ml-2">Usage Chart</span>
              </div>
            </Card>
            
            {/* Quick actions */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <ActionLink
                  title="Create API Key"
                  description="Generate new credentials"
                  icon={Key}
                  href="/console/api-keys/new"
                />
                <ActionLink
                  title="Open Playground"
                  description="Test models in real-time"
                  icon={Code}
                  href="/console/playground"
                />
                <ActionLink
                  title="View Documentation"
                  description="Integration guides & references"
                  icon={FileText}
                  href="/console/docs"
                />
                <ActionLink
                  title="Explore Models"
                  description="See available edge AI models"
                  icon={Cpu}
                  href="/console/models"
                />
              </div>
            </Card>
            
            {/* Recent activity */}
            <Card className="bg-gray-900 border-gray-800 p-6 col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                <ActivityItem
                  title="API Key Created"
                  description="New key generated for Production environment"
                  time="10 minutes ago"
                />
                <ActivityItem
                  title="Model Invocation"
                  description="anthropic.claude-3-7-sonnet-20250219 - 42 requests"
                  time="25 minutes ago"
                />
                <ActivityItem
                  title="Document Uploaded"
                  description="customer-feedback.csv (2.4 MB)"
                  time="1 hour ago"
                />
                <ActivityItem
                  title="Config Updated"
                  description="Modified system prompt for edge deployment"
                  time="3 hours ago"
                />
              </div>
            </Card>
            
            {/* Getting started */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                  <Info className="h-6 w-6" />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Getting Started</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    New to Moorcheh? Follow these steps to integrate edge AI into your applications:
                  </p>
                  
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xs">
                        1
                      </div>
                      <span className="text-gray-300">Create an API key for authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xs">
                        2
                      </div>
                      <span className="text-gray-300">Select a model in the playground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 text-xs">
                        3
                      </div>
                      <span className="text-gray-300">Use our client libraries to connect</span>
                    </li>
                  </ol>
                  
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    View Documentation
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickStatCard({ title, value, change, positive, icon: Icon }) {
  return (
    <Card className="bg-gray-900 border-gray-800 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          <div className={`mt-1 flex items-center text-xs ${positive ? 'text-green-500' : 'text-red-500'}`}>
            {change}
            <span className="ml-2 text-gray-500 text-xs">vs. last week</span>
          </div>
        </div>
        <div className="p-2 rounded-md bg-gray-800">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
      </div>
    </Card>
  );
}

function ActionLink({ title, description, icon: Icon, href }) {
  return (
    <a 
      href={href}
      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-800 transition-colors"
    >
      <div className="flex items-center">
        <div className="p-2 rounded-md bg-gray-800 mr-3">
          <Icon className="h-4 w-4 text-blue-400" />
        </div>
        <div>
          <p className="font-medium text-gray-200">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-600" />
    </a>
  );
}

function ActivityItem({ title, description, time }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-800 transition-colors">
      <div className="p-2 rounded-full bg-gray-800">
        <Activity className="h-3 w-3 text-blue-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-200">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
}