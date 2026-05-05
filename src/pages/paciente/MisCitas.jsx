import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

const ESTADO_ESTILOS = {
  PROGRAMADA: 'bg-amber-100 text-amber-800',
  CONFIRMADA: 'bg-blue-100 text-blue-800',
  REALIZADA:  'bg-green-100 text-green-800',
  CANCELADA:  'bg-red-100 text-red-800',
  NO_ASISTIO: 'bg-gray-100 text-gray-600',
};

export const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { cargarCitas(); }, []);

  const cargarCitas = async () => {
    try {
      const data = await citaService.getAll();
      setCitas(data);
    } catch {
      toast.error('Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className='flex items-center justify-center h-64'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
    </div>
  );

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Mis Citas</h1>

      {citas.length === 0 ? (
        <div className='bg-white rounded-xl shadow-sm p-8 text-center text-gray-500'>
          No tienes citas programadas
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>ID</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Médico</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Especialidad</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Fecha</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Estado</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Acciones</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {citas.map((cita) => (
                <tr key={cita.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 text-sm text-gray-800'>#{cita.id}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.nombreMedico}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.especialidad}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.fechaHoraCita}</td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${ESTADO_ESTILOS[cita.estado] ?? 'bg-gray-100 text-gray-600'}`}>
                      {cita.estado}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => navigate(`/paciente/citas/${cita.id}`)}
                      className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};