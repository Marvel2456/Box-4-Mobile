import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

export interface AuthState {
  access: string | null;
  refresh: string | null;
  role: string | null;
  id: string | null;
  email: string | null;
  full_name: string | null;
  is_email_verified: boolean | null;
  setAuth: (data: Partial<AuthState>) => void;
  clearAuth: () => void;
}

// Custom storage for zustand using expo-secure-store
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      role: null,
      id: null,
      email: null,
      full_name: null,
      is_email_verified: null,
      setAuth: (data) => set((state) => ({ ...state, ...data })),
      clearAuth: () => set({
        access: null,
        refresh: null,
        role: null,
        id: null,
        email: null,
        full_name: null,
        is_email_verified: null,
      }),
    }),
    {
      name: 'auth-storage', // unique name
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
