import pacienteApi from './pacienteApi';
import medicoApi from './medicoApi';

export const authService = {
<<<<<<< HEAD
  loginPaciente: async (email, password) => {
    const res = await pacienteApi.post('/auth/login', { email, password });
    const { token, rol, nombre, redirectUrl, id } = res.data;
    const userData = { token, rol, nombre, email, id };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    return { ...userData, redirectUrl };
=======
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    const {id, token, rol, nombre } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id, token, rol, nombre, email }));

    return res.data;
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
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
