import api from '@/config/api';
import { apiRoutes } from "@/config/apiRoutes";
import type {
  Blog,
  CreateBlogDto,
  PaginatedBlogs,
  UpdateBlogDto,
} from '../models/blog.model';

const API_URL = apiRoutes.BLOG.BASE;

export const BlogService = {
  findAll: async (params?: {
    page?: number;
    limit?: number;
    includeHidden?: boolean;
  }): Promise<PaginatedBlogs> => {
    const queryParams = new URLSearchParams();
    if (params?.page !== undefined) {
      queryParams.append('page', String(params.page));
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', String(params.limit));
    }
    if (params?.includeHidden !== undefined) {
      queryParams.append('includeHidden', String(params.includeHidden));
    }
    const suffix = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await api.get<PaginatedBlogs>(`${API_URL}${suffix}`);
    return response.data;
  },

  getMy: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedBlogs> => {
    const queryParams = new URLSearchParams();
    if (params?.page !== undefined) {
      queryParams.append('page', String(params.page));
    }
    if (params?.limit !== undefined) {
      queryParams.append('limit', String(params.limit));
    }

    const response = await api.get<PaginatedBlogs>(
      `${apiRoutes.BLOG.GET_MY({
        page: params?.page,
        limit: params?.limit,
      })}`,
    );
    return response.data;
  },

  search: async (params: {
    q: string;
    page?: number;
    limit?: number;
    includeHidden?: boolean;
  }): Promise<PaginatedBlogs> => {
    const response = await api.get<PaginatedBlogs>(
      `${apiRoutes.BLOG.SEARCH(params)}`,
    );
    return response.data;
  },

  searchMy: async (params: {
    q: string;
    page?: number;
    limit?: number;
    includeHidden?: boolean;
  }): Promise<PaginatedBlogs> => {
    const response = await api.get<PaginatedBlogs>(
      `${apiRoutes.BLOG.SEARCH_MY(params)}`,
    );
    return response.data;
  },

  getOne: async (slug: string): Promise<Blog> => {
    const response = await api.get<Blog>(
      `${apiRoutes.BLOG.GET_BY_SLUG(slug)}`,
    );
    return response.data;
  },

  create: async (dto: CreateBlogDto): Promise<Blog> => {
    const response = await api.post<Blog>(API_URL, dto);
    return response.data;
  },

  update: async (slug: string, dto: UpdateBlogDto): Promise<Blog> => {
    const response = await api.patch<Blog>(
      `${API_URL}/${encodeURIComponent(slug)}`,
      dto,
    );
    return response.data;
  },

  updateVisibility: async (
    slug: string,
    isHidden: boolean,
  ): Promise<Blog> => {
    const response = await api.patch<Blog>(
      `${apiRoutes.BLOG.UPDATE_VISIBILITY(slug)}`,
      { isHidden },
    );
    return response.data;
  },

  updateStatus: async (
    slug: string,
    status: Blog['status'],
  ): Promise<Blog> => {
    const response = await api.patch<Blog>(
      `${apiRoutes.BLOG.UPDATE_STATUS(slug)}`,
      { status },
    );
    return response.data;
  },

  softDelete: async (slug: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `${API_URL}/${encodeURIComponent(slug)}`,
    );
    return response.data;
  },

  hardDelete: async (slug: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `${apiRoutes.BLOG.HARD_DELETE(slug)}`,
    );
    return response.data;
  },
};

export default BlogService;
