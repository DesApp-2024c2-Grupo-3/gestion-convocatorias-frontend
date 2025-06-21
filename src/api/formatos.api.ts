import axios from "axios";
import { NuevoFormatoValues } from "../pages/FormNuevaConvocatoria/schemas/nuevoFormatoSchema";
import { getHeaders } from "./convocatorias.api";
import { API_BASE_URL } from "@constants/app.config";

export const postFormato = async (formato: NuevoFormatoValues) => {
    const response = await axios.post(`${API_BASE_URL}/formato`, formato, getHeaders())
    return response.data
}

export const getFormatos = async () => {
    const response = await axios.get(`${API_BASE_URL}/formato`, getHeaders())
    return response.data
}

export const getFormatoById = async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/formato/${id}`, getHeaders())
    return response.data
}

export const getFormatoByNombre = async (nombre: string) => {
    const response = await axios.get(`${API_BASE_URL}/formato/nombre/${nombre}`, getHeaders());
    return response.data;
}