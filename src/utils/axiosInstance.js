import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(response => response, error => {
  const structuredError = {
    status: error.response?.status || 0,
    message:
        error.response?.data?.message ||
        (error.request
          ? "Network error. Please check your connection."
          : error.message),
      details: error.response?.data || null,
      timestamp: new Date().toISOString(),
  }
   return Promise.reject(structuredError);
})

export default axiosInstance;
