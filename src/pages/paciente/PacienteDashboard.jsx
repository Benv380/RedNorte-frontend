// src/pages/paciente/PacienteDashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { listaEsperaService } from '../../services/listaEsperaService';
import { citaService } from '../../services/citaService';
import { toast } from 'sonner';

export const PacienteDashboard = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [solicitudesData, citasData] = await Promise.all([
        listaEsperaService.getAll(),
        citaService.getAll(),
      ]);
      setSolicitudes(solicitudesData);
      setCitas(citasData);
    } catch (error) {
      toast.error('Error al cargar datos');
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
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>
        Bienvenido, {user?.email}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-500'>Mis Solicitudes</h3>
          <p className='text-3xl font-bold text-blue-600 mt-2'>{solicitudes.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-500'>Mis Citas</h3>
          <p className='text-3xl font-bold text-blue-600 mt-2'>{citas.length}</p>
        </div>
      </div>
    </div>
  );
};