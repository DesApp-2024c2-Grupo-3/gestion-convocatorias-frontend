import { createSlice } from "@reduxjs/toolkit";
import { InformacionGeneralValues } from "../../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { RootState } from "../../store/store";
import { CamposValues } from "../../pages/FormNuevaConvocatoria/FormPages/FormFormato";
import { string, number } from "zod";

export interface FormularioState {
    step: number;
    informacionGeneral: InformacionGeneralValues;
    formato: CamposValues;
}

const initialState: FormularioState = {
    step: 1,
    informacionGeneral: {
        titulo: "",
        descripcion: "",
        fechaInicio: new Date(),
        fechaFin: new Date(),
    },
    formato: {
        campos: []
    }
}

export const formularioSlice = createSlice({
    name: "formulario",
    initialState,
    reducers: {

        siguiente: (state) => {
            state.step += 1
        },

        atras: state => {
            state.step -= 1
        },
        
        informacionGeneral: (state, data) => {
            state.informacionGeneral = {
                ...state.informacionGeneral,
                titulo: data.payload.titulo,
                descripcion: data.payload.descripcion,
                fechaInicio: data.payload.fechaInicio,
                fechaFin: data.payload.fechaFin,
            }
        },
        
        formato: (state, data) => {
            state.formato = {...state.formato, ...data}
        }
    }
})

export const selectStep = (state: RootState) => state.formulario.step

export const { siguiente, atras, informacionGeneral, formato } = formularioSlice.actions;

export default formularioSlice.reducer;
