import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SidebarFilter from "../components/SidebarFilter";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const ChiTietDanhMuc = () => {
  const location = useLocation();
  const { category, name } = location.state || {}; // Nhận cả category và name từ state
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // Đặt mặc định là "Mới nhất"
  const [showCount, setShowCount] = useState(null);
  const [filterPrice, setFilterPrice] = useState({ min: "", max: "" });
  const [filterBrand, setFilterBrand] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = showCount || 20;

  // Cuộn lên đầu khi trang được tải
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // Fetch sản phẩm theo danh mục
    fetch("https://dulieu.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) => product.category === category);
        filteredProducts.sort((a, b) => b.id - a.id); // Sắp xếp mặc định theo "Mới nhất"
        setProducts(filteredProducts);
      });
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterBrand, filterPrice, showCount]);

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    if (option === "newest") {
      sortedProducts.sort((a, b) => b.id - a.id);
    } else if (option === "bestselling") {
      sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    } else if (option === "lowtohigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "hightolow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
    setSortOption(option);
  };

  const filteredProducts = products.filter((p) => {
    const min = filterPrice.min !== "" ? parseInt(filterPrice.min) : -Infinity;
    const max = filterPrice.max !== "" ? parseInt(filterPrice.max) : Infinity;
    const matchPrice = p.price >= min && p.price <= max;
    const matchBrand = filterBrand ? p.brand === filterBrand : true;
    return matchPrice && matchBrand;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const displayedProducts = filteredProducts.slice(startIdx, endIdx);

  const brandMap = {};
  products.forEach((p) => {
    if (p.brand) {
      brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
    }
  });
  const brands = Object.entries(brandMap).map(([name, count]) => ({ name, count }));

  const handlePriceFilter = (min, max) => setFilterPrice({ min, max });
  const handleBrandFilter = (brandName) => setFilterBrand(brandName);

  if (!category) {
    return <div>Không tìm thấy danh mục!</div>;
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/" className="custom-nav-link">TRANG CHỦ</Nav.Link>
            <Nav.Link href="/chutideals" className="custom-nav-link">CHUTI DEALS</Nav.Link>
            <Nav.Link href="/HotDeal" className="custom-nav-link">HOT DEALS</Nav.Link>
            <Nav.Link href="/brand" className="custom-nav-link">THƯƠNG HIỆU</Nav.Link>
            <Nav.Link href="/new-products" className="custom-nav-link">HÀNG MỚI VỀ</Nav.Link>
            <Nav.Link href="/bestselling" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="page-wrapper">
        <div className="new-products-page">
          <SidebarFilter
            brands={brands}
            onPriceFilter={handlePriceFilter}
            onBrandFilter={handleBrandFilter}
          />
          <div className="main-products-content">
            <h1
              style={{
                fontSize: "26px",
                fontWeight: "700",
                marginBottom: "20px",
                color: "#198754", // Màu xanh lá
                textAlign: "center", // Căn giữa
                textTransform: "uppercase", // Chuyển chữ thành in hoa
                letterSpacing: "1px", // Khoảng cách giữa các chữ
              }}
            >
              {name}
            </h1>
            <div className="sorting-bar">
              <span style={{ marginLeft: 12, color: "#222", fontWeight: 500 }}>Sắp xếp</span>
              <button
                className={sortOption === "newest" ? "active" : ""}
                onClick={() => sortProducts("newest")}
              >
                Mới nhất
              </button>
              <button
                className={sortOption === "bestselling" ? "active" : ""}
                onClick={() => sortProducts("bestselling")}
              >
                Bán chạy
              </button>
              <button
                className={sortOption === "lowtohigh" ? "active" : ""}
                onClick={() => sortProducts("lowtohigh")}
              >
                Giá thấp đến cao
              </button>
              <button
                className={sortOption === "hightolow" ? "active" : ""}
                onClick={() => sortProducts("hightolow")}
              >
                Giá cao đến thấp
              </button>
            </div>
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <Link
                  to={{
                    pathname: `/product/${product.id}`,
                  }}
                  state={{
                    product, // Truyền toàn bộ thông tin sản phẩm qua state
                  }}
                  key={product.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.price.toLocaleString()} đ</p>
                  </div>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? "page-btn active" : "page-btn"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChiTietDanhMuc;