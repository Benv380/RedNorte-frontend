import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { bffService } from '../../services/bffService';
import { AlertaReasignacion } from '../../components/pacientes/AlertaReasignacion';
import { toast } from 'sonner';

const ESTADO_ESTILO = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  ASIGNADO:  'bg-blue-100 text-blue-800',
  ATENDIDO:  'bg-green-100 text-green-800',
  CANCELADO: 'bg-gray-100 text-gray-500',
};

export const PacienteDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
<<<<<<< HEAD
    if (!user?.id) return;
    try {
      const resultado = await bffService.dashboardPaciente(user.id);
      setData(resultado);
    } catch {
      toast.error('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };
=======
  try {
    if (!user?.id) return; // <-- no llamar si no hay id

    const [solicitudesData, citasData] = await Promise.all([
      listaEsperaService.getByPaciente(user.id),
      citaService.getAll(),
    ]);
    setSolicitudes(solicitudesData);
    setCitas(citasData);
    setOfertasPendientes([]); // reasignación no disponible para PACIENTE
  } catch {
    toast.error('Error al cargar datos');
  } finally {
    setLoading(false);
  }
};
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1

  useEffect(() => { cargarDatos(); }, [user?.id]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );

  const solicitudes   = data?.solicitudes   ?? [];
  const citas         = data?.citas         ?? [];
  const activas       = data?.solicitudesActivas ?? 0;
  const proximaCita   = data?.proximaCita   ?? null;
  const realizadas    = citas.filter(c => c.estado === 'REALIZADA').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bienvenido, {user?.nombre || user?.email}
      </h1>

      {/* Alertas de reasignación (si las hubiera) */}
      {citas
        .filter(c => c.estado === 'CANCELADA')
        .map(oferta => (
          <AlertaReasignacion
            key={oferta.id}
            oferta={oferta}
            onRespuesta={cargarDatos}
          />
        ))}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">En lista de espera</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{activas}</p>
          <p className="text-xs text-gray-400 mt-1">solicitudes activas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Próxima cita</p>
          {proximaCita ? (
            <>
              <p className="text-lg font-bold text-blue-600 mt-1">
                {new Date(proximaCita.fechaHoraCita).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {proximaCita.especialidad} · {proximaCita.nombreMedico}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400 mt-2">Sin citas próximas</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Citas realizadas</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{realizadas}</p>
          <p className="text-xs text-gray-400 mt-1">historial total</p>
        </div>
      </div>

      {/* Banner próxima cita */}
      {proximaCita && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-xs font-medium text-blue-600 mb-1">Próxima cita confirmada</p>
          <p className="text-sm font-semibold text-blue-900">
            {proximaCita.especialidad} — {proximaCita.nombreMedico}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            {new Date(proximaCita.fechaHoraCita).toLocaleDateString('es-CL', {
              weekday: 'long', day: 'numeric', month: 'long',
            })}
            {' · '}
            {new Date(proximaCita.fechaHoraCita).toLocaleTimeString('es-CL', {
              hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
      )}

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => navigate('/paciente/nueva-solicitud')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-5 text-left transition-colors"
        >
          <p className="text-base font-semibold">Nueva solicitud</p>
          <p className="text-sm text-blue-100 mt-1">Ingresar a lista de espera</p>
        </button>
        <button
          onClick={() => navigate('/paciente/solicitudes')}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl p-5 text-left transition-colors"
        >
          <p className="text-base font-semibold">Mis solicitudes</p>
          <p className="text-sm text-gray-500 mt-1">Ver estado y posición en cola</p>
        </button>
      </div>

      {/* Solicitudes recientes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Solicitudes recientes</h3>
          <span className="text-xs text-gray-400">{solicitudes.length} total</span>
        </div>
        {solicitudes.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-8">Sin solicitudes registradas</p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Especialidad</th>
                <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Estado</th>
                <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Posición</th>
                <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">T. estimado</th>
                <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {solicitudes.slice(0, 5).map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-sm text-gray-800">{s.especialidad}</td>
                  <td className="px-5 py-3">
<<<<<<< HEAD
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ESTADO_ESTILO[s.estado] ?? 'bg-gray-100 text-gray-500'}`}>
                      {s.estado}
                    </span>
=======
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.estado === 'PENDIENTE' ? 'bg-amber-100 text-amber-800' :
                      s.estado === 'ASIGNADO' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>{s.estado}</span>
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {s.posicion ? `#${s.posicion}` : '—'}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">
                    {s.tiempoEstimadoMinutos != null ? `~${s.tiempoEstimadoMinutos} min` : '—'}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-400">
                    {s.fechaSolicitud
                      ? new Date(s.fechaSolicitud).toLocaleDateString('es-CL')
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
