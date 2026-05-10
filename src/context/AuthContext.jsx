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
      localStorage.removeItem('user');
      return null;
    }
  });

  const login = async (email, password, tipo = 'PACIENTE') => {
    const result = tipo === 'PACIENTE'
      ? await authService.loginPaciente(email, password)
      : await authService.loginMedico(email, password);

    const userData = { token: result.token, rol: result.rol, nombre: result.nombre, email: result.email, id: result.id };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return result;
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
