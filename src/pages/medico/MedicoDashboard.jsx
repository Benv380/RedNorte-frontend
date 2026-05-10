import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { bffService } from '../../services/bffService';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

const ESTADO_ESTILO = {
  PROGRAMADA: 'bg-amber-100 text-amber-800',
  CONFIRMADA: 'bg-blue-100 text-blue-800',
  REALIZADA:  'bg-green-100 text-green-800',
  CANCELADA:  'bg-red-100 text-red-700',
  NO_ASISTIO: 'bg-gray-100 text-gray-600',
};

export const MedicoDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(!!user?.id);
  const [realizando, setRealizando] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const resultado = await bffService.dashboardMedico(user.id);
        setData(resultado);
      } catch {
        toast.error('Error al cargar datos del panel');
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  const marcarRealizada = async (citaId) => {
    setRealizando(citaId);
    try {
      await citaService.realizar(citaId);
      toast.success('Cita marcada como realizada');
      const resultado = await bffService.dashboardMedico(user.id);
      setData(resultado);
    } catch {
      toast.error('Error al actualizar la cita');
    } finally {
      setRealizando(null);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );

  const citasHoy         = data?.citasHoy         ?? [];
  const totalPendientes  = data?.totalPendientes   ?? 0;
  const atendidosHoy     = data?.atendidosHoy      ?? 0;
  const programadasHoy   = data?.citasProgramadasHoy ?? 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Panel del Médico</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dr. {user?.nombre || user?.email}&nbsp;·&nbsp;
          {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Citas hoy</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{citasHoy.length}</p>
          <p className="text-xs text-gray-400 mt-1">agendadas</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pendientes hoy</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{programadasHoy}</p>
          <p className="text-xs text-gray-400 mt-1">por atender</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Atendidos hoy</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{atendidosHoy}</p>
          <p className="text-xs text-gray-400 mt-1">pacientes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Lista de espera</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{totalPendientes}</p>
          <p className="text-xs text-gray-400 mt-1">solicitudes totales</p>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/medico/historia')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 text-left transition-colors"
        >
          <p className="text-base font-semibold">Historia Clínica</p>
          <p className="text-sm text-blue-100 mt-1">Buscar paciente y ver su historial</p>
        </button>
        <button
          onClick={() => navigate('/medico/examenes')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-5 text-left transition-colors"
        >
          <p className="text-base font-semibold">Solicitar Examen</p>
          <p className="text-sm text-indigo-100 mt-1">Crear orden de examen para un paciente</p>
        </button>
      </div>

      {/* Agenda del día */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Agenda del día</h3>
          <span className="text-xs text-gray-400">{citasHoy.length} citas</span>
        </div>
        {citasHoy.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400">Sin citas programadas para hoy</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Paciente</th>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Especialidad</th>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Hora</th>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Box</th>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Estado</th>
                  <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {citasHoy.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">
                      {c.listaEspera?.pacienteNombre || '—'}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{c.especialidad || '—'}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">
                      {c.fechaHoraCita
                        ? new Date(c.fechaHoraCita).toLocaleTimeString('es-CL', {
                            hour: '2-digit', minute: '2-digit',
                          })
                        : '—'}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{c.boxNumero || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ESTADO_ESTILO[c.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                        {c.estado}
                      </span>
                    </td>
                    <td className="px-5 py-3 flex gap-3 items-center">
                      {(c.estado === 'PROGRAMADA' || c.estado === 'CONFIRMADA') && (
                        <button
                          onClick={() => marcarRealizada(c.id)}
                          disabled={realizando === c.id}
                          className="text-green-600 hover:text-green-800 text-xs font-medium disabled:opacity-50"
                        >
                          {realizando === c.id ? '...' : 'Atender'}
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/medico/historia?pacienteId=${c.listaEspera?.pacienteId}`)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
