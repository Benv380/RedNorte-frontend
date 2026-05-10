import { useState } from 'react';
import { medicoService } from '../../services/medicoService';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

const ESTADO_ESTILO = {
  PROGRAMADA: 'bg-amber-100 text-amber-800',
  CONFIRMADA: 'bg-blue-100 text-blue-800',
  REALIZADA:  'bg-green-100 text-green-800',
  CANCELADA:  'bg-red-100 text-red-700',
  NO_ASISTIO: 'bg-gray-100 text-gray-600',
};

export const Examenes = () => {
  const [query, setQuery]           = useState('');
  const [buscando, setBuscando]     = useState(false);
  const [resultados, setResultados] = useState([]);
  const [paciente, setPaciente]     = useState(null);
  const [citas, setCitas]           = useState([]);
  const [cargando, setCargando]     = useState(false);
  const [accionando, setAccionando] = useState(null);

  const buscar = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setBuscando(true);
    setResultados([]);
    setPaciente(null);
    try {
      const lista = await medicoService.buscarPaciente(query.trim());
      setResultados(Array.isArray(lista) ? lista : lista ? [lista] : []);
      if (!lista || (Array.isArray(lista) && lista.length === 0)) {
        toast.error('No se encontraron pacientes');
      }
    } catch {
      toast.error('Error en la búsqueda');
    } finally {
      setBuscando(false);
    }
  };

  const seleccionarPaciente = async (p) => {
    setPaciente(p);
    setResultados([]);
    setCargando(true);
    try {
      const data = await citaService.getByPaciente(p.id);
      setCitas(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Error al cargar citas del paciente');
    } finally {
      setCargando(false);
    }
  };

  const confirmar = async (citaId) => {
    setAccionando(citaId);
    try {
      const updated = await citaService.confirmar(citaId);
      setCitas(prev => prev.map(c => c.id === citaId ? updated : c));
      toast.success('Cita confirmada');
    } catch {
      toast.error('Error al confirmar la cita');
    } finally {
      setAccionando(null);
    }
  };

  const realizar = async (citaId) => {
    setAccionando(citaId);
    try {
      const updated = await citaService.realizar(citaId);
      setCitas(prev => prev.map(c => c.id === citaId ? updated : c));
      toast.success('Cita marcada como realizada');
    } catch {
      toast.error('Error al marcar la cita');
    } finally {
      setAccionando(null);
    }
  };

  const noAsistio = async (citaId) => {
    setAccionando(citaId);
    try {
      const updated = await citaService.marcarNoAsistio(citaId);
      setCitas(prev => prev.map(c => c.id === citaId ? updated : c));
      toast.success('Marcado como no asistió');
    } catch {
      toast.error('Error al actualizar la cita');
    } finally {
      setAccionando(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Citas</h1>
      <p className="text-sm text-gray-500 mb-6">Busca un paciente para ver y gestionar sus citas</p>

      {/* Buscador */}
      <form onSubmit={buscar} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar paciente por RUT o correo electrónico"
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={buscando || !query.trim()}
          className="px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* Resultados de búsqueda */}
      {resultados.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <p className="text-xs text-gray-500">{resultados.length} paciente(s) — selecciona uno</p>
          </div>
          <div className="divide-y divide-gray-100">
            {resultados.map(p => (
              <button
                key={p.id}
                onClick={() => seleccionarPaciente(p)}
                className="w-full px-5 py-3 flex items-center gap-4 hover:bg-blue-50 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-blue-600">{(p.nombre || '?').charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{p.nombre} {p.apellido}</p>
                  <p className="text-xs text-gray-400">{p.rut && `RUT: ${p.rut} · `}{p.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Citas del paciente seleccionado */}
      {paciente && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-blue-600">{(paciente.nombre || '?').charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{paciente.nombre} {paciente.apellido}</p>
                <p className="text-xs text-gray-400">{paciente.rut && `RUT: ${paciente.rut}`}</p>
              </div>
            </div>
            <button
              onClick={() => { setPaciente(null); setCitas([]); }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cambiar paciente
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Citas del paciente</h3>
              <span className="text-xs text-gray-400">{citas.length} citas</span>
            </div>

            {cargando ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : citas.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-10">Sin citas registradas</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Especialidad</th>
                      <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Médico</th>
                      <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Fecha</th>
                      <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Estado</th>
                      <th className="text-left px-5 py-2 text-xs font-medium text-gray-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {citas.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 text-sm text-gray-800">{c.especialidad}</td>
                        <td className="px-5 py-3 text-sm text-gray-600">{c.nombreMedico}</td>
                        <td className="px-5 py-3 text-sm text-gray-600">
                          {c.fechaHoraCita
                            ? new Date(c.fechaHoraCita).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' }) +
                              ' ' + new Date(c.fechaHoraCita).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
                            : '—'}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ESTADO_ESTILO[c.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                            {c.estado}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2 flex-wrap">
                            {c.estado === 'PROGRAMADA' && (
                              <button
                                onClick={() => confirmar(c.id)}
                                disabled={accionando === c.id}
                                className="text-xs font-medium text-blue-600 hover:text-blue-800 disabled:opacity-50"
                              >
                                Confirmar
                              </button>
                            )}
                            {(c.estado === 'PROGRAMADA' || c.estado === 'CONFIRMADA') && (
                              <>
                                <button
                                  onClick={() => realizar(c.id)}
                                  disabled={accionando === c.id}
                                  className="text-xs font-medium text-green-600 hover:text-green-800 disabled:opacity-50"
                                >
                                  Realizada
                                </button>
                                <button
                                  onClick={() => noAsistio(c.id)}
                                  disabled={accionando === c.id}
                                  className="text-xs font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                >
                                  No asistió
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {!paciente && resultados.length === 0 && !buscando && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">Busca un paciente por RUT o correo para gestionar sus citas</p>
        </div>
      )}
    </div>
  );
};
