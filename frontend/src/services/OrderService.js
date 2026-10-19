import apiClient from "./apiClient";

export const OrderService = {
  // Lưu đơn hàng mới lên API Gateway / Backend MongoDB
  async saveOrder(order) {
    const payload = {
      items: (order.items || []).map((i) => ({
        productId: String(i.id || i.sku || "1"),
        sku: String(i.sku || i.id || "SP1"),
        name: i.name || "Sản phẩm mỹ phẩm",
        price: Number(i.price || 0),
        quantity: Number(i.quantity || 1),
        image: i.image || "/img/San Pham/SP1.jpg",
        selectedType: i.selectedType || "Tiêu chuẩn",
      })),
      shippingAddress: {
        recipientName:
          order.shippingAddress?.recipientName ||
          order.address?.recipientName ||
          order.address?.name ||
          "Khách Hàng",
        phone:
          order.shippingAddress?.phone ||
          order.address?.phone ||
          "0987654321",
        address:
          order.shippingAddress?.address ||
          order.address?.address ||
          order.address?.street ||
          "Địa chỉ giao hàng",
        city:
          order.shippingAddress?.city ||
          order.address?.city ||
          "TP. Hồ Chí Minh",
      },
      totalAmount: Number(order.totalAmount || order.total || 0),
      shippingFee: Number(order.shippingFee || order.delivery?.fee || 0),
      paymentMethod: order.paymentMethod || order.payment?.method || "COD",
      notes: order.notes || order.note || "",
    };

    try {
      const token = localStorage.getItem("@token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await apiClient.post("/orders", payload, { headers });
      const saved = response.data?.data || response.data;

      // Cập nhật lưu lịch sử vào my_orders cục bộ
      const localOrders = JSON.parse(localStorage.getItem("my_orders") || "[]");
      localOrders.unshift(saved);
      localStorage.setItem("my_orders", JSON.stringify(localOrders));

      return saved;
    } catch (error) {
      console.warn("Lưu đơn hàng vào localStorage fallback:", error.message);
      const fallbackOrder = {
        ...payload,
        orderNumber: `COS-${Date.now().toString().slice(-8)}`,
        orderStatus: "PENDING",
        createdAt: new Date().toISOString(),
      };
      const localOrders = JSON.parse(localStorage.getItem("my_orders") || "[]");
      localOrders.unshift(fallbackOrder);
      localStorage.setItem("my_orders", JSON.stringify(localOrders));
      return fallbackOrder;
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
      console.warn("Đọc đơn hàng từ local storage fallback");
    }
    return JSON.parse(localStorage.getItem("my_orders") || "[]");
  },
};

export default OrderService;