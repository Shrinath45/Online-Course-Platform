import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Change if your backend runs on a different port or path
});

export default API;
