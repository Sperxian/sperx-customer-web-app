import axios, { AxiosInstance } from "axios";

/**
 * Get the base URL for API requests
 * Supports both server and client-side environments
 */
function getBaseURL(): string {
  // In server components or server-side code
  if (typeof window === "undefined") {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      // "http://localhost:3001"
      "http://192.18.254.102:3001"
    );
  }

  // In client-side code
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
}
/**
 * Create and configure axios instance
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor - add auth tokens or other headers
 */
apiClient.interceptors.request.use(
  (config) => {
    // Add any request-level configuration here
    // Example: add auth token
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    }

    if (error.response?.status === 500) {
      // Handle server errors
      console.error("Server error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
