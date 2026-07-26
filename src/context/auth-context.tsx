import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '@/api/client';

type Role = 'agent' | 'user';

type User = {
  role: Role;
  // Add other user fields as needed from your API response
};

type AuthContextType = {
  user: User | null;
  login: (role: Role) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Example logic to restore session
  useEffect(() => {
    const loadSession = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          // Verify token or fetch user profile from API
          // const response = await apiClient.get('/auth/me');
          // setUser(response.data);
          
          // Fallback simple state restoration for now
          setUser({ role: 'user' }); 
        }
      } catch (error) {
        console.error('Failed to restore session', error);
      }
    };
    loadSession();
  }, []);

  const login = async (role: Role) => {
    setIsLoading(true);
    try {
      // Example real API call
      // const response = await apiClient.post('/auth/login', { role /* ...credentials */ });
      // const token = response.data.token;
      
      // Simulate real token handling
      const token = 'simulated-jwt-token-replace-with-real-token';
      await SecureStore.setItemAsync('userToken', token);
      
      setUser({ role });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // await apiClient.post('/auth/logout');
      await SecureStore.deleteItemAsync('userToken');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
