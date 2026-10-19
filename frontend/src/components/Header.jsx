import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaUser,
  FaSearch,
  FaSignOutAlt,
  FaHeart,
  FaMapMarkerAlt,
  FaClipboardList,
  FaShoppingCart,
  FaGem,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";
import Login from "./Login";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { cartCount } = useCart();

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      try {
        setIsLoggedIn(true);
        setUserData(JSON.parse(loggedInUser));
      } catch (e) {
        console.error("Invalid user data in storage");
      }
    }
  }, []);

  const handleLoginSuccess = (account) => {
    setIsLoggedIn(true);
    setUserData(account);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("@token");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  const handleAccountClick = () => navigate("/my-account");
  const handleOrderClick = () => navigate("/my-order");
  const handleAddressClick = () => navigate("/address");
  const handleFavoriteClick = () => navigate("/yeu-thich");
  const handleCartClick = () => navigate("/cart");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
      setKeyword("");
    }
  };

  return (
    <header className="sticky-top w-100 z-50">
      {/* Top Banner: Luxury Benefits Bar */}
      <div className="bg-[#1C1917] text-[#D6D3D1] text-xs py-1.5 px-4">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span className="d-flex align-items-center gap-1.5">
              <FaGem className="text-[#D4AF37]" size={11} /> Mỹ Phẩm Chính Hãng 100%
            </span>
            <span className="d-none d-md-flex align-items-center gap-1.5">
              <FaShippingFast className="text-[#C98A60]" size={11} /> Miễn Phí Vận Chuyển Đơn Từ 300K
            </span>
            <span className="d-none d-lg-flex align-items-center gap-1.5">
              <FaShieldAlt className="text-[#D4AF37]" size={11} /> Đổi Trả Miễn Phí Trong 7 Ngày
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/support" className="hover:text-[#C98A60] transition-colors">
              Hotline: 1900 1208
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Navigation with Glassmorphism */}
      <Navbar className="glass-panel py-3 shadow-sm" expand="lg">
        <Container className="d-flex align-items-center justify-content-between">
          {/* Luxury Logo Brand */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 m-0 p-0 text-decoration-none">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#C98A60] to-[#E0A96D] d-flex align-items-center justify-content-center shadow-md">
              <span className="text-white font-serif font-bold text-lg tracking-wider">C</span>
            </div>
            <div className="d-flex flex-column">
              <span className="font-serif font-bold text-xl tracking-[0.15em] text-[#1C1917] leading-none">
                COSMETICA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#78716C] mt-0.5">
                Haute Beauté & Skincare
              </span>
            </div>
          </Navbar.Brand>

          {/* Search Bar with Elegant Pill Shape */}
          <Form
            className="d-none d-md-flex position-relative flex-grow-1 mx-5 max-w-xl"
            onSubmit={handleSearch}
          >
            <FormControl
              type="search"
              placeholder="Tìm kiếm sản phẩm, thương hiệu hoặc thành phần..."
              aria-label="Search"
              className="w-100 bg-white/90 border border-[#E7E5E4] rounded-full py-2.5 pl-5 pr-12 text-sm focus:border-[#C98A60] focus:ring-2 focus:ring-[#C98A60]/20 transition-all shadow-inner"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              className="position-absolute top-1/2 end-2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#C98A60] text-[#78716C] hover:text-white transition-all d-flex align-items-center justify-content-center border-none"
              type="submit"
            >
              <FaSearch size={13} />
            </button>
          </Form>

          {/* User Actions & Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Wishlist Link */}
            <Link
              to="/yeu-thich"
              className="p-2 text-[#57534E] hover:text-[#C98A60] transition-colors relative rounded-full hover:bg-stone-100/70"
              title="Sản phẩm yêu thích"
            >
              <FaHeart size={18} />
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={handleCartClick}
              className="p-2 text-[#1C1917] hover:text-[#C98A60] transition-colors relative rounded-full hover:bg-stone-100/70 border-none bg-transparent"
              title="Giỏ hàng"
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="position-absolute -top-1 -right-1 bg-gradient-to-r from-[#D4A373] to-[#C98A60] text-white text-[11px] font-bold rounded-full w-5 h-5 d-flex align-items-center justify-content-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Menu */}
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="bg-transparent border-0 p-1 d-flex align-items-center gap-2"
                  id="user-dropdown"
                >
                  <div className="w-9 h-9 rounded-full bg-[#F7EFE9] border border-[#C98A60]/40 d-flex align-items-center justify-content-center text-[#C98A60] font-semibold text-sm">
                    {userData?.fullName ? userData.fullName.charAt(0).toUpperCase() : <FaUser size={14} />}
                  </div>
                  <span className="d-none d-lg-inline text-sm font-medium text-[#1C1917] max-w-[120px] truncate">
                    {userData?.fullName || "Tài khoản"}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border border-[#E7E5E4] rounded-2xl py-2 min-w-[200px]">
                  <div className="px-4 py-2 border-b border-[#F5F5F4]">
                    <div className="text-xs text-[#78716C]">Xin chào,</div>
                    <div className="font-semibold text-sm text-[#1C1917] truncate">{userData?.fullName}</div>
                  </div>
                  <Dropdown.Item onClick={handleAccountClick} className="py-2 text-sm text-[#44403C] hover:bg-[#FAF8F5]">
                    <FaUser className="me-2.5 text-[#C98A60]" size={13} /> Tài khoản cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleOrderClick} className="py-2 text-sm text-[#44403C] hover:bg-[#FAF8F5]">
                    <FaClipboardList className="me-2.5 text-[#C98A60]" size={13} /> Đơn mua của tôi
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleFavoriteClick} className="py-2 text-sm text-[#44403C] hover:bg-[#FAF8F5]">
                    <FaHeart className="me-2.5 text-[#C98A60]" size={13} /> Mục yêu thích
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleAddressClick} className="py-2 text-sm text-[#44403C] hover:bg-[#FAF8F5]">
                    <FaMapMarkerAlt className="me-2.5 text-[#C98A60]" size={13} /> Sổ địa chỉ nhận hàng
                  </Dropdown.Item>
                  <Dropdown.Divider className="my-1 border-[#F5F5F4]" />
                  <Dropdown.Item onClick={handleLogout} className="py-2 text-sm text-red-600 hover:bg-red-50">
                    <FaSignOutAlt className="me-2.5" size={13} /> Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={handleShowLogin}
                className="btn-luxury-primary text-xs tracking-wider uppercase font-semibold py-2 px-4 shadow-sm"
              >
                Đăng Nhập
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Sub-navigation: Luxury Category Links */}
      <nav className="bg-white/95 border-b border-[#E7E5E4] py-2 px-4 shadow-xs">
        <Container className="d-flex align-items-center justify-content-between overflow-x-auto text-xs font-medium tracking-wide uppercase text-[#57534E]">
          <div className="d-flex align-items-center gap-6 whitespace-nowrap">
            <Link to="/" className="text-[#1C1917] hover:text-[#C98A60] font-semibold">
              Trang Chủ
            </Link>
            <Link to="/new-products" className="hover:text-[#C98A60] transition-colors">
              Hàng Mới Về
            </Link>
            <Link to="/banchay" className="hover:text-[#C98A60] transition-colors">
              Bán Chạy Nhất
            </Link>
            <Link to="/chutideals" className="text-[#EF4444] font-semibold hover:text-red-700 transition-colors flex items-center gap-1">
              🔥 Hot Deals
            </Link>
            <Link to="/brand" className="hover:text-[#C98A60] transition-colors">
              Thương Hiệu
            </Link>
            <Link to="/support" className="hover:text-[#C98A60] transition-colors">
              Tư Vấn & Hỗ Trợ
            </Link>
          </div>
        </Container>
      </nav>

      {/* Auth Modals */}
      <Login
        show={showLogin}
        handleClose={handleCloseLogin}
        handleShowSignup={() => {
          handleCloseLogin();
          handleShowSignup();
        }}
        onLoginSuccess={handleLoginSuccess}
      />
      <Signup
        show={showSignup}
        handleClose={handleCloseSignup}
        handleShowLogin={() => {
          handleCloseSignup();
          handleShowLogin();
        }}
      />
    </header>
  );
};

export default Header;
