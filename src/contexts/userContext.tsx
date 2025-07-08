import React, { createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";

interface Cv {
  nombre: string;
  tipo: string;
  contenido: string;
}

interface Usuario {
  _id: number;
  nombre: string;
  email: string;
  password: string;
  roles: string[];
  cv: Cv | null;
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
    try {
      const guardado = sessionStorage.getItem("usuario");
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  const iniciarSesion = (usuario: Usuario) => {
    console.log("iniciarSesion llamado con:", usuario);
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const cerrarSesion = () => {
    console.log("ANTES:", sessionStorage.getItem("usuario"));
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
    console.log("DESPUÉS:", sessionStorage.getItem("usuario")); 
    setUsuario(null);
  };

  return (
    <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UserContext.Provider>
  );
};
