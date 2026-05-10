import pacienteApi from './pacienteApi';
import medicoApi from './medicoApi';

export const authService = {
  loginPaciente: async (email, password) => {
    const res = await pacienteApi.post('/auth/login', { email, password });
    const { token, rol, nombre, redirectUrl, id } = res.data;
    const userData = { token, rol, nombre, email, id };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    return { ...userData, redirectUrl };
  },

  loginMedico: async (email, password) => {
    const res = await medicoApi.post('/auth/login', { email, password });
    const { token, rol, nombre, redirectUrl, id } = res.data;
    const userData = { token, rol, nombre, email, id };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    return { ...userData, redirectUrl };
  },

  registerPaciente: async (email, password, nombreCompleto, rut, fechaNacimiento) => {
    const res = await pacienteApi.post('/auth/register', { email, password, nombreCompleto, rut, fechaNacimiento });
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
