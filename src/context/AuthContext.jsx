/* eslint react-refresh/only-export-components: off */
import { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem('user'); // limpia si estaba corrupto
      return null;
    }
  });

  const login = async (email, password) => {
    const { id, token, rol, nombre, redirectUrl } = await authService.login(email, password); // 👈 agrega id

    const userData = { id, token, rol, nombre, email };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    return redirectUrl;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};