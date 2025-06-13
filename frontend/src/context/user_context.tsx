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
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Función para actualizar el estado del usuario
  reloadUser: () => void; // Función para recargar los datos del usuario desde el backend
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Componente que da el contexto del usuario.
 *
 * Este componente debe envolver la aplicación o al menos las partes
 * que necesitan acceso al estado de autenticación del usuario.
 *
 * @param {React.ReactNode} children - 
 * @returns {JSX.Element} 
 */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  /**
   * Función que consulta el endpoint para obtener los datos del usuario autenticado.
   * Actualiza el estado `user` con los datos recibidos o lo establece como `null` si hay error.
   */
  const reloadUser = () => {
    fetch('http://localhost:3000/auth/me', {
      credentials: 'include', // Incluye cookies HttpOnly en la solicitud
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null)); // En caso de error de red, establecer user en null
  };

  // Al montar el componente, se intenta cargar los datos del usuario automáticamente
  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook para acceder fácilmente al contexto del usuario.
 *
 * @returns {UserContextType} El contexto del usuario, incluyendo los datos, setter y función de recarga.
 * @throws {Error} Si el hook se usa fuera del `UserProvider`.
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};
