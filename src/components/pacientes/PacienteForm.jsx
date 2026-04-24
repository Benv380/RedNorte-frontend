// src/components/pacientes/PacienteForm.jsx
import { useForm } from 'react-hook-form';
import { pacienteService } from '../../services/pacienteService';
import { toast } from 'sonner';

export const PacienteForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await pacienteService.create(data);
      toast.success('Paciente registrado correctamente');
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Error al registrar paciente');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Nombre
          </label>
          <input
            {...register('nombre', { required: 'El nombre es obligatorio' })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
            placeholder='Juan'
          />
          {errors.nombre && (
            <p className='text-red-500 text-sm mt-1'>{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Apellido
          </label>
          <input
            {...register('apellido', { required: 'El apellido es obligatorio' })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
            placeholder='Pérez'
          />
          {errors.apellido && (
            <p className='text-red-500 text-sm mt-1'>{errors.apellido.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          RUT
        </label>
        <input
          {...register('rut', { required: 'El RUT es obligatorio' })}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
          placeholder='12.345.678-9'
        />
        {errors.rut && (
          <p className='text-red-500 text-sm mt-1'>{errors.rut.message}</p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Email
        </label>
        <input
          type='email'
          {...register('email', { required: 'El email es obligatorio' })}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
          placeholder='correo@ejemplo.com'
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Teléfono
        </label>
        <input
          {...register('telefono', { required: 'El teléfono es obligatorio' })}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
          placeholder='+56 9 1234 5678'
        />
        {errors.telefono && (
          <p className='text-red-500 text-sm mt-1'>{errors.telefono.message}</p>
        )}
      </div>
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50'
      >
        {isSubmitting ? 'Registrando...' : 'Registrar Paciente'}
      </button>
    </form>
  );
};