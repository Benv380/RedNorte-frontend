import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/login" replace />;
  }

  // App.jsx usa PrivateRoute como wrapper con children (<MainLayout />)
  // así que renderizamos children, no <Outlet />
  return children;
};