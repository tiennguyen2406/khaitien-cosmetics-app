"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import type { Blog, BlogStatus } from "../models/blog.model";
import { useBlogs } from "../hooks/useBlog";
import SearchBlog from "./SearchBlog";

const statusLabel: Record<BlogStatus, string> = {
  draft: "Nháp",
  pending: "Chờ duyệt",
  approved: "Đã duyệt",
  rejected: "Từ chối",
};

const BlogList = () => {
  const [page, setPage] = useState(1);
  const [includeHidden, setIncludeHidden] = useState(true);
  const [scope, setScope] = useState<"all" | "my">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const handleSearch = useCallback((term: string) => {
    setSearchQuery(term);
    setPage(1);
  }, []);

  const {
    blogs,
    total,
    isLoading,
    isFetching,
    updateVisibilityMutation,
    updateStatusMutation,
    softDeleteMutation,
    hardDeleteMutation,
  } = useBlogs(page, limit, includeHidden, scope, searchQuery);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleSoftDelete = async (blog: Blog) => {
    if (!confirm(`Xóa mềm bài "${blog.title}"?`)) return;
    try {
      await softDeleteMutation.mutateAsync(blog.slug);
      alert("Đã xóa mềm bài viết.");
    } catch (error) {
      console.error(error);
      alert("Xóa mềm thất bại.");
    }
  };

  const handleHardDelete = async (blog: Blog) => {
    if (!confirm(`Xóa VĨNH VIỄN bài "${blog.title}"? Không hoàn tác.`)) return;
    try {
      await hardDeleteMutation.mutateAsync(blog.slug);
      alert("Đã xóa vĩnh viễn.");
    } catch (error) {
      console.error(error);
      alert("Xóa vĩnh viễn thất bại (cần quyền super_admin).");
    }
  };

  const toggleHidden = async (blog: Blog) => {
    try {
      await updateVisibilityMutation.mutateAsync({
        slug: blog.slug,
        isHidden: !blog.isHidden,
      });
    } catch (error) {
      console.error(error);
      alert("Không cập nhật được trạng thái ẩn.");
    }
  };

  const changeStatus = async (blog: Blog, status: BlogStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ slug: blog.slug, status });
    } catch (error) {
      console.error(error);
      alert("Không cập nhật được trạng thái.");
    }
  };

  const showInitialSpinner = isLoading && !blogs.length;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Quản lý bài viết</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <Link
          href="/blog/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Viết bài mới
        </Link>
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={includeHidden}
            onChange={(event) => {
              setIncludeHidden(event.target.checked);
              setPage(1);
            }}
          />
          Hiển thị cả bài ẩn
        </label>
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={() => {
              setScope("all");
              setPage(1);
            }}
            className={`px-3 py-1 rounded ${scope === "all" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => {
              setScope("my");
              setPage(1);
            }}
            className={`px-3 py-1 rounded ${scope === "my" ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          >
            Bài của tôi
          </button>
        </div>
      </div>

      <SearchBlog onSearch={handleSearch} />

      {showInitialSpinner ? (
        <p className="py-6 text-gray-600">Đang tải danh sách bài viết...</p>
      ) : (
      <div
        className={`relative overflow-x-auto border border-gray-200 rounded-lg bg-white ${
          isFetching ? 'opacity-70' : ''
        }`}
      >
        {isFetching ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 pointer-events-none">
            <span className="text-sm text-gray-600 rounded bg-white px-3 py-1 shadow border">
              Đang tải…
            </span>
          </div>
        ) : null}
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-3 text-left text-sm font-semibold border-b">Tiêu đề</th>
              {/* <th className="py-3 px-3 text-left text-sm font-semibold border-b">Slug</th> */}
              <th className="py-3 px-3 text-left text-sm font-semibold border-b">Trạng thái</th>
              <th className="py-3 px-3 text-center text-sm font-semibold border-b">Ẩn</th>
              <th className="py-3 px-3 text-left text-sm font-semibold border-b">Cập nhật</th>
              <th className="py-3 px-3 text-center text-sm font-semibold border-b">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  {searchQuery.trim()
                    ? "Không tìm thấy bài viết phù hợp."
                    : "Chưa có bài viết nào."}
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr key={blog._id + index} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="py-3 px-3 font-medium max-w-md truncate">{blog.title}</td>
                  {/* <td className="py-3 px-3 text-gray-600 text-sm font-mono">{blog.slug}</td> */}
                  <td className="py-3 px-3">
                    <select
                      value={blog.status}
                      onChange={(event) =>
                        changeStatus(blog, event.target.value as BlogStatus)
                      }
                      className="text-sm border rounded px-2 py-1 bg-white"
                    >
                      {(Object.keys(statusLabel) as BlogStatus[]).map((key) => (
                        <option key={key} value={key}>
                          {statusLabel[key]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => toggleHidden(blog)}
                      className={`text-xs px-2 py-1 rounded ${blog.isHidden ? "bg-amber-200" : "bg-green-100"}`}
                    >
                      {blog.isHidden ? "Đang ẩn" : "Hiển thị"}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-600">
                    {blog.updatedAt
                      ? new Date(blog.updatedAt).toLocaleString("vi-VN")
                      : "—"}
                  </td>
                  <td className="py-3 px-3 text-center space-x-1 whitespace-nowrap">
                    <Link
                      href={`/blog/edit/${blog.slug}`}
                      className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-xs rounded"
                    >
                      Sửa
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleSoftDelete(blog)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs rounded"
                    >
                      Xóa
                    </button>
                    {/* <button
                      type="button"
                      onClick={() => handleHardDelete(blog)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
                    >
                      Xóa hẳn
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}

      {!showInitialSpinner ? (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((previous) => Math.max(1, previous - 1))}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Trước
          </button>
          <span className="text-sm text-gray-700">
            Trang {page} / {totalPages} ({total} bài)
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((previous) => previous + 1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default BlogList;
