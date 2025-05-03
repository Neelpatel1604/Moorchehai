'use client';
import { Card } from "@/components/ui/card";
import { CodeBlockCommand } from "@/components/ui/code-block-command";
import { CopyButton } from "@/components/ui/copy-button";

export function InstallationSection() {
  const developmentSetup = `# Clone the repository
git clone https://github.com/mjfekri/moorcheh-python-sdk.git
cd moorcheh-python-sdk

# Install dependencies with poetry
poetry install --with dev`;

  return (
    <div className="bg-[#f8fafc] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-[#1e40af] font-semibold tracking-wide uppercase">Installation</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Quick and easy setup
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get started with the SDK in just a few steps
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="space-y-8">
            <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Install via package manager</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Install the SDK using your preferred package manager.</p>
                </div>
                <div className="mt-3 sdk-code-block font-mono">
                  <CodeBlockCommand
                    __npmCommand__="npm install moorcheh-sdk"
                    __yarnCommand__="yarn add moorcheh-sdk"
                    __pnpmCommand__="pnpm add moorcheh-sdk"
                    __bunCommand__="bun add moorcheh-sdk"
                  />
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Development setup</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>For development or contribution, clone and install using Poetry.</p>
                </div>
                <div className="mt-3">
                  <div className="sdk-code-block group relative">
                    <pre className="overflow-x-auto p-4 bg-[#193366] text-white rounded-md font-mono">
                      <code>{developmentSetup}</code>
                    </pre>
                    <CopyButton 
                      value={developmentSetup} 
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
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
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
