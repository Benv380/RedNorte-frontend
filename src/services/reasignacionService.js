import listaEsperaApi from './listaEsperaApi';

export const reasignacionService = {
  getPendientes: async () => {
    try {
      const res = await listaEsperaApi.get('/v1/citas/reasignacion');
      return Array.isArray(res.data) ? res.data : [];
    } catch {
      return [];
    }
  },
  responder: async (id, acepta) => {
    const res = await listaEsperaApi.put(`/v1/citas/${id}/confirmar`);
    return res.data;
  },
};