import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import React, { FormEvent, useContext, useState } from "react";
import { ConvocatoriaCardProps } from "./ConvocatoriaCard";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { Link } from "react-router-dom";
import { btnAzulUnahur, btnRojo, btnVerdeUnahur } from "../../../components/CustomButton/buttonStyles";
import { getFormatoById } from "../../../api/formatos.api";
import { putConvocatoria, getArchivoDeConvocatoria } from "../../../api/convocatorias.api";
import toast from "react-hot-toast";
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog";
import { ControlDeAcceso, FunctionControlDeAcceso } from "../../../components/ControlDeAcceso/ControlDeAcceso";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Login/userContext";
import { PictureAsPdf } from "@mui/icons-material";

interface ConvocatoriaDialogProps {
    convocatoriaData: ConvocatoriaCardProps
    showDialogState: showDialogStateProps
    fechaFinState: fechaFinStateProps
}

interface fechaFinStateProps {
    editableFechaFin: Date;
    setEditableFechaFin: React.Dispatch<React.SetStateAction<Date>>;
}

interface showDialogStateProps {
    showDialog: boolean
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}


const ConvocatoriaDialog = ({ convocatoriaData, showDialogState, fechaFinState }: ConvocatoriaDialogProps) => {
    const navigate = useNavigate();
    const [fechaFinPicker, setFechaFinPicker] = useState<Dayjs | null>(dayjs(fechaFinState.editableFechaFin).tz("America/Argentina/Buenos_Aires"))
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [formatoData, setFormatoData] = useState({
        _id: '',
        nombreDelFormato: '',
        campos: []
    })
    const [showFormatoDialog, setShowFormatoDialog] = useState(false)
    const { usuario } = useContext(UserContext)

    const handleClose = () => {
        //set fecha porque si se sale del dialog antes de guardar
        //En el back no se actualiza pero en el front queda la fecha nueva (bug visual)
        setFechaFinPicker(
            dayjs(fechaFinState.editableFechaFin).tz("America/Argentina/Buenos_Aires")
        )
        setShowSubmitButton(false)
        showDialogState.setShowDialog(false)
    }

    const handleOpenDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };


    const submitNewFechaFin = async () => {
        try {
            let fecha
            const formData = new FormData()
            if (fechaFinPicker) {
                fecha = fechaFinPicker.toDate()
                formData.append("fechaFin", fecha.toISOString())
            } else {
                throw new Error("Fecha Fin es null")
            }

            await putConvocatoria(
                convocatoriaData.idConvocatoria,
                formData
            )

            fechaFinState.setEditableFechaFin(fechaFinPicker.toDate())
            toast.success("Fecha actualizada correctamente")
        } catch (error) {
            toast.error("Error al actualizar la fecha")
            console.log(error)
        }
    }

    return (
        <>
        <Dialog
            open={showDialogState.showDialog}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#56A42C",
                    color: 'white'
                }}
            >{convocatoriaData.titulo}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 12,
                    color: 'white'
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <p className="convocatoria-descripcion">{convocatoriaData.descripcion}</p>
                <div className="convocatoria-fechas">
                    <p>
                        Fecha inicio de la convocatoria: {convocatoriaData.fechaInicio.toLocaleString()}
                    </p>
                    <div className="convocatoria-fecha-editable">
                    <p>
                        Fecha fin de la convocatoria:
                    </p>
                    { FunctionControlDeAcceso(["admin", "super_admin"], usuario?.roles?? []) ?
                        <>
                        <DateTimePicker
                            value={fechaFinPicker}
                            onChange={(newValue) => {
                                setFechaFinPicker(newValue)
                                setShowSubmitButton(true)
                            }}
                        />
                        {showSubmitButton &&
                            <IconButton
                                sx={{
                                    backgroundColor: "#56A42C",
                                    borderRadius: "20%",
                                    ":hover": {
                                        backgroundColor: "#417c21"
                                    }
                                }}
                                onClick={submitNewFechaFin}
                            >
                                <SaveAsIcon sx={{ color: 'white' }} />
                            </IconButton>
                        }
                        </> : convocatoriaData.fechaFin.toLocaleString()
                    }
                    </div>

                </div>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    nombre="Ver Formato"
                    accion={async () => {
                        const formato = await getFormatoById(convocatoriaData.formato)
                        setFormatoData(formato)
                        setShowFormatoDialog(true)
                    }}
                    style={{...btnAzulUnahur, margin: 0 }}
                />

                <CustomButton
                    nombre="bases y condiciones"
                    accion={() => getArchivoDeConvocatoria(convocatoriaData.idConvocatoria)}
                    iconoIzquierdo={<PictureAsPdf />}
                    style={{...btnAzulUnahur, margin: 0 }}
                />

                {/*
                <ControlDeAcceso rolesPermitidos={["admin", "super_admin"]}>
                    <CustomButton
                        nombre="Borrar"
                        iconoIzquierdo={<DeleteIcon />}
                        style={btnRojo}
                        accion={handleOpenDeleteConfirmation}
                    />
                </ControlDeAcceso>*/}
                
                <ControlDeAcceso rolesPermitidos={["investigador"]}>
                <Button
                    variant="contained"
                    component={Link}
                    to={`/convocatorias/${convocatoriaData.idConvocatoria}/inscripcion/${convocatoriaData.formato}`}
                    sx={{ backgroundColor: "#56A42C" }}
                >Inscribirse</Button>
                </ControlDeAcceso>

                <ControlDeAcceso rolesPermitidos={["admin"]}>
                    <CustomButton
                        nombre="Ver postulaciones"
                        accion={() => navigate(`/convocatorias/${convocatoriaData.idConvocatoria}/postulaciones`)}
                        style={{...btnAzulUnahur, margin: 0 }}
                    >
                    </CustomButton>
                </ControlDeAcceso>
            </DialogActions>

        </Dialog>
        
            <FormatoDialog 
                formatoData={formatoData}
                showDialogState={{showFormatoDialog, setShowFormatoDialog}}
            />
            
        </>
    )

}

export default ConvocatoriaDialog