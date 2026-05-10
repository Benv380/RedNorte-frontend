import axios from 'axios';
import { MEDICO_API_URL } from '../config/apiConfig';

const medicoApi = axios.create({
  baseURL: MEDICO_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

medicoApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

medicoApi.interceptors.response.use(
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

export default medicoApi;
