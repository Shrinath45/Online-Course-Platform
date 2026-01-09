import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ no trailing slash
  withCredentials: true, // ✅ safe for future cookie auth
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===== REQUEST INTERCEPTOR ===== */
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===== RESPONSE INTERCEPTOR ===== */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
