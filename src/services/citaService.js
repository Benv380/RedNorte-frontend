import listaEsperaApi from './listaEsperaApi';

export const citaService = {

  getAll: async () => {
    const res = await listaEsperaApi.get('/v1/citas/estado/PROGRAMADA');
    return res.data;
  },

  getById: async (id) => {
    const res = await listaEsperaApi.get(`/v1/citas/${id}`);
    return res.data;
  },

  getBySolicitud: async (listaEsperaId) => {
    const res = await listaEsperaApi.get(`/v1/citas/solicitud/${listaEsperaId}`);
    return res.data;
  },

  getByEstado: async (estado) => {
    const res = await listaEsperaApi.get(`/v1/citas/estado/${estado}`);
    return res.data;
  },

  getByPaciente: async (pacienteId) => {
    const res = await listaEsperaApi.get(`/v1/citas/paciente/${pacienteId}`);
    return res.data;
  },

  getByMedico: async (medicoId) => {
    const res = await listaEsperaApi.get(`/v1/citas/medico/${medicoId}`);
    return res.data;
  },

  getReasignacion: async () => {
    const res = await listaEsperaApi.get('/v1/citas/reasignacion');
    return res.data;
  },

  create: async (citaData) => {
    const res = await listaEsperaApi.post('/v1/citas', citaData);
    return res.data;
  },

  confirmar: async (id) => {
    const res = await listaEsperaApi.put(`/v1/citas/${id}/confirmar`);
    return res.data;
  },

  realizar: async (id) => {
    const res = await listaEsperaApi.put(`/v1/citas/${id}/realizar`);
    return res.data;
  },

  cancelar: async (id, motivo = 'Sin motivo especificado') => {
    const res = await listaEsperaApi.put(`/v1/citas/${id}/cancelar`, null, { params: { motivo } });
    return res.data;
  },

  marcarNoAsistio: async (id) => {
    const res = await listaEsperaApi.put(`/v1/citas/${id}/no-asistio`);
    return res.data;
  },

  delete: async (id) => {
    const res = await listaEsperaApi.delete(`/v1/citas/${id}`);
    return res.data;
  },
};
