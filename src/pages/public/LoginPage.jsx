import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';

const ROL_REDIRECT = {
  PACIENTE:        '/paciente/dashboard',
  MEDICO:          '/medico/dashboard',
  FUNCIONARIO:     '/funcionario/dashboard',
  ADMIN_HOSPITAL:  '/admin/hospital/dashboard',
  ADMIN_SOFTWARE:  '/admin/software/dashboard',
};

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [tipo, setTipo] = useState('PACIENTE');

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password, tipo);
      toast.success('Bienvenido');
      navigate(result.redirectUrl || ROL_REDIRECT[result.rol] || '/');
    } catch {
      toast.error('Credenciales incorrectas o cuenta no encontrada');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Red Norte</h2>
      <p className="text-sm text-gray-500 text-center mb-6">Ingresa al sistema</p>

      {/* Selector de tipo */}
      <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => setTipo('PACIENTE')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tipo === 'PACIENTE' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Soy Paciente
        </button>
        <button
          type="button"
          onClick={() => setTipo('MEDICO')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            tipo === 'MEDICO' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Soy Profesional
        </button>
      </div>

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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {tipo === 'PACIENTE' && (
        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Eres nuevo?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link>
        </p>
      )}
    </div>
  );
};
