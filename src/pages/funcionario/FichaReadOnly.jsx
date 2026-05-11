import { useState, useEffect, useContext } from 'react';
import { pacienteService } from '../../services/pacienteService';
import { listaEsperaService } from '../../services/listaEsperaService';
import { medicoService } from '../../services/medicoService';
import { citaService } from '../../services/citaService';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';

const HOSPITALES = [
  'Hospital Rednorte Norte',
  'Hospital Rednorte Sur',
  'Hospital Rednorte Centro',
  'Hospital Rednorte Oriente',
];

const BOXES = ['Box 1', 'Box 2', 'Box 3', 'Box 4', 'Box 5', 'Box 6', 'Box 7', 'Box 8'];

export const FichaReadOnly = () => {
  const { user } = useContext(AuthContext);
  const [pacientes, setPacientes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [solicitud, setSolicitud] = useState(null);
  const [cita, setCita] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [medicoNombre, setMedicoNombre] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSolicitud, setLoadingSolicitud] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // 'agendar' | 'cancelar' | null

  // Formulario agendar
  const [formCita, setFormCita] = useState({
    fechaHoraCita: '',
    hospital: HOSPITALES[0],
    boxNumero: BOXES[0],
    observaciones: '',
  });
  const [motivoCancelacion, setMotivoCancelacion] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const perfil = await medicoService.getMiPerfil();
      const esp = perfil?.especialidad || '';
      setEspecialidad(esp);
      setMedicoNombre(`${perfil.nombre} ${perfil.apellido}`);

      if (!esp) { setPacientes([]); return; }

      const solicitudes = await listaEsperaService.getByEspecialidad(esp);
      const ids = [...new Set(solicitudes.map(s => s.pacienteId))];
      if (ids.length === 0) { setPacientes([]); return; }

      const todos = await pacienteService.getAll();
      setPacientes(todos.filter(p => ids.includes(p.id)));
    } catch {
      setError('No se pudo cargar la lista de pacientes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSeleccionar = async (p) => {
    setSeleccionado(p);
    setSolicitud(null);
    setCita(null);
    setModal(null);
    if (!especialidad) return;
    try {
      setLoadingSolicitud(true);
      const solicitudes = await listaEsperaService.getByEspecialidad(especialidad);
      const sol = solicitudes.find(s => s.pacienteId === p.id);
      setSolicitud(sol || null);

      if (sol) {
        try {
          const c = await citaService.getBySolicitud(sol.id);
          setCita(c);
        } catch {
          setCita(null);
        }
      }
    } catch {
      setSolicitud(null);
    } finally {
      setLoadingSolicitud(false);
    }
  };

  const handleBusqueda = (e) => {
    const q = e.target.value.toLowerCase();
    setBusqueda(e.target.value);
    if (!q) { cargarDatos(); return; }
    setPacientes(prev =>
      prev.filter(p =>
        `${p.nombre} ${p.apellido}`.toLowerCase().includes(q) ||
        p.rut?.toLowerCase().includes(q)
      )
    );
  };

  const handleAgendar = async () => {
    if (!solicitud) return;
    if (!formCita.fechaHoraCita) { toast.error('Debes ingresar una fecha y hora'); return; }
    try {
      setEnviando(true);
      const nuevaCita = await citaService.create({
        listaEsperaId: solicitud.id,
        nombreMedico: medicoNombre,
        especialidad,
        hospital: formCita.hospital,
        boxNumero: formCita.boxNumero,
        fechaHoraCita: formCita.fechaHoraCita,
        observaciones: formCita.observaciones || null,
      });
      setCita(nuevaCita);
      setSolicitud(prev => ({ ...prev, estado: 'ASIGNADO' }));
      setModal(null);
      toast.success('Cita agendada correctamente');
      await cargarDatos();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Error al agendar la cita');
    } finally {
      setEnviando(false);
    }
  };

  const handleCancelar = async () => {
    if (!cita) return;
    if (!motivoCancelacion.trim()) { toast.error('Debes ingresar un motivo'); return; }
    try {
      setEnviando(true);
      await citaService.cancelar(cita.id, motivoCancelacion);
      setCita(null);
      setSolicitud(prev => ({ ...prev, estado: 'PENDIENTE' }));
      setModal(null);
      setMotivoCancelacion('');
      toast.success('Cita cancelada correctamente');
      await cargarDatos();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Error al cancelar la cita');
    } finally {
      setEnviando(false);
    }
  };

  const estadoColor = (estado) => {
    const m = { PENDIENTE: 'bg-yellow-100 text-yellow-800', ASIGNADO: 'bg-blue-100 text-blue-800', ATENDIDO: 'bg-green-100 text-green-800', CANCELADO: 'bg-red-100 text-red-800' };
    return m[estado] || 'bg-gray-100 text-gray-800';
  };

  const citaColor = (estado) => {
    const m = { PROGRAMADA: 'bg-blue-100 text-blue-800', CONFIRMADA: 'bg-green-100 text-green-800', REALIZADA: 'bg-gray-100 text-gray-800', CANCELADA: 'bg-red-100 text-red-800', NO_ASISTIO: 'bg-orange-100 text-orange-800' };
    return m[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Mis Pacientes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {especialidad ? `Solicitudes pendientes en ${especialidad}` : 'Cargando...'}
        </p>
      </div>

      <input
        type="text"
        value={busqueda}
        onChange={handleBusqueda}
        placeholder="Buscar por nombre o RUT..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Lista de pacientes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto max-h-[70vh]">
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Cargando...</p>
          ) : pacientes.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No hay pacientes con solicitudes pendientes.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {pacientes.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handleSeleccionar(p)}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                    seleccionado?.id === p.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <p className="text-sm font-medium text-gray-800">{p.nombre} {p.apellido}</p>
                  <p className="text-xs text-gray-500">{p.rut}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Ficha + solicitud + cita */}
        <div className="md:col-span-2 space-y-4">
          {seleccionado ? (
            <>
              {/* Datos básicos */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h2 className="text-base font-semibold text-gray-800 mb-3">{seleccionado.nombre} {seleccionado.apellido}</h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div><span className="text-gray-500">RUT</span><p className="font-medium text-gray-800">{seleccionado.rut}</p></div>
                  <div><span className="text-gray-500">Email</span><p className="text-gray-800">{seleccionado.email || '—'}</p></div>
                  <div><span className="text-gray-500">Teléfono</span><p className="text-gray-800">{seleccionado.telefono || '—'}</p></div>
                  <div><span className="text-gray-500">Dirección</span><p className="text-gray-800">{seleccionado.direccion || '—'}</p></div>
                  <div><span className="text-gray-500">Fecha de nacimiento</span><p className="text-gray-800">{seleccionado.fechaNacimiento || '—'}</p></div>
                </div>
              </div>

              {/* Solicitud */}
              {loadingSolicitud ? (
                <p className="text-sm text-gray-400 px-1">Cargando solicitud...</p>
              ) : solicitud ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-700">Solicitud #{solicitud.id}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${estadoColor(solicitud.estado)}`}>
                      {solicitud.estado}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <div><span className="text-gray-500">Especialidad</span><p className="text-gray-800">{solicitud.especialidad}</p></div>
                    <div><span className="text-gray-500">Hospital</span><p className="text-gray-800">{solicitud.hospital}</p></div>
                    <div><span className="text-gray-500">Prioridad</span><p className="text-gray-800">{solicitud.prioridad}</p></div>
                    <div><span className="text-gray-500">Fecha solicitud</span><p className="text-gray-800">{new Date(solicitud.fechaSolicitud).toLocaleDateString('es-CL')}</p></div>
                    {solicitud.observaciones && <div className="col-span-2"><span className="text-gray-500">Observaciones</span><p className="text-gray-800">{solicitud.observaciones}</p></div>}
                  </div>

                  {/* Cita existente */}
                  {cita ? (
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-700">Cita agendada</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${citaColor(cita.estado)}`}>
                          {cita.estado}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <div><span className="text-gray-500">Fecha</span><p className="text-gray-800">{new Date(cita.fechaHoraCita).toLocaleString('es-CL')}</p></div>
                        <div><span className="text-gray-500">Hospital</span><p className="text-gray-800">{cita.hospital}</p></div>
                        <div><span className="text-gray-500">Box</span><p className="text-gray-800">{cita.boxNumero}</p></div>
                        <div><span className="text-gray-500">Médico</span><p className="text-gray-800">{cita.nombreMedico}</p></div>
                        {cita.observaciones && <div className="col-span-2"><span className="text-gray-500">Observaciones</span><p className="text-gray-800">{cita.observaciones}</p></div>}
                      </div>
                      {(cita.estado === 'PROGRAMADA' || cita.estado === 'CONFIRMADA') && (
                        <button
                          onClick={() => setModal('cancelar')}
                          className="mt-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Cancelar cita
                        </button>
                      )}
                    </div>
                  ) : solicitud.estado === 'PENDIENTE' ? (
                    <div className="border-t pt-3">
                      <button
                        onClick={() => setModal('agendar')}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Agendar cita
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-sm text-gray-400 px-1">Este paciente no tiene solicitud pendiente en {especialidad}.</p>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 flex items-center justify-center text-gray-400 text-sm">
              Selecciona un paciente para ver su ficha
            </div>
          )}
        </div>
      </div>

      {/* Modal agendar */}
      {modal === 'agendar' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Agendar cita</h2>
            <p className="text-sm text-gray-500">{seleccionado?.nombre} {seleccionado?.apellido} — {especialidad}</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600">Fecha y hora</label>
                <input
                  type="datetime-local"
                  value={formCita.fechaHoraCita}
                  onChange={e => setFormCita(p => ({ ...p, fechaHoraCita: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Hospital</label>
                <select
                  value={formCita.hospital}
                  onChange={e => setFormCita(p => ({ ...p, hospital: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {HOSPITALES.map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Box</label>
                <select
                  value={formCita.boxNumero}
                  onChange={e => setFormCita(p => ({ ...p, boxNumero: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {BOXES.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Observaciones (opcional)</label>
                <textarea
                  value={formCita.observaciones}
                  onChange={e => setFormCita(p => ({ ...p, observaciones: e.target.value }))}
                  rows={2}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModal(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgendar}
                disabled={enviando}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {enviando ? 'Agendando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal cancelar */}
      {modal === 'cancelar' && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Cancelar cita</h2>
            <p className="text-sm text-gray-500">{seleccionado?.nombre} {seleccionado?.apellido}</p>
            <div>
              <label className="text-xs font-medium text-gray-600">Motivo de cancelación</label>
              <textarea
                value={motivoCancelacion}
                onChange={e => setMotivoCancelacion(e.target.value)}
                rows={3}
                placeholder="Describe el motivo de la cancelación..."
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400 outline-none resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setModal(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Volver
              </button>
              <button
                onClick={handleCancelar}
                disabled={enviando}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {enviando ? 'Cancelando...' : 'Confirmar cancelación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
