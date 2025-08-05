
import axios from "axios";

const axiosInstance = axios.create({
  // This was the issue - incorrect environment check and port number
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;
