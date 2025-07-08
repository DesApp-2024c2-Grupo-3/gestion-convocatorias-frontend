import React from "react";
import DialogContextConvocatoria from "./DialogContextConvocatoria";
import { ConvocatoriaCardProps } from "@/pages/ConvocatoriasPage/components/ConvocatoriaCard";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const convocatoriaData: ConvocatoriaCardProps = {
    "idConvocatoria": "01",
    "titulo": "Lorem ipsum dolor sit amet",
    "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "fechaInicio": new Date("2025-07-07T12:44:17.846Z"),
    "fechaFin": new Date("2025-08-06T12:44:17.846Z"),
    "formato": "01"
}

export default {
    title: "Molecules/DialogContextConvocatoria",
    component: DialogContextConvocatoria,
    decorators: [
        (Story: any) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <Story />
            </LocalizationProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
};

export const Default = () => (
    <DialogContextConvocatoria 
        convocatoriaData={convocatoriaData} 
        rol='Admin'
        fechaFinPicker={dayjs(new Date()).add(1, 'month')}
        setFechaFinPicker={() => {}} 
        showSubmitButton={false} 
        setShowSubmitButton={() => {}} 
        submitNewFechaFin={() => {}} 
    />
);   

export const DefaultInvestigador = () => (
    <DialogContextConvocatoria 
        convocatoriaData={convocatoriaData} 
        rol='Investigador' 
        fechaFinPicker={dayjs(new Date())}
        setFechaFinPicker={() => {}} 
        showSubmitButton={false} 
        setShowSubmitButton={() => {}} 
        submitNewFechaFin={() => {}} 
    />
);


export const WithSubmitButton = () => (
    <DialogContextConvocatoria 
        convocatoriaData={convocatoriaData} 
        rol='Admin' 
        fechaFinPicker={dayjs().add(1, 'month')}
        setFechaFinPicker={() => {}} 
        showSubmitButton={true}
        setShowSubmitButton={() => {}} 
        submitNewFechaFin={() => {}} 
    />
);