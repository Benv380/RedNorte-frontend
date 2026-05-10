import axios from 'axios';
import { LISTA_API_URL } from '../config/apiConfig';

const listaEsperaApi = axios.create({
  baseURL: LISTA_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

listaEsperaApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

listaEsperaApi.interceptors.response.use(
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

export default listaEsperaApi;
