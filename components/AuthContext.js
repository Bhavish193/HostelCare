"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(data => setUser(data.user || null)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  return useContext(AuthContext);
}
