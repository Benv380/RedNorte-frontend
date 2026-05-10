import api from './api';

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });

    const {id, token, rol, nombre } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ id, token, rol, nombre, email }));

    return res.data;
  },

  register: async (email, password, nombreCompleto) => {
    const res = await api.post('/auth/register', {
      email,
      password,
      nombreCompleto
    });

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

  // Login BENJA para pruebas (NO TOCAR)
  devLogin: () => {
    const fakeUser = {
      id: 1,
      name: 'Dev User',
      email: 'dev@test.com',
      role: 'admin'
    };

    const fakeToken = 'dev-token';

    localStorage.setItem('token', fakeToken);
    localStorage.setItem('user', JSON.stringify(fakeUser));

    return { token: fakeToken, user: fakeUser };
  }
};