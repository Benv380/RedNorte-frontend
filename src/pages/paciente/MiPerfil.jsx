// src/pages/paciente/MiPerfil.jsx
import { useAuth } from '../../hooks/useAuth';

export const MiPerfil = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Mi Perfil</h1>

      <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200 max-w-lg'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center'>
            <span className='text-2xl font-bold text-blue-600'>
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className='text-lg font-semibold text-gray-800'>{user?.email}</h2>
            <p className='text-sm text-gray-500'>{user?.rol || 'Paciente'}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>
              Email
            </label>
            <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
              {user?.email}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>
              Rol
            </label>
            <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
              {user?.rol || 'Paciente'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};