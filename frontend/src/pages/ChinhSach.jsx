import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";

const ChinhSach = () => {
  // Cuộn lên đầu khi trang được tải
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container className="py-4">
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
      <h2 className="text-center fw-bold mb-4">
        THÔNG BÁO VỀ XỬ LÝ DỮ LIỆU CÁ NHÂN VÀ CHÍNH SÁCH BẢO MẬT
      </h2>
      <div className="text-justify">
        <p>
          Chào mừng Quý Khách Hàng đến với Công ty Cổ phần ChuTi Beauty (sau đây
          gọi là "ChuTi"). ChuTi luôn đặt sự ưu tiên cho việc bảo vệ thông tin
          cá nhân của khách hàng. Thông báo về xử lý dữ liệu cá nhân và chính
          sách bảo mật (sau đây gọi là "Chính sách") là một bản tuyên bố minh
          bạch về cách ChuTi thu thập, xử lý và bảo mật dữ liệu cá nhân của
          Khách Hàng trong quá trình tìm kiếm, tiếp cận, mua hàng, đăng ký sử
          dụng và sử dụng các sản phẩm, dịch vụ của ChuTi. Mục tiêu của ChuTi là
          luôn đảm bảo dữ liệu cá nhân của Khách Hàng được bảo mật theo đúng quy
          trình bảo mật của ChuTi và tuân thủ đúng quy định của pháp luật.
        </p>

        <p>
          Chính sách này là một phần không thể tách khỏi các thỏa thuận, các
          giao dịch mua hàng, hợp đồng và các điều kiện ràng buộc giữa ChuTi và
          Quý Khách Hàng. Nội dung Chính sách có thể được thay đổi khi cần thiết
          tùy thuộc vào từng thời điểm, vì vậy ChuTi khuyến khích Khách Hàng
          thường xuyên kiểm tra định kỳ Chính sách này được công bố công khai
          trên trang thông tin của ChuTi.
        </p>

        <p className="fw-bold">
          Nội dung Chính sách cụ thể được quy định tại các điều khoản sau đây:
        </p>

        <h5 className="fw-bold mt-4 text-success">
          Điều 1: Đối tượng và phạm vi áp dụng
        </h5>
        <div className="ps-4">
          <p>
            1.1 Chính sách điều chỉnh hoạt động thu thập, xử lý và bảo mật dữ
            liệu cá nhân của khách hàng bởi ChuTi. Dữ liệu cá nhân được ChuTi
            thu thập, xử lý thông qua việc Khách Hàng truy cập, cung cấp thông
            tin hay bất cứ hành động nào vào Hệ Thống của ChuTi hoặc từ nguồn
            cung cấp thông tin, dữ liệu của Khách hàng phù hợp theo quy định của
            pháp luật.
          </p>
          <p>
            1.2 Trường hợp Khách Hàng cung cấp cho ChuTi các dữ liệu cá nhân
            không thuộc về Khách Hàng như dữ liệu của người nhận hàng, người
            nhận cung cấp dịch vụ, người lao động của Khách Hàng… Khách Hàng
            phải đảm bảo chủ thể của dữ liệu Khách Hàng cung cấp phải biết và
            đồng ý để ChuTi thực hiện việc thu thập, xử lý và bảo mật theo quy
            định của Chính sách này. ChuTi được miễn trừ mọi trách nhiệm với Chủ
            sở hữu dữ liệu và miễn trừ toàn bộ nghĩa vụ tham gia tranh chấp, bồi
            thường, thỏa thuận nào giữa Khách Hàng với chủ sở hữu dữ liệu và
            hoặc miễn trừ bất kỳ nghĩa vụ liên đới nào khác (nếu có).
          </p>
        </div>
        <h5 className="fw-bold mt-4 text-success">Điều 2: Giải thích từ ngữ</h5>
        <div className="ps-4">
          <p>
            2.1 "Khách hàng" là cá nhân tiếp cận, tìm hiểu, đăng ký, sử dụng,
            liên hệ, tạo đơn hàng, bình luận, đánh giá hoặc bất kỳ hành động nào
            để lại thông tin tại Hệ Thống của ChuTi.
          </p>
          <p>
            2.2 "ChuTi" là Công ty Cổ phần ChuTi Beauty, mã số thuế 0313612829,
            trụ sở chính: 71 Hoàng Hoa Thám, Phường 13, Quận Tân Bình, Thành phố
            Hồ Chí Minh, Việt Nam.
          </p>
          <p>
            2.3 "Hệ thống" là website/ ứng dụng trên di động, trực tiếp tại cửa
            hàng hoặc bất kỳ kênh giao dịch, công cụ quản lý nào khác thuộc sự
            điều hành/ quản lý của Công ty Cổ phần ChuTi Beauty.
          </p>
          <p>
            2.4 "Dữ liệu cá nhân" hay "DLCN" là thông tin dưới dạng ký hiệu, chữ
            viết, chữ số, hình ảnh, âm thanh, ghi âm, ghi hình, dữ liệu sinh
            trắc học, số, hình ảnh, âm thanh, ghi âm, ghi hình, dữ liệu sinh
            trắc học, cuộc trò chuyện… hoặc dạng tương tự trên môi trường điện
            tử gắn liền với một con người cụ thể hoặc giúp xác định một con
            người cụ thể. Dữ liệu cá nhân bao gồm dữ liệu cá nhân cơ bản và dữ
            liệu cá nhân nhạy cảm.
          </p>
          <p>
            2.5 "Sự đồng ý với Chính sách" là việc Khách Hàng chọn "Tôi đồng ý
            với Chính sách thu thập, xử lý và bảo mật dữ liệu của ChuTi" khi
            đăng ký tài khoản để thực hiện các hoạt động trên Hệ Thống của
            ChuTi.
          </p>
          <p>
            2.6 "Sự đồng ý với Cookie và công nghệ theo dấu khác" là việc Khách
            hàng chọn "Đồng ý Cookie" khi truy cập vào Hệ Thống của ChuTi.
          </p>
          <p>
            2.7 "Bảo vệ dữ liệu cá nhân là hoạt động phòng ngừa, phát hiện, ngăn
            chặn, xử lý hành vi vi phạm liên quan đến dữ liệu cá nhân theo quy
            định của pháp luật.
          </p>
          <p>
            2.8 "Xử lý dữ liệu cá nhân" là một hoặc nhiều hoạt động tác động tới
            dữ liệu Khách Hàng như: thu thập, ghi âm, ghi hình, phân tích, xác
            nhận, lưu trữ, chỉnh sửa, công khai, kết hợp, truy cập, truy xuất,
            thu hồi, mã hóa, giải mã, sao chép, chia sẻ, truyền đưa, cung cấp,
            chuyển giao, xóa, hủy dữ liệu cá nhân hoặc các hành động khác có
            liên quan.
          </p>
          <p>
            2.9 "Bên thứ ba" là tổ chức, cá nhân ngoài Khách Hàng và ChuTi được
            giải thích theo Chính sách này.
          </p>
        </div>
        <h5 className="fw-bold mt-4 text-success">
          Điều 3: Dữ liệu cá nhân cơ bản được thu thập và xử lý
        </h5>
        <div className="ps-4">
          <p>
            Tùy theo từng thời điểm cụ thể, theo quy định pháp luật, ChuTi sẽ
            thu thập, xử lý một/một số/tất cả các dữ liệu cá nhân sau:
          </p>

          <p>(i) Họ, chữ đệm và tên khai sinh, tên gọi khác (nếu có);</p>

          <p>
            (ii) Ngày, tháng, năm sinh; ngày, tháng, năm chết hoặc mất tích;
          </p>

          <p>(iii) Giới tính;</p>

          <p>
            (iv) Nơi sinh, nơi đăng ký khai sinh, nơi thường trú, nơi tạm trú,
            nơi ở hiện tại, quê quán, địa chỉ liên hệ, địa chỉ lấy hàng;
          </p>

          <p>(v) Quốc tịch;</p>

          <p>(vi) Hình ảnh hoặc âm thanh hoặc video của Khách Hàng;</p>

          <p>
            (vii) Số điện thoại, số chứng minh nhân dân, số căn cước công dân,
            số định danh cá nhân, số hộ chiếu, số giấy phép lái xe, số biển số
            xe, số mã số thuế cá nhân, số bảo hiểm xã hội, số thẻ bảo hiểm y tế;
          </p>

          <p>(viii) Thông tin về mối quan hệ gia đình (cha mẹ, con cái);</p>

          <p>
            (ix) Thông tin về tài khoản số của cá nhân; địa chỉ thư điện tử;
          </p>

          <p>
            (x) Thông tin về mạng của Khách Hàng hay thông tin được gửi bởi
            thiết bị được sử dụng của Khách Hàng để truy cập vào Hệ Thống của
            ChuTi;
          </p>

          <p>
            (xi) Thông tin sử dụng, giao dịch và dữ liệu cá nhân phản ánh hoạt
            động, lịch sự hoạt động liên quan đến Hệ Thống của ChuTi bao gồm
            nhưng không giới hạn như: số điện thoại khởi tạo cuộc gọi, số điện
            thoại nhận cuộc gọi, thời gian khởi tạo và kết thúc cuộc gọi, thời
            gian cuộc gọi, số điện thoại gửi tin nhắn, số điện thoại nhận tin
            nhắn, thời gian gửi và nhận tin nhắn giữa ChuTi và Khách Hàng; thông
            tin đánh giá, thông tin /khiếu nại/yêu cầu sửa chữa/xử lý sự cố; các
            dữ liệu liên quan đến các Hệ Thống của ChuTi (bao gồm loại thiết bị,
            hệ điều hành, loại trình duyệt, cài đặt trình duyệt, địa chỉ IP, cài
            đặt ngôn ngữ, ngày và giờ kết nối với Hệ Thống của ChuTi và thông
            tin liên lạc kỹ thuật khác); tên tài khoản; mật khẩu; chi tiết đăng
            nhập bảo mật; dữ liệu sử dụng; dữ liệu cookie; lịch sử duyệt web; dữ
            liệu clickstream; lịch sử xem kênh, video ghi hình tại cửa hàng
            (theo từng yêu cầu cụ thể)...
          </p>

          <p>
            (xii) Thông tin tương tác với bất kỳ quảng cáo hay nội dung hiển thị
            nào thuộc Hệ Thống của ChuTi;
          </p>

          <p>(xiii) Dữ liệu về vị trí, địa điểm;</p>

          <p>
            (xiv) Các thông tin khác có liên quan, ảnh hưởng (trực tiếp/gián
            tiếp) hoặc phát sinh từ/liên quan đến việc xác lập quan hệ giữa
            Khách Hàng và ChuTi;
          </p>

          <p>
            (xv) Dữ liệu Khách Hàng tương tác với Hệ Thống của ChuTi được cookie
            và công nghệ theo dấu khác để thu thập;
          </p>

          <p>
            (xvi) Bản ghi âm, ghi hình, cuộc trò chuyện được ghi lại bởi thiết
            bị của ChuTi đặt tại các văn phòng làm việc, địa điểm kinh doanh,
            chi nhánh, trụ sở công ty hoặc bất kỳ nơi nào thực hiện một hay một
            phần hoạt động kinh doanh của ChuTi nhằm mục đích bảo vệ trật tự an
            toàn xã hội, bảo vệ quyền và lợi ích hợp pháp của Khách Hàng và
            ChuTi.
          </p>
        </div>
        <h5 className="fw-bold mt-4 text-success">
          Điều 4: Dữ liệu cá nhân nhạy cảm được thu thập và xử lý
        </h5>
        <div className="ps-4">
          <p>
            Tùy theo từng thời điểm cụ thể, theo quy định pháp luật, ChuTi sẽ
            thu thập, xử lý một/một số/tất cả các dữ liệu cá nhân sau:
          </p>

          <p>(i) Hình ảnh nhận diện Khách Hàng thông qua Hệ Thống của ChuTi.</p>

          <p>
            (ii) Thông tin liên quan tới việc Khách Hàng sử dụng dịch vụ trung
            gian thanh toán, bao gồm: thông tin định danh khách hàng theo quy
            định pháp luật, thông tin về tài khoản, thông tin về tiền gửi, thông
            tin về tài sản gửi, thông tin về giao dịch, thông tin về tổ chức, cá
            nhân là bên bảo đảm tại tổ chức tín dụng, chi nhánh ngân hàng, tổ
            chức cung ứng dịch vụ trung gian thanh toán;
          </p>

          <p>
            (iii) Thông tin tài khoản, thông tin sử dụng bao gồm: Tên cơ quan
            đơn vị của Khách Hàng; mã số thuế; thông tin tài khoản của Khách
            Hàng;
          </p>

          <p>
            (iv) Tình trạng y tế, sức khỏe và đời tư được ghi trong hồ sơ bệnh
            án;
          </p>

          <p>
            (v) Thông tin liên quan đến tình trạng sức khỏe, lịch sử khám chữa
            bệnh ở các cơ sở khám chữa bệnh khác, các vấn đề về y tế;
          </p>

          <p>
            (vi) Thông tin về đặc điểm di truyền được thừa hưởng hoặc có được
            của Khách Hàng;
          </p>

          <p>
            (vii) Thông tin về thuộc tính vật lý, đặc điểm sinh học riêng của
            Khách Hàng;
          </p>

          <p>
            (viii) Dữ liệu về vị trí của Khách Hàng được xác định qua dịch vụ
            định vị;
          </p>

          <p>
            (ix) Các dữ liệu cá nhân nhạy cảm khác theo quy định pháp luật mà
            ChuTi thấy là cần thiết hoặc ChuTi phải thu thập theo quy định pháp
            luật hoặc yêu cầu của cơ quan nhà nước có thẩm quyền, cho việc xử lý
            dữ liệu cá nhân vì các mục đích được quy định tại Chính sách này.
          </p>
        </div>
        <h5 className="fw-bold mt-4 text-success">
          Điều 5: Mục đích thu thập, xử lý dữ liệu cá nhân cơ bản
        </h5>

        <div className="ps-4">
          <p>
            5.1 Xử lý đơn hàng: xử lý các vấn đề liên quan đến đơn đặt hàng của
            Khách Hàng như: gọi điện/tin nhắn xác nhận việc đặt hàng, thông báo
            về trạng thái đơn hàng và thời gian giao hàng, xác nhận việc huỷ đơn
            hàng (nếu có).
          </p>

          <p>
            5.2 Cung cấp các dịch vụ cho Khách Hàng như: xác nhận lịch đặt hẹn
            dịch vụ, nhắc lịch bảo hành, chăm sóc khách hàng, tư vấn/hỗ trợ sau
            khi thực hiện dịch vụ.
          </p>

          <p>
            5.3 Gửi thư ngỏ/thư cảm ơn, giới thiệu sản phẩm mới, dịch vụ mới
            hoặc các chương trình khuyến mãi của ChuTi.
          </p>

          <p>
            5.4 Tạo và duy trì tài khoản của Khách Hàng, bao gồm cả các chương
            trình khách hàng thân thiết hoặc các chương trình thưởng đi kèm với
            tài khoản của Khách Hàng.
          </p>

          <p>
            5.5 Dịch vụ chăm sóc khách hàng: bao gồm các phản hồi cho các yêu
            cầu, khiếu nại và phản hồi của Khách Hàng.
          </p>

          <p>
            5.6 Đo lường, phân tích dữ liệu nội bộ và các xử lý khác để cải
            thiện, nâng cao chất lượng dịch vụ/sản phẩm của ChuTi hoặc thực hiện
            các hoạt động truyền thông tiếp thị.
          </p>

          <p>
            5.7 Thực hiện các nghĩa vụ của ChuTi về thanh tra, kiểm tra, thống
            kê, báo cáo, tài chính, kế toán và thuế.
          </p>

          <p>
            5.8 Sử dụng, chuyển giao cho đối tác của ChuTi các Dữ liệu cá nhân,
            thông tin vướng mắc, sự cố, báo cáo lỗi do Khách Hàng phản ánh để
            xác định và khắc phục sự cố của Sản phẩm, hàng hóa, dịch vụ, thực
            hiện hoạt động khác về chăm sóc và hỗ trợ Khách Hàng.
          </p>

          <p>
            5.9 Báo cáo, thống kê, phân tích dữ liệu nội bộ để nghiên cứu, xây
            dựng, phát triển, quản lý, đo lường, cung cấp và cải tiến sản phẩm,
            dịch vụ cũng như điều hành hoạt động kinh doanh của ChuTi.
          </p>

          <p>
            5.10 Cá nhân hóa: ChuTi xử lý dữ liệu được thu thập để có một cái
            nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép ChuTi
            phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía cạnh, bao gồm
            nhưng không giới hạn:
          </p>
          <div className="ps-4">
            <p>
              (i) Để cải thiện và cá nhân hóa trải nghiệm của Khách Hàng khi vào
              Hệ Thống của ChuTi.
            </p>
            <p>
              (ii) Để cải thiện các tiện ích, dịch vụ, điều chỉnh phù hợp với
              các nhu cầu được cá thể hóa và đi đến những ý tưởng dịch vụ mới.
            </p>
            <p>
              (iii) Để phục vụ Khách Hàng với những giới thiệu, quảng cáo được
              điều chỉnh phù hợp với sự quan tâm của Khách Hàng.
            </p>
          </div>

          <p>
            5.11 An ninh: cho các mục đích ngăn ngừa các hoạt động phá hủy tài
            khoản hoặc các hoạt động giả mạo Khách Hàng.
          </p>

          <p>
            5.12 Ghi âm cuộc tư vấn giữa bác sĩ và khách hàng nằm mục đích cải
            thiện chất lượng dịch vụ tư vấn cho khách hàng.
          </p>

          <p>
            5.13 Theo yêu cầu của pháp luật: tùy quy định của pháp luật vào từng
            thời điểm, ChuTi có thể thu thập, lưu trữ và cung cấp dữ liệu cá
            nhân của Khách Hàng theo yêu cầu của cơ quan nhà nước có thẩm quyền.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 6: Mục đích thu thập, xử lý dữ liệu cá nhân nhạy cảm
        </h5>
        <div className="ps-4">
          <p>6.1 Xác định danh tính Khách Hàng, tính chính xác của dữ liệu.</p>

          <p>6.2 Đánh giá trình trạng sức khỏe của Khách Hàng.</p>

          <p>
            6.3 Thực hiện các chức năng và hoạt động liên quan đến việc cung cấp
            dịch vụ khám bệnh, chữa bệnh.
          </p>

          <p>
            6.4 Quản lý, giám sát, kiểm soát toàn bộ quá trình khám chữa bệnh,
            cung cấp dịch vụ của ChuTi, bao gồm cả việc xác minh, rà soát, đánh
            giá và giải quyết khiếu nại, tranh chấp có liên quan.
          </p>

          <p>
            6.5 Cung cấp các dịch vụ chăm sóc Khách Hàng: liên lạc, các chương
            trình, chính sách chăm sóc sức khỏe, nhắc nhở lịch khám, tái khám và
            cập nhật những thay đổi của Khách Hàng, tình trạng sức khỏe…
          </p>

          <p>
            6.6 Theo dõi sức khỏe và các hoạt động điều trị, chăm sóc sức khỏe
            của Khách hàng.
          </p>

          <p>
            6.7 Báo cáo, thống kê, phân tích dữ liệu nội bộ để nghiên cứu, xây
            dựng, phát triển, quản lý, đo lường, cung cấp và cải tiến sản phẩm,
            dịch vụ cũng như điều hành hoạt động kinh doanh của ChuTi.
          </p>

          <p>
            6.8 Cho mục đích tuân thủ pháp luật Việt Nam và nước ngoài, các yêu
            cầu của các cơ quan có thẩm quyền tại Việt Nam hoặc nước ngoài, và
            các mục đích khác liên quan đến bất kỳ nội dung nào kể trên;
          </p>

          <p>
            6.9 Cho mục đích nâng cao chất lượng khám bệnh, chữa bệnh; hội chẩn,
            điều trị.
          </p>

          <p>
            6.10 Lưu trữ, quản lý, dự phòng cho việc phục hồi sự cố hay cho các
            mục đích tương tự khác.
          </p>

          <p>
            6.11 Thực hiện các nghĩa vụ của ChuTi về thanh tra, kiểm tra, thống
            kê, báo cáo, tài chính, kế toán và thuế.
          </p>

          <p>
            6.12 Ghi âm tư vấn khám bệnh giữa bác sĩ và khách hàng giúp ChuTi
            đánh giá chính xác các phản ánh của khách hàng, xử lý các khiếu nại
            liên quan đến tư vấn và đảm bảo rằng mọi thông tin đều được xử lý
            minh bạch và công bằng.
          </p>

          <p>
            6.13 Cá nhân hóa: ChuTi xử lý dữ liệu được thu thập để có một cái
            nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép ChuTi
            phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía cạnh, bao gồm
            nhưng không giới hạn:
          </p>
          <div className="ps-4 mb-2">
            <p>
              (i) Để cải thiện và cá nhân hóa trải nghiệm của Khách Hàng vào Hệ
              Thống của ChuTi.
            </p>
            <p>
              (ii) Để cải thiện các tiện ích, dịch vụ, điều chỉnh phù hợp với
              các nhu cầu được cá thể hóa và đi đến những ý tưởng dịch vụ mới.
            </p>
          </div>

          <p>
            6.13 Để phục vụ Khách Hàng với những giới thiệu, quảng cáo được điều
            chỉnh phù hợp với sự quan tâm của Khách Hàng.
          </p>

          <p>
            6.14 Các mục đích khác không được đề cập ở trên nhưng được quy định
            rõ ở bất kỳ dịch vụ y tế cụ thể nào do ChuTi cung cấp, hoặc được
            pháp luật hoặc cơ quan nhà nước có thẩm quyền cho phép.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 7: Bảo mật dữ liệu cá nhân Khách Hàng
        </h5>
        <div className="ps-4">
          <p>
            7.1 Dữ liệu cá nhân của Khách Hàng được bảo mật theo hệ thống bảo
            mật của ChuTi và quy định của pháp luật. Việc xử lý Dữ liệu cá nhân
            của Khách hàng chỉ được thực hiện khi có sự đồng ý của Khách hàng,
            trừ khi có quy định khác.
          </p>

          <p>
            7.2 ChuTi không sử dụng, chuyển giao, cung cấp hay chia sẻ cho bên
            thứ ba nào về Dữ liệu cá nhân của Khách hàng khi không có sự đồng ý
            của Khách Hàng, trừ trường hợp quy định tại Điều 8 Chính sách này và
            pháp luật có quy định khác.
          </p>

          <p>
            7.3 ChuTi sẽ tuân thủ các nguyên tắc bảo mật dữ liệu cá nhân khác
            theo quy định pháp luật hiện hành.
          </p>

          <p>
            7.4 Tuy nhiên, không một dữ liệu nào có thể bảo mật 100%. Do đó,
            ChuTi cam kết luôn luôn bảo mật dữ liệu cá nhân của Khách Hàng một
            cách tối đa nhất trong khả năng cho phép. Một số thiệt hại không
            mong muốn có thể xảy ra bao gồm nhưng không giới hạn như sau:
          </p>
          <p className="ps-4">
            <p>
              (i) Lỗi phần cứng, phần mềm trong quá trình xử lý dữ liệu làm mất
              dữ liệu của Khách Hàng;
            </p>
            <p>
              (ii) Lỗ hổng bảo mật nằm ngoài khả năng kiểm soát của ChuTi, hệ
              thống có liên quan bị hacker tấn công gây lộ lọt dữ liệu;
            </p>
            <p>
              (iii) Khách hàng tự làm lộ lọt dữ liệu cá nhân do: bất cẩn hoặc bị
              lừa đảo truy cập các website/tải các ứng dụng có chứa phần mềm độc
              hại…
            </p>
          </p>
          <p>
            Trong trường hợp này ChuTi sẽ phối hợp cùng Khách Hàng để giải quyết
            sự cố một cách nhanh và hợp lý nhất.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 8: Chia sẻ dữ liệu cá nhân
        </h5>
        <div className="ps-4">
          <p>
            ChuTi sẽ không cung cấp thông tin cá nhân của Khách Hàng cho bất kỳ
            bên thứ ba nào, trừ một số hoạt động cần thiết dưới đây:
          </p>
          <p className="ps-4">
            <p>
              (i) Các đối tác là bên cung cấp dịch vụ cho ChuTi liên quan đến
              thực hiện đơn hàng và chỉ giới hạn trong phạm vi thông tin cần
              thiết cũng như áp dụng các quy định đảm bảo an ninh, bảo mật các
              thông tin cá nhân.
            </p>
            <p>
              (ii) Các đối tác là nhà sản xuất, nhà cung cấp, nhãn hàng, đơn vị
              tư vấn... liên quan đến việc cung cấp, phân phối sản phẩm, hỗ trợ,
              hướng dẫn, giải quyết khiếu nại, bồi thường... cho Khách Hàng liên
              quan đến sử dụng sản phẩm, dịch vụ.
            </p>
            <p>
              (iii) ChuTi có thể sử dụng dịch vụ từ một nhà cung cấp dịch vụ là
              bên thứ ba để thực hiện một số hoạt động liên quan đến website
              chuti.vn, ứng dụng bán hàng ChuTi và khi đó bên thứ ba này có thể
              truy cập hoặc xử lý các thông tin cá nhân trong quá trình cung cấp
              các dịch vụ đó. ChuTi yêu cầu các bên thứ ba này tuân thủ mọi luật
              lệ về bảo vệ thông tin cá nhân liên quan và các yêu cầu về an ninh
              liên quan đến thông tin cá nhân.
            </p>
            <p>
              (iv) Các cơ quan Nhà nước có thẩm quyền theo quy định pháp
              luật.ChuTi có thể tiết lộ các dữ liệu cá nhân nếu điều đó do luật
              pháp yêu cầu và việc tiết lộ như vậy là cần thiết một cách hợp lý
              để tuân thủ các quy định pháp luật.
            </p>
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 9: Chuyển dữ liệu cá nhân ra nước ngoài
        </h5>
        <div className="ps-4">
          <p>
            Dữ liệu cá nhân của Khách Hàng có thể được chuyển ra xử lý bên ngoài
            lãnh thổ Việt Nam cho một hoặc nhiều mục đích quy định tại Chính
            sách này. ChuTi cam kết chỉ chuyển dữ liệu cá nhân của Khách Hàng ra
            nước ngoài được thực hiện đúng theo các quy định của pháp luật hiện
            hành.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 10: Thời gian bắt đầu, thời gian kết thúc xử lý dữ liệu cá nhân
        </h5>
        <div className="ps-4">
          <p>
            10.1 Dữ liệu cá nhân được xử lý kể từ thời điểm ChuTi nhận được Dữ
            liệu cá nhân do Khách Hàng cung cấp và ChuTi đã có cơ sở pháp lý phù
            hợp để xử lý dữ liệu theo quy định pháp luật.
          </p>

          <p>
            10.2 Thông tin cá nhân của Khách Hàng sẽ được lưu trữ cho đến khi
            Khách Hàng có yêu cầu hủy bỏ hoặc trong trường hợp dữ liệu cá nhân
            đã hoàn thành các mục đích xử lý dữ liệu. Trong mọi trường hợp thông
            tin cá nhân của khách hàng sẽ được bảo mật trên máy chủ của ChuTi.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 11: Thông tin về trẻ em
        </h5>
        <div className="ps-4">
          <p>
            Chính sách này không dành cho trẻ em. ChuTi không cố tình thu thập
            hay lưu giữ bất kỳ dữ liệu cá nhân hay thông tin không nhận dạng cá
            nhân nào của bất kỳ trẻ em nào, bất kỳ phần nào thuộc Hệ Thống của
            ChuTi hoặc Các Dịch Vụ khác cũng không dành cho trẻ em. Bố/mẹ hoặc
            người giám hộ của trẻ em vui lòng giám sát và đảm bảo thông tin cá
            nhân của trẻ mà mình đang giám hộ không đăng tải thông tin cá nhân
            cho ChuTi. Trong trường hợp thông tin cá nhân của của trẻ em do quý
            phụ huynh giám hộ được cung cấp cho ChuTi, Bố/mẹ hoặc người giám hộ
            theo đồng ý với việc xử lý thông tin của trẻ em, và đồng ý chịu sự
            điều chỉnh của Chính sách này thay mặt cho người được giám hộ. ChuTi
            sẽ khóa bất kỳ tài khoản nào chỉ được sử dụng bởi đối tượng trẻ em
            như vậy và sẽ gỡ và/hoặc xóa bất kỳ dữ liệu cá nhân nào mà ChuTi cho
            là đã được gửi bởi trẻ em.
          </p>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 12: Quy định bảo mật thông tin thanh toán
        </h5>
        <div className="ps-4">
          <p>12.1 Cam kết bảo mật</p>
          <p>
            Hệ thống thanh toán thẻ được cung cấp bởi các đối tác cổng thanh
            toán ("Đối Tác Cổng Thanh Toán") đã được cấp phép hoạt động hợp pháp
            tại Việt Nam. Theo đó, các tiêu chuẩn bảo mật thanh toán thẻ tại
            chuti.vn và Ứng dụng bán hàng ChuTi đảm bảo tuân thủ theo các tiêu
            chuẩn bảo mật ngành.
          </p>

          <p>12.2 Quy định bảo mật</p>
          <p>
            Chính sách giao dịch thanh toán bằng thẻ quốc tế và thẻ nội địa
            (internet banking) đảm bảo tuân thủ các tiêu chuẩn bảo mật của các
            Đối Tác Cổng Thanh Toán gồm:
          </p>
          <div className="ps-4">
            <p>
              (i) Thông tin tài chính của Khách hàng sẽ được bảo vệ trong suốt
              quá trình giao dịch bằng giao thức SSL (Secure Sockets Layer).
            </p>
            <p>
              (ii) Chứng nhận tiêu chuẩn bảo mật dữ liệu thông tin thanh toán
              (PCI DSS) do Comodo cung cấp.
            </p>
            <p>
              (iii) Mật khẩu sử dụng một lần (OTP) được gửi qua SMS để đảm bảo
              việc truy cập tài khoản được xác thực.
            </p>
            <p>(iv) Tiêu chuẩn mã hóa MD5 256 bit.</p>
            <p>
              (v) Các nguyên tắc và quy định bảo mật thông tin trong ngành tài
              chính ngân hàng theo quy định của Ngân hàng nhà nước Việt Nam.
            </p>
            <p>
              (vi) Chính sách bảo mật giao dịch trong thanh toán của chuti.vn áp
              dụng với Khách Hàng:
            </p>
            <div className="ps-4">
              <p>
                (i) Đối với thẻ quốc tế: thông tin thẻ thanh toán của Khách Hàng
                mà có khả năng sử dụng để xác lập giao dịch không được lưu trên
                hệ thống của chuti.vn. Đối Tác Cổng Thanh Toán sẽ lưu trữ và bảo
                mật.
              </p>
              <p>
                (ii) Đối với thẻ nội địa (internet banking), ChuTi chỉ lưu trữ
                mã đơn hàng, mã giao dịch và tên ngân hàng.
              </p>
              <p>
                (iii) ChuTi cam kết đảm bảo thực hiện nghiêm túc các biện pháp
                bảo mật cần thiết cho mọi hoạt động thanh toán thực hiện trên
                website chuti.vn.
              </p>
            </div>
          </div>
        </div>

        <h5 className="fw-bold mt-4 text-success">
          Điều 13: Thông tin liên hệ
        </h5>
        <div className="ps-4">
          <p>
            Trong trường hợp Khách Hàng có bất kỳ thắc mắc hoặc khiếu nại nào về
            Chính sách này hoặc thực tế việc thu thập, quản lý thông tin cá nhân
            của ChuTi, xin vui lòng liên hệ với ChuTi bằng cách:
          </p>
          <p>Gọi điện thoại đến hotline: 19001208 (miễn phí)</p>
          <p>Gửi thư điện tử đến địa chỉ email: hotro@chuti.com.vn</p>
          <p>
            Chính sách thu thập, xử lý và bảo mật dữ liệu cá nhân này có hiệu
            lực từ ngày 01/07/2023.
          </p>
        </div>

        <div
          className="text-end mt-5"
          style={{ width: "300px", marginLeft: "auto" }}
        >
          <div className="text-center mt-5">
            <p className="mb-1">CÔNG TY CỔ PHẦN CHUTI BEAUTY</p>
            <p className="mb-1">GIÁM ĐỐC VẬN HÀNH</p>
            <p className="mb-4 fst-italic">Đã ký</p>
            <p className="fw-bold">NGUYỄN PHÚ TRIỆU</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChinhSach;
