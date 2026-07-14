import api from '@/config/api';
import { apiRoutes } from "@/config/apiRoutes";
import type {
  AdminContact,
  UpdateAdminContactPayload,
} from '../models/contact.model';

const listUrl = () => `${apiRoutes.CONTACTS.BASE}`;

const byIdUrl = (id: string) =>
  `${apiRoutes.CONTACTS.BY_ID(id)}`;

export const ContactAdminService = {
  findAll: async (): Promise<AdminContact[]> => {
    const response = await api.get<AdminContact[]>(listUrl());
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateAdminContactPayload,
  ): Promise<AdminContact> => {
    const response = await api.patch<AdminContact>(
      byIdUrl(id),
      payload,
    );
    return response.data;
  },
};
