import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { listaEsperaService } from '../../services/listaEsperaService';
import { toast } from 'sonner';

const ESPECIALIDADES = [
  'Cardiología', 'Neurología', 'Traumatología', 'Oftalmología',
  'Dermatología', 'Pediatría', 'Ginecología', 'Urología', 'Medicina General',
];

const HOSPITALES = [
  'Hospital del Norte', 'Clínica RedNorte', 'Centro Médico Norte',
];

export const NuevaSolicitud = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ especialidad: '', hospital: '', observaciones: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.especialidad || !form.hospital) {
      toast.error('Selecciona especialidad y hospital');
      return;
    }
    setLoading(true);
    try {
      await listaEsperaService.create({
        pacienteId: user.id,
        especialidad: form.especialidad,
        hospital: form.hospital,
        prioridad: 2,
        observaciones: form.observaciones || undefined,
      });
      toast.success('Solicitud enviada correctamente');
      navigate('/paciente/solicitudes');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Nueva solicitud</h1>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-700">Solicitar atención médica</h2>
          </div>

          <div className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Especialidad requerida</label>
              <select
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Seleccionar especialidad...</option>
                {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Hospital</label>
              <select
                name="hospital"
                value={form.hospital}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Seleccionar hospital...</option>
                {HOSPITALES.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Observaciones (opcional)</label>
              <textarea
                name="observaciones"
                value={form.observaciones}
                onChange={handleChange}
                rows={2}
                placeholder="Describe brevemente tu situación..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="bg-gray-50 rounded-lg px-4 py-3">
              <p className="text-xs font-medium text-gray-500 mb-1">Prioridad asignada</p>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">Normal</span>
              <p className="text-xs text-gray-400 mt-1">Se ajusta según criterio clínico</p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/paciente/solicitudes')}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
          <div className="px-6 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">¿Qué pasa después?</h3>
          </div>
          <div className="px-6 py-4 space-y-2 text-xs text-gray-500 leading-relaxed">
            <p>1. Tu solicitud ingresa a la lista de espera con estado <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">Pendiente</span></p>
            <p>2. El funcionario te asignará una hora según disponibilidad y prioridad</p>
            <p>3. Recibirás una notificación cuando se agenda tu cita</p>
          </div>
        </div>
      </div>
    </div>
  );
};
