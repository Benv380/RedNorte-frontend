import pacienteApi from './pacienteApi';

export const pacienteService = {

  getAll: async () => {
    const res = await pacienteApi.get('/v1/pacientes');
    return res.data;
  },

  getById: async (id) => {
    const res = await pacienteApi.get(`/v1/pacientes/${id}`);
    return res.data;
  },

  getByUsuarioId: async (usuarioId) => {
    const res = await pacienteApi.get(`/v1/pacientes/usuario/${usuarioId}`);
    return res.data;
  },

  search: async (q) => {
    const res = await pacienteApi.get('/v1/pacientes/buscar', { params: { q } });
    return res.data;
  },

  create: async (data) => {
    const res = await pacienteApi.post('/v1/pacientes', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await pacienteApi.put(`/v1/pacientes/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await pacienteApi.delete(`/v1/pacientes/${id}`);
    return res.data;
  },
};
