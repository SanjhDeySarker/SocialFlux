import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (data) => api.post("/auth/register", data);
export const loginUser = async (data) => api.post("/auth/login", data);
export const schedulePost = async (data) => api.post("/posts/schedule", data);
export const getMetrics = async () => api.get("/metrics");

export default api;
