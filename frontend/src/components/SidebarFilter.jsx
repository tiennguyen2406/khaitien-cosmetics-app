import React, { useState } from "react";
import "../Css/SidebarFilter.css";

const categories = [
  { name: "Nước hoa", count: 25 },
  { name: "Kem chống nắng", count: 17 },
  { name: "Mặt nạ giấy", count: 16 },
  { name: "Sữa rửa mặt", count: 14 },
  { name: "Serum / Tinh chất", count: 9 },
  { name: "Má hồng", count: 9 },
  { name: "Dầu gội", count: 7 },
];

export default function SidebarFilter({ brands = [], categories = [], onPriceFilter, onBrandFilter, onCategoryFilter }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brandSelected, setBrandSelected] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  const handleApplyPrice = () => {
    if (onPriceFilter) {
      onPriceFilter(minPrice, maxPrice);
    }
  };

  const handleBrandClick = (brandName) => {
    setBrandSelected(brandName);
    if (onBrandFilter) {
      onBrandFilter(brandName);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setCategorySelected(categoryName);
    if (onCategoryFilter) {
      onCategoryFilter(categoryName);
    }
  };

  return (
    <div className="sidebar-filter">
      <div className="filter-section">
        <h3>KHOẢNG GIÁ</h3>
        <div className="price-range">
          <input type="number" placeholder="₫ TỪ" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <span>–</span>
          <input type="number" placeholder="₫ ĐẾN" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>
        <button className="apply-btn" onClick={handleApplyPrice}>Áp dụng</button>
      </div>
      <hr />
      <div className="filter-section brand-list">
        <h3>THƯƠNG HIỆU</h3>
        <ul>
          <li
            className={brandSelected === '' ? 'brand-selected' : ''}
            onClick={() => handleBrandClick('')}
            style={{ userSelect: 'none' }}
          >
            Tất cả
          </li>
          {brands.map((b) => (
            <li
              key={b.name}
              className={brandSelected === b.name ? 'brand-selected' : ''}
              onClick={() => handleBrandClick(b.name)}
              style={{ userSelect: 'none' }}
            >
              {b.name} <span>({b.count})</span>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="filter-section">
        <h3>LOẠI SẢN PHẨM</h3>
        <ul>
          <li
            className={categorySelected === '' ? 'brand-selected' : ''}
            onClick={() => handleCategoryClick('')}
            style={{ userSelect: 'none' }}
          >
            Tất cả
          </li>
          {categories.map((c) => (
            <li
              key={c.name}
              className={categorySelected === c.name ? 'brand-selected' : ''}
              onClick={() => handleCategoryClick(c.name)}
              style={{ userSelect: 'none' }}
            >
              {c.name} <span>({c.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 