// src/pages/Products.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Pagination, Spinner } from 'react-bootstrap';
import ProductItem from './ProductItem';
import '../../Css/Home/Products.css';

const Products = ({ filterCategories, scrollToTopType, showAddToCart = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  useEffect(() => {
    fetch('https://dulieu.onrender.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Khi filterCategories thay đổi, chuyển về trang 1 và scroll lên đầu trang
  useEffect(() => {
    setCurrentPage(1);
    if (scrollToTopType === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 2400);
    }
  }, [filterCategories, scrollToTopType]);

  // Lọc sản phẩm nếu có filterCategories
  const filteredProducts = filterCategories && Array.isArray(filterCategories)
    ? products.filter(product => filterCategories.includes(product.category))
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (scrollToTopType === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 2400);
    }
  };

  if (loading) {
    return (
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <Spinner animation="border" variant="success" />
      </Container>
    );
  }

  return (
    <Container fluid className="products-section">
      <h4 className="section-title">Danh Sách Sản Phẩm</h4>
      <Row className="products-grid">
        {currentProducts.map(product => (
          <ProductItem key={product.id} product={product} showAddToCart={showAddToCart} />
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4 mb-4">
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </Container>
  );
};

export default Products;
