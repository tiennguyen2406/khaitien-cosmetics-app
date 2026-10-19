import apiClient from "./apiClient";

// 10 sản phẩm mẫu dự phòng gọn nhẹ cho trải nghiệm mượt mà không làm nặng bundle
const fallbackProducts = [
  {
    id: "1",
    sku: "SP1",
    name: "Sữa rửa mặt Cetaphil Gentle Skin Cleanser",
    price: 120000,
    originalPrice: 133000,
    discount: 10,
    category: "skincare",
    brand: "Cetaphil",
    image: "/img/San Pham/SP1.jpg",
    soldCount: 200,
    totalCount: 500,
    likeCount: 245,
    rating: 5,
    isHotDeal: false,
    ingredients: ["Nước", "Glycerin", "Panthenol", "Ceramides"],
    description: "Sữa rửa mặt dịu nhẹ, cân bằng độ pH thích hợp cho mọi loại da, không chứa xà phòng."
  },
  {
    id: "2",
    sku: "SP2",
    name: "Nước hoa hồng Klairs Supple Preparation Facial Toner",
    price: 150000,
    originalPrice: 176000,
    discount: 15,
    category: "toner",
    brand: "Klairs",
    image: "/img/San Pham/SP2.jpg",
    soldCount: 180,
    totalCount: 400,
    likeCount: 310,
    rating: 5,
    isHotDeal: true,
    ingredients: ["Nước", "Centella Asiatica", "Hyaluronic Acid", "Glycerin"],
    description: "Toner cấp ẩm sâu, làm dịu da kích ứng và cân bằng độ ẩm tức thì."
  },
  {
    id: "3",
    sku: "SP3",
    name: "Kem chống nắng Anessa Perfect UV Sunscreen Skincare Milk SPF50+",
    price: 320000,
    originalPrice: 400000,
    discount: 20,
    category: "suncare",
    brand: "Anessa",
    image: "/img/San Pham/SP3.jpg",
    soldCount: 300,
    totalCount: 600,
    likeCount: 520,
    rating: 5,
    isHotDeal: true,
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Chiết xuất trà xanh"],
    description: "Chống nắng tối ưu với công nghệ Auto Booster, chống nước và mồ hôi vượt trội."
  },
  {
    id: "4",
    sku: "SP4",
    name: "Tinh chất phục hồi da mụn La Roche-Posay Effaclar Serum",
    price: 450000,
    originalPrice: 500000,
    discount: 10,
    category: "serum",
    brand: "La Roche-Posay",
    image: "/img/San Pham/SP4.jpg",
    soldCount: 150,
    totalCount: 350,
    likeCount: 410,
    rating: 5,
    isHotDeal: false,
    ingredients: ["Salicylic Acid", "LHA", "Glycolic Acid", "Niacinamide"],
    description: "Serum tẩy tế bào chết hóa học, giảm mụn thâm và thu nhỏ lỗ chân lông."
  },
  {
    id: "5",
    sku: "SP5",
    name: "Son dưỡng có màu Innisfree Dewy Tint Lip Balm",
    price: 180000,
    originalPrice: 200000,
    discount: 10,
    category: "lipcare",
    brand: "Innisfree",
    image: "/img/San Pham/SP5.jpg",
    soldCount: 220,
    totalCount: 450,
    likeCount: 380,
    rating: 5,
    isHotDeal: false,
    ingredients: ["Dầu hạt hoa trà", "Bơ hạt mỡ", "Ceramide"],
    description: "Son dưỡng ẩm mượt như sương, mang lại đôi môi căng mọng tự nhiên."
  },
  {
    id: "6",
    sku: "SP6",
    name: "Kem dưỡng ẩm chuyên sâu CeraVe Moisturizing Cream",
    price: 280000,
    originalPrice: 350000,
    discount: 20,
    category: "skincare",
    brand: "CeraVe",
    image: "/img/San Pham/SP6.jpg",
    soldCount: 260,
    totalCount: 500,
    likeCount: 450,
    rating: 5,
    isHotDeal: true,
    ingredients: ["Ceramides 1, 3, 6-II", "Hyaluronic Acid", "Glycerin"],
    description: "Dưỡng ẩm phục hồi hàng rào bảo vệ da suốt 24 giờ với công nghệ MVE độc quyền."
  }
];

export const productService = {
  // Lấy tất cả sản phẩm
  getAll: async () => {
    try {
      const response = await apiClient.get("/products");
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (err) {
      console.warn("API Gateway offline, using fast local fallback catalog");
    }
    return fallbackProducts;
  },

  // Lấy sản phẩm Deals
  getDeals: async () => {
    const products = await productService.getAll();
    return products.filter((p) => (p.discount && p.discount >= 10) || p.isHotDeal);
  },

  // Lấy sản phẩm bán chạy
  getBestSellers: async () => {
    const products = await productService.getAll();
    return [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
  },

  // Lấy theo danh mục
  getByCategory: async (category) => {
    const products = await productService.getAll();
    if (!category) return products;
    return products.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
  },

  // Lấy chi tiết theo ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      if (response.data?.data) return response.data.data;
      if (response.data) return response.data;
    } catch (err) {
      // fallback
    }
    return fallbackProducts.find((p) => String(p.id) === String(id) || String(p.sku) === String(id)) || fallbackProducts[0];
  },

  // Tìm kiếm theo từ khóa
  search: async (keyword) => {
    const products = await productService.getAll();
    if (!keyword) return products;
    const lower = keyword.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(lower) ||
        p.brand?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower)
    );
  },
};

export default productService;
