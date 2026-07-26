import { apiClient } from '@/api/client';

export interface LoginCredentials {
  role: 'agent' | 'user';
  // email: string;
  // password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    role: 'agent' | 'user';
  };
}

export const AuthService = {
  /**
   * Example login endpoint
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Example logout endpoint
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  /**
   * Example endpoint to fetch the current user's profile
   */
  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
