import { createSlice } from "@reduxjs/toolkit";
import { InformacionGeneralValues } from "../../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { RootState } from "../../store/store";

export interface FormularioState {
    step: number;
    informacionGeneral: InformacionGeneralValues;
    formato: any[];
}

const initialState: FormularioState = {
    step: 1,
    informacionGeneral: {
        titulo: "",
        descripcion: "",
        fechaInicio: new Date(),
        fechaFin: new Date(),
    },
    formato: []
}

export const formularioSlice = createSlice({
    name: "formulario",
    initialState,
    reducers: {

        siguiente: (state, data) => {
            state.step += 1
            state.informacionGeneral = {
                ...state.informacionGeneral,
                titulo: data.payload.titulo,
                descripcion: data.payload.descripcion,
                fechaInicio: data.payload.fechaInicio,
                fechaFin: data.payload.fechaFin
            }
        },

        atras: state => {
            state.step -= 1
        }
    }
})

export const selectStep = (state: RootState) => state.formulario.step

export const { siguiente, atras } = formularioSlice.actions;

export default formularioSlice.reducer;
