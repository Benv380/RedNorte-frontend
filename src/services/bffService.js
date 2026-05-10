import listaEsperaApi from './listaEsperaApi';

/**
 * BFF service — one call per dashboard view,
 * aggregated by lista-espera-service BFF controller.
 */
export const bffService = {
  dashboardPaciente: async (pacienteId) => {
    const res = await listaEsperaApi.get(`/v1/bff/paciente/${pacienteId}`);
    return res.data;
  },

  dashboardMedico: async (medicoId) => {
    const res = await listaEsperaApi.get(`/v1/bff/medico/${medicoId}`);
    return res.data;
  },
};
