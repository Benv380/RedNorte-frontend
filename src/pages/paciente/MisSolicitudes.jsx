// src/pages/paciente/MisSolicitudes.jsx
import { useState, useEffect } from 'react';
import { listaEsperaService } from '../../services/listaEsperaService';
import { toast } from 'sonner';

export const MisSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const data = await listaEsperaService.getAll();
      setSolicitudes(data);
    } catch (error) {
      toast.error('Error al cargar solicitudes');
    } finally {
      setLoading(false);
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
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Mis Solicitudes</h1>

      {solicitudes.length === 0 ? (
        <div className='bg-white rounded-xl shadow-sm p-8 text-center text-gray-500'>
          No tienes solicitudes registradas
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>ID</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Especialidad</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Estado</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Prioridad</th>
                <th className='text-left px-6 py-3 text-sm font-medium text-gray-500'>Fecha</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 text-sm text-gray-800'>#{solicitud.id}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{solicitud.especialidad}</td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700'>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <span className='px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700'>
                      {solicitud.prioridad}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{solicitud.fechaIngreso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};