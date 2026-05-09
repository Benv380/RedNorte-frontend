import { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LINKS_POR_ROL = {
  PACIENTE: [
    { label: 'Dashboard', ruta: '/paciente/dashboard' },
    { label: 'Mis Solicitudes', ruta: '/paciente/solicitudes' },
    { label: 'Mis Citas', ruta: '/paciente/citas' },
    { label: 'Mi Perfil', ruta: '/paciente/perfil' },
  ],
  FUNCIONARIO: [
    { label: 'Dashboard', ruta: '/funcionario/dashboard' },
    { label: 'Agendar Hora', ruta: '/funcionario/agendar' },
    { label: 'Lista de Espera', ruta: '/funcionario/lista-espera' },
    { label: 'Pacientes', ruta: '/funcionario/pacientes' },
  ],
  MEDICO: [
    { label: 'Dashboard', ruta: '/medico/dashboard' },
    { label: 'Mis Pacientes', ruta: '/medico/pacientes' },
    { label: 'Historia Clínica', ruta: '/medico/historia' },
    { label: 'Exámenes', ruta: '/medico/examenes' },
  ],
  ADMIN_HOSPITAL: [
    { label: 'Dashboard', ruta: '/admin/hospital/dashboard' },
    { label: 'Lista de Espera', ruta: '/admin/hospital/lista-espera' },
    { label: 'Cuentas', ruta: '/admin/hospital/cuentas' },
  ],
  ADMIN_SOFTWARE: [
    { label: 'Dashboard', ruta: '/admin/software/dashboard' },
    { label: 'Permisos', ruta: '/admin/software/permisos' },
    { label: 'Logs', ruta: '/admin/software/logs' },
  ],
};

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtenemos los links según el rol actual
  const linksPrivados = LINKS_POR_ROL[user?.rol] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* SECCIÓN IZQUIERDA: Logo y Navegación Dinámica */}
          <div className="flex items-center gap-8">
            <span 
              onClick={() => navigate(user ? `/${user.rol.toLowerCase()}/dashboard` : '/')}
              className="text-xl font-bold text-blue-600 cursor-pointer"
            >
              🏥 RedNorte
            </span>

            <div className="hidden md:flex gap-6">
              {user ? (
                // SI ESTÁ LOGUEADO: Solo links de su rol
                linksPrivados.map((l) => (
                  <button 
                    key={l.ruta} 
                    onClick={() => navigate(l.ruta)} 
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === l.ruta ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {l.label}
                  </button>
                ))
              ) : (
                // SI NO ESTÁ LOGUEADO: Links informativos
                <>
                  <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Inicio</Link>
                  <Link to="/quienes-somos" className="text-sm text-gray-600 hover:text-blue-600">Quiénes Somos</Link>
                  <Link to="/contacto" className="text-sm text-gray-600 hover:text-blue-600">Contacto</Link>
                </>
              )}
            </div>
          </div>

          {/* SECCIÓN DERECHA: Acciones Excluyentes */}
          <div className="flex items-center gap-4">
            {user ? (
              // VISTA CON SESIÓN: Info Usuario + Salir
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block border-r pr-4 border-gray-200">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
                    {user.rol?.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              // VISTA SIN SESIÓN: Iniciar / Registrar
              <div className="flex gap-2">
                <Link 
                  to="/login" 
                  className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === '/login' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === '/register' 
                    ? 'bg-blue-600 text-white' 
                    : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Registrarme
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};