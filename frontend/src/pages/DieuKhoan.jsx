import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const DieuKhoan = () => {
  // Cuộn lên đầu khi trang được tải
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
      <Container className="py-4">
        <h5 className="fw-bold mb-3">Quy định sử dụng</h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Khi khách hàng vào Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          với tư cách khách viếng thăm hay thành viên đã đăng ký, xin vui lòng đọc
          kỹ quy định sử dụng. ChuTi có quyền thay đổi, chỉnh sửa, thêm hoặc lược
          bỏ bất kỳ phần nào trong Điều khoản sử dụng này, vào bất cứ lúc nào. Các
          thay đổi có hiệu lực ngay khi được đăng trên Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          mà không cần thông báo trước và quý khách có trách nhiệm phải cập nhật
          Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          thường xuyên để theo dõi các thông tin được đăng để có thể cập nhật kịp
          thời. Việc bạn tiếp tục sử dụng trang{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          sau khi những thay đổi đó được đăng đồng nghĩa với việc bạn đã đồng ý
          với những sửa đổi trong Quy định sử dụng
          <br />
          <br />
          ChuTi không chịu trách nhiệm về chất lượng đường truyền Internet ảnh
          hưởng đến tốc độ truy cập của bạn vào Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>.
        </div>

        <h5 className="fw-bold mt-4 mb-3">
          Quy định và hướng dẫn liên quan đến khách hàng
        </h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha
          mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự
          để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của
          pháp luật Việt Nam.
          <br />
          <br />
          ChuTi có quyền hỏi thêm về thông tin khách hàng khi xác nhận đơn hàng để
          đảm bảo mọi thông tin liên lạc về đơn hàng được xử lý chính xác nhất.
          <br />
          <br />
          ChuTi sẽ cấp một tài khoản sử dụng để khách hàng có thể mua sắm trong
          khuôn khổ Điều khoản và Điều kiện sử dụng đã đề ra. Quý khách hàng sẽ phải
          đăng ký tài khoản với thông tin xác thực về bản thân và phải cập nhật nếu
          có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật
          khẩu, tài khoản và hoạt động của mình trên{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>.
          Ngoài ra, quý khách hàng phải thông báo cho ChuTi biết khi tài khoản bị
          truy cập trái phép ChuTi không chịu bất kỳ trách nhiệm nào, dù trực tiếp
          hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do Quý khách
          không tuân thủ quy định.
          <br />
          <br />
          Nghiêm cấm sử dụng bất kỳ phần nào của trang{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span> với
          mục đích thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không
          được ChuTi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong đây,
          ChuTi sẽ hủy tài khoản của khách mà không cần báo trước.
          <br />
          <br />
          Trong suốt quá trình đăng ký, Quý khách sẽ nhận email quảng cáo từ Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>.
          Nếu không muốn tiếp tục nhận email, quý khách có thể từ chối bằng cách
          nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
          <br />
          <br />
          Tất cả nội dung tại Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span> và
          ý kiến phê bình của Quý khách đều là tài sản của chúng tôi. Nếu chúng tôi
          phát hiện bất kỳ thông tin giả mạo nào, chúng tôi sẽ khóa tài khoản của
          quý khách ngay lập tức hoặc áp dụng các biện pháp khác theo quy định của
          pháp luật Việt Nam.
        </div>

        <h5 className="fw-bold mt-4 mb-3">Thông báo</h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Mọi thông báo liên quan đến việc mua hàng sẽ được gửi văn bản đến bạn qua
          email hoặc bằng điện thoại cho khách hàng.
        </div>

        <h5 className="fw-bold mt-4 mb-3">
          Thương hiệu và bản quyền sở hữu trí tuệ
        </h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung thông
          tin và tất cả các logo, biểu tượng thiết kế, văn bản, đồ họa, phần mềm,
          hình ảnh, video, âm nhạc, âm thanh, biên dịch, mã nguồn và phần mềm cơ bản
          đều là tài sản của ChuTi. Toàn bộ nội dung của trang{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          được bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế. Bản
          quyền đã được bảo lưu.
          <br />
          <br />
          Bạn không được sử dụng bất kỳ tài liệu nào trên trang Website{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span> cho
          mục đích thương mại mà không có sự cho phép từ chúng tôi hay những người
          đã cấp phép cho chúng tôi. Nếu bạn in, sao chép, hoặc tải bất kỳ phần nào
          của trang{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span> vi
          phạm Quy định Sử dụng, bạn sẽ phải hoàn trả hoặc hủy các bản sao của các
          tài liệu mà bạn đã làm ra.
        </div>

        <h5 className="fw-bold mt-4 mb-3">Giải quyết tranh chấp</h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Bất kỳ tranh cãi, khiếu nại hoặc tranh chấp phát sinh từ hoặc liên quan
          đến giao dịch tại{" "}
          <span style={{ color: "#2eaf74", fontWeight: 600 }}>ChuTi Beaty</span>{" "}
          hoặc các Quy định và Điều kiện này đều sẽ được giải quyết bằng hình thức
          thương lượng, hòa giải, trọng tài và/hoặc Tòa án theo Luật bảo vệ Người
          tiêu dùng về Giải quyết tranh chấp giữa người tiêu dùng và tổ chức, cá
          nhân kinh doanh hàng hóa, dịch vụ.
        </div>

        <h5 className="fw-bold mt-4 mb-3">
          Luật pháp và thẩm quyền tại Lãnh thổ Việt Nam
        </h5>
        <div style={{ textAlign: "justify", fontSize: 16 }}>
          Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả các nghĩa vụ
          phát sinh ngoài hợp đồng hoặc có liên quan) sẽ bị chi phối và được hiểu
          theo luật pháp của Việt Nam. Nếu có điều khoản nào bị vô hiệu, các quy
          định còn lại vẫn có hiệu lực. Nếu phát sinh bất kỳ khiếu nại/kiện tụng
          liên Tòa án có thẩm quyền tại Việt Nam để giải quyết.
        </div>
      </Container>
    </>
  );
};

export default DieuKhoan;
