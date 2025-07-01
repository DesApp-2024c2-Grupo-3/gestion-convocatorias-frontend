import React, { useEffect, useState } from "react";
import { getConvocatorias } from "../../api/convocatorias.api";
import Convocatoria from "../../components/convocatoria/Convocatoria";
import ConvocatoriaCard from "./components/ConvocatoriaCard";
import { Box, Breadcrumbs, Grid, Link, Link as MuiLink, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Container } from "@mui/material";

interface Convocatoria {
    _id:string
    titulo:string,
    descripcion:string,
    fechaInicio: Date,
    fechaFin: Date
    formato: string
}

const ConvocatoriasPage = () => {

    const [listConvocatorias, setListConvocatorias] = useState<Convocatoria[]>([])

    useEffect( () => {
        const getConvocatoria = async () => {

            const data = await getConvocatorias();
            if (Array.isArray(data)) {
                setListConvocatorias(data);
            }
        } ;
        getConvocatoria()
    }, [])

    return (
        <>
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 3 }}>
        </Box>
        <Box sx={{ mb: 4 }}>
        <Typography variant="h4">
            Convocatorias
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {listConvocatorias.length === 1 ? "1 convocatoria disponible" : listConvocatorias.length + " convocatorias disponibles"}
        </Typography>
        </Box>

        <Grid container spacing={3}>
            {listConvocatorias.map((convoc, index) => (
            <Grid item xs={12} md={6} key={convoc._id}>
                <ConvocatoriaCard
                idConvocatoria={convoc._id}
                key={index}
                titulo={convoc.titulo}
                descripcion={convoc.descripcion}
                fechaInicio={new Date(convoc.fechaInicio)}
                fechaFin={new Date(convoc.fechaFin)}
                formato={convoc.formato}
                />
              </Grid> 
            ))}
          </Grid>
          </Container>
        </>
    )
}

export default ConvocatoriasPage;