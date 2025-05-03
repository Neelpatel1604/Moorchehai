'use client';
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function APISection() {
  const apiMethods = [
    {
      category: "Namespace Management",
      methods: [
        {
          name: "create_namespace",
          signature: "create_namespace(namespace_name, type, vector_dimension=None)",
          description: "Create a new namespace for storing text or vectors",
          example: `# Create a text namespace
client.create_namespace(namespace_name="my-text-namespace", type="text")

# Create a vector namespace with specified dimensions
client.create_namespace(
    namespace_name="my-vector-namespace", 
    type="vector",
    vector_dimension=384
)`
        },
        {
          name: "list_namespaces",
          signature: "list_namespaces()",
          description: "List all namespaces in your account",
          example: `# Get all namespaces
namespaces = client.list_namespaces()
print(namespaces)`
        },
        {
          name: "delete_namespace",
          signature: "delete_namespace(namespace_name)",
          description: "Delete a namespace and all its contents",
          example: `# Delete a namespace
client.delete_namespace(namespace_name="my-namespace")`
        },
      ],
    },
    {
      category: "Data Ingestion",
      methods: [
        {
          name: "upload_documents",
          signature: "upload_documents(namespace_name, documents)",
          description: "Upload text documents for automatic embedding and indexing",
          example: `# Upload text documents
documents = [
    {"id": "doc1", "text": "This document is about artificial intelligence."},
    {"id": "doc2", "text": "Vector databases enable efficient similarity search."}
]
result = client.upload_documents(namespace_name="my-namespace", documents=documents)
print(result)  # {'status': 'success'}`
        },
        {
          name: "upload_vectors",
          signature: "upload_vectors(namespace_name, vectors)",
          description: "Upload pre-computed vectors directly",
          example: `# Upload pre-computed vectors
vectors = [
    {"id": "vec1", "vector": [0.1, 0.2, 0.3, 0.4]},
    {"id": "vec2", "vector": [0.5, 0.6, 0.7, 0.8]}
]
result = client.upload_vectors(namespace_name="my-vector-namespace", vectors=vectors)
print(result)  # {'status': 'success'}`
        },
      ],
    },
    {
      category: "Semantic Search",
      methods: [
        {
          name: "search",
          signature: "search(namespaces, query, top_k=10, threshold=None, kiosk_mode=False)",
          description: "Perform similarity search across specified namespaces",
          example: `# Search with text query
results = client.search(
    namespaces=["my-namespace"], 
    query="How do vector databases work?",
    top_k=3,
    threshold=0.7
)

# Search with vector query
vector_query = [0.1, 0.2, 0.3, 0.4]  # Your vector
results = client.search(
    namespaces=["my-vector-namespace"],
    query=vector_query,
    top_k=5
)`
        },
      ],
    },
    {
      category: "Data Deletion",
      methods: [
        {
          name: "delete_documents",
          signature: "delete_documents(namespace_name, ids)",
          description: "Delete documents from a text namespace by their IDs",
          example: `# Delete specific documents by ID
client.delete_documents(
    namespace_name="my-text-namespace", 
    ids=["doc1", "doc2"]
)`
        },
        {
          name: "delete_vectors",
          signature: "delete_vectors(namespace_name, ids)",
          description: "Delete vectors from a vector namespace by their IDs",
          example: `# Delete specific vectors by ID
client.delete_vectors(
    namespace_name="my-vector-namespace", 
    ids=["vec1", "vec2"]
)`
        },
      ],
    },
  ];

  return (
    <div className="bg-[#f8fafc] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">API Reference</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Client Methods
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            The <code className="text-sm font-mono bg-gray-100 p-1 rounded">MoorchehClient</code> class provides the following methods
          </p>
        </div>

        <div className="mt-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            {apiMethods.map((category, idx) => (
              <Card key={idx} className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-xl font-semibold leading-6 text-gray-900">{category.category}</h3>
                  <div className="mt-6 space-y-8">
                    {category.methods.map((method, methodIdx) => (
                      <div key={methodIdx} className="border-t pt-4 first:border-t-0 first:pt-0">
                        <Tabs defaultValue="description" className="w-full">
                          <TabsList>
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="example">Example</TabsTrigger>
                          </TabsList>
                          <TabsContent value="description">
                            <div className="p-4 rounded-md">
                              <h4 className="text-md font-medium text-gray-900">{method.name}</h4>
                              <div className="mt-2 bg-gray-50 p-2 rounded-md">
                                <code className="text-sm font-mono">{method.signature}</code>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">{method.description}</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="example">
                            <div className="mt-2">
                              <div className="sdk-code-block group relative">
                                <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md">
                                  <code>{method.example}</code>
                                </pre>
                                <CopyButton 
                                  value={method.example} 
                                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                                />
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .sdk-code-block .bg-zinc-950 {
          background-color: #193366 !important;
        }
        .sdk-code-block .bg-zinc-900 {
          background-color: #1e40af !important;
        }
        .sdk-code-block .border-zinc-800 {
          border-color: #2563eb !important;
        }
        .sdk-code-block pre, .sdk-code-block code {
          color: #ffffff !important;
        }
        .sdk-code-block .text-zinc-400 {
          color: #d1d5db !important;
        }
        .sdk-code-block .data-[state=active]:text-zinc-50 {
          color: #ffffff !important;
        }
      `}</style>
    </div>
  );
}
