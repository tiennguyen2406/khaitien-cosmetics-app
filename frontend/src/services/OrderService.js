import axios from "axios";

const API_BASE_URL = "http://localhost:8010/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const OrderService = {
  // Lưu đơn hàng mới
  async saveOrder(order) {
    try {
      const token = localStorage.getItem("@token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await apiClient.post("/orders", order, { headers });
      if (response.data?.data) {
        return response.data.data;
      }
      return response.data;
    } catch (error) {
      console.warn("API Gateway offline, saving order to local storage fallback", error.message);
      // Fallback lưu cục bộ vào localStorage để không gián đoạn trải nghiệm của khách
      const localOrders = JSON.parse(localStorage.getItem("my_orders") || "[]");
      localOrders.unshift(order);
      localStorage.setItem("my_orders", JSON.stringify(localOrders));
      return order;
    }
  },

  // Lấy danh sách đơn hàng
  async getOrders() {
    try {
      const token = localStorage.getItem("@token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await apiClient.get("/orders/my-orders", { headers });
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.warn("API Gateway offline, reading orders from local storage fallback");
    }
    return JSON.parse(localStorage.getItem("my_orders") || "[]");
  },
};

export default OrderService;