import React, { useState, useEffect } from "react";
import { Container, Form, Button, Image, Modal, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import AddressForm from "../components/AddressForm";
import saleData from "../data/sale.json";
import { OrderService } from "../services/OrderService";

const Pay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const savedAddresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );
    return savedAddresses.find((addr) => addr.isDefault) || null;
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addresses, setAddresses] = useState(() => {
    return JSON.parse(localStorage.getItem("addresses") || "[]");
  });
  const [selectedDelivery, setSelectedDelivery] = useState("standard"); // Mặc định là tiết kiệm
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Thêm state để quản lý phương thức thanh toán

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const items = location.state?.selectedItems?.length ? location.state.selectedItems : storedCart;
    if (!items.length) {
      navigate("/cart");
      return;
    }

    const savedAddresses = JSON.parse(
      localStorage.getItem("addresses") || "[]"
    );
    if (savedAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(
        savedAddresses.find((addr) => addr.isDefault) || savedAddresses[0]
      );
    }
  }, [location.state, navigate, selectedAddress]);

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.phone);
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handleDelete = (address) => {
    const newAddresses = addresses.filter(
      (addr) => addr.phone !== address.phone
    );
    setAddresses(newAddresses);
    localStorage.setItem("addresses", JSON.stringify(newAddresses));
  };

  const handleSetDefault = (address) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.phone === address.phone,
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleApplyPromo = () => {
    const promo = saleData.find(
      (p) => p.code === promoCode.trim().toUpperCase() && p.isActive
    );

    if (!promo) {
      alert("Mã giảm giá không hợp lệ!");
      return;
    }

    if (subtotal < promo.minOrder) {
      alert(
        `Đơn hàng tối thiểu ${promo.minOrder.toLocaleString(
          "vi-VN"
        )}đ để áp dụng mã này!`
      );
      return;
    }

    setAppliedPromo(promo);
    setShowPromoInput(false);
  };

  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const selectedItems = location.state?.selectedItems?.length ? location.state.selectedItems : storedCart;

  if (!selectedItems || selectedItems.length === 0) return null;

  const subtotal = selectedItems.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  // Định nghĩa các hằng số cho phí vận chuyển
  const SHIPPING_FEES = {
    fast: 20000,
    standard: 10000,
  };

  // Tính giảm giá
  const discountAmount = appliedPromo
    ? Math.min(
        (subtotal * appliedPromo.discount) / 100,
        appliedPromo.maxDiscount
      )
    : 0;

  // Cập nhật cách tính shippingFee và total
  const shippingFee = SHIPPING_FEES[selectedDelivery];
  const total = subtotal + shippingFee - discountAmount;

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    try {
      const newOrder = {
        id: `DH${Date.now()}`,
        orderCode: Date.now().toString(),
        date: new Date().toISOString(),
        items: selectedItems,
        address: selectedAddress,
        note: note,
        delivery: {
          method: selectedDelivery,
          fee: SHIPPING_FEES[selectedDelivery],
        },
        payment: {
          method: paymentMethod,
          status: "pending",
        },
        promo: appliedPromo,
        subtotal: subtotal,
        discount: discountAmount,
        total: total,
        status: "new",
      };

      // Gọi API lưu đơn hàng
      await OrderService.saveOrder(newOrder);

      // Xóa sản phẩm khỏi giỏ hàng
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cartItems.filter(
        (cartItem) => !selectedItems.some((item) => item.id === cartItem.id)
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Xóa `selectedItems` khỏi state và localStorage
      localStorage.removeItem("selectedItems");

      // Hiển thị thông báo thành công
      setShowToast(true);

      // Chuyển về trang chủ
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Lỗi khi xử lý đơn hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleProceedToCheckout = () => {
    if (selected.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm");
      return;
    }

    const selectedItems = cart
      .filter((item) => selected.includes(item.id))
      .map((item) => ({
        ...item,
        priceAfterDiscount: item.price * (1 - (item.discount || 0) / 100),
      }));

    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

    // Chuyển hướng ngay lập tức, không cần reload
    navigate("/pay", {
      state: { selectedItems },
    });
  };

  return (
    <Container className="py-4">
      {/* Thêm Toast notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body className="text-success">Đặt hàng thành công!</Toast.Body>
      </Toast>

      <div className="row">
        {/* Cột trái */}
        <div className="col-md-8">
          {/* Địa chỉ nhận hàng */}
          <div className="bg-white p-3 rounded mb-3 shadow-sm">
            {selectedAddress ? (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge bg-success me-2">
                    {selectedAddress.isDefault ? "Mặc định" : "Nhà riêng"}
                  </span>
                  <strong>
                    {selectedAddress.name} - {selectedAddress.phone}
                  </strong>
                  <div className="text-secondary mt-1">
                    {selectedAddress.address}, {selectedAddress.ward},{" "}
                    {selectedAddress.district}, {selectedAddress.city}
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setShowAddressModal(true)}
                >
                  Thay đổi
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <p>Vui lòng chọn địa chỉ giao hàng</p>
                <Button
                  variant="primary"
                  onClick={() => setShowAddressModal(true)}
                >
                  Chọn địa chỉ
                </Button>
              </div>
            )}
          </div>

          {/* Modal chọn địa chỉ */}
          <Modal
            show={showAddressModal}
            onHide={() => setShowAddressModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Địa chỉ nhận hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {addresses.map((address) => (
                <div
                  key={address.phone}
                  className="mb-3 position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectAddress(address)}
                >
                  <div
                    className={`p-3 rounded border ${
                      selectedAddressId === address.phone
                        ? "border-success"
                        : ""
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="radio"
                        name="addressSelection"
                        checked={selectedAddressId === address.phone}
                        onChange={() => handleSelectAddress(address)}
                        className="me-2"
                      />
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <strong>
                            {address.name} - {address.phone}
                          </strong>
                          <span className="badge bg-success">Nhà riêng</span>
                          {address.isDefault && (
                            <span className="badge bg-warning">
                              Địa chỉ mặc định
                            </span>
                          )}
                          {!address.isDefault && addresses.length > 1 && (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefault(address);
                              }}
                            >
                              Đặt làm mặc định
                            </Button>
                          )}
                        </div>
                        <div className="text-secondary mt-1">
                          {address.address}, {address.ward}, {address.district},{" "}
                          {address.city}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                    <Button
                      variant="link"
                      className="text-primary p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Mở form sửa địa chỉ
                        setShowAddModal(true);
                      }}
                    >
                      Sửa
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(address);
                        }}
                      >
                        Xóa
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <div className="border-top pt-3">
                <Button
                  variant="outline-success"
                  className="w-100"
                  onClick={() => setShowAddModal(true)}
                >
                  + Thêm địa chỉ mới
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                variant="light"
                onClick={() => setShowAddressModal(false)}
              >
                Hủy
              </Button>
              <Button
                variant="success"
                onClick={() => setShowAddressModal(false)}
                disabled={!selectedAddressId}
              >
                Xác nhận
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal thêm/sửa địa chỉ */}
          <AddressForm
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSubmit={(newAddress) => {
              const updatedAddresses = [...addresses, newAddress];
              setAddresses(updatedAddresses);
              localStorage.setItem(
                "addresses",
                JSON.stringify(updatedAddresses)
              );
              setShowAddModal(false);
            }}
            editAddress={null} // Truyền địa chỉ cần sửa vào đây
          />

          {/* Hình thức thanh toán */}
          <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Hình thức thanh toán</h6>
              <Button variant="link" className="text-primary">
                Thay đổi
              </Button>
            </div>
            <div className="mt-2">
              <Form.Check
                type="radio"
                id="cod"
                name="paymentMethod"
                label={
                  <div className="d-flex align-items-center">
                    <FaMoneyBill className="me-2 text-success" />
                    <span>Thanh toán khi nhận hàng (COD)</span>
                  </div>
                }
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
            </div>
          </div>

          {/* Mã giảm giá */}
          <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0">Mã giảm giá</h6>
              {!showPromoInput && !appliedPromo && (
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setShowPromoInput(true)}
                >
                  Nhập mã giảm giá
                </Button>
              )}
            </div>

            {showPromoInput && !appliedPromo && (
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="success" onClick={handleApplyPromo}>
                  Áp dụng
                </Button>
              </div>
            )}

            {appliedPromo && (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-success">{appliedPromo.description}</div>
                  <small className="text-secondary">
                    Mã: {appliedPromo.code}
                  </small>
                </div>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => setAppliedPromo(null)}
                >
                  Xóa
                </Button>
              </div>
            )}
          </div>

          {/* Thông tin kiện hàng */}
          <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <h6 className="mb-3">Thông tin kiện hàng</h6>

            {/* Thời gian giao hàng */}
            <div className="mb-3">
              <div className="d-flex gap-3">
                <div className="flex-grow-1">
                  <Form.Check
                    type="radio"
                    name="delivery"
                    id="fast-delivery"
                    checked={selectedDelivery === "fast"}
                    onChange={() => setSelectedDelivery("fast")}
                    label={
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <strong>Hoả tốc</strong>
                          <div className="text-success small">
                            Giao nhanh trong 2 giờ (Trễ tặng 100k)
                          </div>
                          <div className="mt-1">20.000 đ</div>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className="flex-grow-1">
                  <Form.Check
                    type="radio"
                    name="delivery"
                    id="standard-delivery"
                    checked={selectedDelivery === "standard"}
                    onChange={() => setSelectedDelivery("standard")}
                    label={
                      <div className="d-flex align-items-center gap-2">
                        <div>
                          <strong>Tiết kiệm</strong>
                          <div className="text-success small">
                            Giao trong 48 giờ (Trễ tặng 100k)
                          </div>
                          <div className="mt-1">10.000 đ</div>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            {/* Danh sách sản phẩm */}
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="d-flex gap-3 align-items-center mb-3 border-top pt-3"
              >
                <Image src={item.image} width={60} height={60} rounded />
                <div className="flex-grow-1">
                  <div>{item.name}</div>
                  <div className="text-secondary">
                    Số lượng: {item.quantity}
                    {item.variant && ` - ${item.variant}`}
                  </div>
                </div>
                <div className="text-end">
                  <div>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ghi chú */}
          <div className="bg-white p-3 rounded mb-3 shadow-sm">
            <Form.Group>
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú cho đơn hàng..."
              />
            </Form.Group>
          </div>
        </div>

        {/* Cột phải */}
        <div className="col-md-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <Button
              variant="success"
              className="w-100 mb-3"
              onClick={handleSubmitOrder}
            >
              Đặt hàng
            </Button>

            {/* Chi tiết đơn hàng */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Tạm tính (
                  {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  sản phẩm)
                </span>
                <span>{subtotal.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Giảm giá</span>
                <span className="text-success">
                  -{discountAmount.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Phí vận chuyển</span>
                <span>{shippingFee.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="d-flex justify-content-between font-weight-bold mt-2 pt-2 border-top">
                <strong>Thành tiền (Đã VAT)</strong>
                <strong className="text-danger">
                  {total.toLocaleString("vi-VN")} đ
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Pay;
