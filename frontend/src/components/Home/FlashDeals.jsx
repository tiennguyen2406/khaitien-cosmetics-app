import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import '../../Css/Home/FlashDeals.css';

const FlashDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 13,
    seconds: 10
  });

  const productsPerPage = 5;

  useEffect(() => {
    // Fetch products from json-server
    fetch('https://dulieu.onrender.com/products')
      .then(res => res.json())
      .then(data => {
        // Lấy ngẫu nhiên 10 sản phẩm cho flash deals
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 20));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <div className="flash-deals-container text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="flash-deals-container">
      <div className="flash-deals-header">
        <div className="title-section">
          <h2>Flash Deals</h2>
          <div className="countdown">
            <span>{formatNumber(timeLeft.hours)}</span>:
            <span>{formatNumber(timeLeft.minutes)}</span>:
            <span>{formatNumber(timeLeft.seconds)}</span>
          </div>
        </div>
        <Link to="/flash-deals" className="view-all">Xem tất cả</Link>
      </div>

      <div className="products-slider-container">
        <button className="nav-button prev" onClick={prevPage} disabled={currentPage === 0}>
          <IoIosArrowBack />
        </button>

        <Row className="products-container">
          {visibleProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={2} className="product-col">
              <Link to={`/product/${product.id}`} className="product-link">
                <Card className="product-card">
                  <div className="discount-badge">-{product.discount}%</div>
                  
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <div className="price-wrapper">
                      <div className="current-price-tag">
                        <span className="price-tag-bg"></span>
                        <span className="price-tag-text">
                          {(product.price * (1 - product.discount / 100)).toLocaleString()}₫
                        </span>

                      </div>
                      <span className="original-price">{product.price?.toLocaleString()}₫</span>
                    </div>
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <div className="progress-section">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((product.soldCount || 0) / (product.totalCount || 100)) * 100}%`,
                          }}
                        >
                          <span className="progress-percent">
                            {Math.round(((product.soldCount || 0) / (product.totalCount || 100)) * 100)}%
                          </span>
                        </div>
                      </div>

                      <span className="sold-count">Đã bán {product.soldCount || 0}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <button className="nav-button next" onClick={nextPage} disabled={currentPage === totalPages - 1}>
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default FlashDeals; 