import React, { useRef, useEffect } from 'react';
import ProductItem from './ProductItem';
import '../../Css/Home/Products.css';

const ProductGrid = ({ products }) => {
  const scrollRef = useRef();
  const maxScroll = () => scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Tự động trượt sang phải mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft } = scrollRef.current;
      const max = maxScroll();
      if (scrollLeft + 10 >= max) {
        // Nếu đã đến cuối, quay lại đầu
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="products-horizontal-wrapper">
      <button className="scroll-btn left" onClick={() => scroll('left')}>&lt;</button>
      <div className="products-horizontal-scroll" ref={scrollRef}>
        {products && products.length > 0 ? (
          products.slice(0, 20).map(product => (
            <div key={product.id} className="product-horizontal-item">
              <ProductItem product={product} />
            </div>
          ))
        ) : (
          <div>Không có sản phẩm nào.</div>
        )}
      </div>
      <button className="scroll-btn right" onClick={() => scroll('right')}>&gt;</button>
    </div>
  );
};

export default ProductGrid; 