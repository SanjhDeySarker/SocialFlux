import React, { useState } from "react";
import { sendAIMessage } from "../api/backend";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    setMessages([...messages, { text: input, user: true }]);
    setInput("");

    try {
      const res = await sendAIMessage(input);
      setMessages((prev) => [...prev, { text: res.data.reply, user: false }]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "AI error", user: false }]);
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">AI Chat</h2>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.user ? "text-right text-blue-600" : "text-left text-gray-800"}>
            {m.text}
          </div>
        ))}
      </div>
      <input
        className="border p-2 rounded w-full mb-2"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI..."
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default AIChat;
