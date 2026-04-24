// src/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const MainLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navbar */}
      <nav className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16 items-center'>
            <span className='text-xl font-bold text-blue-600'>RedNorte</span>
            <div className='flex items-center gap-4'>
              <span className='text-sm text-gray-600'>{user?.email}</span>
              <button
                onClick={logout}
                className='text-sm text-red-500 hover:text-red-700'
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Outlet />
      </main>
    </div>
  );
};