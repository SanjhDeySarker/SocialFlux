import { useState } from "react";
import { MessageCircle, SendHorizonal, X } from "lucide-react";
import api from "../api/backend";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your AI assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/analyze", {
        gemini_key: apiKey,
        query: input,
      });
      const botMsg = {
        sender: "bot",
        text: res.data.response || "🤖 No response from AI.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error: Cannot reach AI service." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-50"
      >
        <MessageCircle size={28} />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-96 rounded-2xl shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b p-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <MessageCircle className="text-blue-600" />
                SocialFlux AI Assistant
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X />
              </button>
            </div>

            {/* Gemini API Key Input */}
            <div className="p-3 border-b">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full border p-2 rounded text-sm"
              />
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 h-80">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl max-w-[80%] ${
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
            <div className="flex items-center p-3 border-t">
              <input
                type="text"
                placeholder="Ask AI something..."
                className="flex-1 border rounded-l-lg p-2 outline-none text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 text-white px-3 py-2 rounded-r-lg flex items-center gap-1"
              >
                {loading ? "..." : <SendHorizonal size={18} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
