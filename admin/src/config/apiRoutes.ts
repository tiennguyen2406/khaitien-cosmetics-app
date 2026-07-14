// /src/config/apiRoutes.ts
export const API_URL_CLIENT = process.env.NEXT_PUBLIC_API_URL; // Lấy từ .env.local

export const apiRoutes = {
    AUTH: {
        BASE: '/auth',
        CHECK_EMAIL: '/auth/check-email',
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        REFRESH_TOKEN: '/auth/refresh-token',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        MY_PERMISSIONS: '/auth/my-permissions',
        USERS: '/auth/users',
        UPDATE: '/auth/update',
        GOOGLE: '/auth/google',
        GOOGLE_REDIRECT: '/auth/google/redirect',
        REQUEST_PASSWORD_RESET: '/auth/request-password-reset',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD_WITH_TOKEN: '/auth/reset-password/token',
        RESET_PASSWORD_WITH_OTP: '/auth/reset-password/otp',
        CHECK_PERMISSION: '/auth/check-permission',
    },
    BLOG: {
        BASE: '/blog',
        CREATE: '/blog',
        GET_ALL: (params?: {
            page?: number;
            limit?: number;
            includeHidden?: boolean;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.includeHidden !== undefined) {
                searchParams.append('includeHidden', String(params.includeHidden));
            }
            const queryString = searchParams.toString();
            return `/blog${queryString ? `?${queryString}` : ''}`;
        },
        GET_MY: (params?: { page?: number; limit?: number }) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            const queryString = searchParams.toString();
            return `/blog/my${queryString ? `?${queryString}` : ''}`;
        },
        SEARCH: (params?: {
            q?: string;
            page?: number;
            limit?: number;
            includeHidden?: boolean;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.q !== undefined && params.q !== '') {
                searchParams.append('q', params.q);
            }
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.includeHidden !== undefined) {
                searchParams.append('includeHidden', String(params.includeHidden));
            }
            const queryString = searchParams.toString();
            return `/blog/search${queryString ? `?${queryString}` : ''}`;
        },
        SEARCH_MY: (params?: {
            q?: string;
            page?: number;
            limit?: number;
            includeHidden?: boolean;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.q !== undefined && params.q !== '') {
                searchParams.append('q', params.q);
            }
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.includeHidden !== undefined) {
                searchParams.append('includeHidden', String(params.includeHidden));
            }
            const queryString = searchParams.toString();
            return `/blog/my/search${queryString ? `?${queryString}` : ''}`;
        },
        GET_BY_STATUS: (
            status: string,
            params?: { page?: number; limit?: number; includeHidden?: boolean },
        ) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.includeHidden !== undefined) {
                searchParams.append('includeHidden', String(params.includeHidden));
            }
            const queryString = searchParams.toString();
            return `/blog/status/${encodeURIComponent(status)}${queryString ? `?${queryString}` : ''}`;
        },
        GET_BY_SLUG: (slug: string) => `/blog/${encodeURIComponent(slug)}`,
        UPDATE: (slug: string) => `/blog/${encodeURIComponent(slug)}`,
        UPDATE_VISIBILITY: (slug: string) =>
            `/blog/${encodeURIComponent(slug)}/visibility`,
        UPDATE_STATUS: (slug: string) =>
            `/blog/${encodeURIComponent(slug)}/status`,
        DELETE: (slug: string) => `/blog/${encodeURIComponent(slug)}`,
        HARD_DELETE: (slug: string) => `/blog/${encodeURIComponent(slug)}/hard`,
    },
    CATEGORIES_BLOG: {
        BASE: '/categories-blog',
        GET_ALL: (params?: { page?: number; limit?: number }) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            const queryString = searchParams.toString();
            return `/categories-blog${queryString ? `?${queryString}` : ''}`;
        },
        GET_BY_SLUG: (slug: string) =>
            `/categories-blog/${encodeURIComponent(slug)}`,
        UPDATE: (slug: string) =>
            `/categories-blog/${encodeURIComponent(slug)}`,
        DELETE: (slug: string) =>
            `/categories-blog/${encodeURIComponent(slug)}`,
        HARD_DELETE: (slug: string) =>
            `/categories-blog/${encodeURIComponent(slug)}/hard`,
    },
    IMAGES: {
        BASE: '/images',
        GET_ALL: (page: number = 1, limit: number = 40) => `/images?page=${page}&limit=${limit}`,
        UPLOAD: '/images/upload',
        UPLOAD_MULTIPLE: '/images/upload-multiple',
        DELETE: (slug: string) => `/images/${slug}`,
    },
    HISTORY: {
        BASE: '/history',
        GET_ALL: (params?: {
            page?: number;
            limit?: number;
            action?: string;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.action !== undefined && params.action !== '') {
                searchParams.append('action', params.action);
            }
            const queryString = searchParams.toString();
            return `/history${queryString ? `?${queryString}` : ''}`;
        },
    },
    CONTACTS: {
        BASE: '/contacts',
        BY_ID: (id: string) => `/contacts/${encodeURIComponent(id)}`,
    },
    BANNER: {
        BASE: '/banner',
        PUBLIC: (placement: string) =>
            `/banner/public/${encodeURIComponent(placement)}`,
        LIST: (placement?: string) =>
            placement
                ? `/banner?placement=${encodeURIComponent(placement)}`
                : '/banner',
        REORDER: (placement: string) =>
            `/banner/placement/${encodeURIComponent(placement)}/reorder`,
        UPDATE: (publicId: string) =>
            `/banner/${encodeURIComponent(publicId)}`,
        DELETE: (publicId: string) =>
            `/banner/${encodeURIComponent(publicId)}`,
    },
    SERVICE_PACKAGE: {
        BASE: '/service-packages',
        LIST: (params?: { category?: string; isActive?: boolean }) => {
            const searchParams = new URLSearchParams();
            if (params?.category) {
                searchParams.append('category', params.category);
            }
            if (params?.isActive !== undefined) {
                searchParams.append('isActive', String(params.isActive));
            }
            const queryString = searchParams.toString();
            return `/service-packages${queryString ? `?${queryString}` : ''}`;
        },
        UPDATE: (publicId: string) =>
            `/service-packages/${encodeURIComponent(publicId)}`,
        DELETE: (publicId: string) =>
            `/service-packages/${encodeURIComponent(publicId)}`,
        REORDER: '/service-packages/reorder',
        SEED_SAMPLE: '/service-packages/seed-sample',
    },
    USERS: {
        BASE: '/users',
        LIST: (params?: {
            page?: number;
            limit?: number;
            email?: string;
            name?: string;
            isBlocked?: boolean;
            isDeleted?: boolean;
        }) => {
            const searchParams = new URLSearchParams();
            if (params?.page !== undefined) {
                searchParams.append('page', String(params.page));
            }
            if (params?.limit !== undefined) {
                searchParams.append('limit', String(params.limit));
            }
            if (params?.email) {
                searchParams.append('email', params.email);
            }
            if (params?.name) {
                searchParams.append('name', params.name);
            }
            if (params?.isBlocked !== undefined) {
                searchParams.append('isBlocked', String(params.isBlocked));
            }
            if (params?.isDeleted !== undefined) {
                searchParams.append('isDeleted', String(params.isDeleted));
            }
            const queryString = searchParams.toString();
            return `/users${queryString ? `?${queryString}` : ''}`;
        },
        UPDATE: (id: string) => `/users/${encodeURIComponent(id)}`,
        DELETE: (id: string) => `/users/${encodeURIComponent(id)}`,
    },
};

export const API_ROUTES = apiRoutes;
