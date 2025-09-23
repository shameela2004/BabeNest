import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7213/api", // your backend URL
  withCredentials: true, // ✅ send cookies automatically
});

// Add interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
