"use client";

import React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Trash2, 
  PlusCircle,
  AlertCircle,
  Key,
  Check,
  Shield,
  Eye,
  EyeOff,
  MoreHorizontal,
  Clock,
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "active" | "revoked";
  usage?: number;
}

export function APIKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "mrch_N2M3ZTc5OGYtZGE3Ni00YmI5LWJkMzYtYTRl",
      created: "2024-04-15",
      lastUsed: "2024-05-01",
      status: "active",
      usage: 1243
    },
    {
      id: "2",
      name: "Development Environment",
      key: "mrch_ZDZhNzRlZTctNWY5Ny00OGJkLWI5NDQtNTJl",
      created: "2024-04-22",
      lastUsed: "2024-05-02",
      status: "active",
      usage: 567
    }
  ]);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKey, setNewKey] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState("active");
  
  const createNewKey = () => {
    if (!newKeyName) return;
    
    // In a real app, you would call your API to create a new key
    const generatedKey = `mrch_${generateRandomString(40)}`;
    setNewKey(generatedKey);
    
    // Add the new key to the list
    const newKeyObj = {
      id: Date.now().toString(),
      name: newKeyName,
      key: generatedKey,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "-",
      status: "active" as const,
      usage: 0
    };
    
    setKeys([newKeyObj, ...keys]);
    
    // Reset form
    setNewKeyName("");
  };
  
  const generateRandomString = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const deleteKey = (id: string) => {
    setKeys(keys.filter(key => key.id !== id));
  };

  const revokeKey = (id: string) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, status: "revoked" as const } : key
    ));
  };

  const renewKey = (id: string) => {
    setKeys(keys.map(key => 
      key.id === id ? { ...key, status: "active" as const } : key
    ));
  };
  
  const activeKeys = keys.filter(key => key.status === "active");
  const revokedKeys = keys.filter(key => key.status === "revoked");
  
  return (
    <div className="min-h-screen bg-black">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">API Keys</h1>
            <p className="text-gray-400">
              Manage your API keys for authentication with Moorcheh AI services.
            </p>
          </div>
          
          <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-gray-800 shadow-lg shadow-blue-900/10">
              <DialogTitle className="sr-only">API Keys</DialogTitle>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center">
                  <Key className="h-5 w-5 mr-2 text-blue-500" />
                  Create New API Key
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new API key to authenticate your requests to Moorcheh AI.
                </DialogDescription>
              </DialogHeader>
              
              {newKey ? (
                <div className="space-y-4">
                  <div className="rounded-md bg-gray-950 p-4 border border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="mr-2 font-mono text-sm truncate text-green-400">
                        {newKey}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard("new", newKey)}
                        className="h-8 text-gray-400 hover:text-white"
                      >
                        {copiedId === "new" ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-md text-yellow-500">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <p className="text-sm">
                      This key will only be displayed once. Please copy it now and store it securely.
                    </p>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      setShowNewKeyDialog(false);
                      setNewKey("");
                    }}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Key Name
                      </label>
                      <Input 
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="e.g., Production API, Development, Testing"
                        className="bg-gray-800 border-gray-700 text-white focus-visible:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500">
                        Choose a descriptive name to identify this key`&apos;`s purpose
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowNewKeyDialog(false)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={createNewKey}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!newKeyName}
                    >
                      Create Key
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <div className="mb-6 flex items-center justify-between">
            <TabsList className="bg-gray-900 border border-gray-800">
              <TabsTrigger 
                value="active" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                Active Keys ({activeKeys.length})
              </TabsTrigger>
              <TabsTrigger 
                value="revoked" 
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
              >
                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                Revoked Keys ({revokedKeys.length})
              </TabsTrigger>
            </TabsList>
            
          </div>
          
          <Card className="bg-gray-950 border-gray-800 overflow-hidden rounded-lg shadow-md shadow-blue-900/5">
            <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-gray-400 border-b border-gray-800">
              <div>NAME</div>
              <div>API KEY</div>
              <div>CREATED</div>
              <div>LAST USED</div>
              <div className="text-right">ACTIONS</div>
            </div>
            
            <TabsContent value="active" className="m-0 p-0">
              {activeKeys.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Key className="h-12 w-12 mx-auto mb-3 text-gray-700" />
                  <p>No active API keys</p>
                  <p className="text-sm text-gray-500 mt-1">Create one to get started</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {activeKeys.map((keyItem) => (
                    <div key={keyItem.id} className="grid grid-cols-5 gap-4 p-4 items-center text-white hover:bg-gray-900/50 transition-colors">
                      <div className="flex items-center">
                        <Badge className="bg-green-600/20 text-green-500 border border-green-800/20 mr-2">active</Badge>
                        {keyItem.name}
                      </div>
                      <div className="font-mono text-sm text-gray-400 flex items-center">
                        {showKeys[keyItem.id] ? (
                          <span className="truncate">{keyItem.key}</span>
                        ) : (
                          <span className="truncate">
                            {keyItem.key.substring(0, 8)}••••••••••••••••{keyItem.key.substring(keyItem.key.length - 4)}
                          </span>
                        )}
                        <div className="flex ml-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => toggleKeyVisibility(keyItem.id)}
                                  className="h-7 w-7 p-0 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full"
                                >
                                  {showKeys[keyItem.id] ? (
                                    <EyeOff className="h-3.5 w-3.5" />
                                  ) : (
                                    <Eye className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{showKeys[keyItem.id] ? "Hide" : "Reveal"} API Key</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => copyToClipboard(keyItem.id, keyItem.key)}
                                  className="h-7 w-7 p-0 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full"
                                >
                                  {copiedId === keyItem.id ? (
                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{copiedId === keyItem.id ? "Copied!" : "Copy API Key"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <div className="text-gray-400 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        {keyItem.created}
                      </div>
                      <div className="text-gray-400">{keyItem.lastUsed}</div>
                      <div className="flex justify-end items-center">
                        {keyItem.usage !== undefined && (
                          <Badge variant="outline" className="mr-3 border-gray-700 text-gray-400 text-xs">
                            {keyItem.usage.toLocaleString()} calls / 24h
                          </Badge>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-900 border-gray-800 text-gray-200">
                            <DropdownMenuItem 
                              onClick={() => copyToClipboard(keyItem.id, keyItem.key)}
                              className="hover:bg-gray-800 cursor-pointer"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => revokeKey(keyItem.id)}
                              className="hover:bg-gray-800 cursor-pointer text-red-400 hover:text-red-300"
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Revoke
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem 
                              onClick={() => deleteKey(keyItem.id)}
                              className="hover:bg-red-900/20 cursor-pointer text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="revoked" className="m-0 p-0">
              {revokedKeys.length === 0 ? (
                <div className="py-16 text-center text-gray-400">
                  <Shield className="h-12 w-12 mx-auto mb-3 text-gray-700" />
                  <p>No revoked API keys</p>
                  <p className="text-sm text-gray-500 mt-1">Revoked keys will appear here</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {revokedKeys.map((keyItem) => (
                    <div key={keyItem.id} className="grid grid-cols-5 gap-4 p-4 items-center text-white hover:bg-gray-900/50 transition-colors opacity-70">
                      <div className="flex items-center">
                        <Badge className="bg-red-900/20 text-red-500 border border-red-800/20 mr-2">revoked</Badge>
                        <span className="line-through">{keyItem.name}</span>
                      </div>
                      <div className="font-mono text-sm text-gray-500 flex items-center">
                        <span className="truncate line-through">
                          {keyItem.key.substring(0, 8)}••••••••••••••••{keyItem.key.substring(keyItem.key.length - 4)}
                        </span>
                      </div>
                      <div className="text-gray-500">{keyItem.created}</div>
                      <div className="text-gray-500">{keyItem.lastUsed}</div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-gray-900 border-gray-800 text-gray-200">
                            <DropdownMenuItem 
                              onClick={() => renewKey(keyItem.id)}
                              className="hover:bg-gray-800 cursor-pointer text-green-400"
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Reactivate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem 
                              onClick={() => deleteKey(keyItem.id)}
                              className="hover:bg-red-900/20 cursor-pointer text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Card>
        </Tabs>
        
        <div className="mt-6 bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm text-gray-400">
          <h3 className="font-medium text-gray-300 flex items-center mb-2">
            <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
            Security Recommendations
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-1 text-gray-500">
            <li>Store API keys securely and never expose them in client-side code</li>
            <li>Rotate keys regularly for enhanced security</li>
            <li>Use different keys for different environments (development, staging, production)</li>
            <li>Revoke unused or compromised keys immediately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}