import axios from "axios";

const API_URL = "http://localhost:8000"; // adjust for backend

export async function getAnalytics() {
  try {
    const res = await axios.get(`${API_URL}/analytics`);
    return res.data;
  } catch (err) {
    console.error("Analytics fetch failed, using mock data.");
    return MOCK_ANALYTICS;
  }
}

// Fallback mock data so UI always works
export const MOCK_ANALYTICS = {
  postsPerDay: [
    { date: "Mon", count: 4 },
    { date: "Tue", count: 2 },
    { date: "Wed", count: 6 },
    { date: "Thu", count: 3 },
    { date: "Fri", count: 5 },
  ],
  postsByPlatform: [
    { platform: "Facebook", value: 30 },
    { platform: "Instagram", value: 20 },
    { platform: "LinkedIn", value: 10 },
    { platform: "Twitter", value: 40 },
  ],
  engagementTrend: [
    { day: "Mon", likes: 120, comments: 20 },
    { day: "Tue", likes: 80, comments: 12 },
    { day: "Wed", likes: 150, comments: 25 },
    { day: "Thu", likes: 90, comments: 10 },
    { day: "Fri", likes: 200, comments: 30 },
  ],
};
