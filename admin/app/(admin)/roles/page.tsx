"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RolesService } from "@/modules/role/services/roles.service";
import {
  Role,
  RolesPaginationQuery,
  PermissionResource,
} from "@/modules/permission/types/permissions";
import { usePermissions } from "@/context/PermissionsContext";
import { toast } from "react-toastify";

const RolesManagementPage = () => {
  const router = useRouter();
  const { canView, canCreate, canEdit, canDelete } = usePermissions();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);

  const canManageRoles = canView(PermissionResource.PERMISSION);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const query: RolesPaginationQuery = {
        page: String(page),
        limit: String(limit),
        search: search || undefined,
        isActive: isActiveFilter,
      };

      const response = await RolesService.findAll(query);
      setRoles(response.data);
      setTotal(response.meta.total);
    } catch (error: unknown) {
      console.error("Failed to fetch roles:", error);
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  }, [page, search, isActiveFilter, limit]);

  useEffect(() => {
    if (!canManageRoles) {
      toast.error("You don't have permission to view roles");
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoles();
  }, [canManageRoles, fetchRoles, router]);

  const handleDelete = async (id: string, roleName: string) => {
    if (!canDelete(PermissionResource.PERMISSION)) {
      toast.error("You don't have permission to delete roles");
      return;
    }

    if (!confirm(`Are you sure you want to delete role "${roleName}"?`)) {
      return;
    }

    try {
      await RolesService.remove(id);
      toast.success("Role deleted successfully");
      fetchRoles();
    } catch (error: unknown) {
      console.error("Failed to delete role:", error);
      const typedError = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(typedError.response?.data?.message || typedError.message || "Failed to delete role");
    }
  };

  const handleEdit = (id: string) => {
    if (!canEdit(PermissionResource.PERMISSION)) {
      toast.error("You don't have permission to edit roles");
      return;
    }
    router.push(`/roles/${id}/edit`);
  };

  const handleCreate = () => {
    if (!canCreate(PermissionResource.PERMISSION)) {
      toast.error("You don't have permission to create roles");
      return;
    }
    router.push("/roles/create");
  };

  const totalPages = Math.ceil(total / limit);

  if (!canManageRoles) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
        {canCreate(PermissionResource.PERMISSION) && (
          <button
            onClick={handleCreate}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            Create Role
          </button>
        )}
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        />
        <select
          value={isActiveFilter === undefined ? "all" : isActiveFilter ? "active" : "inactive"}
          onChange={(e) => {
            const value = e.target.value;
            setIsActiveFilter(value === "all" ? undefined : value === "active");
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    System
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {roles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No roles found
                    </td>
                  </tr>
                ) : (
                  roles.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {role.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {role.description || "-"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {role.permissions.length} permissions
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            role.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {role.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {role.isSystem ? (
                          <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                            System
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {canEdit(PermissionResource.PERMISSION) && (
                            <button
                              onClick={() => handleEdit(role.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                          )}
                          {canDelete(PermissionResource.PERMISSION) && !role.isSystem && (
                            <button
                              onClick={() => handleDelete(role.id, role.name)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RolesManagementPage;
