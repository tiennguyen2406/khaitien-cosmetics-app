"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { RolesService } from "@/modules/role/services/roles.service";
import {
  Role,
  UpdateRoleDto,
  RolePermission,
  PermissionResource,
  PermissionAction,
  PermissionEffect,
  PermissionResourceTarget,
} from "@/modules/permission/types/permissions";
import { usePermissions } from "@/context/PermissionsContext";
import { toast } from "react-toastify";

const EditRolePage = () => {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string;
  const { canEdit } = usePermissions();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [role, setRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const [selectedPermissions, setSelectedPermissions] = useState<RolePermission[]>([]);

  const canEditRole = canEdit(PermissionResource.PERMISSION);

  const fetchRole = useCallback(async () => {
    try {
      setLoading(true);
      const data = await RolesService.findOne(roleId);
      setRole(data);
      setFormData({
        name: data.name,
        description: data.description || "",
        isActive: data.isActive,
      });
      setSelectedPermissions(data.permissions);
    } catch (error: unknown) {
      console.error("Failed to fetch role:", error);
      toast.error("Failed to load role");
      router.push("/roles");
    } finally {
      setLoading(false);
    }
  }, [roleId, router]);

  useEffect(() => {
    if (!canEditRole) {
      toast.error("You don't have permission to edit roles");
      router.push("/roles");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRole();
  }, [canEditRole, fetchRole, router]);

  const resources = Object.values(PermissionResource);
  const actions = Object.values(PermissionAction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Role name is required");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error("At least one permission is required");
      return;
    }

    try {
      setSaving(true);
      const dto: UpdateRoleDto = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        permissions: selectedPermissions,
        isActive: formData.isActive,
      };

      await RolesService.update(roleId, dto);
      toast.success("Role updated successfully");
      router.push("/roles");
    } catch (error: unknown) {
      console.error("Failed to update role:", error);
      const typedError = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(typedError.response?.data?.message || typedError.message || "Failed to update role");
    } finally {
      setSaving(false);
    }
  };

  const togglePermission = (resource: string, action: string) => {
    const exists = selectedPermissions.find(
      (p) => p.resourceType === resource && p.action === action
    );

    if (exists) {
      setSelectedPermissions(
        selectedPermissions.filter(
          (p) => !(p.resourceType === resource && p.action === action)
        )
      );
    } else {
      setSelectedPermissions([
        ...selectedPermissions,
        {
          resourceType: resource,
          action: action,
          resourceTarget: PermissionResourceTarget.ANY,
          effect: PermissionEffect.ALLOW,
        },
      ]);
    }
  };

  const hasPermission = (resource: string, action: string) => {
    return selectedPermissions.some(
      (p) => p.resourceType === resource && p.action === action
    );
  };

  const selectAllForResource = (resource: string) => {
    const allSelected = actions.every((action) => hasPermission(resource, action));

    if (allSelected) {
      setSelectedPermissions(
        selectedPermissions.filter((p) => p.resourceType !== resource)
      );
    } else {
      const newPermissions = [...selectedPermissions];
      actions.forEach((action) => {
        if (!hasPermission(resource, action)) {
          newPermissions.push({
            resourceType: resource,
            action: action,
            resourceTarget: PermissionResourceTarget.ANY,
            effect: PermissionEffect.ALLOW,
          });
        }
      });
      setSelectedPermissions(newPermissions);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!role || !canEditRole) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Role</h1>
        <p className="mt-1 text-sm text-gray-600">
          Update role information and permissions
        </p>
        {role.isSystem && (
          <div className="mt-2 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
            This is a system role and cannot be modified.
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={role.isSystem}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="e.g., Content Manager"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={role.isSystem}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Describe the role's purpose and responsibilities"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                disabled={role.isSystem}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Permissions <span className="text-red-500">*</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Resource
                  </th>
                  {actions.map((action) => (
                    <th
                      key={action}
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      {action}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    All
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {resources.map((resource) => (
                  <tr key={resource} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {resource}
                    </td>
                    {actions.map((action) => (
                      <td key={action} className="whitespace-nowrap px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={hasPermission(resource, action)}
                          onChange={() => togglePermission(resource, action)}
                          disabled={role.isSystem}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                        />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => selectAllForResource(resource)}
                        disabled={role.isSystem}
                        className="text-sm text-blue-600 hover:text-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {actions.every((action) => hasPermission(resource, action))
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Selected: {selectedPermissions.length} permission(s)
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/roles")}
            className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          {!role.isSystem && (
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditRolePage;
