"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Key, 
  Copy, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  PlusCircle,
  RefreshCw,
  AlertCircle
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function APIKeys() {
  const [keys, setKeys] = useState([
    { 
      id: "1", 
      name: "Production API Key", 
      key: "mrch_ghhZNXpf9bjqrJU7a6JzbLuQk4PZsS32T9k", 
      created: "2024-04-15", 
      lastUsed: "2024-05-02", 
      status: "active" 
    },
    { 
      id: "2", 
      name: "Development API Key", 
      key: "mrch_cV8aKt2mJnPfZx5YwR3eBdG6hQs1L7pV", 
      created: "2024-04-10", 
      lastUsed: "2024-04-30", 
      status: "active" 
    },
    { 
      id: "3", 
      name: "Testing API Key", 
      key: "mrch_tH4rX9bNqPs2kM8zWv7cD1fJyUeLn3G", 
      created: "2024-03-25", 
      lastUsed: "2024-04-15", 
      status: "active" 
    }
  ]);
  
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [keyType, setKeyType] = useState("production");
  const [newKey, setNewKey] = useState("");
  
  const createNewKey = () => {
    if (!newKeyName) return;
    
    // In a real app, you would call your API to create a new key
    const generatedKey = `mrch_${generateRandomString(30)}`;
    setNewKey(generatedKey);
    
    // Add the new key to the list
    setKeys([
      ...keys,
      {
        id: (keys.length + 1).toString(),
        name: newKeyName,
        key: generatedKey,
        created: new Date().toISOString().split('T')[0],
        lastUsed: "-",
        status: "active"
      }
    ]);
    
    // Reset form
    setNewKeyName("");
    setKeyType("production");
  };
  
  const generateRandomString = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Would add toast notification here in a real app
  };
  
  const deleteKey = (id: string) => {
    setKeys(keys.filter(key => key.id !== id));
  };
  
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white font-saira">API Keys</h1>
        
        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#1e40af] hover:bg-blue-800 text-white">
              <PlusCircle className="h-4 w-4 mr-2" /> Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new API key to authenticate your requests.
              </DialogDescription>
            </DialogHeader>
            
            {newKey ? (
              <div className="space-y-4">
                <div className="rounded-md bg-gray-900 p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="mr-2 font-mono text-sm truncate text-green-400">
                      {newKey}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(newKey)}
                      className="h-8 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-900/20 border border-yellow-900/50 rounded-md text-yellow-500">
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  <p className="text-sm">
                    This key will only be displayed once. Make sure to copy it now.
                  </p>
                </div>
                <Button 
                  className="w-full bg-[#1e40af] hover:bg-blue-800 text-white"
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
                      placeholder="My API Key"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Key Type
                    </label>
                    <Select 
                      value={keyType} 
                      onValueChange={setKeyType}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600 text-white">
                        <SelectGroup>
                          <SelectItem value="production">Production</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewKeyDialog(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={createNewKey}
                    className="bg-[#1e40af] hover:bg-blue-800 text-white"
                    disabled={!newKeyName}
                  >
                    Create
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="bg-gray-800 border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Key className="h-5 w-5 text-[#1e40af] mr-2" />
            <h2 className="text-xl font-semibold text-white">Your API Keys</h2>
          </div>
          <p className="text-gray-400 mb-6">
            API keys are used to authenticate your API requests. Keep your keys secure and don't expose them in client-side code.
          </p>
          
          <div className="space-y-4">
            {keys.map((keyItem) => (
              <div 
                key={keyItem.id} 
                className="p-4 rounded-md bg-gray-900 border border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div className="mb-3 sm:mb-0">
                  <div className="flex items-center">
                    <h3 className="font-medium text-white">{keyItem.name}</h3>
                    <Badge className="ml-2 bg-green-900 text-green-400 hover:bg-green-900">
                      {keyItem.status}
                    </Badge>
                  </div>
                  <div className="flex mt-2">
                    <div className="font-mono text-sm text-gray-400">
                      {keyItem.key.substring(0, 8)}••••••••••••••••{keyItem.key.substring(keyItem.key.length - 4)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(keyItem.key)}
                      className="h-6 ml-1 text-gray-400 hover:text-white"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <div className="flex items-center mr-4">
                      <Clock className="h-3 w-3 mr-1" />
                      Created: {keyItem.created}
                    </div>
                    <div className="flex items-center">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Last used: {keyItem.lastUsed}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700 text-xs flex-shrink-0"
                    onClick={() => deleteKey(keyItem.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Revoke
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
} 