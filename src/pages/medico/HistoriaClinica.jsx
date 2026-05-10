import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { medicoService } from '../../services/medicoService';
import { listaEsperaService } from '../../services/listaEsperaService';
import { citaService } from '../../services/citaService';
import { pacienteService } from '../../services/pacienteService';
import { toast } from 'sonner';

const ESTADO_CITA = {
  PROGRAMADA: 'bg-amber-100 text-amber-800',
  CONFIRMADA: 'bg-blue-100 text-blue-800',
  REALIZADA:  'bg-green-100 text-green-800',
  CANCELADA:  'bg-red-100 text-red-700',
  NO_ASISTIO: 'bg-gray-100 text-gray-600',
};

const ESTADO_SOL = {
  PENDIENTE: 'bg-amber-100 text-amber-800',
  ASIGNADO:  'bg-blue-100 text-blue-800',
  ATENDIDO:  'bg-green-100 text-green-800',
  CANCELADO: 'bg-gray-100 text-gray-500',
};

export const HistoriaClinica = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery]             = useState('');
  const [buscando, setBuscando]       = useState(false);
  const [resultados, setResultados]   = useState([]);
  const [paciente, setPaciente]       = useState(null);
  const [citas, setCitas]             = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const pidInicial = searchParams.get('pacienteId');
  const [cargando, setCargando] = useState(!!(pidInicial && pidInicial !== 'undefined'));

  // Auto-carga si el dashboard envió ?pacienteId=X (X = usuarioId)
  useEffect(() => {
    const pid = searchParams.get('pacienteId');
    if (!pid || pid === 'undefined' || pid === '') return;
    (async () => {
      try {
        const p = await pacienteService.getByUsuarioId(pid);
        setPaciente(p);
        // pid es el usuarioId — mismo valor guardado en lista_espera.paciente_id
        const [c, s] = await Promise.all([
          citaService.getByPaciente(pid),
          listaEsperaService.getByPaciente(pid),
        ]);
        setCitas(Array.isArray(c) ? c : []);
        setSolicitudes(Array.isArray(s) ? s : []);
      } catch {
        toast.error('Error al cargar el historial del paciente');
      } finally {
        setCargando(false);
      }
    })();
  }, [searchParams]);

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
      // usuarioId es el ID que lista-espera y citas usan como pacienteId
      const pacienteId = p.usuarioId ?? p.id;
      const [c, s] = await Promise.all([
        citaService.getByPaciente(pacienteId),
        listaEsperaService.getByPaciente(pacienteId),
      ]);
      setCitas(Array.isArray(c) ? c : []);
      setSolicitudes(Array.isArray(s) ? s : []);
    } catch {
      toast.error('Error al cargar historial del paciente');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Historia Clínica</h1>

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

      {/* Lista de resultados de búsqueda */}
      {resultados.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <p className="text-xs text-gray-500">{resultados.length} paciente(s) encontrado(s) — selecciona uno</p>
          </div>
          <div className="divide-y divide-gray-100">
            {resultados.map(p => (
              <button
                key={p.id}
                onClick={() => seleccionarPaciente(p)}
                className="w-full px-5 py-3 flex items-center gap-4 hover:bg-blue-50 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-blue-600">
                    {(p.nombre || '?').charAt(0).toUpperCase()}
                  </span>
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

      {/* Ficha del paciente seleccionado */}
      {paciente && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-blue-600">
                  {(paciente.nombre || '?').charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{paciente.nombre} {paciente.apellido}</p>
                <div className="flex gap-3 mt-0.5 text-xs text-gray-500">
                  {paciente.rut && <span>RUT: {paciente.rut}</span>}
                  {paciente.email && <span>{paciente.email}</span>}
                  {paciente.telefono && <span>{paciente.telefono}</span>}
                  {paciente.fechaNacimiento && <span>Nac: {paciente.fechaNacimiento}</span>}
                </div>
              </div>
            </div>
            <button
              onClick={() => { setPaciente(null); setCitas([]); setSolicitudes([]); }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Cambiar
            </button>
          </div>

          {cargando ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Citas */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Citas médicas ({citas.length})</h3>
                </div>
                {citas.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 py-8">Sin citas registradas</p>
                ) : (
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {citas.map(c => (
                      <div key={c.id} className="px-5 py-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{c.especialidad}</p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Dr. {c.nombreMedico} · {c.hospital}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {c.fechaHoraCita
                                ? new Date(c.fechaHoraCita).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
                                : '—'}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ESTADO_CITA[c.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                            {c.estado}
                          </span>
                        </div>
                        {c.observaciones && (
                          <p className="text-xs text-gray-400 mt-1 italic">{c.observaciones}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Solicitudes de lista de espera */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700">Lista de espera ({solicitudes.length})</h3>
                </div>
                {solicitudes.length === 0 ? (
                  <p className="text-center text-sm text-gray-400 py-8">Sin solicitudes registradas</p>
                ) : (
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {solicitudes.map(s => (
                      <div key={s.id} className="px-5 py-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{s.especialidad}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{s.hospital}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {s.fechaSolicitud
                                ? new Date(s.fechaSolicitud).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })
                                : '—'}
                              {' · Prioridad: '}{s.prioridad === 1 ? 'Alta' : s.prioridad === 2 ? 'Media' : 'Baja'}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${ESTADO_SOL[s.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                            {s.estado}
                          </span>
                        </div>
                        {s.observaciones && (
                          <p className="text-xs text-gray-400 mt-1 italic">{s.observaciones}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {!paciente && resultados.length === 0 && !buscando && !cargando && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-400 text-sm">Ingresa el RUT o correo del paciente para ver su historial</p>
        </div>
      )}
    </div>
  );
};
