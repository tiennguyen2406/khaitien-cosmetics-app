import React, { useEffect, useState } from 'react';
import '../Css/NewProductsPage.css';
import SidebarFilter from '../components/SidebarFilter';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';

const BestSellingPage = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('newest');
  const [showCount, setShowCount] = useState(null);
  const [filterPrice, setFilterPrice] = useState({ min: '', max: '' });
  const [filterBrand, setFilterBrand] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = showCount || 20;

  useEffect(() => {
    fetch('https://dulieu.onrender.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Sắp xếp mặc định theo bán chạy
        data.sort((a, b) => b.soldCount - a.soldCount);
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterBrand, filterCategory, filterPrice, showCount]);

  const sortProducts = (option) => {
    let sortedProducts = [...products];
    if (option === 'newest') {
      sortedProducts.sort((a, b) => b.id - a.id);
    } else if (option === 'bestselling') {
      sortedProducts.sort((a, b) => b.soldCount - a.soldCount);
    } else if (option === 'lowtohigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'hightolow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
    setSortOption(option);
  };

  const filteredProducts = products.filter((p) => {
    const min = filterPrice.min !== '' ? parseInt(filterPrice.min) : -Infinity;
    const max = filterPrice.max !== '' ? parseInt(filterPrice.max) : Infinity;
    const matchPrice = p.price >= min && p.price <= max;
    const matchBrand = filterBrand ? p.brand === filterBrand : true;
    const matchCategory = filterCategory ? p.category === filterCategory : true;
    return matchPrice && matchBrand && matchCategory;
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

  const categoryMap = {};
  products.forEach((p) => {
    if (p.category) {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    }
  });
  const categories = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));

  const handlePriceFilter = (min, max) => setFilterPrice({ min, max });
  const handleBrandFilter = (brandName) => setFilterBrand(brandName);
  const handleCategoryFilter = (categoryName) => setFilterCategory(categoryName);

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
            <Nav.Link href="/banchay" className="custom-nav-link">BÁN CHẠY</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="page-wrapper">
        <div className="new-products-page">
          <SidebarFilter
            brands={brands}
            categories={categories}
            onPriceFilter={handlePriceFilter}
            onBrandFilter={handleBrandFilter}
            onCategoryFilter={handleCategoryFilter}
          />
          <div className="main-products-content">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
              <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 0 }}>
                Bán Chạy - Sản Phẩm Được Yêu Thích Nhất
              </h1>
              <span style={{ color: '#888', fontSize: 16, marginBottom: 2 }}>
                ({products.length} sản phẩm)
              </span>
            </div>
            <div className="sorting-bar">
              <span style={{ marginLeft: 12, color: '#222', fontWeight: 500 }}>Sắp xếp</span>
              <button
                className={sortOption === 'newest' ? 'active' : ''}
                style={{ minWidth: 90 }}
                onClick={() => sortProducts('newest')}
              >
                Mới nhất
              </button>
              <button
                className={sortOption === 'bestselling' ? 'active' : ''}
                style={{ minWidth: 90 }}
                onClick={() => sortProducts('bestselling')}
              >
                Bán chạy
              </button>
              <button
                className={sortOption === 'lowtohigh' ? 'active' : ''}
                style={{ minWidth: 120 }}
                onClick={() => sortProducts('lowtohigh')}
              >
                Giá thấp đến cao
              </button>
              <button
                className={sortOption === 'hightolow' ? 'active' : ''}
                style={{ minWidth: 120 }}
                onClick={() => sortProducts('hightolow')}
              >
                Giá cao đến thấp
              </button>
              <div style={{ marginLeft: 'auto', marginRight: 12 }}>
                <select
                  className="product-count-select"
                  value={showCount || products.length}
                  onChange={e => setShowCount(Number(e.target.value) === products.length ? null : Number(e.target.value))}
                >
                  <option value={20}>Hiển thị 20</option>
                  <option value={40}>Hiển thị 40</option>
                  <option value={60}>Hiển thị 60</option>
                  <option value={100}>Hiển thị 100</option>
                  <option value={products.length}>Tất cả</option>
                </select>
              </div>
            </div>
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <Link
                  to={{
                    pathname: `/product/${product.id}`, // Đường dẫn đến trang chi tiết sản phẩm
                  }}
                  state={{
                    product, // Truyền thông tin sản phẩm qua state
                  }}
                  key={product.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    {product.discount > 0 ? (
                      <>
                        <span className="discounted-price">
                          {(product.price * (1 - product.discount / 100)).toLocaleString()} đ
                        </span>
                        <span className="original-price">{product.price.toLocaleString()} đ</span>
                      </>
                    ) : (
                      <span className="discounted-price">{product.price.toLocaleString()} đ</span>
                    )}
                    <p>Giảm giá: {product.discount}%</p>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{marginTop: 16, color: '#555', fontSize: 15}}>
              Đang hiển thị {displayedProducts.length} / {filteredProducts.length} sản phẩm
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
        <div className="service-support" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", marginTop: "20px" }}>
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
      </div>
    </>
  );
};

export default BestSellingPage;