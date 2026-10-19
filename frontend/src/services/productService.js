import apiClient from "./apiClient";
import localDb from "../data/db.json";

export const productService = {
  // Lấy tất cả sản phẩm (với fallback offline)
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
      console.warn("API Gateway offline, using local product catalog fallback");
    }
    return localDb.products || [];
  },

  // Lấy sản phẩm nổi bật / Flash Deals
  getDeals: async () => {
    const products = await productService.getAll();
    return products.filter((p) => (p.discount && p.discount >= 10) || p.isHotDeal);
  },

  // Lấy top bán chạy
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
    const products = localDb.products || [];
    return products.find((p) => String(p.id) === String(id) || String(p.sku) === String(id)) || null;
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
        p.category?.toLowerCase().includes(lower) ||
        (Array.isArray(p.ingredients) && p.ingredients.some((ing) => ing.toLowerCase().includes(lower)))
    );
  },
};

export default productService;
