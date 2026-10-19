import React, { useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap"; // Import thêm Navbar và Nav từ react-bootstrap

const Chinhsachdoitra = () => {
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
      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h1 style={{ color: "#198754", fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}>
          Chính Sách Đổi Trả
        </h1>
        <div style={{ lineHeight: "1.8", fontSize: "16px", color: "#333" }}>
          <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>1. Điều kiện đổi trả</h3>
          <p>
            - Sản phẩm còn nguyên tem, nhãn mác, chưa qua sử dụng và còn đầy đủ phụ kiện (nếu có).<br />
            - Sản phẩm bị lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển.<br />
            - Yêu cầu đổi trả được thực hiện trong vòng 7 ngày kể từ ngày nhận hàng.
          </p>

          <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>2. Quy trình đổi trả</h3>
          <p>
            - Bước 1: Liên hệ với bộ phận chăm sóc khách hàng qua hotline <b>1900 1208</b> hoặc email <b>hotro@chuti.com</b>.<br />
            - Bước 2: Cung cấp thông tin đơn hàng và lý do đổi trả.<br />
            - Bước 3: Gửi sản phẩm về địa chỉ được cung cấp bởi bộ phận chăm sóc khách hàng.<br />
            - Bước 4: Sau khi nhận được sản phẩm, chúng tôi sẽ kiểm tra và xử lý yêu cầu đổi trả trong vòng 3-5 ngày làm việc.
          </p>

          <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>3. Phí đổi trả</h3>
          <p>
            - Miễn phí đổi trả đối với sản phẩm bị lỗi do nhà sản xuất hoặc hư hỏng trong quá trình vận chuyển.<br />
            - Đối với các trường hợp đổi trả khác, khách hàng sẽ chịu phí vận chuyển.
          </p>

          <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>4. Lưu ý</h3>
          <p>
            - Chúng tôi không chấp nhận đổi trả đối với các sản phẩm thuộc danh mục không hỗ trợ đổi trả (ví dụ: sản phẩm giảm giá, sản phẩm dùng một lần, v.v.).<br />
            - Vui lòng giữ lại hóa đơn mua hàng để đảm bảo quyền lợi của bạn.
          </p>

          <h3 style={{ color: "#198754", fontWeight: "bold", marginBottom: "15px" }}>5. Liên hệ hỗ trợ</h3>
          <p>
            Nếu bạn có bất kỳ thắc mắc nào về chính sách đổi trả, vui lòng liên hệ với chúng tôi qua:<br />
            - Hotline: <b>1900 1208</b><br />
            - Email: <b>hotro@chuti.com</b>
          </p>
        </div>
      </Container>
    </>
  );
};

export default Chinhsachdoitra;