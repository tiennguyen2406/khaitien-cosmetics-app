import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPhone, FaComments } from "react-icons/fa";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Support = () => {
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setIsSearching(true);
      try {
        await navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <>
      {/* Thêm Navbar ở đây */}
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="/"
              className="custom-nav-link"
              onClick={(event) => {
                
                window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
              }}
            >
              TRANG CHỦ
            </Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Nội dung chính */}
      <div
        className="support-header py-4"
        style={{
          background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
          minHeight: "220px",
        }}
      >
        <div className="container">
          <h1 className="text-center text-white mb-3">
            Xin chào! Chúng tôi có thể giúp gì cho bạn?
          </h1>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    placeholder="Nhập từ khóa để tìm sản phẩm..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{
                      paddingLeft: "20px",
                      height: "50px",
                    }}
                  />
                  <button
                    className="btn position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                    type="submit"
                    disabled={isSearching}
                    style={{ zIndex: 10 }}
                  >
                    {isSearching ? (
                      <span className="spinner-border spinner-border-sm text-secondary" />
                    ) : (
                      <FaSearch className="text-secondary" size={18} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <div className="border rounded-3 p-4">
              <h4 className="mb-4">Câu hỏi thường gặp</h4>
              <div className="row g-4">
                <div className="col-md-6">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Đăng ký thành viên ChuTi như thế nào?
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Tại sao tôi không thể đăng nhập vào tài khoản của tôi?
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Tôi có thể sử dụng chung tài khoản với người khác không?
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Có cần đặt lịch trước khi đến spa hay không?
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Đặt dịch vụ như thế nào?
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#" className="text-decoration-none text-dark">
                        Khám da tại spa ChuTi có tốn phí hay không?
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="border rounded-3 p-4">
              <h4 className="mb-4">Thông tin hỗ trợ</h4>
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="p-3 h-100 border-end">
                    <h6>Giới thiệu</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Giới thiệu ChuTi
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Hướng dẫn đặt hàng
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Chương trình tích điểm
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Phiếu mua hàng ChuTi
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 h-100 border-end">
                    <h6>Liên hệ</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Liên hệ
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Hướng dẫn đặt hàng 2H
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Hướng dẫn đổi điểm lấy quà
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Hướng dẫn tải & sử dụng App ChuTi
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 h-100 border-end">
                    <h6>Chính sách</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Hệ thống cửa hàng
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Phương thức thanh toán
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Chương trình quà tặng
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Điều khoản sử dụng
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="p-3 h-100">
                    <h6>Kênh chính thức</h6>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Các kênh chính thức
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Chính sách vận chuyển
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Thẻ quà tặng Got It
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-decoration-none text-secondary"
                        >
                          Cảnh báo lừa đảo
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
