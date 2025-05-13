import { Card, CardActionArea, CardContent } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios.api';
import UsuarioDialog from "./components/UsuarioDialog";

export interface UsuarioProps {
    _id: string;
    nombre: string;
    email: string;
    roles: Array<string>
}

const UsuarioCard = ({ _id, nombre, email, roles }: UsuarioProps) => {

    const [showUsuarioDialog, setShowUsuarioDialog] = useState(false)

    return (
        <>
            <Card
                sx={{
                    borderTop: 15,
                    borderTopColor: "#56A42C",
                    width: '20rem'
                }}>
                <CardActionArea onClick={() => setShowUsuarioDialog(true)}
                >
                    <CardContent>
                        <h5>{nombre}</h5>
                        <p>{roles}</p>
                    </CardContent>
                </CardActionArea>
            </Card>

            <UsuarioDialog
                usuarioData={{ _id, nombre, email, roles }}
                showDialogState={{ showUsuarioDialog, setShowUsuarioDialog }}
            />
        </>
    )
}

const Usuarios = () => {
    const [listUsuarios, setListUsuarios] = useState<UsuarioProps[]>([])

    useEffect(() => {
        const getUsuariosList = async () => {

            const data = await getUsuarios();
            if (Array.isArray(data)) {
                setListUsuarios(data);
            }
        };
        getUsuariosList()
    }, [])


    const usuarios = listUsuarios.length ? (
        listUsuarios.map((usuario, index) => (
            <UsuarioCard
                _id={usuario._id}
                key={index}
                nombre={usuario.nombre}
                email={usuario.email}
                roles={usuario.roles}
            />
        ))
    ) : (
        <>
            <div>
                <h2>No hay usuarios</h2>
            </div>
        </>
    );

    return (
        <>
            {usuarios}
        </>
    )
}

export default Usuarios;