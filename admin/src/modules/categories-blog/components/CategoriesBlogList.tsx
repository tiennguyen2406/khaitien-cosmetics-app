"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CategoriesBlog } from "../models/categories-blog.model";
import { useCategoriesBlogs } from "../hooks/useCategoriesBlog";

const CategoriesBlogList = () => {
  const [page, setPage] = useState(1);
  const limit = 15;

  const {
    categories,
    total,
    isLoading,
    isFetching,
    softDeleteMutation,
    hardDeleteMutation,
  } = useCategoriesBlogs(page, limit);

  const slugToName = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categories) {
      map.set(cat.slug, cat.name);
    }
    return map;
  }, [categories]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const showInitialSpinner = isLoading && categories.length === 0;

  const handleSoftDelete = async (category: CategoriesBlog) => {
    if (!confirm(`Xóa mềm danh mục "${category.name}"?`)) return;
    try {
      await softDeleteMutation.mutateAsync(category.slug);
      alert("Đã ẩn danh mục.");
    } catch (error) {
      console.error(error);
      alert("Xóa mềm thất bại.");
    }
  };

  const handleHardDelete = async (category: CategoriesBlog) => {
    if (
      !confirm(
        `Xóa vĩnh viễn "${category.name}"? Chỉ dùng khi chắc chắn (cần quyền phù hợp).`,
      )
    ) {
      return;
    }
    try {
      await hardDeleteMutation.mutateAsync(category.slug);
      alert("Đã xóa vĩnh viễn.");
    } catch (error) {
      console.error(error);
      alert("Xóa vĩnh viễn thất bại.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Danh mục bài viết
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Nhóm nội dung dùng khi gắn thẻ cho bài viết. Slug do hệ thống tạo từ
            tên.
          </p>
        </div>
        <Link
          href="/categories-blog/create"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 shadow-sm"
        >
          Tạo danh mục
        </Link>
      </div>

      {showInitialSpinner ? (
        <p className="py-10 text-center text-gray-500">Đang tải danh mục…</p>
      ) : (
        <div
          className={`relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden ${
            isFetching ? "opacity-75" : ""
          }`}
        >
          {isFetching && !showInitialSpinner ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 pointer-events-none">
              <span className="text-sm text-gray-600 rounded-lg bg-white px-3 py-1.5 shadow border border-gray-100">
                Đang cập nhật…
              </span>
            </div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/90 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3 w-20">Cấp</th>
                  <th className="px-4 py-3">Danh mục cha</th>
                  <th className="px-4 py-3">Cập nhật</th>
                  <th className="px-4 py-3 text-center w-48">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      Chưa có danh mục. Hãy tạo danh mục đầu tiên.
                    </td>
                  </tr>
                ) : (
                  categories.map((category, index) => {
                    const parentLabel = category.parentSlug
                      ? slugToName.get(category.parentSlug) ??
                        category.parentSlug
                      : "—";

                    return (
                      <tr
                        key={category._id + index}
                        className="hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <span
                            className="font-medium text-gray-900"
                            style={{
                              paddingLeft: `${category.level * 12}px`,
                            }}
                          >
                            {category.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">
                          {category.slug}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                            L{category.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{parentLabel}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                          {category.updatedAt
                            ? new Date(category.updatedAt).toLocaleString(
                                "vi-VN",
                              )
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-center whitespace-nowrap space-x-1">
                          <Link
                            href={`/categories-blog/edit/${encodeURIComponent(category.slug)}`}
                            className="inline-flex rounded-md bg-amber-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-amber-600"
                          >
                            Sửa
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleSoftDelete(category)}
                            className="inline-flex rounded-md bg-orange-500 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-orange-600"
                          >
                            Xóa
                          </button>
                          {/* <button
                            type="button"
                            onClick={() => handleHardDelete(category)}
                            className="inline-flex rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                          >
                            Xóa hẳn
                          </button> */}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!showInitialSpinner ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            Trước
          </button>
          <span className="text-sm text-gray-600">
            Trang {page} / {totalPages} · {total} danh mục
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((previous) => previous + 1)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40"
          >
            Sau
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CategoriesBlogList;
