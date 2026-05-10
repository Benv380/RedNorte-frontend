<<<<<<< HEAD
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

=======
import api from './api';

export const listaEsperaService = {

  // Obtener todas las solicitudes de un paciente específico
  // GET /api/v1/lista-espera/paciente/{pacienteId}
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
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

<<<<<<< HEAD
=======
  // Filtrar solicitudes por estado: PENDIENTE, ASIGNADO, CANCELADO, ATENDIDO
  // GET /api/v1/lista-espera/estado/{estado}
  getByEstado: async (estado) => {
    const response = await api.get(`/lista-espera/estado/${estado}`);
    return response.data;
  },

  // Obtener solicitudes PENDIENTES ordenadas por prioridad (solo FUNCIONARIO/MEDICO/ADMIN)
  // GET /api/v1/lista-espera/pendientes
  getPendientes: async () => {
    const response = await api.get('/lista-espera/pendientes');
    return response.data;
  },

  // Obtener una solicitud específica por su ID
  // GET /api/v1/lista-espera/{id}
  getById: async (id) => {
    const response = await api.get(`/lista-espera/${id}`);
    return response.data;
  },

  // Registrar una nueva solicitud en lista de espera (PACIENTE o FUNCIONARIO)
  // POST /api/v1/lista-espera
  create: async (solicitudData) => {
    const response = await api.post('/lista-espera', solicitudData);
    return response.data;
  },

  // Cancelar una solicitud → cambia estado a CANCELADO
  // PUT /api/v1/lista-espera/{id}/cancelar
  cancelar: async (id) => {
    const response = await api.put(`/lista-espera/${id}/cancelar`);
    return response.data;
  },

  // Asignar una hora médica → cambia estado PENDIENTE a ASIGNADO (FUNCIONARIO/ADMIN)
  // PUT /api/v1/lista-espera/{id}/asignar
  asignar: async (id) => {
    const response = await api.put(`/lista-espera/${id}/asignar`);
    return response.data;
  },

  // Marcar solicitud como atendida → cambia estado ASIGNADO a ATENDIDO
  // PUT /api/v1/lista-espera/{id}/atender
  atender: async (id) => {
    const response = await api.put(`/lista-espera/${id}/atender`);
    return response.data;
  },

  // Eliminar una solicitud (solo ADMIN_HOSPITAL o ADMIN_SOFTWARE)
  // DELETE /api/v1/lista-espera/{id}
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
  delete: async (id) => {
    const res = await listaEsperaApi.delete(`/v1/lista-espera/${id}`);
    return res.data;
  },
};
