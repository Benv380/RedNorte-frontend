import api from './api';

export const citaService = {

  getAll: async () => {
    const response = await api.get('/citas/estado/PROGRAMADA');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/citas/${id}`);
    return response.data;
  },

  getByEstado: async (estado) => {
    const response = await api.get(`/citas/estado/${estado}`);
    return response.data;
  },

  getReasignacion: async () => {
    const response = await api.get('/citas/reasignacion');
    return response.data;
  },

  create: async (citaData) => {
    const response = await api.post('/citas', citaData);
    return response.data;
  },

  confirmar: async (id) => {
    const response = await api.put(`/citas/${id}/confirmar`);
    return response.data;
  },

  realizar: async (id) => {
    const response = await api.put(`/citas/${id}/realizar`);
    return response.data;
  },

  cancelar: async (id, motivo) => {
    const response = await api.put(`/citas/${id}/cancelar`, null, { params: { motivo } });
    return response.data;
  },

  noAsistio: async (id) => {
    const response = await api.put(`/citas/${id}/no-asistio`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/citas/${id}`);
    return response.data;
  },
};