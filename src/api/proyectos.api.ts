import axios from "axios";
import { IFormularioInscripcion } from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";
import { getHeaders } from "./convocatorias.api";
import { API_BASE_URL } from "@constants/app.config";

export const postProyecto = async (idConvocatoria: string, formularioInscripcionData: IFormularioInscripcion) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/proyecto/${idConvocatoria}`,
            formularioInscripcionData,
            getHeaders({ "Content-Type": "application/json" })
        );
        return response.data;
    } catch (error) {
        console.error('Error en postProyecto:', error);
        throw error;
    }
};

export const getProyectosPorConvocatoria = async (idConvocatoria: string) => {
    const response = await axios.get(
        `${API_BASE_URL}/proyecto/convocatoria/${idConvocatoria}`, getHeaders()
    );
    return response.data.proyectos ?? response.data;
};

export const getProyectoPorId = async (idProyecto: string ) => {
    const response = await axios.get(
        `${API_BASE_URL}/proyecto/${idProyecto}`,
        getHeaders()
    );
    return response.data
    
}
