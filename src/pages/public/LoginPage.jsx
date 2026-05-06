import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ Aquí recibimos el objeto y usamos redirectUrl
      const response = await login(data.email, data.password);
      
      toast.success('Bienvenido');
      
      // ✅ Usamos la URL que mandó el backend
      if (response && response.redirectUrl) {
        navigate(response.redirectUrl);
      } else {
        navigate('/dashboard'); // Ruta por defecto si algo falla
      }
    } catch (error) {
      toast.error('Credenciales incorrectas');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Red Norte</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Ingresa al sistema</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="tu@email.cl"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="••••••••"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Eres nuevo? <a href="/register" className="text-blue-600 hover:underline">Regístrate</a>
      </p>
    </div>
  );
};