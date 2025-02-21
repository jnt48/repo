"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  sender: "user" | "edith";
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the bottom on new messages.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    // Append the user's message.
    const userMessage: Message = { id: Date.now(), sender: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send the question to your API endpoint.
      const response = await fetch("http://127.0.0.1:8000/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const edithMessage: Message = { id: Date.now() + 1, sender: "edith", content: data.response };
      setMessages((prev) => [...prev, edithMessage]);
    } catch (error: unknown) {
      const errorMessage: Message = { id: Date.now() + 2, sender: "edith", content: `Error: ${(error as Error).message}` };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="max-w-3xl mx-auto flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">
            Edith - Your AI Coding Mentor
          </h1>
        </div>
        {/* Chat Messages */}
        <div className="flex-grow p-6 overflow-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-md p-4 rounded-2xl shadow-lg transition-all duration-300 
                  ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-md p-4 rounded-2xl shadow-lg bg-gray-200 text-gray-900 flex items-center space-x-2">
                <span className="animate-pulse">Edith is typing</span>
                <span className="animate-bounce">...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div className="p-4 bg-gray-100 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;