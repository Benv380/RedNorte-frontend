import { useState } from 'react';
import { pacienteService } from '../../services/pacienteService';
import { listaEsperaService } from '../../services/listaEsperaService';
import { toast } from 'sonner';

const ESPECIALIDADES = [
  'Cardiología', 'Neurología', 'Traumatología', 'Oftalmología',
  'Dermatología', 'Pediatría', 'Ginecología', 'Urología', 'Medicina General',
];

const HOSPITALES = [
  'Hospital del Norte', 'Clínica RedNorte', 'Centro Médico Norte',
];

const PRIORIDADES = [
  { value: 1, label: 'Alta (urgente)' },
  { value: 2, label: 'Media (normal)' },
  { value: 3, label: 'Baja (rutina)' },
];

const PRIORIDAD_ESTILO = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-amber-100 text-amber-700',
  3: 'bg-green-100 text-green-700',
};

export const FuncionarioDashboard = () => {
  const [query, setQuery]                       = useState('');
  const [resultados, setResultados]             = useState([]);
  const [buscando, setBuscando]                 = useState(false);
  const [paciente, setPaciente]                 = useState(null);
  const [form, setForm]                         = useState({
    especialidad: '', hospital: '', prioridad: 2, observaciones: '',
  });
  const [enviando, setEnviando]                 = useState(false);
  const [registrado, setRegistrado]             = useState(null);

  const buscar = async () => {
    if (!query.trim()) return;
    setBuscando(true);
    setResultados([]);
    setPaciente(null);
    try {
      const data = await pacienteService.search(query);
      setResultados(Array.isArray(data) ? data : []);
      if (!Array.isArray(data) || data.length === 0) toast.info('Sin resultados para esa búsqueda');
    } catch {
      toast.error('Error al buscar paciente');
    } finally {
      setBuscando(false);
    }
  };

  const seleccionar = (p) => {
    setPaciente(p);
    setResultados([]);
    setQuery('');
    setRegistrado(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paciente) { toast.error('Selecciona un paciente'); return; }
    if (!form.especialidad || !form.hospital) { toast.error('Completa especialidad y hospital'); return; }
    setEnviando(true);
    try {
      const solicitud = await listaEsperaService.create({
        pacienteId: paciente.id,
        especialidad: form.especialidad,
        hospital: form.hospital,
        prioridad: Number(form.prioridad),
        observaciones: form.observaciones || undefined,
      });
      setRegistrado(solicitud);
      toast.success(`${paciente.nombre} ${paciente.apellido} ingresado a lista de espera`);
      setPaciente(null);
      setForm({ especialidad: '', hospital: '', prioridad: 2, observaciones: '' });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error al registrar en lista de espera');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Panel del Funcionario</h1>
      <p className="text-sm text-gray-500 mb-6">Registra pacientes en la lista de espera</p>

      {/* Buscar paciente */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">1. Buscar paciente</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscar()}
            placeholder="RUT, nombre o apellido..."
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={buscar}
            disabled={buscando}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {buscando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {resultados.length > 0 && (
          <ul className="mt-3 divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {resultados.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => seleccionar(p)}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800">{p.nombre} {p.apellido}</p>
                  <p className="text-xs text-gray-500">{p.rut} · {p.email}</p>
                </button>
              </li>
            ))}
          </ul>
        )}

        {paciente && (
          <div className="mt-3 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-blue-900">{paciente.nombre} {paciente.apellido}</p>
              <p className="text-xs text-blue-700">{paciente.rut} · {paciente.email}</p>
            </div>
            <button
              onClick={() => setPaciente(null)}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Cambiar
            </button>
          </div>
        )}
      </div>

      {/* Formulario de ingreso */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">2. Datos de la solicitud</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Especialidad</label>
            <select
              value={form.especialidad}
              onChange={(e) => setForm(f => ({ ...f, especialidad: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Seleccionar...</option>
              {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Hospital</label>
            <select
              value={form.hospital}
              onChange={(e) => setForm(f => ({ ...f, hospital: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Seleccionar...</option>
              {HOSPITALES.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Prioridad</label>
            <select
              value={form.prioridad}
              onChange={(e) => setForm(f => ({ ...f, prioridad: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {PRIORIDADES.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Observaciones (opcional)</label>
            <textarea
              value={form.observaciones}
              onChange={(e) => setForm(f => ({ ...f, observaciones: e.target.value }))}
              rows={2}
              placeholder="Notas clínicas relevantes..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={enviando || !paciente}
          className="mt-4 w-full py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {enviando ? 'Registrando...' : 'Ingresar a lista de espera'}
        </button>
      </form>

      {/* Confirmación */}
      {registrado && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="text-sm font-semibold text-green-800 mb-1">Solicitud registrada correctamente</p>
          <p className="text-xs text-green-700">
            ID #{registrado.id} · {registrado.especialidad} · {registrado.hospital}
          </p>
          {registrado.posicion && (
            <p className="text-xs text-green-700 mt-1">
              Posición en cola: <span className="font-semibold">{registrado.posicion}</span>
              {registrado.tiempoEstimadoMinutos !== undefined && (
                <> · Tiempo estimado: <span className="font-semibold">{registrado.tiempoEstimadoMinutos} min</span></>
              )}
            </p>
          )}
          <span className={`mt-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${PRIORIDAD_ESTILO[registrado.prioridad] || 'bg-gray-100 text-gray-600'}`}>
            Prioridad {registrado.prioridad === 1 ? 'Alta' : registrado.prioridad === 2 ? 'Media' : 'Baja'}
          </span>
        </div>
      )}
    </div>
  );
};
