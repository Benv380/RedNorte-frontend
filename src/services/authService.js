import api from './api';

export const authService = {
    login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        
        // Guardamos solo lo necesario para el estado persistente
        const { token, rol, nombre } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ token, rol, nombre, email }));

        return res.data; // Aquí va el redirectUrl que usará el componente
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
    }
};