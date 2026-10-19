import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage khi khởi tạo
  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(Array.isArray(storedCart) ? storedCart : []);
    } catch (e) {
      setCart([]);
    }
  }, []);

  // Cập nhật cart và lưu localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Tổng số lượng sản phẩm
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Tổng tiền hàng
  const totalAmount = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product, quantity = 1, selectedType = null) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const prodId = product.id || product.sku;
      const variantKey = selectedType || product.selectedType || product.types?.[0] || "Tiêu chuẩn";

      const existingIndex = newCart.findIndex(
        (item) => (item.id === prodId || item.sku === prodId) && item.selectedType === variantKey
      );

      if (existingIndex > -1) {
        newCart[existingIndex].quantity += quantity;
      } else {
        newCart.push({
          id: prodId,
          sku: product.sku || prodId,
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          selectedType: variantKey,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Xóa 1 sản phẩm
  const removeFromCart = (id, selectedType) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (item) => !(item.id === id && (!selectedType || item.selectedType === selectedType))
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Cập nhật số lượng
  const updateQuantity = (id, quantity, selectedType) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedType);
      return;
    }
    setCart((prevCart) => {
      const newCart = prevCart.map((item) => {
        if (item.id === id && (!selectedType || item.selectedType === selectedType)) {
          return { ...item, quantity };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Xóa toàn bộ giỏ
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart: updateCart,
        cartCount,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
