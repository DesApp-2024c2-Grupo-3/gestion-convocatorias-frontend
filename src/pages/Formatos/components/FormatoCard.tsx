import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { FormatoProps } from "../Formatos";
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog";
import { CustomButton } from "@/components/CustomButton/CustomButtons";
import { btnAzulUnahur } from "@/components/CustomButton/buttonStyles";
import VisibilityIcon from '@mui/icons-material/Visibility';

const FormatoCard = ({ _id, nombreDelFormato, campos }: FormatoProps) => {

    const [showFormatoDialog, setShowFormatoDialog] = useState(false)


    return (

        <>

            {/*
        <>
            <Card
                sx={{
                    borderTop: 15,
                    borderTopColor: "#56A42C",
                    width: '20rem'
                }}>
                <CardActionArea
                    onClick={() => setShowFormatoDialog(true)}
                >
                    <CardContent>
                        <h5>{nombreDelFormato}</h5>
                    </CardContent>
                </CardActionArea>
            </Card>

            <FormatoDialog
                formatoData={{_id, nombreDelFormato, campos}}
                showDialogState={{showFormatoDialog, setShowFormatoDialog}}
            />
        </>

            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderTop: 5,
                    borderTopColor: "#56A42C",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: 4,
                    },
                }}
                elevation={2}
            >


                <CardContent sx={{ pb: 1 }}>
                    <Box>
                        <Typography variant="h5" sx={{}}>
                            {nombreDelFormato}
                        </Typography>
                        <Typography variant="caption">
                            Cantidad de campos: {campos.length}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button
                        onClick={() => { setShowFormatoDialog(true) }}>
                        Ver más
                    </Button>
                </CardActions>
            </Card>*/}

            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderTop: 5,
                    borderTopColor: "#56A42C",
                    height: "183px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px) scale(1.02)",
                        boxShadow: 4,
                    },
                }}
                elevation={2}
            >
                <CardContent sx={{ flex: 1, pb: 1 }}>
                    <Typography variant="h5" gutterBottom sx={{
                        overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', display: '-webkit-box'
                    }}>
                        {nombreDelFormato}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {`Cantidad de campos: ${campos.length}`}
                    </Typography>
                </CardContent>
                <Divider sx={{ my: 0.2 }} />

                <CardActions
                    sx={{ display:"flex", flexDirection:"row-reverse", px: 2 }}>
                    <CustomButton
                        iconoIzquierdo={<VisibilityIcon />}
                        nombre="Ver formato"
                        accion={() => { setShowFormatoDialog(true) }}
                        style={{ ...btnAzulUnahur, margin: 0 }}
                    />
                </CardActions>
            </Card>

            <FormatoDialog
                formatoData={{ _id, nombreDelFormato, campos }}
                showDialogState={{ showFormatoDialog, setShowFormatoDialog }}
            />
        </>
    )
}

export default FormatoCard;