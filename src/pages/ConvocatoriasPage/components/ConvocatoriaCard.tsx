import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";
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
        sx={{
            borderTop: 5,
            borderTopColor: "#56A42C",
            width: {
                xs: '25rem',
                md: '500px'
            },
            height: "330px",
        }}>
            <CardContent>
                <h5>{titulo}</h5>
                <p>{descripcion}</p>
                <h6>Inscripcion hasta: {editableFechaFin.toLocaleDateString()}</h6>
            </CardContent>
            <CardActions
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse'
            }}>
                <CustomButton
                    nombre="Ver Más"
                    accion={() => {setShowDialog(true)}}
                    style={{...btnAzulUnahur, margin: 0 }}
                />
            </CardActions>
        </Card>

        <ConvocatoriaDialog 
            convocatoriaData={props} 
            showDialogState={{showDialog, setShowDialog}}
            fechaFinState={{editableFechaFin, setEditableFechaFin}}
        />
        </>

    )
}

export default ConvocatoriasCard