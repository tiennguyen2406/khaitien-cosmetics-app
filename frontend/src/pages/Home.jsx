import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFire, FaGem, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import ModernProductCard from "../components/ModernProductCard";
import productService from "../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const all = await productService.getAll();
        setProducts(all);

        const dealItems = all
          .filter((item) => (item.discount && item.discount >= 10) || item.isHotDeal)
          .slice(0, 8);
        setDeals(dealItems);

        const best = [...all]
          .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
          .slice(0, 8);
        setBestSellers(best);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = [
    { name: "Chăm Sóc Da", key: "skincare", icon: "✨", desc: "Sữa rửa mặt & Phục hồi" },
    { name: "Nước Hoa Hồng", key: "toner", icon: "💧", desc: "Cân bằng độ ẩm" },
    { name: "Chống Nắng", key: "suncare", icon: "☀️", desc: "Bảo vệ quang phổ rộng" },
    { name: "Serum & Tinh Chất", key: "serum", icon: "🧪", desc: "Đặc trị chuyên sâu" },
    { name: "Son & Trang Điểm", key: "lipcare", icon: "💄", desc: "Tỏa sáng tự nhiên" },
  ];

  return (
    <div className="w-100 pb-16">
      {/* 1. Luxury Hero Banner Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#FAF8F5] via-[#F7EFE9] to-[#FAF8F5] py-12 md:py-16 border-b border-[#E7E5E4]">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="d-flex flex-column justify-content-center text-center text-lg-start">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#C98A60]/30 shadow-xs text-xs font-semibold uppercase tracking-wider text-[#C98A60] mb-4 w-fit mx-auto mx-lg-0">
                <FaGem size={11} /> Bộ Sưu Tập Thu - Đông 2026
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-tight mb-4">
                Đỉnh Cao Chăm Sóc <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98A60] to-[#D4AF37]">
                  Làn Da Thuần Khiết
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#78716C] leading-relaxed mb-6 max-w-lg mx-auto mx-lg-0">
                Khám phá thế giới mỹ phẩm chính hãng với công nghệ nuôi dưỡng đa tầng. An toàn, dịu nhẹ và tối ưu hóa cho làn da Á Đông.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <Link to="/chutideals" className="btn-luxury-primary text-sm px-6 py-2.5 text-decoration-none">
                  Khám Phá Hot Deals
                </Link>
                <Link to="/new-products" className="btn-luxury-outline text-sm px-6 py-2.5 text-decoration-none">
                  Hàng Mới Về
                </Link>
              </div>
            </Col>

            <Col lg={6}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/img/Quang Cao/bia2.jpg"
                    alt="Luxury Cosmetics Banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/img/San Pham/SP1.jpg";
                    }}
                  />
                </div>
                {/* Floating Highlight Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#E7E5E4] max-w-[220px] hidden sm:block">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C1917]">Đảm Bảo 100%</span>
                  </div>
                  <p className="text-[11px] text-[#78716C] m-0">Đầy đủ tem niêm phong & kiểm định y tế chính ngạch.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 2. Quick Category Exploration */}
      <section className="py-10 border-b border-[#E7E5E4]/60 bg-white">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] m-0">
                Danh Mục Nổi Bật
              </h2>
              <span className="text-xs text-[#78716C]">Lựa chọn chu trình chăm sóc chuẩn khoa học</span>
            </div>
            <Link to="/chitietdanhmuc" className="text-xs font-semibold text-[#C98A60] hover:text-[#B4784E] flex items-center gap-1">
              Xem tất cả <FaArrowRight size={10} />
            </Link>
          </div>

          <Row className="g-3">
            {categories.map((cat, idx) => (
              <Col key={idx} xs={6} sm={4} md={2} className="flex-grow-1">
                <Link
                  to={`/chitietdanhmuc?cat=${cat.key}`}
                  className="group block p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#F7EFE9] border border-[#E7E5E4]/70 hover:border-[#C98A60]/40 text-center transition-all duration-300 text-decoration-none"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h6 className="text-xs font-bold text-[#1C1917] group-hover:text-[#C98A60] m-0 transition-colors">
                    {cat.name}
                  </h6>
                  <span className="text-[10px] text-[#78716C]">{cat.desc}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 3. Flash Deals Section */}
      <section className="py-12 bg-[#FAF8F5]">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-8">
            <div className="d-flex align-items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-[#EF4444] d-flex align-items-center justify-content-center shadow-xs">
                <FaFire size={18} />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] m-0">
                  Hot Deals & Flash Sale
                </h3>
                <span className="text-xs text-[#78716C]">Số lượng có hạn trong ngày</span>
              </div>
            </div>
            <Link to="/chutideals" className="btn-luxury-outline text-xs px-4 py-1.5 text-decoration-none">
              Xem tất cả deals
            </Link>
          </div>

          <Row className="g-4">
            {deals.map((prod) => (
              <Col key={prod.id || prod.sku} xs={6} md={4} lg={3}>
                <ModernProductCard product={prod} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="py-12 bg-white border-t border-[#E7E5E4]">
        <Container>
          <div className="d-flex align-items-center justify-content-between mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C98A60] mb-1">
                Được Yêu Thích Nhất
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] m-0">
                Sản Phẩm Bán Chạy Nhất
              </h3>
            </div>
            <Link to="/banchay" className="btn-luxury-outline text-xs px-4 py-1.5 text-decoration-none">
              Xem bảng xếp hạng
            </Link>
          </div>

          <Row className="g-4">
            {bestSellers.map((prod) => (
              <Col key={prod.id || prod.sku} xs={6} md={4} lg={3}>
                <ModernProductCard product={prod} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
