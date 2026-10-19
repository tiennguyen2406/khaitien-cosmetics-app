import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Nhớ cài đặt react-toastify nếu chưa có

const CheckAddToCartContext = createContext();

export const useCheckAddToCart = () => useContext(CheckAddToCartContext);

export const CheckAddToCartProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleAddToCart = (addToCartFunction, product) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
      // Nếu đã đăng nhập, thực hiện thêm vào giỏ
      addToCartFunction(product);
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } else {
      // Nếu chưa đăng nhập, hiện thông báo và chuyển đến trang login
      toast.warning("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      setTimeout(() => {
        navigate("/login", { state: { showModal: true } });
      }, 1500); // Đợi 1.5s để người dùng đọc thông báo
    }
  };

  return (
    <CheckAddToCartContext.Provider value={{ handleAddToCart }}>
      {children}
    </CheckAddToCartContext.Provider>
  );
};
