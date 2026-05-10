<<<<<<< HEAD
import listaEsperaApi from './listaEsperaApi';
=======
import api from './api';
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1

export const citaService = {

  getAll: async () => {
<<<<<<< HEAD
    const res = await listaEsperaApi.get('/v1/citas/estado/PROGRAMADA');
    return res.data;
=======
    const response = await api.get('/citas/estado/PROGRAMADA');
    return response.data;
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
  },

  getById: async (id) => {
    const res = await listaEsperaApi.get(`/v1/citas/${id}`);
    return res.data;
  },

<<<<<<< HEAD
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
=======
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
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
  },

  delete: async (id) => {
    const res = await listaEsperaApi.delete(`/v1/citas/${id}`);
    return res.data;
  },
<<<<<<< HEAD
};
=======
};
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
