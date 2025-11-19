import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if present
instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
