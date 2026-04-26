// src/pages/paciente/MisCitas.jsx
import { useState, useEffect } from 'react';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

export const MisCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const data = await citaService.getAll();
      setCitas(data);
    } catch (error) {
      toast.error('Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  const cancelarCita = async (id) => {
    try {
      await citaService.cancel(id);
      toast.success('Cita cancelada');
      cargarCitas();
    } catch (error) {
      toast.error('Error al cancelar cita');
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
      </div>
    );
  }

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
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.medico}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.especialidad}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{cita.fechaCita}</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'>
                      {cita.estado}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => cancelarCita(cita.id)}
                      className='text-red-500 hover:text-red-700 text-sm font-medium'
                    >
                      Cancelar
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