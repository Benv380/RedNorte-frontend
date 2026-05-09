import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/common/PrivateRoute';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';

// Páginas públicas
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { HomePage } from './pages/public/HomePage';

// Paciente
import { PacienteDashboard } from './pages/paciente/PacienteDashboard';
import { MisSolicitudes } from './pages/paciente/MisSolicitudes';
import { MisCitas } from './pages/paciente/MisCitas';
import { MiPerfil } from './pages/paciente/MiPerfil';
import { NuevaSolicitud } from './pages/paciente/NuevaSolicitud';
import { DetalleCita } from './pages/paciente/DetalleCita';

// Funcionario
import { FuncionarioDashboard } from './pages/funcionario/FuncionarioDashboard';
import { AgendarHora } from './pages/funcionario/AgendarHora';
import { FichaReadOnly } from './pages/funcionario/FichaReadOnly';

// Médico
import { MedicoDashboard } from './pages/medico/MedicoDashboard';
import { HistoriaClinica } from './pages/medico/HistoriaClinica';
import { Examenes } from './pages/medico/Examenes';

// Admin Hospital
import { AdminHospitalDashboard } from './pages/admin/AdminHospitalDashboard';
import { GestionCuentas } from './pages/admin/GestionCuentas';
import { ListaEsperaGlobal } from './pages/admin/ListaEsperaGlobal';

// Admin Software
import { AdminSoftDashboard } from './pages/admin/AdminSoftDashboard';
import { GestionPermisos } from './pages/admin/GestionPermisos';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Público */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Paciente */}
          <Route
            element={
              <PrivateRoute allowedRoles={['PACIENTE']}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/paciente/dashboard" element={<PacienteDashboard />} />
            <Route path="/paciente/solicitudes" element={<MisSolicitudes />} />
            <Route path="/paciente/citas" element={<MisCitas />} />
            <Route path="/paciente/perfil" element={<MiPerfil />} />
            <Route path="/paciente/nueva-solicitud" element={<NuevaSolicitud />} />
            <Route path="/paciente/citas/:id" element={<DetalleCita />} />
          </Route>

          {/* Funcionario */}
          <Route
            element={
              <PrivateRoute allowedRoles={['FUNCIONARIO']}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/funcionario/dashboard" element={<FuncionarioDashboard />} />
            <Route path="/funcionario/agendar" element={<AgendarHora />} />
            <Route path="/funcionario/lista-espera" element={<ListaEsperaGlobal />} />
            <Route path="/funcionario/pacientes" element={<FichaReadOnly />} />
          </Route>

          {/* Médico */}
          <Route
            element={
              <PrivateRoute allowedRoles={['MEDICO']}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/medico/dashboard" element={<MedicoDashboard />} />
            <Route path="/medico/pacientes" element={<FichaReadOnly />} />
            <Route path="/medico/historia" element={<HistoriaClinica />} />
            <Route path="/medico/examenes" element={<Examenes />} />
          </Route>

          {/* Admin Hospital */}
          <Route
            element={
              <PrivateRoute allowedRoles={['ADMIN_HOSPITAL']}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="/admin/hospital/dashboard"
              element={<AdminHospitalDashboard />}
            />
            <Route
              path="/admin/hospital/lista-espera"
              element={<ListaEsperaGlobal />}
            />
            <Route
              path="/admin/hospital/cuentas"
              element={<GestionCuentas />}
            />
          </Route>

          {/* Admin Software */}
          <Route
            element={
              <PrivateRoute allowedRoles={['ADMIN_SOFTWARE']}>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="/admin/software/dashboard"
              element={<AdminSoftDashboard />}
            />
            <Route
              path="/admin/software/permisos"
              element={<GestionPermisos />}
            />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;