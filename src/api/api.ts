import { InformacionGeneralValues } from "../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { CamposValues } from "../pages/FormNuevaConvocatoria/FormPages/FormFormato";
import axios from "axios";

export const postConvocatoria = (informacionGeneral: InformacionGeneralValues, formato: CamposValues) => {
    
    const data = {
        informacionGeneral,
        formato: formato.campos
    } 
    
    axios.post('http://localhost:3000/convocatoria', data)
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.error(error)
    })
}


export const getConvocatorias = async () => {
    
    const response = await axios.get('http://localhost:3000/convocatoria');
    return response.data
}