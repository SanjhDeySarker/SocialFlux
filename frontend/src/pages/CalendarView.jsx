import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { fetchCalendarPosts, updatePostDate } from "../api/calendar";
import { useEffect, useState } from "react";
import EditPostModal from "../components/EditPostModal";
import toast from "react-hot-toast";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Load posts on mount
  useEffect(() => {
    fetchCalendarPosts().then((data) => {
      const mapped = data.map((post) => ({
        id: post.id,
        title: post.content.substring(0, 30) + "...",
        content: post.content,
        start: new Date(post.scheduled_at),
        end: new Date(post.scheduled_at),
        allDay: true,
      }));
      setEvents(mapped);
    });
  }, []);

  // Handle drag and drop
  const moveEvent = async ({ event, start }) => {
    try {
      await updatePostDate(event.id, start);
      toast.success("Post rescheduled ✔");
      setEvents(
        events.map((e) =>
          e.id === event.id ? { ...e, start, end: start } : e
        )
      );
    } catch (err) {
      toast.error("Failed to reschedule");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Calendar Scheduler</h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 650 }}
        onSelectEvent={(event) => setSelectedPost(event)}
        onEventDrop={moveEvent}
        resizable
        popup
        className="rounded-lg shadow bg-white dark:bg-gray-800 dark:text-gray-100"
        draggableAccessor={() => true}
      />

      {selectedPost && (
        <EditPostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSave={(updated) => {
            // Here a PUT request can be added to update post content
            toast.success("Post updated ✔");
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
}
