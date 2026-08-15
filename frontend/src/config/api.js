import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});


export const resolveImageUrl = (imageURL) => {
  if (!imageURL) return "https://via.placeholder.com/400x400?text=Sereine+De+Femme";
  if (imageURL.startsWith("http")) return imageURL;
  return `${API_BASE_URL}${imageURL.startsWith("/") ? "" : "/"}${imageURL}`;
};

export default api;
