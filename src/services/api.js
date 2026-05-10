import axios from 'axios';

const makeInstance = (baseURL) => {
  const instance = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export const pacienteApi = makeInstance(import.meta.env.VITE_PACIENTE_API_URL);
export const medicoApi   = makeInstance(import.meta.env.VITE_MEDICO_API_URL);
export const listaApi    = makeInstance(import.meta.env.VITE_LISTA_API_URL);

export default listaApi;
