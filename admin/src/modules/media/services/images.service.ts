import api from '@/config/api';
import { apiRoutes } from '@/config/apiRoutes';
import { PaginatedImageResponse, ImageResponse } from '../types/image.type';

export const imagesService = {
  // Lấy ảnh theo trang
  getAllImages: async (page: number = 1, limit: number = 40): Promise<PaginatedImageResponse> => {
    try {
      const response = await api.get(apiRoutes.IMAGES.GET_ALL(page, limit));
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Upload một ảnh
  uploadImage: async (file: File): Promise<ImageResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(apiRoutes.IMAGES.UPLOAD, formData);
    return response.data;
  },

  // Upload nhiều ảnh
  uploadMultipleImages: async (files: File[]): Promise<ImageResponse[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post(apiRoutes.IMAGES.UPLOAD_MULTIPLE, formData);
    return response.data;
  },

  // Xóa ảnh theo slug
  deleteImage: async (slug: string): Promise<void> => {
    await api.delete(apiRoutes.IMAGES.DELETE(slug));
  },
};