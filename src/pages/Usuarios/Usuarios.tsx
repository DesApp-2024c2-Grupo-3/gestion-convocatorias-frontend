import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Divider, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getUsuarios } from '../../api/usuarios.api';
import UsuarioDialog from "./components/UsuarioDialog";
import { CustomButton } from "../../components/CustomButton/CustomButtons";
import styles from "./usuarios.module.css"
import { btnAzulUnahur } from "@/components/CustomButton/buttonStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";

export interface UsuarioProps {
    _id: string;
    nombre: string;
    email: string;
    roles: Array<string>
}

export interface UsuarioCardProps extends UsuarioProps {
    onRefresh: () => void
}

const UsuarioCard = ({ _id, nombre, email, roles, onRefresh }: UsuarioCardProps) => {

    const [showUsuarioDialog, setShowUsuarioDialog] = useState(false)

    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderTop: 5,
                    borderTopColor: "#56A42C",
                    height: "150px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: 4,
                    },
                }}
                elevation={2}
            >
                <CardContent sx={{ flex: 1, pb: 1 }}>
                    <Typography variant="h5" gutterBottom>{nombre}</Typography>
                    <Typography variant="body2">{email}</Typography>
                </CardContent>
                <Divider sx={{ my: 0.2 }} />
                <CardActions
                    sx={{ display: "flex", flexDirection: "row-reverse", px: 2 }}>
                    <CustomButton
                        iconoIzquierdo={<VisibilityIcon />}
                        nombre="Ver usuario"
                        accion={() => { setShowUsuarioDialog(true) }}
                        style={{ ...btnAzulUnahur, margin: 0 }}
                    />
                </CardActions>
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
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        const getUsuariosList = async () => {
            setLoading(true)
            try {
                const data = await getUsuarios();
                if (Array.isArray(data)) {
                    const filteredUsers = data.filter(user => {
                        return !user.roles.includes("super_admin")
                    })
                    setListUsuarios(filteredUsers);
                }
            } catch (e) {
                setError("Ocurrió un error al cargar los usuarios")
                console.log(error)
            } finally {
                setLoading(false)
            }
        };
        getUsuariosList()
    }, [refreshKey])

    const getUsuariosPorRol = (rol: string) => {
        const usersFiltrados = listUsuarios.filter(usuario => usuario.roles.includes(rol))

        return usersFiltrados.length ? (
            usersFiltrados.map((users, index) => (
                <Grid item xs={12} md={3} key={users._id}>
                    <UsuarioCard
                        _id={users._id}
                        key={index}
                        nombre={users.nombre}
                        email={users.email}
                        roles={users.roles}
                        onRefresh={handleRefresh}
                    />
                </Grid>
            ))
        ) : (
            <Grid item>
            <Typography variant="body1">
                No existen usuarios con este rol
            </Typography>
            </Grid>
        );
    }

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Skeleton variant="text" width={300} height={40} />
                    <Skeleton variant="text" width={200} />
                </Box>
                <Grid container spacing={3}>
                    {[1, 2, 3, 4].map((item: number) => (
                        <Grid item xs={12} md={3} key={item}>
                            <Skeleton variant="rectangular" height={100} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        )
    }

    if (error) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography color="error" variant="h6" gutterBottom>
                        {error}
                    </Typography>
                    <CustomButton nombre="Reintentar" accion={() => window.location.reload()} />
                </Paper>
            </Container>
        )
    }


    return (
        <>
            {/*
            <div className={styles["listado-usuarios"]}>
                <div className={styles["container-listado"]}>
                    <h2>Investigadores</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("investigador")}
                    </div>
                </div>

                <div className={styles["container-listado"]}>
                    <h2>Admins</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("admin")}
                    </div>
                </div>

                <div className={styles["container-listado"]}>
                    <h2>Superadmins</h2>
                    <div className={styles["listado"]}>
                        {getUsuariosPorRol("super_admin")}
                    </div>
                </div>
            </div>
            <CustomButton
                nombre="prueba" 
                accion={() => investigadores(listUsuarios)}
            />*/}

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ mb: 3 }}>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4">
                        Usuarios
                    </Typography>
                    <Typography variant="body1">
                        {listUsuarios.length} usuarios en el sistema
                    </Typography>
                </Box>
                <Typography variant="h5" gutterBottom>
                    Investigador
                </Typography>
                <Grid container spacing={3} sx={{ mb: "35px" }}>
                    {getUsuariosPorRol("investigador")}
                </Grid>
                <Typography variant="h5" gutterBottom>
                    Administrador
                </Typography>
                <Grid container spacing={3} sx={{ mb: "35px" }}>
                    {getUsuariosPorRol("admin")}
                </Grid>
            </Container>
        </>
    )
}



export default Usuarios;