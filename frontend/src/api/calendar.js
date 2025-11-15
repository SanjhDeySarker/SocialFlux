import axios from "axios";

const API_URL = "http://localhost:8000";

export async function fetchCalendarPosts() {
  const res = await axios.get(`${API_URL}/posts/calendar`);
  return res.data;
}

export async function updatePostDate(id, newDate) {
  const res = await axios.put(`${API_URL}/posts/reschedule/${id}`, {
    scheduled_at: newDate,
  });
  return res.data;
}
