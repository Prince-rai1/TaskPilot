import api from './axiosInstance';
import type { AuthResponse, LoginPayload, MeResponse, RegisterPayload } from '../types/auth.types';

export const authApi = {
  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },

  login: async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await api.post('/auth/logout');
      return res.data;
    } catch {
      return { success: true, message: 'Logged out' };
    }
  },
};
