import api from '@/config/api';
import { apiRoutes } from "@/config/apiRoutes";
import type {
  AdminBanner,
  AdminCreateBannerInput,
  AdminUpdateBannerInput,
} from '../models/banner.model';

const BANNER_ROOT = apiRoutes.BANNER.BASE;

export const AdminBannerService = {
  list: async (placement?: string): Promise<AdminBanner[]> => {
    const response = await api.get<AdminBanner[]>(
      `${apiRoutes.BANNER.LIST(placement)}`,
    );
    return response.data;
  },

  create: async (body: AdminCreateBannerInput): Promise<AdminBanner> => {
    const response = await api.post<AdminBanner>(
      BANNER_ROOT,
      body,
    );
    return response.data;
  },

  update: async (
    publicId: string,
    body: AdminUpdateBannerInput,
  ): Promise<AdminBanner> => {
    const response = await api.patch<AdminBanner>(
      `${apiRoutes.BANNER.UPDATE(publicId)}`,
      body,
    );
    return response.data;
  },

  remove: async (publicId: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `${apiRoutes.BANNER.DELETE(publicId)}`,
    );
    return response.data;
  },

  reorder: async (
    placement: string,
    orderedPublicIds: string[],
  ): Promise<AdminBanner[]> => {
    const response = await api.patch<AdminBanner[]>(
      `${apiRoutes.BANNER.REORDER(placement)}`,
      { orderedPublicIds },
    );
    return response.data;
  },
};
