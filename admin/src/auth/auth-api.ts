import axios from 'axios';

import { API_URL_CLIENT } from '@/config/apiRoutes';

type BackendErrorPayload = {
  errors?: Record<string, string>;
  error?: string;
  message?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  fullName: string;
};

export type ResetPasswordPayload = {
  hash: string;
  password: string;
};

export type ConfirmEmailPayload = {
  hash: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: {
    id: string | number;
    email: string;
    fullName?: string | null;
  };
};

const authClient = axios.create({
  baseURL: API_URL_CLIENT,
  timeout: 10000,
  withCredentials: true, // Enable cookies for authentication
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as BackendErrorPayload | undefined;
    const backendErrors = payload?.errors;

    if (backendErrors?.email === 'notFound') {
      return 'Email chưa được đăng ký.';
    }

    if (backendErrors?.email === 'inactive') {
      return 'Tài khoản chưa kích hoạt. Vui lòng xác nhận email trước khi đăng nhập.';
    }

    if (backendErrors?.password === 'incorrectPassword') {
      return 'Mật khẩu không chính xác.';
    }

    if (backendErrors?.email === 'emailNotExists') {
      return 'Email không tồn tại trong hệ thống.';
    }

    if (backendErrors?.email?.startsWith('needLoginViaProvider:')) {
      return 'Tài khoản này cần đăng nhập bằng nhà cung cấp khác.';
    }

    if (backendErrors?.hash === 'notFound') {
      return 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.';
    }

    if (typeof payload?.message === 'string' && payload.message.length > 0) {
      return payload.message;
    }

    if (typeof payload?.error === 'string' && payload.error.length > 0) {
      return payload.error;
    }
  }

  return fallbackMessage;
};

export const authApi = {
  async checkEmail(email: string): Promise<boolean> {
    const response = await authClient.get<{ isValid: boolean }>(
      `/auth/check-email?email=${encodeURIComponent(email)}`,
    );
    return Boolean(response.data?.isValid);
  },

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await authClient.post<LoginResponse>('/auth/login', payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<void> {
    await authClient.post('/auth/register', payload);
  },

  async forgotPassword(email: string): Promise<void> {
    await authClient.post('/auth/forgot-password', { email });
  },

  async confirmEmail(payload: ConfirmEmailPayload): Promise<void> {
    await authClient.post('/auth/confirm-email', payload);
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<void> {
    await authClient.post('/auth/reset-password', payload);
  },
};

export const getAuthErrorMessage = getErrorMessage;
