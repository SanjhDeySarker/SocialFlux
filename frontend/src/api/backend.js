import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // Backend FastAPI
});

// Test connection
export const getRoot = () => API.get("/");

// Posts API
export const createPost = (post) => API.post("/posts", post);
export const getScheduledPosts = () => API.get("/posts/scheduled");

// AI Chat API
export const sendAIMessage = (message) => API.post("/ai/chat", { message });
