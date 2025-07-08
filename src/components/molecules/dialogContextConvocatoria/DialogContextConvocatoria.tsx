import React from "react";
import { DialogContent as MuiDialogContent, Typography as MuiTypography, Divider as MuiDivider, Box as MuiBox } from "@mui/material";
import {
    dialogContent,
    descripcionText,
    divider,
    infoRow,
    labelText,
    valueText,
    fechaFinLabel,
    invisibleBox,
    invisibleBoxSmall,
    iconButtonSave,
} from "./dialogContextConvocatoria.styles";
import { ConvocatoriaCardProps } from "@/pages/ConvocatoriasPage/components/ConvocatoriaCard";
import DateTimePicker from "@/components/atoms/dateTimePicker/DateTimePicker";
import { IconButton as MuiIconButton } from "@mui/material";
import { SaveAs } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

interface DialogContextConvocatoriaProps {
    convocatoriaData: ConvocatoriaCardProps;
    isAdmin: boolean;
    fechaFinPicker?: Dayjs | null; // Cambiar el tipo
    setFechaFinPicker?: (value: Dayjs | null) => void; // Cambiar el tipo
    showSubmitButton?: boolean;
    setShowSubmitButton?: (value: boolean) => void;
    submitNewFechaFin?: () => void;
}

const DialogContextConvocatoria = ({
    convocatoriaData,
    isAdmin = false,
    fechaFinPicker,
    setFechaFinPicker,
    showSubmitButton = false,
    setShowSubmitButton = () => { },
    submitNewFechaFin = () => { }
}: DialogContextConvocatoriaProps) => {
    const currentFechaFin = fechaFinPicker || dayjs(convocatoriaData.fechaFin);

    return (
        <MuiDialogContent dividers sx={dialogContent}>
            <MuiTypography variant="body1" sx={descripcionText}>
                {convocatoriaData.descripcion}
            </MuiTypography>

            <MuiDivider sx={divider} />

            <MuiBox sx={infoRow}>
                <MuiTypography variant="body2" sx={labelText}>
                    Fecha inicio:
                </MuiTypography>
                <MuiTypography variant="body2" sx={valueText}>
                    {convocatoriaData.fechaInicio.toLocaleString()}
                </MuiTypography>
            </MuiBox>

            <MuiBox sx={infoRow} mt={1} flexWrap="wrap">
                <MuiTypography variant="body2" sx={fechaFinLabel}>
                    Fecha fin:
                </MuiTypography>
                {isAdmin ? (
                    <MuiBox sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                        <DateTimePicker
                            value={currentFechaFin}
                            onChange={(newValue) => {
                                setFechaFinPicker && setFechaFinPicker(newValue);
                                setShowSubmitButton && setShowSubmitButton(true);
                            }}
                        />
                        {showSubmitButton && (

                            <MuiIconButton
                                sx={iconButtonSave}
                                onClick={submitNewFechaFin}
                            >
                                <SaveAs />
                            </MuiIconButton>

                        )}
                    </MuiBox>
                ) : (
                    <>
                        <MuiTypography variant="body2" sx={valueText}>
                            {convocatoriaData.fechaFin.toLocaleString()}
                        </MuiTypography>
                        <MuiBox sx={invisibleBox} />
                        <MuiBox sx={invisibleBoxSmall} />
                    </>
                )}
            </MuiBox>
        </MuiDialogContent>
    );
};

export default DialogContextConvocatoria;