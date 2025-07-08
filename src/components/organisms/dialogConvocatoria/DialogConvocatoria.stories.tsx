import React, { useState } from "react";
import DialogConvocatoria from "./DialogConvocatoria";
import { ConvocatoriaCardProps } from "@/pages/ConvocatoriasPage/components/ConvocatoriaCard";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const convocatoriaData: ConvocatoriaCardProps =
{
    "idConvocatoria": "01",
    "titulo": "Lorem ipsum dolor sit amet",
    "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "fechaInicio": new Date("2025-07-07T12:44:17.846Z"),
    "fechaFin": new Date("2025-08-06T12:44:17.846Z"),
    "formato": "01"
}


export default {
    title: "Organisms/DialogConvocatoria",
    component: DialogConvocatoria,
    decorators: [
        (Story: React.ComponentType) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Story />
            </LocalizationProvider>
        ),
    ],
};



export const Default = () => {
    const [showDialog, setShowDialog] = useState(true);
    const [editableFechaFin, setEditableFechaFin] = useState(dayjs(convocatoriaData.fechaFin));

    return (
        <DialogConvocatoria
            convocatoriaData={convocatoriaData}
            showDialogState={{ showDialog, setShowDialog }}
            fechaFinState={{ editableFechaFin, setEditableFechaFin }}
            handleClose={() => setShowDialog(false)}
            isAdmin={true}
            showSubmitButton={false}
            setShowSubmitButton={() => { }}
            submitNewFechaFin={() => { }}
        />
    );
};

export const AdminDateSelected = () => {
    const [showDialog, setShowDialog] = useState(true);
    const [editableFechaFin, setEditableFechaFin] = useState(dayjs(convocatoriaData.fechaFin));

    return (
        <DialogConvocatoria
            convocatoriaData={convocatoriaData}
            showDialogState={{ showDialog, setShowDialog }}
            fechaFinState={{ editableFechaFin, setEditableFechaFin }}
            handleClose={() => setShowDialog(false)}
            showSubmitButton={true}
            isAdmin={true}
            setShowSubmitButton={() => { }}
            submitNewFechaFin={() => { }}
        />
    );
};


export const DefaultInvestigador = () => {
    const [showDialog, setShowDialog] = useState(true);
    const [editableFechaFin, setEditableFechaFin] = useState(dayjs(convocatoriaData.fechaFin));

    return (
        <DialogConvocatoria
            convocatoriaData={convocatoriaData}
            showDialogState={{ showDialog, setShowDialog }}
            fechaFinState={{ editableFechaFin, setEditableFechaFin }}
            handleClose={() => setShowDialog(false)}
            isAdmin={false}
            showSubmitButton={false}
            setShowSubmitButton={() => { }}
            submitNewFechaFin={() => { }}
        />
    );
};



