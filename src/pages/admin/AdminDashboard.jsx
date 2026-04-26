// src/pages/admin/AdminDashboard.jsx
import { useAuth } from '../../hooks/useAuth';

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>
        Bienvenido al Dashboard
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-500'>Pacientes</h3>
          <p className='text-3xl font-bold text-blue-600 mt-2'>0</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-500'>Lista de Espera</h3>
          <p className='text-3xl font-bold text-blue-600 mt-2'>0</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='text-sm font-medium text-gray-500'>Citas Hoy</h3>
          <p className='text-3xl font-bold text-blue-600 mt-2'>0</p>
        </div>
      </div>
    </div>
  );
};