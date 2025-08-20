/*import axios from "axios";
//Developpement envirnnement 


const axiosInstance = axios.create({
  // This was the issue - incorrect environment check and port number
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api", // ← VIRGULE ICI !
  withCredentials: true, // send cookies to the server
});

export default axiosInstance;*/
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ex: https://e-commerce-project-production-c237.up.railway.app/api
  withCredentials: true,
});

export default axiosInstance;