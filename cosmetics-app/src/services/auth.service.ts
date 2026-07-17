import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenExpires: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<void> => {
    await api.post('/auth/register', data);
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  checkEmail: async (email: string): Promise<{ isValid: boolean }> => {
    const response = await api.get('/auth/check-email', { params: { email } });
    return response.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (hash: string, password: string): Promise<void> => {
    await api.post('/auth/reset-password', { hash, password });
  },

  getStatus: async (): Promise<any> => {
    const response = await api.get('/auth/status');
    return response.data;
  },
};
