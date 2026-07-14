"use client";

import { useEffect } from "react";
import type {
  AdminCreateServicePackageInput,
  ServicePackageCategory,
} from "../models/service-package.model";
import { SERVICE_PACKAGE_CATEGORIES } from "../models/service-package.model";

interface ServicePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminCreateServicePackageInput) => void;
  form: AdminCreateServicePackageInput;
  setForm: React.Dispatch<React.SetStateAction<AdminCreateServicePackageInput>>;
  isLoading: boolean;
  editingId: string | null;
}

const categoryLabel: Record<ServicePackageCategory, string> = {
  wedding: "Wedding",
  corporate: "Corporate",
  celebration: "Celebration",
  private_dining: "Private Dining",
};

const ServicePackageModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  setForm,
  isLoading,
  editingId,
}: ServicePackageModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingId ? "Cập nhật gói dịch vụ" : "Tạo gói dịch vụ mới"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tên gói <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: Gói tiệc cưới sang trọng"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Ảnh minh họa URL <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                rows={4}
                placeholder="Mô tả chi tiết về gói dịch vụ..."
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    category: e.target.value as ServicePackageCategory,
                  }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {SERVICE_PACKAGE_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {categoryLabel[item]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nhãn giá
              </label>
              <input
                value={form.priceLabel ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, priceLabel: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder='Ví dụ: "Liên hệ báo giá"'
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Giá cố định (VND)
              </label>
              <input
                type="number"
                min={0}
                value={form.basePrice ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    basePrice: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: 50000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tính năng
              </label>
              <input
                value={form.features?.join(", ") ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    features: e.target.value
                      .split(",")
                      .map((item) => item.trim()),
                  }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Tính năng 1, Tính năng 2, Tính năng 3"
              />
              <p className="mt-1 text-xs text-gray-500">
                Phân tách các tính năng bằng dấu phẩy
              </p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Số khách tối thiểu
              </label>
              <input
                type="number"
                min={1}
                value={form.minGuests ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    minGuests: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: 50"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Số khách tối đa
              </label>
              <input
                type="number"
                min={1}
                value={form.maxGuests ?? ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    maxGuests: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: 200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Thời gian phục vụ
              </label>
              <input
                value={form.serviceDuration ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, serviceDuration: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: 4-5 giờ"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Địa điểm áp dụng
              </label>
              <input
                value={form.venueScope ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, venueScope: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Ví dụ: Sảnh A, Sảnh B"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Menu mặc định
              </label>
              <input
                value={form.defaultMenu ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, defaultMenu: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="Mô tả menu mặc định"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isFeatured ?? false}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, isFeatured: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="font-medium text-gray-700">Gói nổi bật</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive ?? true}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, isActive: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="font-medium text-gray-700">
                  Hiển thị trên website
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
            >
              {isLoading
                ? "Đang xử lý..."
                : editingId
                  ? "Lưu thay đổi"
                  : "Tạo gói dịch vụ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicePackageModal;
