// src/hooks/useAuth.js (Modificación temporal)
export const useAuth = () => {
  return {
    user: { name: "Admin Test", role: "ADMIN" },
    loading: false,
    isAuthenticated: true, // Forzamos la entrada
    login: () => {},
    logout: () => {}
  };
};