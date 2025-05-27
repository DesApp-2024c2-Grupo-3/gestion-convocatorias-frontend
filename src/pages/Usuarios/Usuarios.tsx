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

export interface UsuarioCardProps extends UsuarioProps{
    onRefresh: () => void
}

const UsuarioCard = ({ _id, nombre, email, roles, onRefresh }: UsuarioCardProps) => {

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
                        <p>{roles.join(", ")}</p>
                    </CardContent>
                </CardActionArea>
            </Card>

            <UsuarioDialog
                usuarioData={{ _id, nombre, email, roles }}
                showDialogState={{ showUsuarioDialog, setShowUsuarioDialog }}
                onRefresh={onRefresh}
            />
        </>
    )
}

const Usuarios = () => {
    const [listUsuarios, setListUsuarios] = useState<UsuarioProps[]>([])

    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        const getUsuariosList = async () => {

            const data = await getUsuarios();
            if (Array.isArray(data)) {
                setListUsuarios(data);
            }
        };
        getUsuariosList()
    }, [refreshKey])

    const usuarios = listUsuarios.length ? (
        listUsuarios.map((usuario, index) => (
            <UsuarioCard
                _id={usuario._id}
                key={index}
                nombre={usuario.nombre}
                email={usuario.email}
                roles={usuario.roles}
                onRefresh={handleRefresh}
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