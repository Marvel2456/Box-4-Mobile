import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  // Add other global state here
  // e.g., notifications, cached data that doesn't belong to a specific context
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
}));
