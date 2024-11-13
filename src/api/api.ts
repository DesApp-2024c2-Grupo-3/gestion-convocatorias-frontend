import { InformacionGeneralValues } from "../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { CamposValues } from "../pages/FormNuevaConvocatoria/FormPages/FormFormato";
import axios from "axios";

export const postConvocatoria = (data: { informacionGeneral: InformacionGeneralValues, formato: CamposValues}) => {
    axios.post('http://localhost:3000/convocatorias', data)
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.error(error)
    })
}
