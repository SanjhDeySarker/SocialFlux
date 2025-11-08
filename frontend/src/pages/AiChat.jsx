import { useState } from "react";
import { MessageCircle, SendHorizonal } from "lucide-react";
import api from "../api/backend";

export default function AiChat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I’m your AI assistant. Provide your Gemini API key to begin analyzing your social account." },
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/analyze", {
        gemini_key: apiKey,
        query: input,
      });

      const aiResponse =
        res.data.response || "No AI response received. Please check your Gemini API key.";
      setMessages((prev) => [...prev, { sender: "bot", text: aiResponse }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error: Could not contact AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <MessageCircle className="text-blue-600" /> AI Account Analyzer
        </div>
      </header>

      {/* Gemini Key Input */}
      <div className="p-4 bg-gray-100 border-b">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key here"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 max-w-xl rounded-xl ${
              m.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center p-4 bg-white border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask AI about your account..."
          className="flex-1 border rounded-l-lg p-2 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center gap-2"
        >
          <SendHorizonal size={18} />
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
