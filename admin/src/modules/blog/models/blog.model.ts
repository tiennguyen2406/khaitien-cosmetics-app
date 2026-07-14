export type BlogStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export type BlogCategory = {
  main: string[];
  sub: string[];
};

export type BlogSeo = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
};

export type Blog = {
  _id: string;
  userId: string;
  slug: string;
  title: string;
  excerpt: string;
  blogData: string;
  thumbnail?: string;
  category?: BlogCategory;
  seo?: BlogSeo;
  status: BlogStatus;
  isHidden: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedBlogs = {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export type CreateBlogDto = {
  title: string;
  excerpt: string;
  blogData: string;
  slug?: string;
  thumbnail?: string;
  categoryMain?: string[];
  categorySub?: string[];
  seo?: BlogSeo;
};

export type UpdateBlogDto = Partial<CreateBlogDto> & {
  isHidden?: boolean;
  status?: BlogStatus;
};
