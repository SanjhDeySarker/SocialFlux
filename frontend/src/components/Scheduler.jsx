import { useState } from "react";
import { schedulePost } from "../api/backend";

export default function Scheduler() {
  const [content, setContent] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const handleSchedule = async () => {
    try {
      await schedulePost({ content, scheduled_at: scheduledAt || null });
      alert("Post scheduled!");
    } catch (err) {
      console.error(err);
      alert("Error scheduling post");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-semibold">Schedule a Post</h1>
      <textarea
        placeholder="Write your post content..."
        className="w-full border p-2 rounded h-40"
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border p-2 rounded w-full"
        onChange={(e) => setScheduledAt(e.target.value)}
      />
      <button
        onClick={handleSchedule}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Schedule
      </button>
    </div>
  );
}
