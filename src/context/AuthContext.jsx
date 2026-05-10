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

<<<<<<< HEAD
  const login = async (email, password, tipo = 'PACIENTE') => {
    const result = tipo === 'PACIENTE'
      ? await authService.loginPaciente(email, password)
      : await authService.loginMedico(email, password);

    const userData = { token: result.token, rol: result.rol, nombre: result.nombre, email: result.email, id: result.id };
=======
  const login = async (email, password) => {
    const { id, token, rol, nombre, redirectUrl } = await authService.login(email, password); // 👈 agrega id

    const userData = { id, token, rol, nombre, email };
    localStorage.setItem('token', token);
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
<<<<<<< HEAD
    return result;
=======
    return redirectUrl;
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
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
