import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { brandImages } from "../data/brandImages";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [brandCount, setBrandCount] = useState(0);
  const [activeLetter, setActiveLetter] = useState("ALL"); // Thay đổi giá trị mặc định
  const alphabet = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]; // Thêm 'ALL' vào đầu mảng

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueBrands = [
          ...new Set(data.products.map((product) => product.brand)),
        ].sort();
        setBrands(uniqueBrands);
        setBrandCount(uniqueBrands.length);
      });
  }, []);

  // Sửa lại hàm lọc brands
  const filteredBrands =
    activeLetter === "ALL"
      ? brands
      : brands.filter(
        (brand) => brand.charAt(0).toUpperCase() === activeLetter
      );

  // Tạo object nhóm brands theo chữ cái
  const groupedBrands = brands.reduce((acc, brand) => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // Sắp xếp các nhóm theo alphabet
  const sortedLetters = Object.keys(groupedBrands).sort();

  const renderBrands = () => {
    if (activeLetter === "ALL") {
      return sortedLetters.map((letter) => (
        <div key={letter} className="mb-5">
          <h3 className="mb-4">{letter}</h3>
          <Row xs={2} md={3} lg={5} className="g-4">
            {groupedBrands[letter].map((brand, idx) => (
              <Col key={idx}>
                <div
                  className="brand-card p-3 text-center"
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "8px",
                    height: "200px",
                  }}
                >
                  <img
                    src={brandImages[brand]}
                    alt={brand}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "contain",
                      marginBottom: "12px",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/img/Brand/default.jpg";
                    }}
                  />
                  <div>{brand}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ));
    } else {
      return filteredBrands.length === 0 ? (
        <div className="text-center py-5 text-muted">
          Không có thương hiệu nào bắt đầu bằng "{activeLetter}"
        </div>
      ) : (
        <Row xs={2} md={3} lg={5} className="g-4">
          {filteredBrands.map((brand, idx) => (
            <Col key={idx}>
              <div
                className="brand-card p-3 text-center"
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  height: "200px",
                }}
              >
                <img
                  src={brandImages[brand]}
                  alt={brand}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "contain",
                    marginBottom: "12px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/Brand/default.jpg";
                  }}
                />
                <div>{brand}</div>
              </div>
            </Col>
          ))}
        </Row>
      );
    }
  };

  return (
    <>
      {/* Navbar đầu trang */}
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/" className="custom-nav-link">TRANG CHỦ</Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="py-4">
        <h2 className="mb-4">Xem {brandCount} thương hiệu</h2>

        {/* Alphabet filter */}
        <div
          className="mb-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            borderBottom: "1px solid #dee2e6",
            paddingBottom: "12px",
          }}
        >
          {alphabet.map((letter) => (
            <span
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className="px-2 py-1"
              style={{
                cursor: "pointer",
                color: activeLetter === letter ? "#fff" : "#198754",
                background: activeLetter === letter ? "#198754" : "transparent",
                borderRadius: "4px",
                transition: "all 0.2s",
                minWidth: letter === "ALL" ? "60px" : "32px", // Thêm width cho nút ALL
                textAlign: "center",
              }}
            >
              {letter === "ALL" ? "Tất cả" : letter}
            </span>
          ))}
        </div>

        {/* Show brands */}
        <div className="mb-5">
          {activeLetter === "ALL" ? null : (
            <h3 className="mb-4">{activeLetter}</h3>
          )}
          {renderBrands()}
        </div>
        
        <div className="service-support" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between" }}>
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
    </>
  );
};

export default Brand;
