import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8010/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: đính kèm Bearer token nếu có
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@token") || localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: xử lý phản hồi tập trung
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Phiên đăng nhập đã hết hạn hoặc không hợp lệ");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
