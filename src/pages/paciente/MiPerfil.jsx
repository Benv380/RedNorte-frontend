import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { pacienteService } from '../../services/pacienteService';
import { toast } from 'sonner';

const InfoCard = ({ mensaje, onClose }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg text-blue-900 px-4 py-3 shadow-sm mt-2" role="alert">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-start gap-3">
        <svg className="fill-current h-5 w-5 text-blue-500 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
        </svg>
        <p className="text-sm">{mensaje}</p>
      </div>
      <button onClick={onClose} className="text-blue-400 hover:text-blue-600 text-lg leading-none shrink-0">×</button>
    </div>
  </div>
);

export const MiPerfil = () => {
  const { user } = useAuth();
<<<<<<< HEAD
  const [editando, setEditando]   = useState(false);
  const [loading, setLoading]     = useState(!!user?.id);
  const [guardando, setGuardando] = useState(false);
  const [paciente, setPaciente]   = useState(null);
  const [form, setForm]           = useState({ nombre: '', apellido: '', rut: '', telefono: '', direccion: '', fechaNacimiento: '' });
=======
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [infoAbierta, setInfoAbierta] = useState(null); // 'nombre' | 'rut' | null
  const [form, setForm] = useState({
    nombre: user?.nombre || '',
    rut: user?.rut || '',
    telefono: user?.telefono || '',
    email: user?.email || '',
  });
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1

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
    setInfoAbierta(null);
  };

  const toggleInfo = (campo) => {
    setInfoAbierta(prev => prev === campo ? null : campo);
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
<<<<<<< HEAD
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
=======

          {/* Nombre completo */}
          <div className='px-6 py-3'>
            <div className='flex items-center gap-2 mb-1'>
              <label className='text-xs font-medium text-gray-500'>Nombre completo</label>
              {editando && (
                <button
                  onClick={() => toggleInfo('nombre')}
                  title='Más información'
                  className={`w-4 h-4 rounded-full text-white text-xs flex items-center justify-center leading-none transition-colors ${
                    infoAbierta === 'nombre' ? 'bg-blue-700' : 'bg-blue-400 hover:bg-blue-600'
                  }`}
                >
                  !
                </button>
              )}
            </div>
            {editando && infoAbierta === 'nombre' && (
              <InfoCard
                mensaje='Para modificar tu nombre completo, debes acercarte al centro de salud más cercano y solicitar el cambio en mesón de atención.'
                onClose={() => setInfoAbierta(null)}
              />
            )}
            <p className='text-sm text-gray-800 mt-1'>{user?.nombre || '—'}</p>
          </div>

          {/* RUT */}
          <div className='px-6 py-3'>
            <div className='flex items-center gap-2 mb-1'>
              <label className='text-xs font-medium text-gray-500'>RUT</label>
              {editando && (
                <button
                  onClick={() => toggleInfo('rut')}
                  title='Más información'
                  className={`w-4 h-4 rounded-full text-white text-xs flex items-center justify-center leading-none transition-colors ${
                    infoAbierta === 'rut' ? 'bg-blue-700' : 'bg-blue-400 hover:bg-blue-600'
                  }`}
                >
                  !
                </button>
              )}
            </div>
            {editando && infoAbierta === 'rut' && (
              <InfoCard
                mensaje='El RUT es un dato de identificación oficial y no se puede modificar.'
                onClose={() => setInfoAbierta(null)}
              />
            )}
            <p className='text-sm text-gray-800 mt-1'>{form.rut || '—'}</p>
          </div>

          {/* Teléfono */}
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
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1

          {/* Email */}
          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Email</label>
            <p className='text-sm text-gray-800'>{user?.email}</p>
            <p className='text-xs text-gray-400 mt-0.5'>El email no se puede modificar</p>
          </div>
<<<<<<< HEAD
=======

          {/* Rol */}
          <div className='px-6 py-3'>
            <label className='block text-xs font-medium text-gray-500 mb-1'>Rol</label>
            <p className='text-sm text-gray-800'>{user?.rol || 'Paciente'}</p>
          </div>
>>>>>>> 995d1123bddaec4905e3c0c33c30dbbb33010fd1
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
