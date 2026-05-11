import { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LINKS_POR_ROL = {
  PACIENTE: [
    { label: 'Dashboard',       ruta: '/paciente/dashboard' },
    { label: 'Mis Solicitudes', ruta: '/paciente/solicitudes' },
    { label: 'Mis Citas',       ruta: '/paciente/citas' },
    { label: 'Mi Perfil',       ruta: '/paciente/perfil' },
  ],
  FUNCIONARIO: [
    { label: 'Dashboard',       ruta: '/funcionario/dashboard' },
    { label: 'Agendar Hora',    ruta: '/funcionario/agendar' },
    { label: 'Lista de Espera', ruta: '/funcionario/lista-espera' },
    { label: 'Pacientes',       ruta: '/funcionario/pacientes' },
  ],
  MEDICO: [
    { label: 'Dashboard',        ruta: '/medico/dashboard' },
    { label: 'Historia Clínica', ruta: '/medico/historia' },
    { label: 'Exámenes',         ruta: '/medico/examenes' },
    { label: 'Mis Pacientes',    ruta: '/medico/pacientes' },
  ],
  ADMIN_HOSPITAL: [
    { label: 'Dashboard',       ruta: '/admin/hospital/dashboard' },
    { label: 'Lista de Espera', ruta: '/admin/hospital/lista-espera' },
    { label: 'Cuentas',         ruta: '/admin/hospital/cuentas' },
  ],
  ADMIN_SOFTWARE: [
    { label: 'Dashboard', ruta: '/admin/software/dashboard' },
    { label: 'Permisos',  ruta: '/admin/software/permisos' },
  ],
};

const LINKS_PUBLICOS = [
  { label: 'Inicio',        ruta: '/' },
  { label: 'Quiénes Somos', ruta: '/quienes-somos' },
  { label: 'Contacto',      ruta: '/contacto' },
];

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const links = user ? (LINKS_POR_ROL[user.rol] ?? []) : LINKS_PUBLICOS;

  const handleLogout = () => {
    logout();
    setMenuAbierto(false);
    navigate('/');
  };

  const homePath = user ? `/${user.rol.toLowerCase().replace('_', '/')}/dashboard` : '/';

  const isActive = (ruta) => location.pathname === ruta;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => { navigate(homePath); setMenuAbierto(false); }}
              className="text-xl font-bold text-blue-600 flex items-center gap-1"
            >
              RedNorte
            </button>

            {/* Links escritorio */}
            <div className="hidden md:flex gap-1">
              {links.map(l => (
                <button
                  key={l.ruta}
                  onClick={() => navigate(l.ruta)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(l.ruta)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Acciones escritorio */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right border-r pr-4 border-gray-200">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-tight">
                    {user.rol?.replace('_', ' ')}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                    {user.especialidad && (
                    <p className="text-xs text-gray-400 italic">{user.especialidad}</p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/login') ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className={`text-sm px-4 py-2 rounded-lg font-medium border transition-all ${
                    isActive('/register') ? 'bg-blue-600 text-white border-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Registrarme
                </Link>
              </div>
            )}
          </div>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setMenuAbierto(v => !v)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            {menuAbierto ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map(l => (
              <button
                key={l.ruta}
                onClick={() => { navigate(l.ruta); setMenuAbierto(false); }}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(l.ruta)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-gray-50 rounded-lg">
                  <p className="text-xs font-bold text-blue-600 uppercase">{user.rol?.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMenuAbierto(false)}
                  className="block text-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuAbierto(false)}
                  className="block text-center px-4 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  Registrarme
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
