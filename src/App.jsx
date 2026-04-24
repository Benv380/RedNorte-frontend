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
import { PrivateRoute } from './components/common/PrivateRoute';

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
          <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
            <Route path='/dashboard' element={<AdminDashboard />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;