import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProyectosPorConvocatoria } from "../../api/proyectos.api";
import { getConvocatoriaById } from "../../api/convocatorias.api";
import {
    Typography,
    Grid,
    Container,
} from "@mui/material";
import PostulacionesCard from "./PostulacionesCard";

interface Proyecto {
    _id: string;
    titulo: string;
    descripcion: string;
    equipo: string[];
}

const PostulacionesPage = () => {
    const { idConvocatoria } = useParams();
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [tituloConvocatoria, setTituloConvocatoria] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (idConvocatoria) {
                try {
                    const [data, convocatoria] = await Promise.all([
                        getProyectosPorConvocatoria(idConvocatoria),
                        getConvocatoriaById(idConvocatoria)
                    ]);

                    // Procesar proyectos
                    if (Array.isArray(data)) {
                        const proyectosTransformados = data.map((proyecto: any) => {
                            const titulo = proyecto.camposExtra?.["Titulo del proyecto"] || "Sin título";
                            const descripcion = proyecto.camposExtra?.["Objetivo general"] || "Sin descripción";
                            const autor = proyecto.autor || "Autor desconocido";
                            const invitados = Array.isArray(proyecto.invitados)
                                ? proyecto.invitados.map((i: any) => i.nombre || i)
                                : [];

                            return {
                                _id: proyecto._id,
                                titulo,
                                descripcion,
                                equipo: [autor, ...invitados],
                            };
                        });

                        setProyectos(proyectosTransformados);
                    } else {
                        setProyectos([]);
                    }

                    setTituloConvocatoria(convocatoria.titulo || "Convocatoria sin título");
                } catch (error: any) {
                    console.error("Error al obtener los datos:", error);
                    setError("Hubo un error al cargar los datos.");
                }
            }
        };

        fetchData();
    }, [idConvocatoria]);

    if (error) return <Typography color="error">{error}</Typography>;
    if (proyectos.length === 0) return <Typography>No hay postulaciones para esta convocatoria.</Typography>;

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Postulaciones para: {tituloConvocatoria || "Cargando..."}
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {proyectos.map((proyecto) => (
                    <Grid item xs={12} md={6} key={proyecto._id}>
                        <PostulacionesCard
                            titulo={proyecto.titulo}
                            descripcion={proyecto.descripcion}
                            equipo={proyecto.equipo}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PostulacionesPage;
