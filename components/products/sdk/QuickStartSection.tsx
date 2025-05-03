'use client';
import { Card } from "@/components/ui/card";
import { CodeBlockCommand } from "@/components/ui/code-block-command";
import { CopyButton } from "@/components/ui/copy-button";

export function QuickStartSection() {
  const pythonExample = `import os
import logging
from moorcheh_sdk import MoorchehClient, MoorchehError, ConflictError

# Configure basic logging to see SDK messages
logging.basicConfig(level=logging.INFO)

# Ensure MOORCHEH_API_KEY is set as an environment variable
api_key = os.environ.get("MOORCHEH_API_KEY")
if not api_key:
    print("Error: MOORCHEH_API_KEY environment variable not set.")
    exit()

try:
    # Use the client as a context manager for automatic connection closing
    with MoorchehClient(api_key=api_key) as client:
        # 1. Create a namespace
        namespace_name = "my-first-namespace"
        print(f"Attempting to create namespace: {namespace_name}")
        try:
            client.create_namespace(namespace_name=namespace_name, type="text")
            print(f"Namespace '{namespace_name}' created.")
        except ConflictError:
            print(f"Namespace '{namespace_name}' already exists.")
        except MoorchehError as e:
            print(f"Error creating namespace: {e}")
            exit()

        # 2. List namespaces
        print("\nListing namespaces...")
        ns_list = client.list_namespaces()
        print("Available namespaces:")
        for ns in ns_list.get('namespaces', []):
            print(f" - {ns.get('namespace_name')} (Type: {ns.get('type')})")

        # 3. Upload a document
        print(f"\nUploading document to '{namespace_name}'...")
        docs = [{"id": "doc1", "text": "This is the first document about Moorcheh."}]
        upload_res = client.upload_documents(namespace_name=namespace_name, documents=docs)
        print(f"Upload status: {upload_res.get('status')}")

        # Add a small delay for processing before searching
        import time
        print("Waiting briefly for processing...")
        time.sleep(2)

        # 4. Search the namespace
        print(f"\nSearching '{namespace_name}' for 'Moorcheh'...")
        search_res = client.search(namespaces=[namespace_name], query="Moorcheh", top_k=1)
        print("Search results:")
        print(search_res)

        # 5. Delete the document
        print(f"\nDeleting document 'doc1' from '{namespace_name}'...")
        delete_res = client.delete_documents(namespace_name=namespace_name, ids=["doc1"])
        print(f"Delete status: {delete_res.get('status')}")`;

  const authExample = `# Set the API key as an environment variable (recommended)
import os
os.environ["MOORCHEH_API_KEY"] = "YOUR_API_KEY_HERE"

# Or provide it directly to the constructor
from moorcheh_sdk import MoorchehClient
client = MoorchehClient(api_key="YOUR_API_KEY_HERE")`;

  const namespaceExample = `# Create a text namespace (automatic embeddings)
client.create_namespace(namespace_name="my-text-namespace", type="text")

# Create a vector namespace (for pre-computed vectors)
client.create_namespace(
    namespace_name="my-vector-namespace", 
    type="vector",
    vector_dimension=384
)`;

  const documentExample = `# Upload text documents
documents = [
    {"id": "doc1", "text": "This document is about artificial intelligence."},
    {"id": "doc2", "text": "Vector databases enable efficient similarity search."}
]
result = client.upload_documents(namespace_name="my-text-namespace", documents=documents)
print(result)  # {'status': 'success'}

# Search across namespaces with a text query
results = client.search(
    namespaces=["my-text-namespace"], 
    query="How do vector databases work?",
    top_k=3,  # Return top 3 results
    threshold=0.7  # Minimum similarity score
)
print(results)`;

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Quick Start</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Start using the SDK in minutes
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            This example demonstrates the basic usage after installing the SDK
          </p>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Install via package manager</h3>
              <div className="mt-3 sdk-code-block">
                <CodeBlockCommand
                  __npmCommand__="npm install moorcheh-sdk"
                  __yarnCommand__="yarn add moorcheh-sdk"
                  __pnpmCommand__="pnpm add moorcheh-sdk"
                  __bunCommand__="bun add moorcheh-sdk"
                />
              </div>
            </div>
          </Card>

          <Card className="mt-8 overflow-hidden border border-gray-200 rounded-lg shadow-sm">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Authentication</h3>
              <div className="mt-3">
                <div className="sdk-code-block group relative">
                  <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md">
                    <code>{authExample}</code>
                  </pre>
                  <CopyButton 
                    value={authExample} 
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-8">
            <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Creating Namespaces</h3>
                <div className="mt-3">
                  <div className="sdk-code-block group relative">
                    <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md">
                      <code>{namespaceExample}</code>
                    </pre>
                    <CopyButton 
                      value={namespaceExample} 
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Document Management</h3>
                <div className="mt-3">
                  <div className="sdk-code-block group relative">
                    <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md">
                      <code>{documentExample}</code>
                    </pre>
                    <CopyButton 
                      value={documentExample} 
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Complete example</h3>
                <div className="mt-3">
                  <div className="sdk-code-block group relative">
                    <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md">
                      <code>{pythonExample}</code>
                    </pre>
                    <CopyButton 
                      value={pythonExample} 
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>
            </Card>
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
