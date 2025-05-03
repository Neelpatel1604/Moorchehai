'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Clock,
  FileText,
  FolderPlus,
  Search,
  Trash2,
  Upload,
  File,
  Info,
  Plus
} from "lucide-react";

export function Documents() {
  // Document management state
  const [documents, setDocuments] = useState([
    { id: "1", name: "Product Specifications.pdf", size: "2.4 MB", lastModified: "2024-05-01", type: "application/pdf" },
    { id: "2", name: "Customer Survey Results.xlsx", size: "1.8 MB", lastModified: "2024-04-28", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { id: "3", name: "User Manual.docx", size: "3.5 MB", lastModified: "2024-04-25", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { id: "4", name: "Technical Whitepaper.pdf", size: "5.2 MB", lastModified: "2024-04-22", type: "application/pdf" },
    { id: "5", name: "Quarterly Report.pdf", size: "4.1 MB", lastModified: "2024-04-20", type: "application/pdf" }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Simulate file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add new document(s) to the list
          const newDocs = Array.from(files).map((file, index) => ({
            id: (documents.length + index + 1).toString(),
            name: file.name,
            size: formatFileSize(file.size),
            lastModified: new Date().toISOString().split('T')[0],
            type: file.type
          }));
          
          setDocuments(prev => [...newDocs, ...prev]);
          setIsUploading(false);
          
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  
  // Handle document deletion
  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  // Determine file icon based on file type
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileText className="h-5 w-5 text-green-500" />;
    if (type.includes('word') || type.includes('document')) return <FileText className="h-5 w-5 text-blue-500" />;
    return <File className="h-5 w-5 text-gray-400" />;
  };
  
  return (
    <div className="flex flex-col h-screen bg-black">
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Documents</h2>
              <p className="text-gray-400 mt-1">Upload and manage documents to chat with using Moorcheh AI</p>
            </div>
            
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search documents..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-gray-900 border-gray-800 text-white"
                />
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        multiple
                      />
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Upload PDF, DOCX, XLSX, TXT, or CSV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {isUploading && (
            <Card className="p-4 mb-4 bg-gray-900 border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-300 flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-blue-500 animate-pulse" />
                  Uploading document...
                </p>
                <span className="text-sm text-gray-400">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-200" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </Card>
          )}
          
          <Card className="p-6 bg-gray-950 border-gray-800">
            {filteredDocuments.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center">
                <FolderPlus className="h-16 w-16 text-gray-700 mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">No documents found</h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  {searchQuery ? "No documents match your search. Try with a different query." : "Upload documents to get started. Moorcheh AI can analyze and chat about your documents."}
                </p>
                {!searchQuery && (
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      multiple
                    />
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-7 text-xs font-medium text-gray-500 pb-2 border-b border-gray-800">
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Last Modified</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                
                <ScrollArea className="max-h-[calc(100vh-320px)] overflow-y-auto pr-4 -mr-4">
                  <div className="space-y-1 pt-2">
                    {filteredDocuments.map(doc => (
                      <div 
                        key={doc.id} 
                        className="grid grid-cols-7 items-center py-3 border-b border-gray-800/50 text-sm"
                      >
                        <div className="col-span-3 flex items-center">
                          {getFileIcon(doc.type)}
                          <span className="ml-3 text-gray-200 line-clamp-1">{doc.name}</span>
                        </div>
                        <div className="col-span-2 text-gray-400 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-2 text-gray-500" />
                          {doc.lastModified}
                        </div>
                        <div className="col-span-1 text-gray-400">
                          {doc.size}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-800"
                                  onClick={() => handleDeleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Document</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </Card>
          
          <Card className="p-6 bg-gray-950 border-gray-800">
            <div className="flex items-start">
              <div className="mr-4 mt-1">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">About Document Processing</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Moorcheh AI can analyze and understand your uploaded documents to provide context-relevant responses.
                  When Kiosk Mode is enabled in Playground, responses will be restricted to questions about these documents.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    <FileText className="h-3 w-3 mr-1" /> PDF Support
                  </Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    <FileText className="h-3 w-3 mr-1" /> DOCX Support
                  </Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    <FileText className="h-3 w-3 mr-1" /> TXT Support
                  </Badge>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    <FileText className="h-3 w-3 mr-1" /> CSV Support
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 