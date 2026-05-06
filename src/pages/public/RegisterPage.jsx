import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { toast } from 'sonner';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            // ✅ Llamamos al servicio con los 3 parámetros necesarios
            await authService.register(data.email, data.password, data.nombreCompleto);
            toast.success('Usuario registrado correctamente');
            navigate('/login');
        } catch (error) {
            console.error("Error detallado:", error.response?.data || error.message);
            toast.error('Error al registrar: ' + (error.response?.data?.message || 'Error interno'));
        }
    };

    return (
        <div className='bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-10'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Registrarse</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Nombre Completo</label>
                    <input
                        type='text'
                        {...register('nombreCompleto', { required: 'El nombre es obligatorio' })}
                        className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                        placeholder='Diego Azcarategui'
                    />
                    {errors.nombreCompleto && <p className='text-red-500 text-sm'>{errors.nombreCompleto.message}</p>}
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type='email'
                        {...register('email', { required: 'Email obligatorio' })}
                        className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                        placeholder='diego@duoc.cl'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
                    <input
                        type='password'
                        {...register('password', { required: 'Contraseña obligatoria', minLength: 6 })}
                        className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                        placeholder='••••••••'
                    />
                </div>

                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-50'
                >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};