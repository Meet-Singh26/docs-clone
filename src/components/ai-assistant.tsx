"use client";

import { useState } from "react";
import { X, Loader2, Send, CopyIcon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { editor } = useEditorStore();

  const simulateTyping = (fullText: string) => {
    let currentIndex = -1;
    setResponse("");
    setPrompt("")

    const typingInterval = setInterval(() => {
      setResponse((prev) => prev + fullText.charAt(currentIndex));
      currentIndex++;

      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 15);

    setTimeout(
      () => clearInterval(typingInterval),
      fullText.length * 15 + 2000,
    );
  };

  const handleAskAI = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("");

    const documentContext =
      editor?.getText() || "The document is currently empty.";

    // Using Promises and Fetch for the network request
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, documentContext }),
      });

      // FIX: Read as plain text first to avoid crashing on HTML error pages
      const textResponse = await res.text();

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Server returned non-JSON:", textResponse);
        setResponse(
          "Error: The server returned an invalid format (likely an HTML error page or Auth redirect). Check your server console.",
        );
        setIsLoading(false);
        return;
      }

      if (res.ok) {
        simulateTyping(data.text);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResponse(
        "An unexpected network error occurred while contacting the AI.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col transition-all duration-300">
          <div className="bg-blue-600 dark:bg-blue-800 p-3 flex justify-between items-center text-white">
            <div className="flex items-center gap-2 font-medium">
              <Image
                src="/gemini-icon.png"
                height={35}
                width={35}
                alt="AI Logo"
              />
              Docs AI
            </div>
            <div>
              <button
              onClick={() => {navigator.clipboard.writeText(response)
                toast.success("Copied to clipboard")
              }}
              className="hover:bg-white/20 p-1 rounded-full transition"
            >
              <CopyIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 ml-3 rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>
            </div>
            
          </div>

          <div className="p-4 h-64 overflow-y-auto text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-950">
            {response ? (
              <div
                className="prose dark:prose-invert prose-sm max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: response }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-neutral-400 opacity-70">
                <Image
                  src="/gemini-icon.png"
                  height={70}
                  width={70}
                  alt="AI Logo"
                />
                <p>Ask me to summarize, rewrite, or analyze this document!</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
              placeholder="Ask something..."
              className="flex-1 bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              disabled={isLoading}
            />
            <Button
              onClick={handleAskAI}
              disabled={isLoading || !prompt.trim()}
              size="icon"
              className="rounded-full shrink-0 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-transform hover:scale-105 active:scale-95"
      >
        <Image src="/gemini-icon.png" height={35} width={35} alt="AI Logo" />
      </Button>
    </div>
  );
};
