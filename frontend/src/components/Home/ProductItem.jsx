import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCheckAddToCart } from '../../context/CheckAddToCart';

const ProductItem = ({ product, showAddToCart = false }) => {
  const { addToCart } = useCart();
  const { handleAddToCart } = useCheckAddToCart();

  const onAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      discount: product.discount,
      quantity: 1,
    };
    handleAddToCart(addToCart, productToAdd);
  };

  return (
    <Col xs={6} sm={4} md={3} lg={2} className="mb-3">
      <Card className="product-card">
        <Link to={`/product/${product.id}`} className="product-link" onClick={() => window.scrollTo(0, 0)}>
          <div className="product-image-container">
            <Card.Img variant="top" src={product.image} className="product-image card-img-top" />
            {product.discount > 0 && (
              <span className="discount-badge">-{product.discount}%</span>
            )}
          </div>
          <Card.Body>
            <div className="brand-name">{product.brand}</div>
            <Card.Title className="product-name">{product.name}</Card.Title>
            <div className="price-section">
              <span className="current-price">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(product.price * (1 - product.discount / 100))}
              </span>
              {product.discount > 0 && (
                <span className="original-price">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </span>
              )}
            </div>
            <div className="product-meta">
              <div className="rating">
                {[...Array(4)].map((_, i) => <i key={i} className="fas fa-star star-icon"></i>)}
                <i className="fas fa-star-half-alt star-icon"></i>
              </div>
              <div className="sales">Đã bán: {product.soldCount}</div>
            </div>
          </Card.Body>
        </Link>
        {showAddToCart && (
          <Button 
            variant="success" 
            className="add-to-cart-btn"
            onClick={onAddToCart}
          >
            Thêm vào giỏ
          </Button>
        )}
      </Card>
    </Col>
  );
};

export default ProductItem;