import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

// Patrón Strategy — cada rol tiene su propio set de links
const LINKS_POR_ROL = {
  PACIENTE: [
    { label: 'Dashboard',    ruta: '/paciente/dashboard' },
    { label: 'Mis Solicitudes', ruta: '/paciente/solicitudes' },
    { label: 'Mis Citas',      ruta: '/paciente/citas' },
    { label: 'Mi Perfil',      ruta: '/paciente/perfil' },
  ],
  FUNCIONARIO: [
    { label: 'Dashboard',       ruta: '/funcionario/dashboard' },
    { label: 'Agendar Hora',    ruta: '/funcionario/agendar' },
    { label: 'Lista de Espera', ruta: '/funcionario/lista-espera' },
    { label: 'Pacientes',       ruta: '/funcionario/pacientes' },
  ],
  MEDICO: [
    { label: 'Dashboard',       ruta: '/medico/dashboard' },
    { label: 'Mis Pacientes',   ruta: '/medico/pacientes' },
    { label: 'Historia Clínica', ruta: '/medico/historia' },
    { label: 'Exámenes',        ruta: '/medico/examenes' },
  ],
  ADMIN_HOSPITAL: [
    { label: 'Dashboard',       ruta: '/admin/hospital/dashboard' },
    { label: 'Lista de Espera', ruta: '/admin/hospital/lista-espera' },
    { label: 'Cuentas',         ruta: '/admin/hospital/cuentas' },
  ],
  ADMIN_SOFTWARE: [
    { label: 'Dashboard',       ruta: '/admin/software/dashboard' },
    { label: 'Permisos',        ruta: '/admin/software/permisos' },
    { label: 'Logs',            ruta: '/admin/software/logs' },
  ],
};

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const links = LINKS_POR_ROL[user?.rol] || [];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <span onClick={() => navigate('/')}
              className="text-xl font-bold text-blue-600 cursor-pointer">
              🏥 RedNorte
            </span>
            <div className="hidden md:flex gap-6">
              {links.map((l) => (
                <button key={l.ruta} onClick={() => navigate(l.ruta)}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
              {user?.rol?.replace('_', ' ')}
            </span>
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button onClick={() => { logout(); navigate('/login'); }}
              className="text-sm text-red-500 hover:text-red-700 font-medium">
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};