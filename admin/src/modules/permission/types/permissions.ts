export enum PermissionAction {
  ANY = '*',
  CREATE = 'create',
  DELETE = 'delete',
  EDIT = 'edit',
  GET = 'get',
}

export enum PermissionResource {
  ANY = '*',
  BANNER = 'banners',
  BLOG = 'blogs',
  CATEGORY_BLOG = 'categories-blog',
  CONTACT = 'contacts',
  HISTORY = 'histories',
  IMAGE = 'images',
  INFO_WEBSITE = 'info-websites',
  MENU = 'menus',
  PERMISSION = 'permissions',
  SERVICE_PACKAGE = 'service-packages',
  USER = 'users'
}

export enum PermissionResourceTarget {
  ANY = '*',
  SOME = 'some',
}

export enum PermissionEffect {
  ALLOW = 'ALLOW',
  DENY = 'DENY',
}

export interface Permission {
  readonly resourceType: PermissionResource | string;
  readonly resourceTarget: PermissionResourceTarget | string;
  readonly action: PermissionAction | string;
  readonly effect: PermissionEffect | string;
}

export interface RolePermission {
  resourceType: string;
  action: string;
  resourceTarget: string;
  effect: string;
}

export interface Role {
  id: string;
  name: string;
  description: string | null;
  permissions: RolePermission[];
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
  permissions: RolePermission[];
  isActive?: boolean;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
  permissions?: RolePermission[];
  isActive?: boolean;
}

export interface RolesPaginationQuery {
  page?: string;
  limit?: string;
  search?: string;
  isActive?: boolean;
}

export interface RolesPaginationResponse {
  data: Role[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
