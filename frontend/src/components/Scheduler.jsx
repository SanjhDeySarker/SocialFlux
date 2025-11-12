import { useState } from "react";
import { schedulePost } from "../api/backend";
import toast from "react-hot-toast";

export default function Scheduler() {
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSchedule = async () => {
    if (!content.trim()) return toast.error("Please write some content!");
    try {
      await schedulePost({ content, scheduled_at: scheduledAt || null });
      toast.success("🎉 Post scheduled successfully!");
      setContent("");
      setScheduledAt("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to schedule post.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4 transition">
      <h1 className="text-2xl font-semibold">Schedule a Post</h1>
      <textarea
        placeholder="Write your post content..."
        className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded h-40 bg-transparent focus:ring-2 focus:ring-blue-500 transition"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full bg-transparent focus:ring-2 focus:ring-blue-500 transition"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
      />
      <button
        onClick={handleSchedule}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-transform active:scale-95"
      >
        Schedule Post
      </button>
    </div>
  );
}
