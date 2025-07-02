import {
    Box,
    Stack,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SaveAsIcon from "@mui/icons-material/SaveAs"
import React, { useContext, useState } from "react"
import { ConvocatoriaCardProps } from "./ConvocatoriaCard"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { CustomButton } from "../../../components/CustomButton/CustomButtons"
import { Link, useNavigate } from "react-router-dom"
import { btnAzulUnahur, } from "../../../components/CustomButton/buttonStyles"
import { getFormatoById } from "../../../api/formatos.api"
import {
    putConvocatoria,
    getArchivoDeConvocatoria,
} from "../../../api/convocatorias.api"
import toast from "react-hot-toast"
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog"
import {
    ControlDeAcceso,
    FunctionControlDeAcceso,
} from "../../../components/ControlDeAcceso/ControlDeAcceso"
import { UserContext } from "@/contexts/userContext"
import { PictureAsPdf } from "@mui/icons-material"

interface ConvocatoriaDialogProps {
    convocatoriaData: ConvocatoriaCardProps
    showDialogState: showDialogStateProps
    fechaFinState: fechaFinStateProps
}

interface fechaFinStateProps {
    editableFechaFin: Date
    setEditableFechaFin: React.Dispatch<React.SetStateAction<Date>>
}

interface showDialogStateProps {
    showDialog: boolean
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const ConvocatoriaDialog = ({
    convocatoriaData,
    showDialogState,
    fechaFinState,
}: ConvocatoriaDialogProps) => {
    const navigate = useNavigate()
    const [fechaFinPicker, setFechaFinPicker] = useState<Dayjs | null>(
        dayjs(fechaFinState.editableFechaFin).tz("America/Argentina/Buenos_Aires")
    )
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [formatoData, setFormatoData] = useState({
        _id: "",
        nombreDelFormato: "",
        campos: [],
    })
    const [showFormatoDialog, setShowFormatoDialog] = useState(false)
    const { usuario } = useContext(UserContext)

    const isAdmin = FunctionControlDeAcceso(["admin", "super_admin"], usuario?.roles ?? [])

    const handleClose = () => {
        setFechaFinPicker(
        dayjs(fechaFinState.editableFechaFin).tz("America/Argentina/Buenos_Aires")
        )
        setShowSubmitButton(false)
        showDialogState.setShowDialog(false)
    }

    const submitNewFechaFin = async () => {
        try {
        if (!fechaFinPicker) throw new Error("Fecha Fin es null")

        const formData = new FormData()
        const fecha = fechaFinPicker.toDate()
        formData.append("fechaFin", fecha.toISOString())

        await putConvocatoria(convocatoriaData.idConvocatoria, formData)

        fechaFinState.setEditableFechaFin(fecha)
        toast.success("Fecha actualizada correctamente")
        setShowSubmitButton(false)
        } catch (error) {
        toast.error("Error al actualizar la fecha")
        console.error(error)
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
                color: "white",
                fontWeight: 600,
            }}
            >
            {convocatoriaData.titulo}
            </DialogTitle>

            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: "absolute",
                right: 12,
                top: 12,
                color: "white",
            }}
            >
            <CloseIcon />
            </IconButton>

            <DialogContent dividers sx={{ px: 3, py: 2 }}>
                <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
                    {convocatoriaData.descripcion}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" alignItems="center" >
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#444", minWidth: "95px" }}>
                        Fecha inicio:
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#444" }}>
                        {convocatoriaData.fechaInicio.toLocaleString()}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mt={1} flexWrap="wrap">
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#444", minWidth: "75px" }}>
                    Fecha fin:
                </Typography>
                {isAdmin ? (
                    <>
                    <DateTimePicker
                        value={fechaFinPicker}
                        onChange={(newValue) => {
                        setFechaFinPicker(newValue)
                        setShowSubmitButton(true)
                        }}
                        slotProps={{
                        textField: {
                            size: "small",
                            sx: { minWidth: 200 },
                        },
                        }}
                    />
                    {showSubmitButton && (
                        <IconButton
                        sx={{
                            backgroundColor: "#56A42C",
                            borderRadius: "8px",
                            width: 36,
                            height: 36,
                            "&:hover": {
                            backgroundColor: "#417c21",
                            },
                        }}
                        onClick={submitNewFechaFin}
                        >
                        <SaveAsIcon sx={{ color: "white", fontSize: "1.1rem" }} />
                        </IconButton>
                    )}
                    </>
                ) : (
                    <>
                    <Typography variant="body2" sx={{ color: "#444" }}>
                        {convocatoriaData.fechaFin.toLocaleString()}
                    </Typography>
                    <Box sx={{ minWidth: 200, height: 40, visibility: "hidden" }} />
                    <Box sx={{ width: 36, height: 36, visibility: "hidden" }} />
                    </>
                )}
                </Box>
            </DialogContent>


            <DialogActions sx={{ p: 2.5, gap: 1, backgroundColor: "#fafafa" }}>
            <CustomButton
                nombre="Ver Formato"
                accion={async () => {
                const formato = await getFormatoById(convocatoriaData.formato)
                setFormatoData(formato)
                setShowFormatoDialog(true)
                }}
                style={{ ...btnAzulUnahur, margin: 0, borderRadius: "8px" }}
            />

            <CustomButton
                nombre="Bases y Condiciones"
                accion={() => getArchivoDeConvocatoria(convocatoriaData.idConvocatoria)}
                iconoIzquierdo={<PictureAsPdf />}
                style={{ ...btnAzulUnahur, margin: 0, borderRadius: "8px" }}
            />

            <ControlDeAcceso rolesPermitidos={["investigador"]}>
                <Button
                variant="contained"
                component={Link}
                to={`/convocatorias/${convocatoriaData.idConvocatoria}/inscripcion/${convocatoriaData.formato}`}
                sx={{
                    background: "#56A42C",
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 3,
                    "&:hover": {
                    backgroundColor: "#417c21",
                    },
                }}
                >
                INSCRIBIRSE
                </Button>
            </ControlDeAcceso>

            <ControlDeAcceso rolesPermitidos={["admin"]}>
                <CustomButton
                nombre="Ver Postulaciones"
                accion={() =>
                    navigate(`/convocatorias/${convocatoriaData.idConvocatoria}/postulaciones`)
                }
                style={{ ...btnAzulUnahur, margin: 0, borderRadius: "8px" }}
                />
            </ControlDeAcceso>
            </DialogActions>
        </Dialog>
        <FormatoDialog
            formatoData={formatoData}
            showDialogState={{ showFormatoDialog, setShowFormatoDialog }}
        />
        </>
    )
}

export default ConvocatoriaDialog
