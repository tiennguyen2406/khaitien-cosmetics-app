import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const serviceBlocks = [
  {
    id: 1,
    img: '/img/Quang Cao/anh quang cao 1.jpg',
    title: 'Làm đẹp công nghệ cao',
    desc: 'An toàn, hiệu quả, giá chỉ từ 1.200K',
  },
  {
    id: 2,
    img: '/img/Quang Cao/anh quang cao 2.jpg',
    title: 'Trải nghiệm triệt lông Diode Laser',
    desc: 'Ưu đãi đến 67%, chỉ từ 99.000đ',
  },
  {
    id: 3,
    img: '/img/Quang Cao/anh quang cao 3.jpg',
    title: 'Deal sốc chỉ từ 2K',
    desc: 'Số lượng có hạn, săn ngay!',
  },
  {
    id: 4,
    img: '/img/Quang Cao/QC1.jpg',
    title: 'Deal sốc chỉ từ 2K',
    desc: 'Số lượng có hạn, săn ngay!',
  },
  {
    id: 5,
    img: '/img/Quang Cao/QC2.jpg',
    title: 'Trải nghiệm triệt lông Diode Laser',
    desc: 'Ưu đãi đến 67%, chỉ từ 99.000đ',
  },
  {
    id: 6,
    img: '/img/Quang Cao/QC3.jpg',
    title: 'Deal sốc chỉ từ 2K',
    desc: 'Số lượng có hạn, săn ngay!',
  },
  {
    id: 7,
    img: '/img/Quang Cao/QC4.jpg',
    title: 'Deal sốc chỉ từ 2K',
    desc: 'Số lượng có hạn, săn ngay!',
  },
  {
    id: 8,
    img: '/img/Quang Cao/QC5.jpg',
    title: 'Trải nghiệm triệt lông Diode Laser',
    desc: 'Ưu đãi đến 67%, chỉ từ 99.000đ',
  }
];

const HotDeal = () => {
  const navigate = useNavigate();

  const handleBlockClick = (block) => {
    console.log(`Bạn đã nhấn vào block với id: ${block.id}`);
    // Điều hướng đến trang chi tiết
    navigate(`/chi-tiet-hot-deal/${block.id}`, { state: { block } });
  };

  // Chia serviceBlocks thành các hàng, mỗi hàng 2 deal
  const rows = [];
  for (let i = 0; i < serviceBlocks.length; i += 2) {
    rows.push(serviceBlocks.slice(i, i + 2));
  }

  return (
    <Container fluid style={{ background: '#f8f8f8', minHeight: '100vh', padding: 0 }}>
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

      {/* Các mục dịch vụ/trải nghiệm/deal sốc, mỗi hàng 2 deal, tổng chiều rộng 90% */}
      <div style={{ width: '80%', margin: '32px auto 0 auto' }}>
        {rows.map((row, rowIdx) => (
          <Row key={rowIdx} style={{ justifyContent: 'center', marginBottom: 0 }}>
            {row.map((block, idx) => (
              <Col key={idx} md={6} sm={12} style={{ marginBottom: 0, display: 'flex', justifyContent: 'center' }}>
                <div
                  onClick={() => handleBlockClick(block)}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    boxShadow: '0 2px 12px #0001',
                    padding: 0,
                    width: '95%',
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}>
                  <img src={block.img} alt={block.title} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                  <div style={{ padding: 16, textAlign: 'center' }}>
                    <h5 style={{ color: '#ff2171', fontWeight: 700 }}>{block.title}</h5>
                    <p style={{ color: '#222', fontWeight: 500, fontSize: 15 }}>{block.desc}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ))}
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

export default HotDeal;