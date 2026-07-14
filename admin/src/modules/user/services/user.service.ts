import api from '@/config/api';
import { apiRoutes } from "@/config/apiRoutes";
import { RolePermission } from '@/modules/permission/types/permissions';

import type {
  AdminUpdateUserInput,
  AdminUsersListParams,
  AdminUsersListResponse,
  AdminUser,
} from '../models/user.model';

export const AdminUserService = {
  list: async (params: AdminUsersListParams): Promise<AdminUsersListResponse> => {
    const response = await api.get<AdminUsersListResponse>(
      `${apiRoutes.USERS.LIST(params)}`,
    );
    return response.data;
  },

  update: async (id: string, body: AdminUpdateUserInput): Promise<AdminUser> => {
    const response = await api.patch<AdminUser>(
      `${apiRoutes.USERS.UPDATE(id)}`,
      body,
    );
    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`${apiRoutes.USERS.DELETE(id)}`);
  },

  assignRole: async (id: string, roleId: string): Promise<AdminUser> => {
    const response = await api.patch<AdminUser>(
      `${apiRoutes.USERS.BASE}/${id}/role`,
      { roleId },
    );
    return response.data;
  },

  removeRole: async (id: string): Promise<void> => {
    await api.delete(`${apiRoutes.USERS.BASE}/${id}/role`);
  },

  assignCustomPermissions: async (id: string, permissions: RolePermission[]): Promise<AdminUser> => {
    const response = await api.post<AdminUser>(
      `${apiRoutes.USERS.BASE}/${id}/permissions`,
      permissions,
    );
    return response.data;
  },

  removeCustomPermissions: async (id: string): Promise<void> => {
    await api.delete(`${apiRoutes.USERS.BASE}/${id}/permissions`);
  },
};

