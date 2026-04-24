// src/pages/public/LoginPage.jsx
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success('Sesión iniciada correctamente');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Credenciales incorrectas');
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-md p-8'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>
        Iniciar Sesión
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
            Contraseña
          </label>
          <input
            type='password'
            {...register('password', { required: 'La contraseña es obligatoria' })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
            placeholder='••••••••'
          />
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
          )}
        </div>
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50'
        >
          {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
      <p className='text-center text-sm text-gray-600 mt-4'>
        ¿No tienes cuenta?{' '}
        <a href='/register' className='text-blue-600 hover:underline'>
          Regístrate
        </a>
      </p>
    </div>
  );
};