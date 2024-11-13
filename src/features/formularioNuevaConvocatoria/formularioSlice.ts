import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { InformacionGeneralValues } from "../../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { CamposValues } from "../../pages/FormNuevaConvocatoria/FormPages/FormFormato";
import { RootState } from "../../store/store";

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
                fechaInicio: data.payload.fechaInicio instanceof Date 
                    ? data.payload.fechaInicio.toISOString() 
                    : data.payload.fechaInicio, // Si ya es string, se almacena directamente
                fechaFin: data.payload.fechaFin instanceof Date 
                    ? data.payload.fechaFin.toISOString() 
                    : data.payload.fechaFin
            };
        },
        
        formato: (state, action) => {
            state.formato = {...state.formato, ...action.payload}
        },

        reset: () => initialState
    },
},)

export const selectStep = (state: RootState) => state.formulario.step

export const { siguiente, atras, informacionGeneral, formato, reset } = formularioSlice.actions;

export default formularioSlice.reducer;
