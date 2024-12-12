
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
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const iniciarSesion = (usuario: Usuario) => {
    setUsuario(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token")
  };

  return (
    <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UserContext.Provider>
  );
};
