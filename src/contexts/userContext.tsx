import React, { createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";

interface Cv {
  nombre: string;
  tipo: string;
  contenido: string
}

interface Usuario {
  _id: number,
  nombre: string;
  email: string;
  password: string;
  roles: string[];
  cv: Cv | null
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

    useEffect(() => {
        const usuarioGuardado = sessionStorage.getItem("usuario");
        if (usuarioGuardado) {
          setUsuario(JSON.parse(usuarioGuardado));
        } else {
          setUsuario(null);
        }
    }, []);

    const iniciarSesion = (usuario: Usuario) => {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
        setUsuario(usuario);
    };

    const cerrarSesion = () => {
        sessionStorage.removeItem("usuario");
        sessionStorage.removeItem("token");
        setUsuario(null);
    };

    return (
      <UserContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
          {children}
      </UserContext.Provider>
    );
};
