import React, { useState, useEffect } from "react";
import { Container, Nav, Card } from "react-bootstrap";

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "new", label: "Mới đặt" },
    { id: "processing", label: "Đang xử lý" },
    { id: "shipping", label: "Đang vận chuyển" },
    { id: "completed", label: "Thành công" },
    { id: "cancelled", label: "Đã hủy" },
  ];

  useEffect(() => {
    // Fetch dữ liệu orders từ API
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dulieu.onrender.com/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Lọc orders theo tab đang active
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  const handleCancelOrder = async (orderId) => {
    setIsLoading(true);
    try {
      const orderToCancel = orders.find((order) => order.id === orderId);
      if (!orderToCancel) throw new Error("Không tìm thấy đơn hàng");

      const updatedOrder = { ...orderToCancel, status: "cancelled" };

      const response = await fetch(`https://dulieu.onrender.com/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) throw new Error("Không thể hủy đơn hàng");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      setActiveTab("cancelled");
      alert("Hủy đơn hàng thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <h5 className="mb-0 me-4">Đơn hàng của tôi</h5>
      </div>

      <Nav className="border-bottom mb-4">
        {tabs.map((tab) => (
          <Nav.Item key={tab.id}>
            <Nav.Link
              className={`border-0 ${
                activeTab === tab.id
                  ? "text-primary border-bottom border-primary"
                  : "text-secondary"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Hiển thị danh sách đơn hàng */}
      <div>
        {isLoading ? (
          <p>Đang tải đơn hàng...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-muted">Không có đơn hàng nào.</p>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">Đơn hàng #{order.orderCode}</h6>
                    <small className="text-muted">
                      Ngày đặt:{" "}
                      {new Date(order.date).toLocaleDateString("vi-VN")}
                    </small>
                  </div>
                  <div className="text-end">
                    <div className="mb-1">
                      Tổng tiền: {order.total.toLocaleString("vi-VN")}đ
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className={`badge bg-${getStatusColor(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                      {order.status === "new" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Đang xử lý..." : "Hủy đơn"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hiển thị danh sách sản phẩm */}
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      className="me-3"
                    />
                    <div>
                      <div>{item.name}</div>
                      <small className="text-muted">
                        Phân loại: {item.variant}, Số lượng: {item.quantity}
                      </small>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

// Hàm helper để xác định màu badge theo status
const getStatusColor = (status) => {
  switch (status) {
    case "new":
      return "info";
    case "processing":
      return "primary";
    case "shipping":
      return "warning";
    case "completed":
      return "success";
    case "cancelled":
      return "danger";
    default:
      return "secondary";
  }
};

// Hàm helper để hiển thị text theo status
const getStatusText = (status) => {
  switch (status) {
    case "new":
      return "Mới đặt";
    case "processing":
      return "Đang xử lý";
    case "shipping":
      return "Đang vận chuyển";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default MyOrder;
