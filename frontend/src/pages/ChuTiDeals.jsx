import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBolt } from 'react-icons/fa';
import Products from '../components/Home/Products';
import '../Css/ChuTiDeals.css';
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const DEAL_HOURS = ["09:00", "13:00", "17:00", "22:00"];

const CATEGORY_TABS = [
  {
    label: 'Tất cả',
    categories: null,
  },
  {
    label: 'Chăm sóc da cơ bản',
    categories: ['skincare', 'toner', 'moisturizer', 'cleanser', 'mist'],
  },
  {
    label: 'Bảo vệ & điều trị da',
    categories: ['suncare', 'serum', 'mask'],
  },
  {
    label: 'Chăm sóc chuyên biệt',
    categories: ['exfoliator', 'lipcare'],
  },
];

function getCurrentDealIndex() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let idx = 0;
  for (let i = 0; i < DEAL_HOURS.length; i++) {
    const [h, m] = DEAL_HOURS[i].split(":").map(Number);
    const dealMinutes = h * 60 + m;
    if (currentMinutes >= dealMinutes) idx = i;
  }
  return idx;
}

function getNextDealTime() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < DEAL_HOURS.length; i++) {
    const [h, m] = DEAL_HOURS[i].split(":").map(Number);
    const dealMinutes = h * 60 + m;
    if (dealMinutes > currentMinutes) {
      return { hour: h, minute: m };
    }
  }
  // Nếu đã qua hết các khung giờ, lấy khung giờ đầu tiên ngày mai
  const [h, m] = DEAL_HOURS[0].split(":").map(Number);
  return { hour: h, minute: m, nextDay: true };
}

function getCountdown() {
  const now = new Date();
  const next = getNextDealTime();
  let target = new Date(now);
  target.setHours(next.hour, next.minute, 0, 0);
  if (next.nextDay) target.setDate(target.getDate() + 1);
  let diff = Math.max(0, Math.floor((target - now) / 1000));
  const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const seconds = String(diff % 60).padStart(2, '0');
  return { hours, minutes, seconds };
}

const ChuTiDeals = () => {
  const [activeDeal, setActiveDeal] = useState(getCurrentDealIndex());
  const [countdown, setCountdown] = useState(getCountdown());
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredCategories, setFilteredCategories] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Tự động cập nhật activeDeal và countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDeal(getCurrentDealIndex());
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cuộn lên đầu trang khi tab thay đổi
  useEffect(() => {
    if (selectedTab) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedTab]);

  return (
    <Container fluid className="px-4">
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              href="/"
              className="custom-nav-link"
              onClick={(event) => {
                // Không cần ngăn hành vi mặc định
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

      {/* Flash Deal Section */}
      <div style={{
        background: "#f5f4f8",
        padding: "24px 0 0 0",
        marginBottom: 24
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontWeight: 700,
            fontSize: 28,
            color: "#ff2171",
            marginBottom: 12
          }}>
            <FaBolt style={{ color: "#ff2171", fontSize: 28 }} />
            <span>FLASH DEAL</span>
            {/* Countdown động */}
            <span style={{ fontWeight: 400, fontSize: 16, color: "#222", marginLeft: 16 }}>
              <i className="fa fa-clock-o" /> Kết thúc trong
              <span style={{
                background: "#111",
                color: "#fff",
                borderRadius: 6,
                padding: "2px 8px",
                margin: "0 4px",
                fontWeight: 700
              }}>{countdown.hours}</span>
              :
              <span style={{
                background: "#111",
                color: "#fff",
                borderRadius: 6,
                padding: "2px 8px",
                margin: "0 4px",
                fontWeight: 700
              }}>{countdown.minutes}</span>
              :
              <span style={{
                background: "#111",
                color: "#fff",
                borderRadius: 6,
                padding: "2px 8px",
                margin: "0 4px",
                fontWeight: 700
              }}>{countdown.seconds}</span>
            </span>
          </div>
          {/* Các khung giờ flash deal */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, width: "90%" }}>
            {DEAL_HOURS.map((hour, idx) => (
              <button
                key={hour}
                onClick={() => setActiveDeal(idx)}
                style={{
                  flex: 1,
                  minWidth: 80,
                  background: idx === activeDeal ? (idx === getCurrentDealIndex() ? '#fff0f6' : '#fff') : '#fff',
                  color: idx === activeDeal ? '#ff2171' : '#222',
                  border: '2px solid ' + (idx === activeDeal ? '#ff2171' : '#eee'),
                  fontWeight: idx === activeDeal ? 700 : 500,
                  borderRadius: 8,
                  padding: '8px 0',
                  fontSize: 18,
                  boxShadow: idx === activeDeal ? '0 2px 8px #ff217133' : 'none',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {hour}
                <span style={{ fontSize: 13, fontWeight: 500, color: idx === getCurrentDealIndex() ? '#ff2171' : '#888' }}>
                  {idx === getCurrentDealIndex() ? 'Đang diễn ra' : (idx > getCurrentDealIndex() ? 'Sắp diễn ra' : 'Đã kết thúc')}
                </span>
              </button>
            ))}
          </div>
          {/* Tabs danh mục giữ nguyên */}
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {CATEGORY_TABS.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => {
                  setSelectedTab(idx);
                  setFilteredCategories(tab.categories);
                }}
                style={{
                  border: idx === selectedTab ? "1.5px solid #ff2171" : "none",
                  background: "#fff",
                  color: idx === selectedTab ? "#ff2171" : "#222",
                  fontWeight: idx === selectedTab ? 600 : 500,
                  borderRadius: 8,
                  padding: "8px 24px"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Hiển thị danh sách sản phẩm */}
      <div className="chutideals-products-wrapper" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Products filterCategories={filteredCategories} scrollToTopType="top" showAddToCart={true} />
      </div>
      <div className="service-support">
        <div className="service-item">
          <Link to="/huongdandathang" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/Thanhtoan.png" alt="Thanh toán khi nhận hàng" />
            <div className="service-text">
              <h5>Hướng dẫn thanh toán</h5>
            </div>
          </Link>
        </div>

        <div className="service-item">
          <Link to="/giaonhanh" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/FreeShip.png" alt="Giao nhanh miễn phí 2H" />
            <div className="service-text">
              <h5>Giao nhanh miễn phí 24H</h5>
            </div>
          </Link>
        </div>

        <div className="service-item">
          <Link to="/chinhsachdoitra" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/TraHang.png" alt="30 ngày đổi trả miễn phí" />
            <div className="service-text">
              <h5>30 ngày đổi trả miễn phí</h5>
            </div>
          </Link>
        </div>

        <div className="service-item">
          <Link to="/gioi-thieu" style={{ textDecoration: "none", color: "inherit" }}>
            <img src="/img/Quang Cao/UyTin.png" alt="Thương hiệu uy tín toàn cầu" />
            <div className="service-text">
              <h5>Thương hiệu uy tín toàn cầu</h5>
            </div>
          </Link>
        </div>

        <div className="service-item">
          <img src="/img/Quang Cao/HotLine.png" alt="Hotline CSKH" />
          <div className="service-text">
            <h5>HOTLINE CSKH</h5>
            <h5>1800 6324</h5>
          </div>
        </div>

        <div className="service-item">
          <img src="/img/Quang Cao/Location.png" alt="Tìm chi nhánh" />
          <div className="service-text">
            <h5>TÌM CHI NHÁNH</h5>
            <h5>Hệ thống ChuTi</h5>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChuTiDeals;