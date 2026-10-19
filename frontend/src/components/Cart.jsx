import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft, FaShoppingBag, FaShieldAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const [selectedItems, setSelectedItems] = useState(cart.map((item) => item.id));
  const navigate = useNavigate();

  const formatPrice = (val) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val || 0);

  const shippingFee = totalAmount >= 300000 || totalAmount === 0 ? 0 : 30000;
  const finalTotal = totalAmount + shippingFee;

  const handleCheckout = () => {
    navigate("/pay");
  };

  if (!cart || cart.length === 0) {
    return (
      <Container className="py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E7E5E4] shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FAF8F5] text-[#C98A60] d-flex align-items-center justify-content-center mx-auto mb-4">
            <FaShoppingBag size={32} />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#1C1917] mb-2">Giỏ hàng của bạn đang trống</h3>
          <p className="text-xs text-[#78716C] mb-6">
            Hãy lựa chọn những sản phẩm mỹ phẩm cao cấp yêu thích để chăm sóc làn da của bạn ngay hôm nay!
          </p>
          <Link to="/" className="btn-luxury-primary text-sm px-6 py-2.5 text-decoration-none inline-block">
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[80vh]">
      <Container>
        {/* Breadcrumb / Back button */}
        <div className="mb-6 d-flex align-items-center justify-content-between">
          <Link to="/" className="text-xs text-[#78716C] hover:text-[#C98A60] d-flex align-items-center gap-1.5 text-decoration-none">
            <FaArrowLeft size={10} /> Quay lại mua sắm
          </Link>
          <button
            onClick={clearCart}
            className="text-xs text-red-500 hover:text-red-700 bg-transparent border-0 d-flex align-items-center gap-1"
          >
            <FaTrashAlt size={11} /> Xóa tất cả
          </button>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mb-6">
          Giỏ Hàng Của Bạn <span className="text-sm font-normal text-[#78716C]">({cart.length} sản phẩm)</span>
        </h1>

        <Row className="g-4">
          {/* Left Column: Cart Items List */}
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-white rounded-2xl border border-[#E7E5E4] p-4 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4 shadow-xs"
                >
                  {/* Thumbnail & Info */}
                  <div className="d-flex align-items-center gap-3 w-100 w-sm-auto">
                    <img
                      src={item.image || "/img/San Pham/SP1.jpg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-[#F5F5F4] shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A60]">
                        {item.brand || "COSMETICA"}
                      </span>
                      <h6 className="text-sm font-semibold text-[#1C1917] m-0 line-clamp-1">{item.name}</h6>
                      <div className="text-xs text-[#78716C] mt-0.5">
                        Phân loại: <span className="text-[#1C1917] font-medium">{item.selectedType || "Mặc định"}</span>
                      </div>
                      <div className="text-sm font-bold text-[#C98A60] mt-1 sm:hidden">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 w-100 w-sm-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="d-none d-sm-block text-right">
                      <div className="text-sm font-bold text-[#1C1917]">{formatPrice(item.price)}</div>
                    </div>

                    {/* Stepper */}
                    <div className="d-flex align-items-center border border-[#E7E5E4] rounded-full overflow-hidden bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1, item.selectedType)}
                        className="w-8 h-8 d-flex align-items-center justify-content-center text-sm font-bold text-[#78716C] hover:bg-stone-200 border-0 bg-transparent transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-[#1C1917]">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1, item.selectedType)}
                        className="w-8 h-8 d-flex align-items-center justify-content-center text-sm font-bold text-[#78716C] hover:bg-stone-200 border-0 bg-transparent transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="d-flex align-items-center gap-3">
                      <div className="text-sm font-bold text-[#C98A60] min-w-[90px] text-right">
                        {formatPrice(item.price * (item.quantity || 1))}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedType)}
                        className="text-[#A8A29E] hover:text-red-500 border-0 bg-transparent p-1 transition-colors"
                        title="Xóa khỏi giỏ"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Right Column: Order Summary Card */}
          <Col lg={4}>
            <div className="bg-white rounded-3xl border border-[#E7E5E4] p-5 shadow-sm sticky-top" style={{ top: "100px" }}>
              <h5 className="font-serif font-bold text-lg text-[#1C1917] mb-4">Tóm Tắt Đơn Hàng</h5>

              <div className="d-flex flex-column gap-3 text-xs border-b border-[#F5F5F4] pb-4 mb-4">
                <div className="d-flex justify-content-between text-[#78716C]">
                  <span>Tổng tiền hàng</span>
                  <span className="text-[#1C1917] font-semibold">{formatPrice(totalAmount)}</span>
                </div>
                <div className="d-flex justify-content-between text-[#78716C]">
                  <span>Phí vận chuyển</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[11px]">Miễn phí</span>
                    ) : (
                      <span className="text-[#1C1917] font-semibold">{formatPrice(shippingFee)}</span>
                    )}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <div className="text-[11px] text-[#C98A60] bg-[#F7EFE9] p-2 rounded-xl">
                    💡 Mua thêm <strong>{formatPrice(300000 - totalAmount)}</strong> để được <strong>FREESHIP</strong>!
                  </div>
                )}
              </div>

              {/* Total Due */}
              <div className="d-flex justify-content-between align-items-baseline mb-6">
                <div>
                  <div className="text-xs text-[#78716C]">Tổng thanh toán:</div>
                  <div className="text-[10px] text-[#A8A29E]">(Đã bao gồm VAT nếu có)</div>
                </div>
                <div className="font-serif text-2xl font-bold text-[#C98A60]">
                  {formatPrice(finalTotal)}
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-100 btn-luxury-primary py-3 text-sm font-semibold tracking-wider uppercase mb-3 shadow-md"
              >
                Tiến Hành Thanh Toán
              </button>

              <div className="d-flex align-items-center justify-content-center gap-2 text-[11px] text-[#78716C]">
                <FaShieldAlt className="text-[#D4AF37]" size={12} />
                <span>Thanh toán an toàn & bảo mật tuyệt đối</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
