import axios from "axios";
import { NuevoFormatoValues } from "../pages/FormNuevaConvocatoria/schemas/nuevoFormatoSchema";
import { getHeaders } from "./convocatorias.api";

export const postFormato = (formato: NuevoFormatoValues) => {
    axios
        .post("http://localhost:3000/formato", formato, getHeaders())
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

export const getFormatos = async () => {
    const response = await axios.get("http://localhost:3000/formato", getHeaders())
    return response.data
}

export const getFormatoById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/formato/${id}`, getHeaders())
    return response.data
}

export const getFormatoByNombre = async (nombre: string) => {
    const response = await axios.get(`http://localhost:3000/formato/nombre/${nombre}`, getHeaders());
    return response.data;
}