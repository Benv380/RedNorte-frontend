import api from './api';

export const listaEsperaService = {

  // Obtener todas las solicitudes de un paciente específico
  // GET /api/v1/lista-espera/paciente/{pacienteId}
  getByPaciente: async (pacienteId) => {
    const response = await api.get(`/lista-espera/paciente/${pacienteId}`);
    return response.data;
  },

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
  delete: async (id) => {
    const response = await api.delete(`/lista-espera/${id}`);
    return response.data;
  },

};