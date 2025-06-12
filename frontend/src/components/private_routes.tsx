import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement; // Usa React.ReactElement en lugar de JSX.Element
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/acceso-denegado" />;
}
