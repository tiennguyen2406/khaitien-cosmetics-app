import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("q")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://dulieu.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) ||
      (p.brand && p.brand.toLowerCase().includes(keyword))
  );

  return (
    <>
      <style>
        {`
          .search-product-card {
            border: 1.5px solid #e0f2e9;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
            border-radius: 12px;
          }
          .search-product-card:hover {
            border-color: #198754;
            box-shadow: 0 8px 24px rgba(25,135,84,0.15);
            transform: translateY(-6px) scale(1.03);
          }
        `}
      </style>
      <div className="container py-4">
        <h4>
          <b>{keyword}</b>
          <span
            style={{
              color: "#888",
              fontWeight: 400,
              fontSize: 20,
              marginLeft: 8,
            }}
          >
            ({filtered.length} sản phẩm)
          </span>
        </h4>
        {loading ? (
          <div>Đang tải...</div>
        ) : (
          <div className="row mt-4">
            {filtered.length === 0 ? (
              <div>Không tìm thấy sản phẩm phù hợp.</div>
            ) : (
              filtered.map((item) => (
                <div
                  className="col-md-3 mb-4"
                  key={item.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="card h-100 search-product-card text-center py-3">
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.name}
                      style={{
                        maxHeight: 180,
                        objectFit: "contain",
                        width: "auto",
                        margin: "0 auto",
                      }}
                    />
                    <div className="card-body">
                      <h6 className="card-title" style={{ minHeight: 48 }}>
                        {item.name}
                      </h6>
                      <div
                        className="text-danger fw-bold"
                        style={{ fontSize: 22 }}
                      >
                        {item.price.toLocaleString("vi-VN")} đ
                      </div>
                      <div
                        style={{
                          color: "#198754",
                          fontWeight: 500,
                          marginTop: 8,
                        }}
                      >
                        Đã bán: {item.sold || 800}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
