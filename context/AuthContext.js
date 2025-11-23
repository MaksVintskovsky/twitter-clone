'use client';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверяем токен в cookie при старте
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me"); // API для проверки токена
        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

    const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook для использования контекста
export const useAuth = () => useContext(AuthContext);
