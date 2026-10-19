import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Repass from "./components/Repass";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ChinhSach from "./pages/ChinhSach";
import MyAccount from "./pages/MyAccount";
import Cart from "./components/Cart";
import PrivateRoute from "./context/PrivateRoute";
import GioiThieu from "./pages/GioiThieu";
import LienHe from "./pages/LienHe";
import DieuKhoan from "./pages/DieuKhoan";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/CartContext";
import { CheckAddToCartProvider } from "./context/CheckAddToCart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChuTiDeals from "./pages/ChuTiDeals";
import Brand from "./pages/Brand";
import Address from "./components/Address";
import Pay from "./pages/Pay";
import HotDeal from "./pages/HotDeal";
import MyOrder from "./pages/MyOrder";
import NewProductsPage from "./pages/NewProductsPage";
import BestSellingPage from "./pages/BestSellingPage";
import SearchResult from "./components/SearchResult";
import Support from "./pages/Support";
import FavoriteProducts from "./pages/FavoriteProducts";
import HuongDanDatHang from "./pages/HuongDanDatHang";
import Vanchuyen from "./pages/Vanchuyen";
import Chinhsachdoitra from "./pages/Chinhsachdoitra";
import ChiTietHotDeal from "./pages/ChiTietHotDeal";
import ChiTietDanhMuc from "./pages/ChiTietDanhMuc";

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRepass, setShowRepass] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Thêm kiểm tra state.showModal
    if (location.state?.showModal) {
      setShowLogin(true);
    }
  }, [location.state]);

  const handleShowRepass = () => {
    setShowLogin(false);
    setShowRepass(true);
  };

  const handleCloseRepass = () => {
    setShowRepass(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chutideals" element={<ChuTiDeals />} />
          <Route path="/HotDeal" element={<HotDeal />} />
          <Route path="/chinh-sach" element={<ChinhSach />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/gioi-thieu" element={<GioiThieu />} />
          <Route path="/lien-he" element={<LienHe />} />
          <Route path="/dieu-khoan" element={<DieuKhoan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<Address />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/my-order" element={<MyOrder />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/new-products" element={<NewProductsPage />} />
          <Route path="/banchay" element={<BestSellingPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/support" element={<Support />} />
          <Route path="/yeu-thich" element={<FavoriteProducts />} />
          <Route path= "/huongdandathang" element={<HuongDanDatHang/>}/>
          <Route path="/giaonhanh" element={<Vanchuyen />}/>
          <Route path="/chinhsachdoitra" element={<Chinhsachdoitra />}/>
          <Route path="/chi-tiet-hot-deal/:id" element={<ChiTietHotDeal />} />
          <Route path="/chitietdanhmuc" element={<ChiTietDanhMuc />} />
        </Routes>
      </main>
      <Login
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        onForgotPassword={handleShowRepass}
      />
      <Repass show={showRepass} handleClose={handleCloseRepass} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <CheckAddToCartProvider>
            <AppContent />
          </CheckAddToCartProvider>
        </CartProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
