
import { CodeBlockCommand } from "@/components/ui/code-block-command";

interface SDKCodeBlockProps {
  code: string;
}

export function SDKCodeBlock({ code }: SDKCodeBlockProps) {
  return (
    <div className="sdk-code-block">
      <CodeBlockCommand
        __npmCommand__={code}
        __yarnCommand__={code}
        __pnpmCommand__={code}
        __bunCommand__={code}
      />

      {/* Custom styles for the SDK code blocks */}
      <style jsx global>{`
        .sdk-code-block .bg-zinc-950 {
          background-color: #193366; /* Dark blue background */
        }
        .sdk-code-block .bg-zinc-900 {
          background-color: #1e40af; /* Blue header background */
        }
        .sdk-code-block .border-zinc-800 {
          border-color: #2563eb; /* Border color */
        }
        .sdk-code-block .text-zinc-400 {
          color: #93c5fd; /* Tab text color */
        }
        .sdk-code-block .data-\[state\=active\]\:border-b-zinc-50 {
          border-color: #ffffff !important; /* Active tab border */
        }
        .sdk-code-block .data-\[state\=active\]\:text-zinc-50 {
          color: #ffffff !important; /* Active tab text */
        }
        .sdk-code-block .hover\:bg-zinc-700:hover {
          background-color: #3b82f6 !important; /* Copy button hover */
        }
      `}</style>
    </div>
  );
}