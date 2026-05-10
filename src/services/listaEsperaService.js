import listaEsperaApi from './listaEsperaApi';

export const listaEsperaService = {

  getAll: async () => {
    const res = await listaEsperaApi.get('/v1/lista-espera/pendientes');
    return res.data;
  },

  getById: async (id) => {
    const res = await listaEsperaApi.get(`/v1/lista-espera/${id}`);
    return res.data;
  },

  getByEstado: async (estado) => {
    const res = await listaEsperaApi.get(`/v1/lista-espera/estado/${estado}`);
    return res.data;
  },

  getByPaciente: async (pacienteId) => {
    const res = await listaEsperaApi.get(`/v1/lista-espera/paciente/${pacienteId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await listaEsperaApi.post('/v1/lista-espera', data);
    return res.data;
  },

  asignar: async (id) => {
    const res = await listaEsperaApi.put(`/v1/lista-espera/${id}/asignar`);
    return res.data;
  },

  atender: async (id) => {
    const res = await listaEsperaApi.put(`/v1/lista-espera/${id}/atender`);
    return res.data;
  },

  cancelar: async (id) => {
    const res = await listaEsperaApi.put(`/v1/lista-espera/${id}/cancelar`);
    return res.data;
  },

  delete: async (id) => {
    const res = await listaEsperaApi.delete(`/v1/lista-espera/${id}`);
    return res.data;
  },
};
