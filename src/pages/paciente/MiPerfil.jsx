import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { pacienteService } from '../../services/pacienteService';
import { toast } from 'sonner';

export const MiPerfil = () => {
  const { user } = useAuth();
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    rut: user?.rut || '',
    telefono: user?.telefono || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGuardar = async () => {
    setLoading(true);
    try {
      await pacienteService.update(user.id, form);
      toast.success('Perfil actualizado correctamente');
      setEditando(false);
    } catch {
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setForm({
      nombre: user?.nombre || '',
      rut: user?.rut || '',
      telefono: user?.telefono || '',
      email: user?.email || '',
    });
    setEditando(false);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Mi Perfil</h1>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 max-w-lg overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <span className='text-lg font-bold text-blue-600'>
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className='text-sm font-medium text-gray-800'>{user?.email}</h2>
              <p className='text-xs text-gray-500'>{user?.rol || 'Paciente'}</p>
            </div>
          </div>
          {!editando && (
            <button
              onClick={() => setEditando(true)}
              className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors'
            >
              Editar
            </button>
          )}
        </div>

        <div className='divide-y divide-gray-100'>
          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Nombre completo</label>
            {editando ? (
              <input
                type='text'
                name='nombre'
                value={form.nombre}
                onChange={handleChange}
                placeholder='Ingresa tu nombre'
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            ) : (
              <p className='text-sm text-gray-800'>{form.nombre || '—'}</p>
            )}
          </div>

          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>RUT</label>
            {editando ? (
              <input
                type='text'
                name='rut'
                value={form.rut}
                onChange={handleChange}
                placeholder='12.345.678-9'
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            ) : (
              <p className='text-sm text-gray-800'>{form.rut || '—'}</p>
            )}
          </div>

          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Teléfono</label>
            {editando ? (
              <input
                type='text'
                name='telefono'
                value={form.telefono}
                onChange={handleChange}
                placeholder='+56 9 1234 5678'
                className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            ) : (
              <p className='text-sm text-gray-800'>{form.telefono || '—'}</p>
            )}
          </div>

          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Email</label>
            <p className='text-sm text-gray-800'>{form.email}</p>
            <p className='text-xs text-gray-400 mt-0.5'>El email no se puede modificar</p>
          </div>

          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Rol</label>
            <p className='text-sm text-gray-800'>{user?.rol || 'Paciente'}</p>
          </div>
        </div>

        {editando && (
          <div className='px-6 py-4 border-t border-gray-200 flex gap-3'>
            <button
              onClick={handleCancelar}
              className='flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={loading}
              className='flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors'
            >
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};