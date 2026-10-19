import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const socialIcons = [
  {
    src: "/img/LienHe/fb.png",
    alt: "Facebook",
    label: "Facebook",
    desc: "Kết nối với chúng tôi qua Facebook để cập nhật tin tức mới nhất.",
    link: "https://www.facebook.com/khaitien2406",
  },
  {
    src: "/img/LienHe/icon_tiktok.png",
    alt: "TikTok",
    label: "TikTok",
    desc: "Theo dõi các video ngắn thú vị về sản phẩm và dịch vụ.",
    link: "https://www.tiktok.com/@3cham.tn",
  },
  {
    src: "/img/LienHe/instagram.png",
    alt: "Instagram",
    label: "Instagram",
    desc: "Xem hình ảnh và câu chuyện nổi bật trên Instagram của chúng tôi.",
    link: "https://www.instagram.com/tiennguyen9546/",
  },
];

const LienHe = () => {
  // Cuộn lên đầu khi trang được tải
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Navbar */}
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
      <Container className="py-5">
        <Row className="justify-content-center align-items-center mb-4">
          <Col xs="auto">
            <Image
              src="/img/LienHe/avt.png"
              alt="Avatar"
              roundedCircle
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                border: "3px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          </Col>
          <Col xs="auto">
            <div className="ms-3">
              <h4 className="mb-2" style={{ fontWeight: 700 }}>
                Người điều hành
              </h4>
              <div style={{ fontSize: 18, fontWeight: 500 }}>
                Tên: Nguyễn Văn Khải Tiến
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="bg-success bg-opacity-10 rounded-3 p-3 mb-4">
            <div style={{ textAlign: "justify" }}>
              Với cương vị là người điều hành chính thức của ChuTi Beauty, tôi luôn
              đặt sứ mệnh phát triển thương hiệu bền vững và mang lại giá trị thực
              cho khách hàng lên hàng đầu. Tôi cam kết không ngừng học hỏi, đổi mới
              và dẫn dắt đội ngũ bằng tất cả tâm huyết, nhằm xây dựng ChuTi Beauty
              trở thành điểm đến uy tín trong lòng mọi người yêu cái đẹp. Đồng thời,
              tôi cũng chú trọng tạo ra môi trường làm việc chuyên nghiệp, thân
              thiện, nơi mỗi thành viên có cơ hội phát triển bản thân và cùng nhau
              đạt được những mục tiêu lớn lao.
            </div>
          </Col>
        </Row>
        <Row className="justify-content-start mt-4">
          {socialIcons.map((icon) => (
            <Col key={icon.alt} xs={12} md={4} className="text-center mb-4">
              <a href={icon.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={icon.src}
                  alt={icon.alt}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    objectFit: "cover",
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                />
              </a>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{icon.label}</div>
              <div style={{ fontSize: 14, color: "#555" }}>{icon.desc}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default LienHe;
