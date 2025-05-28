import React from "react";
import { Card, CardContent, Typography, Divider, Stack, Paper, Grid } from "@mui/material";
import { CustomButton } from "../../components/CustomButton/CustomButtons";


interface Props {
    titulo: string
    descripcion: string
    equipo: string[]
    fechaCreacion?: string
    estado?: "pendiente" | "aprobado" | "rechazado"
    categoria?: string
    onVerDetalles?: () => void
}
interface Props {
    titulo: string;
    descripcion: string;
    equipo: string[];
}

const PostulacionesCard = ({ titulo, descripcion, equipo,  }: Props) => {

    
    return (
        <Card
        sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: 5,
            borderTopColor: "#56A42C",
            height: 300, 
            padding: 2, 
        }}
        >
        <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
                {titulo}
            </Typography>

            <Typography variant="body2" paragraph>
                {descripcion}
            </Typography>

            <Typography variant="body2" fontWeight="bold" gutterBottom>
                Equipo:
            </Typography>

            <Grid container spacing={1}>
            {equipo.map((email, index) => (
                <Grid item xs={6} key={index}>
                    <Paper sx={{ 
                        padding: 1,
                        borderLeft: 3,
                        borderLeftColor: "#56A42C", }}>
                        <Typography variant="body2">{email}</Typography>
                    </Paper>
                </Grid>
            ))}
            </Grid>
        </CardContent>
    </Card>
    );
};

export default PostulacionesCard;