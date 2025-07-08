import React from "react";
import { Dialog as MuiDialog } from "@mui/material";
import { DialogTitle, DialogAction, DialogContextConvocatoria } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { greenButton, blueButton } from "@/components/atoms/button/button.styles";
import { Visibility, PictureAsPdf, HowToReg, ListAlt } from "@mui/icons-material";
import { ConvocatoriaCardProps } from "@/pages/ConvocatoriasPage/components/ConvocatoriaCard";
import { dialog } from "./dialogConvocatoria_.styles";
import dayjs, { Dayjs } from "dayjs";


interface DialogConvocatoriaProps {
    convocatoriaData: ConvocatoriaCardProps
    showDialogState: showDialogStateProps
    fechaFinState: fechaFinStateProps
    handleClose: () => void
    isAdmin: boolean
    showSubmitButton: boolean
    setShowSubmitButton: React.Dispatch<React.SetStateAction<boolean>>
    submitNewFechaFin: () => void
    onVerFormato?: () => void;
    onBasesCondiciones?: () => void;
    onVerPostulaciones?: () => void;
    onInscribirse?: () => void;
}

interface fechaFinStateProps {
    editableFechaFin: Dayjs;
    setEditableFechaFin: React.Dispatch<React.SetStateAction<Dayjs>>;
}

interface showDialogStateProps {
    showDialog: boolean
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}


const DialogConvocatoria = ({
    convocatoriaData,
    showDialogState,
    fechaFinState,
    handleClose,
    isAdmin = false,
    showSubmitButton = false,
    setShowSubmitButton = () => { },
    submitNewFechaFin = () => { },
    onVerFormato = () => { },
    onBasesCondiciones = () => { },
    onVerPostulaciones = () => { },
    onInscribirse = () => { },
}: DialogConvocatoriaProps) => {

    return (
        <MuiDialog
            open={showDialogState.showDialog}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={dialog}
        >
            <DialogTitle title={convocatoriaData.titulo} handleClose={() => showDialogState.setShowDialog(false)} />
            <DialogContextConvocatoria
                convocatoriaData={convocatoriaData}
                isAdmin={isAdmin}
                fechaFinPicker={dayjs(fechaFinState.editableFechaFin)}
                setFechaFinPicker={(newDayjs) => {
                    fechaFinState.setEditableFechaFin(newDayjs ? newDayjs : dayjs(convocatoriaData.fechaFin));
                }}
                showSubmitButton={showSubmitButton}
                setShowSubmitButton={setShowSubmitButton}
                submitNewFechaFin={submitNewFechaFin}
            />
            <DialogAction>
                <Button
                    label="Ver Formato"
                    sx={blueButton}
                    startIcon={<Visibility />}
                    onClick={onVerFormato}
                />
                <Button
                    label="Bases y Condiciones"
                    sx={blueButton}
                    startIcon={<PictureAsPdf />}
                    onClick={onBasesCondiciones}
                />
                {isAdmin ? (
                    <Button
                        label="Ver Postulaciones"
                        sx={blueButton}
                        startIcon={<ListAlt />}
                        onClick={onVerPostulaciones}
                    />
                ) : (
                    <Button
                        label="Inscribirse"
                        sx={greenButton}
                        startIcon={<HowToReg />}
                        onClick={onInscribirse}
                    />
                )}
            </DialogAction>
        </MuiDialog>
    )
}

export default DialogConvocatoria;

