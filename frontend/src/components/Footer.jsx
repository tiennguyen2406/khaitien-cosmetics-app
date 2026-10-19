import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaShieldAlt,
  FaShippingFast,
  FaRedoAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1C1917] text-[#A8A29E] pt-12 pb-6 mt-16 border-t border-[#292524]">
      {/* Service Highlights Strip */}
      <div className="border-b border-[#292524] pb-8 mb-10">
        <Container>
          <Row className="g-4 text-center">
            <Col sm={6} md={3} className="d-flex flex-column align-items-center">
              <div className="w-12 h-12 rounded-full bg-[#292524] text-[#C98A60] d-flex align-items-center justify-content-center mb-3">
                <FaShieldAlt size={20} />
              </div>
              <h6 className="text-white text-sm font-semibold tracking-wide uppercase">100% Chính Hãng</h6>
              <p className="text-xs text-[#78716C] m-0">Cam kết hoàn tiền 200% nếu phát hiện hàng giả</p>
            </Col>
            <Col sm={6} md={3} className="d-flex flex-column align-items-center">
              <div className="w-12 h-12 rounded-full bg-[#292524] text-[#C98A60] d-flex align-items-center justify-content-center mb-3">
                <FaShippingFast size={20} />
              </div>
              <h6 className="text-white text-sm font-semibold tracking-wide uppercase">Giao Nhanh 2 Giờ</h6>
              <p className="text-xs text-[#78716C] m-0">Miễn phí vận chuyển cho đơn hàng từ 300.000đ</p>
            </Col>
            <Col sm={6} md={3} className="d-flex flex-column align-items-center">
              <div className="w-12 h-12 rounded-full bg-[#292524] text-[#C98A60] d-flex align-items-center justify-content-center mb-3">
                <FaRedoAlt size={18} />
              </div>
              <h6 className="text-white text-sm font-semibold tracking-wide uppercase">Đổi Trả Dễ Dàng</h6>
              <p className="text-xs text-[#78716C] m-0">Hỗ trợ đổi trả miễn phí trong vòng 7 ngày</p>
            </Col>
            <Col sm={6} md={3} className="d-flex flex-column align-items-center">
              <div className="w-12 h-12 rounded-full bg-[#292524] text-[#C98A60] d-flex align-items-center justify-content-center mb-3">
                <FaPhone size={18} />
              </div>
              <h6 className="text-white text-sm font-semibold tracking-wide uppercase">Tư Vấn 24/7</h6>
              <p className="text-xs text-[#78716C] m-0">Đội ngũ chuyên viên da liễu & AI Beauty Advisor</p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="g-4 mb-8">
          {/* Brand Intro & Info */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C98A60] to-[#E0A96D] d-flex align-items-center justify-content-center">
                <span className="text-white font-serif font-bold text-sm">C</span>
              </div>
              <span className="font-serif font-bold text-lg tracking-[0.15em] text-white">
                COSMETICA
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#78716C] mb-4">
              Hệ thống mỹ phẩm cao cấp phân phối chính hãng các thương hiệu chăm sóc da và làm đẹp hàng đầu thế giới. Nâng niu vẻ đẹp tự nhiên của phụ nữ Việt.
            </p>
            <div className="d-flex flex-column gap-2 text-xs">
              <div className="d-flex align-items-start gap-2">
                <FaMapMarkerAlt className="text-[#C98A60] mt-1 shrink-0" />
                <span>Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP. Hồ Chí Minh</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaPhone className="text-[#C98A60] shrink-0" />
                <span>Hotline: <strong className="text-white">1900 1208</strong> (8h00 - 21h00)</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaEnvelope className="text-[#C98A60] shrink-0" />
                <span>Email: contact@cosmetica.vn</span>
              </div>
            </div>
          </Col>

          {/* Categories */}
          <Col lg={2} sm={6}>
            <h6 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Danh Mục
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-xs m-0">
              <li><Link to="/chitietdanhmuc?cat=skincare" className="hover:text-[#C98A60] transition-colors">Chăm sóc da mặt</Link></li>
              <li><Link to="/chitietdanhmuc?cat=toner" className="hover:text-[#C98A60] transition-colors">Nước hoa hồng / Toner</Link></li>
              <li><Link to="/chitietdanhmuc?cat=suncare" className="hover:text-[#C98A60] transition-colors">Kem chống nắng</Link></li>
              <li><Link to="/chitietdanhmuc?cat=serum" className="hover:text-[#C98A60] transition-colors">Serum & Tinh chất</Link></li>
              <li><Link to="/chutideals" className="text-[#EF4444] hover:text-red-400 transition-colors font-medium">Flash Sale & Deals</Link></li>
            </ul>
          </Col>

          {/* Policies & Customer Service */}
          <Col lg={3} sm={6}>
            <h6 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Chính Sách & Hỗ Trợ
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-xs m-0">
              <li><Link to="/huongdandathang" className="hover:text-[#C98A60] transition-colors">Hướng dẫn đặt hàng online</Link></li>
              <li><Link to="/giaonhanh" className="hover:text-[#C98A60] transition-colors">Chính sách vận chuyển & giao nhận</Link></li>
              <li><Link to="/chinhsachdoitra" className="hover:text-[#C98A60] transition-colors">Chính sách đổi trả & hoàn tiền</Link></li>
              <li><Link to="/dieu-khoan" className="hover:text-[#C98A60] transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link to="/chinh-sach" className="hover:text-[#C98A60] transition-colors">Chính sách bảo mật thông tin</Link></li>
            </ul>
          </Col>

          {/* Social & Newsletter */}
          <Col lg={3} md={6}>
            <h6 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">
              Kết Nối Cùng COSMETICA
            </h6>
            <p className="text-xs text-[#78716C] mb-3">
              Theo dõi chúng tôi trên mạng xã hội để nhận các bí quyết làm đẹp độc quyền và voucher ưu đãi.
            </p>
            <div className="d-flex align-items-center gap-2 mb-4">
              <a href="#facebook" className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#C98A60] text-white d-flex align-items-center justify-content-center transition-all">
                <FaFacebookF size={13} />
              </a>
              <a href="#instagram" className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#C98A60] text-white d-flex align-items-center justify-content-center transition-all">
                <FaInstagram size={13} />
              </a>
              <a href="#tiktok" className="w-8 h-8 rounded-full bg-[#292524] hover:bg-[#C98A60] text-white d-flex align-items-center justify-content-center transition-all">
                <FaTiktok size={13} />
              </a>
            </div>
            <div className="text-[11px] text-[#78716C]">
              Giờ làm việc: <strong>08:00 - 21:00</strong> (Tất cả các ngày trong tuần)
            </div>
          </Col>
        </Row>

        {/* Bottom Copyright */}
        <div className="border-t border-[#292524] pt-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-[11px] text-[#78716C]">
          <div>
            © 2026 COSMETICA Inc. Bảo lưu mọi quyền. Đồ án môn học IUH.
          </div>
          <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
            <span>Bảo mật chuẩn SSL</span>
            <span>•</span>
            <span>Thanh toán an toàn</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
