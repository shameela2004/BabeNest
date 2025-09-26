// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://localhost:7213/api", // your backend URL
//   withCredentials: true, // ✅ send cookies automatically
// });

// // Add interceptor to include token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;






import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7213/api",
  withCredentials: true, // send cookies automatically
});

// Request interceptor: attach access token
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

// Response interceptor: auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Prevent infinite loop
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint (uses HttpOnly cookie)
        const refreshRes = await api.post("/auth/refresh");
        const data = refreshRes.data.data;

        if (!data?.accessToken) {
          throw new Error("No access token in refresh response");
        }

        // Save new token
        localStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

        // Retry the failed request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        // Refresh failed → logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
