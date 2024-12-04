
import React, { createContext, useState } from "react";

interface Usuario {
  nombre: string;
  email: string;
  password: string;
}

interface UserContextProps {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

export const UserContext = createContext<UserContextProps>({
  usuario: null,
  iniciarSesion: () => {},
  cerrarSesion: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const iniciarSesion = (usuario: Usuario) => {
    setUsuario(usuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UserContext.Provider>
  );
};
