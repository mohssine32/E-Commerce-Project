import axios from "axios";

const axiosInstance = axios.create({
  // This was the issue - incorrect environment check and port number
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api", // ← VIRGULE ICI !
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;