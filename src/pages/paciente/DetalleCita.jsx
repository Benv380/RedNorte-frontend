import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

const ESTADO_ESTILOS = {
  PROGRAMADA:  'bg-amber-100 text-amber-800',
  CONFIRMADA:  'bg-blue-100 text-blue-800',
  REALIZADA:   'bg-green-100 text-green-800',
  CANCELADA:   'bg-red-100 text-red-800',
  NO_ASISTIO:  'bg-gray-100 text-gray-600',
};

export const DetalleCita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accionando, setAccionando] = useState(false);

  const cargarCita = async () => {
    try {
      const data = await citaService.getById(id);
      setCita(data);
    } catch {
      toast.error('Error al cargar la cita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarCita(); }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const cancelarCita = async () => {
    setAccionando(true);
    try {
      await citaService.cancelar(id, 'Cancelado por el paciente');
      toast.success('Cita cancelada correctamente');
      navigate('/paciente/citas');
    } catch {
      toast.error('Error al cancelar la cita');
    } finally {
      setAccionando(false);
    }
  };

  const confirmarCita = async () => {
    setAccionando(true);
    try {
      await citaService.confirmar(id);
      toast.success('Cita confirmada');
      cargarCita();
    } catch {
      toast.error('Error al confirmar la cita');
    } finally {
      setAccionando(false);
    }
  };

  if (loading) return (
    <div className='flex items-center justify-center h-64'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
    </div>
  );

  if (!cita) return (
    <div className='bg-white rounded-xl shadow-sm p-8 text-center text-gray-500'>
      Cita no encontrada
    </div>
  );

  return (
    <div className='max-w-lg'>
      <div className='flex items-center gap-3 mb-6'>
        <button onClick={() => navigate('/paciente/citas')} className='text-sm text-gray-500 hover:text-blue-600'>
          ← Volver
        </button>
        <h1 className='text-2xl font-bold text-gray-800'>Detalle de cita</h1>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4'>
        <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
          <h2 className='text-sm font-medium text-gray-700'>Información de la cita</h2>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${ESTADO_ESTILOS[cita.estado] ?? 'bg-gray-100 text-gray-600'}`}>
            {cita.estado}
          </span>
        </div>

        <div className='divide-y divide-gray-100'>
          {[
            ['N° cita',     `#${cita.id}`],
            ['Especialidad', cita.especialidad],
            ['Médico',       cita.nombreMedico],
            ['Hospital',     cita.hospital],
            ['Box',          cita.boxNumero],
          ].map(([label, value]) => value && (
            <div key={label} className='px-6 py-3 flex justify-between'>
              <span className='text-sm text-gray-500'>{label}</span>
              <span className='text-sm font-medium text-gray-800'>{value}</span>
            </div>
          ))}
          <div className='px-6 py-3 flex justify-between'>
            <span className='text-sm text-gray-500'>Fecha y hora</span>
            <span className='text-sm font-medium text-gray-800'>
              {cita.fechaHoraCita
                ? `${new Date(cita.fechaHoraCita).toLocaleDateString('es-CL', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                  })} · ${new Date(cita.fechaHoraCita).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}`
                : '—'}
            </span>
          </div>
          {cita.observaciones && (
            <div className='px-6 py-3'>
              <span className='text-sm text-gray-500 block mb-1'>Observaciones</span>
              <span className='text-sm text-gray-700'>{cita.observaciones}</span>
            </div>
          )}
        </div>
      </div>

      {(cita.estado === 'PROGRAMADA' || cita.estado === 'CONFIRMADA') && (
        <div className='flex gap-3'>
          {cita.estado === 'PROGRAMADA' && (
            <button
              onClick={confirmarCita}
              disabled={accionando}
              className='flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors'
            >
              Confirmar asistencia
            </button>
          )}
          <button
            onClick={cancelarCita}
            disabled={accionando}
            className='flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors'
          >
            Cancelar cita
          </button>
        </div>
      )}
    </div>
  );
};
