import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast } from 'sonner';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await authService.registerPaciente(data.email, data.password, data.nombreCompleto, data.rut, data.fechaNacimiento);
      toast.success('Cuenta creada. Inicia sesión para continuar.');
      navigate('/login');
    } catch (error) {
      toast.error('Error al registrar: ' + (error.response?.data?.message || 'Error interno'));
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-10'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Crear cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre completo</label>
          <input
            type='text'
            {...register('nombreCompleto', { required: 'El nombre es obligatorio' })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            placeholder='María González'
          />
          {errors.nombreCompleto && <p className='text-red-500 text-xs mt-1'>{errors.nombreCompleto.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>RUT</label>
          <input
            type='text'
            {...register('rut', { required: 'El RUT es obligatorio' })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            placeholder='12345678-9'
          />
          {errors.rut && <p className='text-red-500 text-xs mt-1'>{errors.rut.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Fecha de nacimiento</label>
          <input
            type='date'
            {...register('fechaNacimiento', { required: 'La fecha de nacimiento es obligatoria' })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
          />
          {errors.fechaNacimiento && <p className='text-red-500 text-xs mt-1'>{errors.fechaNacimiento.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input
            type='email'
            {...register('email', { required: 'Email obligatorio' })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            placeholder='maria@email.cl'
          />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Contraseña</label>
          <input
            type='password'
            {...register('password', { required: 'Contraseña obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            placeholder='••••••••'
          />
          {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Confirmar contraseña</label>
          <input
            type='password'
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: value => value === getValues('password') || 'Las contraseñas no coinciden',
            })}
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            placeholder='••••••••'
          />
          {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword.message}</p>}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50 transition-colors'
        >
          {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-4'>
        ¿Ya tienes cuenta?{' '}
        <Link to='/login' className='text-blue-600 hover:underline'>Inicia sesión</Link>
      </p>
    </div>
  );
};
