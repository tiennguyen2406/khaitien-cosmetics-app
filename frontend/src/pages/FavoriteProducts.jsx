import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../Css/FavoriteProducts.css";

const FavoriteProducts = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      try {
        // Lấy thông tin người dùng từ localStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser || !loggedInUser.name) {
          console.error("Không tìm thấy user_name. Vui lòng đăng nhập.");
          setLoading(false);
          return;
        }

        const userName = loggedInUser.name;

        // Gửi yêu cầu lấy danh sách yêu thích
        const res = await axios.get(`https://dulieu.onrender.com/likeproduct?user_name=${userName}`);
        setFavorites(res.data);

        if (res.data.length > 0) {
          const userFavorites = res.data.filter(item => item.user_name === userName);
          if (userFavorites.length > 0) {
            const ids = userFavorites.map(item => item.id_SP);
            const productPromises = ids.map(id => axios.get(`https://dulieu.onrender.com/products/${id}`));
            try {
              const productResponses = await Promise.all(productPromises);
              const products = productResponses.map(res => res.data);
              setProducts(products);
            } catch (error) {
              console.error("Lỗi khi lấy thông tin sản phẩm:", error);
              setProducts([]);
            }
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu thích:", error);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUserData(loggedInUser);
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      console.log("Dữ liệu trong localStorage:", JSON.parse(loggedInUser));
    } else {
      console.log("Không tìm thấy loggedInUser trong localStorage.");
    }
  }, []);

  const handleRemove = async (productId) => {
    const like = favorites.find(item => item.id_SP === productId);
    if (like) {
      try {
        await axios.delete(`https://dulieu.onrender.com/likeproduct/${like.id}`);
        setFavorites(favorites.filter(item => item.id_SP !== productId));
        setProducts(products.filter(item => item.id !== productId));
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <>
      {/* Thêm Navbar ở đây */}
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
      <div className="favorite-products-container">
        <div className="main-content">
          <h2>Danh sách yêu thích</h2>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 100 }}>
              <div style={{ fontSize: 100, color: "#ccc" }}>😐</div>
              <p>
                Hãy <span style={{ color: "orange" }}>❤️</span> sản phẩm bạn yêu thích khi mua sắm để xem lại thuận tiện nhất
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "10px 28px",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: 24,
                  transition: "background 0.2s"
                }}
                onMouseOver={e => (e.target.style.background = "#2e7031")}
                onMouseOut={e => (e.target.style.background = "#388e3c")}
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <h4>{product.name}</h4>
                  <p>Giá: {product.price.toLocaleString()}đ</p>
                  <button onClick={() => handleRemove(product.id)}>Xóa khỏi yêu thích</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoriteProducts;
