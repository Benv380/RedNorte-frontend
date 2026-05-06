/* eslint react-refresh/only-export-components: off */

import { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1) Inicializar desde localStorage (sin useEffect)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // 2) Login: llama al backend, guarda en localStorage y en state
  const login = async (email, password) => {
    const { token, rol, nombre, redirectUrl } = await authService.login(email, password);

    const userData = { token, rol, nombre, email };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    return redirectUrl; // para que LoginPage navegue según lo que definas
  };

  // 3) Logout
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