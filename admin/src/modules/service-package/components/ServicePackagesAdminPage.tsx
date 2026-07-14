"use client";

import { useMemo, useState } from "react";
import { BoxCubeIcon } from "@/icons";
import { useAdminServicePackages } from "../hooks/useAdminServicePackages";
import type {
  AdminCreateServicePackageInput,
  AdminServicePackage,
  ServicePackageCategory,
} from "../models/service-package.model";
import { SERVICE_PACKAGE_CATEGORIES } from "../models/service-package.model";
import ServicePackageModal from "./ServicePackageModal";

type StatusFilter = "all" | "active" | "hidden";

const categoryLabel: Record<ServicePackageCategory, string> = {
  wedding: "Wedding",
  corporate: "Corporate",
  celebration: "Celebration",
  private_dining: "Private Dining",
};

const emptyForm = (): AdminCreateServicePackageInput => ({
  name: "",
  description: "",
  priceLabel: "",
  imageUrl: "",
  category: "wedding",
  features: [],
  minGuests: undefined,
  maxGuests: undefined,
  serviceDuration: "",
  venueScope: "",
  defaultMenu: "",
  isFeatured: false,
  isActive: true,
});

const toForm = (servicePackage: AdminServicePackage): AdminCreateServicePackageInput => ({
  name: servicePackage.name,
  description: servicePackage.description,
  priceLabel: servicePackage.priceLabel,
  basePrice: servicePackage.basePrice ?? undefined,
  imageUrl: servicePackage.imageUrl,
  category: servicePackage.category,
  features: servicePackage.features,
  minGuests: servicePackage.minGuests ?? undefined,
  maxGuests: servicePackage.maxGuests ?? undefined,
  serviceDuration: servicePackage.serviceDuration,
  venueScope: servicePackage.venueScope,
  defaultMenu: servicePackage.defaultMenu,
  isFeatured: servicePackage.isFeatured,
  isActive: servicePackage.isActive,
  sortOrder: servicePackage.sortOrder,
});

const ServicePackagesAdminPage = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AdminCreateServicePackageInput>(emptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryCategory = categoryFilter === "all" ? undefined : categoryFilter;
  const queryIsActive =
    statusFilter === "all" ? undefined : statusFilter === "active";

  const {
    listQuery,
    createMutation,
    updateMutation,
    removeMutation,
    reorderMutation,
  } = useAdminServicePackages({
    category: queryCategory,
    isActive: queryIsActive,
  });

  const rows = useMemo(() => {
    const rawRows = listQuery.data ?? [];
    const keyword = search.trim().toLowerCase();
    const filteredRows = keyword
      ? rawRows.filter((item) =>
          `${item.name} ${item.description} ${item.category}`
            .toLowerCase()
            .includes(keyword),
        )
      : rawRows;
    return [...filteredRows].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [listQuery.data, search]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setIsModalOpen(false);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm());
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminServicePackage) => {
    setEditingId(item.publicId);
    setForm(toForm(item));
    setIsModalOpen(true);
  };

  const submitForm = (data: AdminCreateServicePackageInput) => {
    const normalizedPayload = {
      ...data,
      priceLabel: data.priceLabel?.trim() || undefined,
      basePrice: data.basePrice === undefined ? undefined : Number(data.basePrice),
      features: (data.features ?? []).filter((item) => item.trim().length > 0),
      serviceDuration: data.serviceDuration?.trim() || undefined,
      venueScope: data.venueScope?.trim() || undefined,
      defaultMenu: data.defaultMenu?.trim() || undefined,
    };

    if (editingId) {
      updateMutation.mutate(
        { publicId: editingId, body: normalizedPayload },
        { onSuccess: () => resetForm() },
      );
      return;
    }

    createMutation.mutate(normalizedPayload, {
      onSuccess: () => resetForm(),
    });
  };

  const moveRow = (currentIndex: number, delta: number) => {
    const targetIndex = currentIndex + delta;
    if (targetIndex < 0 || targetIndex >= rows.length) {
      return;
    }
    const next = [...rows];
    const item = next[currentIndex];
    next[currentIndex] = next[targetIndex] as AdminServicePackage;
    next[targetIndex] = item as AdminServicePackage;
    reorderMutation.mutate(next.map((entry) => entry.publicId));
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <BoxCubeIcon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Quản lý gói dịch vụ
              </h1>
              <p className="text-sm text-gray-500">
                Quản lý dữ liệu production cho wedding, corporate, celebration.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Tạo gói mới
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Tìm theo tên hoặc mô tả..."
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="all">Tất cả danh mục</option>
            {SERVICE_PACKAGE_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {categoryLabel[item]}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hiển thị</option>
            <option value="hidden">Đang ẩn</option>
          </select>
        </div>
      </section>

      <section className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3">Gói</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Khách</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((item, index) => (
              <tr key={item.publicId}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="max-w-sm truncate text-xs text-gray-500">
                    {item.description}
                  </p>
                </td>
                <td className="px-4 py-3">{categoryLabel[item.category]}</td>
                <td className="px-4 py-3">
                  {item.minGuests ?? "-"} - {item.maxGuests ?? "-"}
                </td>
                <td className="px-4 py-3">
                  {(item.basePrice?.toLocaleString("vi-VN") ?? item.priceLabel) ||
                    "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        item.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.isActive ? "Hiển thị" : "Ẩn"}
                    </span>
                    {item.isFeatured && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                        Nổi bật
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50"
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => moveRow(index, -1)}
                      disabled={index === 0 || reorderMutation.isPending}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-xs disabled:opacity-40"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveRow(index, 1)}
                      disabled={index === rows.length - 1 || reorderMutation.isPending}
                      className="rounded-lg border border-gray-200 px-2 py-1 text-xs disabled:opacity-40"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Xóa gói dịch vụ này?")) {
                          removeMutation.mutate(item.publicId);
                        }
                      }}
                      className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!listQuery.isLoading && rows.length === 0 && (
          <p className="p-6 text-center text-gray-500">Chưa có gói dịch vụ phù hợp bộ lọc.</p>
        )}
      </section>

      <ServicePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={submitForm}
        form={form}
        setForm={setForm}
        isLoading={createMutation.isPending || updateMutation.isPending}
        editingId={editingId}
      />
    </div>
  );
};

export default ServicePackagesAdminPage;
