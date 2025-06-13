import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { isAuthenticated } from '../auth/vf_token';

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
      setAuthChecked(true);
    };
    checkAuth();
  }, []);

  if (!authChecked) return null; // o un loader/spinner

  return isAuth ? <Navigate to="/layout" replace /> : <>{children}</>;
}
