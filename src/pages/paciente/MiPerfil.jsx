import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { pacienteService } from '../../services/pacienteService';
import { toast } from 'sonner';

export const MiPerfil = () => {
  const { user } = useAuth();
  const [editando, setEditando]   = useState(false);
  const [loading, setLoading]     = useState(!!user?.id);
  const [guardando, setGuardando] = useState(false);
  const [paciente, setPaciente]   = useState(null);
  const [form, setForm]           = useState({ nombre: '', apellido: '', rut: '', telefono: '', direccion: '', fechaNacimiento: '' });

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      try {
        const data = await pacienteService.getById(user.id);
        setPaciente(data);
        setForm({
          nombre:          data.nombre          ?? '',
          apellido:        data.apellido         ?? '',
          rut:             data.rut              ?? '',
          telefono:        data.telefono         ?? '',
          direccion:       data.direccion        ?? '',
          fechaNacimiento: data.fechaNacimiento  ?? '',
        });
      } catch {
        toast.error('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleGuardar = async () => {
    if (!paciente?.id) return;
    if (!form.nombre || !form.apellido || !form.rut || !form.fechaNacimiento) {
      toast.error('Nombre, apellido, RUT y fecha de nacimiento son obligatorios');
      return;
    }
    setGuardando(true);
    try {
      const updated = await pacienteService.update(paciente.id, {
        nombre:          form.nombre,
        apellido:        form.apellido,
        rut:             form.rut,
        telefono:        form.telefono   || undefined,
        direccion:       form.direccion  || undefined,
        fechaNacimiento: form.fechaNacimiento,
        email:           paciente.email  || undefined,
      });
      setPaciente(updated);
      toast.success('Perfil actualizado correctamente');
      setEditando(false);
    } catch {
      toast.error('Error al actualizar el perfil');
    } finally {
      setGuardando(false);
    }
  };

  const handleCancelar = () => {
    setForm({
      nombre:          paciente?.nombre          ?? '',
      apellido:        paciente?.apellido         ?? '',
      rut:             paciente?.rut              ?? '',
      telefono:        paciente?.telefono         ?? '',
      direccion:       paciente?.direccion        ?? '',
      fechaNacimiento: paciente?.fechaNacimiento  ?? '',
    });
    setEditando(false);
  };

  if (loading) return (
    <div className='flex items-center justify-center h-64'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600' />
    </div>
  );

  const campos = [
    { name: 'nombre',          label: 'Nombre',              type: 'text',  placeholder: 'María' },
    { name: 'apellido',        label: 'Apellido',            type: 'text',  placeholder: 'González' },
    { name: 'rut',             label: 'RUT',                 type: 'text',  placeholder: '12.345.678-9' },
    { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date',  placeholder: '' },
    { name: 'telefono',        label: 'Teléfono',            type: 'tel',   placeholder: '+56 9 1234 5678' },
    { name: 'direccion',       label: 'Dirección',           type: 'text',  placeholder: 'Calle 123, Ciudad' },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800 mb-6'>Mi Perfil</h1>

      <div className='bg-white rounded-xl shadow-sm border border-gray-200 max-w-lg overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
              <span className='text-lg font-bold text-blue-600'>
                {(form.nombre || user?.email || '?').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-800'>{form.nombre} {form.apellido}</p>
              <p className='text-xs text-gray-500'>{user?.email}</p>
            </div>
          </div>
          {!editando && (
            <button
              onClick={() => setEditando(true)}
              className='text-sm text-blue-600 hover:text-blue-800 font-medium'
            >
              Editar
            </button>
          )}
        </div>

        <div className='divide-y divide-gray-100'>
          {campos.map(c => (
            <div key={c.name} className='px-6 py-3'>
              <label className='block text-xs font-medium text-gray-500 mb-1'>{c.label}</label>
              {editando ? (
                <input
                  type={c.type}
                  name={c.name}
                  value={form[c.name]}
                  onChange={handleChange}
                  placeholder={c.placeholder}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              ) : (
                <p className='text-sm text-gray-800'>{form[c.name] || '—'}</p>
              )}
            </div>
          ))}

          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Email</label>
            <p className='text-sm text-gray-800'>{user?.email}</p>
            <p className='text-xs text-gray-400 mt-0.5'>El email no se puede modificar</p>
          </div>
        </div>

        {editando && (
          <div className='px-6 py-4 border-t border-gray-200 flex gap-3'>
            <button
              onClick={handleCancelar}
              className='flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50'
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardar}
              disabled={guardando}
              className='flex-1 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50'
            >
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
