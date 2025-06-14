import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
}

/**
 * Interfaz que define el tipo del contexto del usuario.
 */
interface UserContextType {
  user: User | null; // Usuario actualmente autenticado o null si no hay sesión
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Actualizar el usuario
  reloadUser: () => void; // Recargar los datos del usuario desde el backend
  logout: () => void; // Cerrar sesión
}

// Crear el contexto con tipo genérico
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Componente proveedor del contexto de usuario.
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const reloadUser = () => {
    fetch('http://localhost:3000/auth/me', {
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  };

  const logout = () => {
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => setUser(null))
      .catch(() => setUser(null));
  };

  useEffect(() => {
    reloadUser(); // Carga automática del usuario al iniciar
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reloadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del usuario.
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};
