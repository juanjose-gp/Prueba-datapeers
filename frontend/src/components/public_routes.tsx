// src/components/public_routes.tsx
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { isAuthenticated } from '../auth/vf_token'; // Asegúrate de que el path sea correcto

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}
