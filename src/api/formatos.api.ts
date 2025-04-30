import axios from "axios";
import { NuevoFormatoValues } from "../pages/FormNuevaConvocatoria/schemas/nuevoFormatoSchema";

export const postFormato = (formato: NuevoFormatoValues) => {
    axios
        .post("http://localhost:3000/formato", formato)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

export const getFormatos = async () => {
    const response = await axios.get("http://localhost:3000/formato")
    return response.data
}

export const getFormatoById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/formato/${id}`)
    return response.data
}

export const getFormatoByNombre = async (nombre: string) => {
    const response = await axios.get(`http://localhost:3000/formato/nombre/${nombre}`);
    return response.data;
}