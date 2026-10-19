import React, { useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap"; // Import thêm Navbar và Nav từ react-bootstrap

const GioiThieu = () => {
  // Cuộn lên đầu khi component được render
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
            <Nav.Link href="/" className="custom-nav-link">TRANG CHỦ</Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Nội dung chính */}
      <Container className="py-4">
        <h2 className="text-center fw-bold mb-3" style={{ color: "#357960" }}>
          Tháng 4 /2016
        </h2>
        <div className="d-flex justify-content-center align-items-center mb-4 flex-wrap gap-3">
          <img
            src="/img/logo.png"
            alt="building"
            height={100}
            width={100}
            className="d-inline-block align-top rounded-circle"
            style={{
              border: "2px solid white",
              padding: "2px",
            }}
          />
        </div>
        <div className="bg-success bg-opacity-10 rounded-3 p-3 mb-4">
          <div>
            • ChuTi được thành lập tại Việt Nam vào tháng 4/2016 với mục tiêu chăm
            sóc sắc đẹp và sức khỏe toàn diện cho người Việt Nam.
          </div>
          <div>
            • ChuTi đã tạo ra những trải nghiệm mua sắm trực tuyến tuyệt vời cùng
            dịch vụ chăm sóc Spa chuyên nghiệp với các thiết bị hiện đại hàng đầu
            thế giới hiện nay.
          </div>
        </div>
        <Row className="text-center mb-4">
          <Col md={3} xs={6} className="mb-3">
            <img
              src="/img/GioiThieu/hangchinhang.svg"
              alt="Hàng chính hãng"
              height={70}
            />
            <div className="fw-bold mt-2">HÀNG CHÍNH HÃNG</div>
            <div className="small mt-1">
              Cam kết cung cấp các sản phẩm chính hãng và{" "}
              <b>nhập khẩu 100% từ Mỹ, Pháp...</b> Số lượng sản phẩm và dịch vụ lớn
              nhất với chủng loại đa dạng, phong phú sẽ đáp ứng tất cả nhu cầu mua
              sắm của bạn.
            </div>
          </Col>
          <Col md={3} xs={6} className="mb-3">
            <img src="/img/GioiThieu/icon_safe.svg" alt="Bảo mật" height={70} />
            <div className="fw-bold mt-2">BẢO MẬT</div>
            <div className="small mt-1">Cam kết bảo mật thông tin khách hàng.</div>
          </Col>
          <Col md={3} xs={6} className="mb-3">
            <img
              src="/img/GioiThieu/icon_doitramienphi_30ngay.svg"
              alt="Đổi trả miễn phí"
              height={70}
            />
            <div className="fw-bold mt-2">ĐỔI TRẢ MIỄN PHÍ</div>
            <div className="small mt-1">
              Cam kết tư vấn và hỗ trợ quý khách kịp thời, nhiệt tình theo đúng các
              quy định của pháp luật và chuẩn mực đạo đức nghề nghiệp.
            </div>
          </Col>
          <Col md={3} xs={6} className="mb-3">
            <img
              src="/img/GioiThieu/icon_hks_nowfree.svg"
              alt="NowFree 2H"
              height={70}
            />
            <div className="fw-bold mt-2">NowFree 2H</div>
            <div className="small mt-1">
              Cam kết vận hành tốc độ giao hàng nhanh vượt trội nhằm rút ngắn tối đa
              thời gian khách hàng nhận được sản phẩm.
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GioiThieu;
