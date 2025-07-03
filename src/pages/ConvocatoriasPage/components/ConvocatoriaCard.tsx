import { Box, Card, CardActionArea, CardActions, CardContent, Divider, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import React, { useState } from "react";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import ConvocatoriaDialog from "./ConvocatoriaDialog";
import { btnAzulUnahur } from "@/components/CustomButton/buttonStyles";

export interface ConvocatoriaCardProps {
    idConvocatoria: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    formato: string;
}

const ConvocatoriasCard = (props: ConvocatoriaCardProps) => {

    const {
        idConvocatoria,
        titulo,
        descripcion,
        fechaInicio,
        fechaFin,
        formato
    } = props

    const [editableFechaFin, setEditableFechaFin] = useState(fechaFin);
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <Card
                /*sx={{
                    borderTop: 5,
                    borderTopColor: "#56A42C",
                    width: {
                        xs: '25rem',
                        md: '500px'
                    },
                    height: "330px",
                }}*/
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderTop: 5,
                    borderTopColor: "#56A42C",
                    height: "330px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: 4,
                    },
                }}
                elevation={2}
            >
                <CardContent sx={{ flex: 1, pb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{}}>
                        {titulo}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{
                        overflow: 'hidden', WebkitLineClamp: 9, WebkitBoxOrient: 'vertical', display: '-webkit-box'
                    }}>
                        {descripcion}
                    </Typography>
                </CardContent>
                <Divider sx={{ my: 1.5 }} />

                <CardActions
                    sx={{ justifyContent: "space-between", px: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarTodayIcon sx={{ color: "text.secondary", mr: 1.5 }} />
                        <Typography>
                            Inscripción hasta: {editableFechaFin.toLocaleDateString()}
                        </Typography>
                    </Box>
                    <CustomButton
                        nombre="Ver Más"
                        accion={() => { setShowDialog(true) }}
                        style={{ ...btnAzulUnahur, margin: 0 }}
                    />
                </CardActions>
            </Card>

            <ConvocatoriaDialog
                convocatoriaData={props}
                showDialogState={{ showDialog, setShowDialog }}
                fechaFinState={{ editableFechaFin, setEditableFechaFin }}
            />
        </>

    )
}

export default ConvocatoriasCard