import axios from 'axios';
import {
  Role,
  CreateRoleDto,
  UpdateRoleDto,
  RolesPaginationQuery,
  RolesPaginationResponse,
  RolePermission,
} from '@/modules/permission/types/permissions';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export class RolesService {
  static async create(data: CreateRoleDto): Promise<Role> {
    const response = await axios.post(`${API_URL}/roles`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  static async findAll(query?: RolesPaginationQuery): Promise<RolesPaginationResponse> {
    const response = await axios.get(`${API_URL}/roles`, {
      params: query,
      withCredentials: true,
    });
    return response.data;
  }

  static async findOne(id: string): Promise<Role> {
    const response = await axios.get(`${API_URL}/roles/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async update(id: string, data: UpdateRoleDto): Promise<Role> {
    const response = await axios.patch(`${API_URL}/roles/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  }

  static async remove(id: string): Promise<void> {
    await axios.delete(`${API_URL}/roles/${id}`, {
      withCredentials: true,
    });
  }

  static async getPermissions(id: string): Promise<RolePermission[]> {
    const response = await axios.get(`${API_URL}/roles/${id}/permissions`, {
      withCredentials: true,
    });
    return response.data;
  }

  static async assignPermissions(id: string, permissions: RolePermission[]): Promise<Role> {
    const response = await axios.patch(
      `${API_URL}/roles/${id}/permissions`,
      { permissions },
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
}
