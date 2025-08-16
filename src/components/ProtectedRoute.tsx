// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Role, useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: Role[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && user && !roles.includes(user.role)) {
    // Si no tiene rol, lo mandamos al home/tracking
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;