import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ModernProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const {
    id,
    sku,
    name,
    price = 0,
    originalPrice,
    discount = 0,
    image,
    brand = "COSMETICA",
    soldCount = 0,
    rating = 5,
  } = product;

  const productId = id || sku;
  const calculatedOriginalPrice = originalPrice || (discount > 0 ? Math.round(price / (1 - discount / 100)) : price);

  const formatPrice = (val) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`Đã thêm "${name.length > 25 ? name.substring(0, 25) + "..." : name}" vào giỏ hàng!`, {
      icon: "🛍️",
      position: "top-right",
      autoClose: 1800,
    });
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.info(isLiked ? "Đã bỏ yêu thích" : "Đã thêm vào danh sách yêu thích", {
      autoClose: 1200,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#C98A60]/40 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(201,138,96,0.18)] hover:-translate-y-1">
      {/* Top Badges & Wishlist Action */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#FAF8F5] mb-3">
        <Link to={`/product/${productId}`}>
          <img
            src={image || "/img/San Pham/SP1.jpg"}
            alt={name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 badge-luxury-sale z-10">
            -{discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleLike}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-[#78716C] hover:text-[#EF4444] shadow-sm flex items-center justify-center transition-all z-10 border-none cursor-pointer"
          title="Yêu thích"
        >
          {isLiked ? <FaHeart className="text-[#EF4444]" size={14} /> : <FaRegHeart size={14} />}
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden sm:block">
          <button
            onClick={handleAddToCart}
            className="w-full btn-luxury-primary text-xs py-2 flex items-center justify-center gap-2 shadow-md"
          >
            <FaShoppingCart size={12} /> Thêm Nhanh
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-grow">
        {/* Brand & Sold Rating Row */}
        <div className="flex items-center justify-between text-[11px] text-[#A8A29E] uppercase tracking-wider mb-1 font-medium">
          <span>{brand}</span>
          <span className="flex items-center gap-1 text-[#F59E0B]">
            <FaStar size={10} /> {rating} ({soldCount} đã bán)
          </span>
        </div>

        {/* Product Name */}
        <Link
          to={`/product/${productId}`}
          className="text-sm font-medium text-[#1C1917] hover:text-[#C98A60] line-clamp-2 leading-snug mb-2 transition-colors min-h-[2.5rem]"
          title={name}
        >
          {name}
        </Link>

        {/* Price Row */}
        <div className="mt-auto pt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-[#C98A60]">
            {formatPrice(price)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-[#A8A29E] line-through">
              {formatPrice(calculatedOriginalPrice)}
            </span>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="sm:hidden w-full mt-3 py-1.5 px-3 rounded-full bg-[#F7EFE9] text-[#C98A60] font-medium text-xs flex items-center justify-center gap-1.5 border border-[#C98A60]/30 active:bg-[#C98A60] active:text-white transition-colors"
        >
          <FaShoppingCart size={11} /> Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ModernProductCard;
