"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { CategoriesBlog } from "../../categories-blog/models/categories-blog.model";
import type {
  CreateBlogDto,
  UpdateBlogDto,
  BlogStatus,
} from "../models/blog.model";
import { useBlogOne, useBlogMutations } from "../hooks/useBlog";
import { useCategoriesBlogs } from "../../categories-blog/hooks/useCategoriesBlog";
import { slugifyFromTitle } from "@/utils/slug.utils";
import CategoryBlogTree from "./CategoryBlogTree";
import { useImages } from "@/common/hooks/useImages";
import SunEditor from "@/common/components/SunEditor";
import Image from "next/image";

type FormValues = {
  title: string;
  slug: string;
  excerpt: string;
  blogData: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  status: BlogStatus;
  isHidden: boolean;
};

const isEmptyEditorHtml = (html: string): boolean => {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length === 0;
};

const normalizeCategorySelections = (
  stored: string[] | undefined,
  flat: CategoriesBlog[],
): string[] => {
  if (!stored?.length) {
    return [];
  }
  if (flat.length === 0) {
    return [...stored];
  }
  const slugSet = new Set(flat.map((category) => category.slug));
  return stored
    .map((entry) => {
      if (slugSet.has(entry)) {
        return entry;
      }
      return flat.find((category) => category.name === entry)?.slug;
    })
    .filter((value): value is string => Boolean(value));
};

type Props = {
  slug?: string;
  onSuccess?: (savedSlug: string) => void;
};

const BlogForm = ({ slug, onSuccess }: Props) => {
  const isEditMode = Boolean(slug);
  const { uploadImage } = useImages();
  const router = useRouter();
  const { data: currentBlog, isLoading: isLoadingBlog } = useBlogOne(
    slug ?? "",
  );
  const { createMutation, updateMutation } = useBlogMutations();
  const { categories: blogCategories, isLoading: isLoadingBlogCategories } =
    useCategoriesBlogs(1, 500);

  const [categoryMainSlugs, setCategoryMainSlugs] = useState<string[]>([]);
  const [categorySubSlugs] = useState<string[]>([]);

  const editorRemountKey = currentBlog?.slug ?? "new-blog";

  // Image upload states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<string>("");

  const defaultCategoryMainSlugs = useMemo(
    () =>
      normalizeCategorySelections(currentBlog?.category?.main, blogCategories),
    [currentBlog, blogCategories],
  );

  const defaultCategorySubSlugs = useMemo(
    () =>
      normalizeCategorySelections(currentBlog?.category?.sub, blogCategories),
    [currentBlog, blogCategories],
  );

  const effectiveCategoryMainSlugs =
    categoryMainSlugs.length > 0 ? categoryMainSlugs : defaultCategoryMainSlugs;
  const effectiveCategorySubSlugs =
    categorySubSlugs.length > 0 ? categorySubSlugs : defaultCategorySubSlugs;

  const displayThumbnailPreview =
    thumbnailFile || !currentBlog?.thumbnail
      ? thumbnailPreview
      : currentBlog.thumbnail;
  const displayOgImagePreview =
    ogImageFile || !currentBlog?.seo?.ogImage
      ? ogImagePreview
      : (currentBlog.seo?.ogImage ?? "");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      blogData: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "draft",
      isHidden: false,
    },
  });

  useEffect(() => {
    if (!isEditMode || !currentBlog) {
      return;
    }

    reset({
      title: currentBlog.title,
      slug: currentBlog.slug,
      excerpt: currentBlog.excerpt,
      blogData: currentBlog.blogData,
      metaTitle: currentBlog.seo?.metaTitle ?? "",
      metaDescription: currentBlog.seo?.metaDescription ?? "",
      metaKeywords: currentBlog.seo?.metaKeywords ?? "",
      status: currentBlog.status,
      isHidden: currentBlog.isHidden,
    });
  }, [currentBlog, isEditMode, reset]);

  const toggleCategoryMain = useCallback((slug: string, checked: boolean) => {
    setCategoryMainSlugs((previous) =>
      checked
        ? previous.includes(slug)
          ? previous
          : [...previous, slug]
        : previous.filter((item) => item !== slug),
    );
  }, []);

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOgImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setOgImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setOgImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  const removeOgImage = () => {
    setOgImageFile(null);
    setOgImagePreview("");
  };

  const blogData = getValues("blogData");

  const onSubmit = async (formData: FormValues) => {
    try {
      if (!formData.title?.trim()) {
        alert("Tiêu đề không được để trống.");
        return;
      }
      if (!formData.excerpt?.trim()) {
        alert("Mô tả ngắn không được để trống.");
        return;
      }
      const currentBlogData = getValues("blogData") ?? "";
      console.log("[BlogForm] submit current blogData", {
        length: currentBlogData.length,
        preview: currentBlogData.slice(0, 200),
      });

      if (isEmptyEditorHtml(currentBlogData)) {
        alert("Nội dung bài viết không được để trống.");
        return;
      }

      // Upload images to server
      let thumbnailUrl = displayThumbnailPreview || undefined;
      let ogImageUrl = displayOgImagePreview || undefined;

      // Upload thumbnail if new file selected
      if (thumbnailFile) {
        try {
          const uploadResult = await uploadImage(thumbnailFile);
          if (uploadResult) {
            thumbnailUrl = uploadResult.url || uploadResult.imageUrl;
          } else {
            alert("Lỗi khi upload ảnh thumbnail. Vui lòng thử lại.");
            return;
          }
        } catch (error) {
          console.error("Error uploading thumbnail:", error);
          alert("Lỗi khi upload ảnh thumbnail. Vui lòng thử lại.");
          return;
        }
      }

      // Upload OG image if new file selected
      if (ogImageFile) {
        try {
          const uploadResult = await uploadImage(ogImageFile);
          if (uploadResult) {
            ogImageUrl = uploadResult.url || uploadResult.imageUrl;
          } else {
            alert("Lỗi khi upload ảnh OG. Vui lòng thử lại.");
            return;
          }
        } catch (error) {
          console.error("Error uploading OG image:", error);
          alert("Lỗi khi upload ảnh OG. Vui lòng thử lại.");
          return;
        }
      }

      // Fallback: use thumbnail as OG image if not provided
      if (!ogImageUrl && thumbnailUrl) {
        ogImageUrl = thumbnailUrl;
      }

      const metaTitleTrim = formData.metaTitle?.trim();
      const metaDescriptionTrim = formData.metaDescription?.trim();
      const metaKeywordsTrim = formData.metaKeywords?.trim();

      const seoData = {
        metaTitle: metaTitleTrim || formData.title.trim(),
        metaDescription: metaDescriptionTrim || formData.excerpt.trim(),
        metaKeywords: metaKeywordsTrim || undefined,
        ogImage: ogImageUrl,
      };

      if (isEditMode && slug) {
        const payload: UpdateBlogDto = {
          title: formData.title.trim(),
          excerpt: formData.excerpt.trim(),
          blogData: currentBlogData,
          thumbnail: thumbnailUrl,
          categoryMain: effectiveCategoryMainSlugs,
          categorySub: effectiveCategorySubSlugs,
          status: formData.status,
          isHidden: formData.isHidden,
          slug: formData.slug.trim(),
          seo: seoData,
        };
        console.log("[BlogForm] update payload.blogData", {
          length: currentBlogData.length,
          preview: currentBlogData.slice(0, 200),
        });
        const saved = await updateMutation.mutateAsync({ slug, data: payload });
        alert("Cập nhật thành công!");
        onSuccess?.(saved.slug);
        if (saved.slug !== slug) {
          router.replace(`/blog/edit/${saved.slug}`);
        }
      } else {
        const slugTrim = formData.slug.trim();
        const payload: CreateBlogDto = {
          title: formData.title.trim(),
          excerpt: formData.excerpt.trim(),
          blogData: currentBlogData,
          thumbnail: thumbnailUrl,
          categoryMain: effectiveCategoryMainSlugs.length
            ? effectiveCategoryMainSlugs
            : undefined,
          categorySub: effectiveCategorySubSlugs.length
            ? effectiveCategorySubSlugs
            : undefined,
          seo: seoData,
          ...(slugTrim ? { slug: slugTrim } : {}),
        };
        console.log("[BlogForm] create payload.blogData", {
          length: currentBlogData.length,
          preview: currentBlogData.slice(0, 200),
        });
        const saved = await createMutation.mutateAsync(payload);
        alert("Tạo bài viết thành công!");
        onSuccess?.(saved.slug);
        router.push(`/blog/edit/${saved.slug}`);
      }
    } catch (error: unknown) {
      console.error("Full error:", error);
      const typedError = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error("Error response:", typedError.response?.data);
      const errorMessage =
        typedError.response?.data?.message ||
        typedError.message ||
        "Có lỗi xảy ra";
      alert(
        `Lỗi: ${Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage}`,
      );
    }
  };

  if (isEditMode && isLoadingBlog) {
    return <p className="p-6 text-gray-600">Đang tải bài viết...</p>;
  }

  if (isEditMode && slug && !isLoadingBlog && !currentBlog) {
    return <p className="p-6 text-red-600">Không tìm thấy bài viết.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Cập nhật bài viết" : "Tạo bài viết mới"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Thông tin cơ bản
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Slug (URL)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const title = getValues("title");
                      const generated = slugifyFromTitle(title ?? "");
                      if (!generated) {
                        alert("Nhập tiêu đề trước khi sinh slug.");
                        return;
                      }
                      setValue("slug", generated, { shouldDirty: true });
                    }}
                    className="text-sm px-3 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
                  >
                    Tạo tự động
                  </button>
                </div>
                <input
                  {...register("slug")}
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm transition"
                  placeholder="vi-du-slug-bai-viet"
                  autoComplete="off"
                />
                <p className="mt-1.5 text-xs text-gray-500">
                  Để trống để tự động tạo từ tiêu đề
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả ngắn <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("excerpt", { required: true })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder="Tóm tắt ngắn gọn về bài viết"
                />
              </div>
            </div>

            {/* Images Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                Hình ảnh
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh thumbnail
                  </label>
                  <div className="space-y-3">
                    {thumbnailPreview ? (
                      <div className="relative group">
                        <Image
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                          width={300}
                          height={192}
                        />
                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                        >
                          <svg
                            className="w-4 h-4"
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
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 text-gray-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-600 mb-1">
                            Click để tải ảnh
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, GIF, WebP (tối đa 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleThumbnailChange}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* OG Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh OG (Share mạng xã hội)
                  </label>
                  <div className="space-y-3">
                    {ogImagePreview ? (
                      <div className="relative group">
                        <Image
                          src={ogImagePreview}
                          alt="OG Image preview"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeOgImage}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                        >
                          <svg
                            className="w-4 h-4"
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
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 text-gray-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-600 mb-1">
                            Click để tải ảnh
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, GIF, WebP (tối đa 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleOgImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Để trống để dùng ảnh thumbnail
                  </p>
                </div>
              </div>
            </div>

            {/* Content Editor Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                Nội dung <span className="text-red-500">*</span>
              </h3>
              <div
                key={editorRemountKey}
                className="border border-gray-300 rounded-lg overflow-hidden"
              >
                {/* <SunEditerUploadImage
                  postData={blogData ?? ""}
                  setPostData={(value) =>
                    setValue("blogData", value, { shouldDirty: true, shouldValidate: true })
                  }
                /> */}
                <SunEditor
                  blogData={blogData ?? ""}
                  setBlogData={(value) =>
                    setValue("blogData", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </div>

            {/* SEO Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                SEO Metadata
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    {...register("metaTitle")}
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Mặc định dùng tiêu đề bài viết"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Khuyến nghị 50-60 ký tự
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    {...register("metaDescription")}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Mặc định dùng mô tả ngắn"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Khuyến nghị 150-160 ký tự
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    {...register("metaKeywords")}
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Các từ khóa cách nhau bằng dấu phẩy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column (1/3) */}

          <div className="lg:col-span-1 space-y-6">
            {/* Publish Card */}

            {isEditMode && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                  Xuất bản
                </h3>
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      {...register("status")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="draft">Nháp</option>
                      <option value="pending">Chờ duyệt</option>
                      <option value="approved">Đã duyệt</option>
                      <option value="rejected">Từ chối</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isHidden")}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Ẩn bài viết</span>
                  </label>
                </div>
              </div>
            )}
            <div className="gap-3 fixed bottom-6 right-6 border-t grid grid-cols-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
              >
                {isSubmitting
                  ? "Đang xử lý..."
                  : isEditMode
                    ? "Cập nhật"
                    : "Tạo mới"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/blog")}
                className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition"
              >
                Hủy
              </button>
            </div>

            {/* Categories Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                Danh mục
              </h3>

              {isLoadingBlogCategories ? (
                <p className="text-sm text-gray-500 py-4">
                  Đang tải danh mục...
                </p>
              ) : (
                <div className="space-y-4">
                  <CategoryBlogTree
                    label="Danh mục chính"
                    description="Chủ đề chính của bài viết"
                    categories={blogCategories}
                    selectedSlugs={effectiveCategoryMainSlugs}
                    onToggle={toggleCategoryMain}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
