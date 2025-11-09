export default function ChatMessage({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div
      className={`p-3 max-w-xl rounded-xl ${
        isUser
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-200 text-gray-800"
      }`}
    >
      {text}
    </div>
  );
}
