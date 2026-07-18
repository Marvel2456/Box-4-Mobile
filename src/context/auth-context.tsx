import React, { createContext, useContext, useState } from 'react';

type Role = 'agent' | 'user';

type User = {
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
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

  const login = (role: Role) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({ role });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
