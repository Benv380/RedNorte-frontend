import medicoApi from './medicoApi';
import pacienteApi from './pacienteApi';

export const medicoService = {
  getAll: async () => {
    const res = await medicoApi.get('/v1/medicos');
    return res.data;
  },

  getById: async (id) => {
    const res = await medicoApi.get(`/v1/medicos/${id}`);
    return res.data;
  },

  getMiPerfil: async () => {
  const res = await medicoApi.get('/v1/medicos/mi-perfil');
  return res.data;
  },

  getByEspecialidad: async (especialidad) => {
    const res = await medicoApi.get(`/v1/medicos/especialidad/${especialidad}`);
    return res.data;
  },

  getByHospital: async (hospital) => {
    const res = await medicoApi.get(`/v1/medicos/hospital/${hospital}`);
    return res.data;
  },

  create: async (dto) => {
    const res = await medicoApi.post('/v1/medicos', dto);
    return res.data;
  },

  update: async (id, dto) => {
    const res = await medicoApi.put(`/v1/medicos/${id}`, dto);
    return res.data;
  },

  buscarPaciente: async (q) => {
    const res = await pacienteApi.get('/v1/pacientes/buscar', { params: { q } });
    return res.data;
  },
};
