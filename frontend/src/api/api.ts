import axios from "axios";

const api = axios.create({
  baseURL: "https://sql-analytics-platform-x6e2.onrender.com",
});

export default api;