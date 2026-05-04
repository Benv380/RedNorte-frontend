// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'sonner';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/public/HomePage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { PacienteDashboard } from './pages/paciente/PacienteDashboard';
import { MisSolicitudes } from './pages/paciente/MisSolicitudes';
import { MisCitas } from './pages/paciente/MisCitas';
import { MiPerfil } from './pages/paciente/MiPerfil';
import { PrivateRoute } from './components/common/PrivateRoute';
import { NuevaSolicitud } from './pages/paciente/NuevaSolicitud';
import { DetalleCita } from './pages/paciente/DetalleCita';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position='top-right' richColors />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path='/paciente/dashboard' element={<PacienteDashboard />} />
            <Route path='/paciente/solicitudes' element={<MisSolicitudes />} />
            <Route path='/paciente/citas' element={<MisCitas />} />
            <Route path='/paciente/perfil' element={<MiPerfil />} />
            <Route path='/paciente/nueva-solicitud' element={<NuevaSolicitud />} />
            <Route path='/paciente/citas/:id' element={<DetalleCita />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;