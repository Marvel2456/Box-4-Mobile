import { apiClient } from '@/api/client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'user';
}

export const UserService = {
  /**
   * Example endpoint to fetch a specific user's profile
   */
  getUserById: async (userId: string): Promise<UserProfile> => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Example endpoint to update a user's profile
   */
  updateProfile: async (userId: string, data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.patch(`/users/${userId}`, data);
    return response.data;
  },
};
