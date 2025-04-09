import axios from "axios";
import { IFormularioInscripcion } from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";

export const postProyecto = (idConvocatoria: string, formularioInscripcionData: IFormularioInscripcion) => {
    axios
        .post(`http://localhost:3000/proyecto/${idConvocatoria}`, formularioInscripcionData)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
}