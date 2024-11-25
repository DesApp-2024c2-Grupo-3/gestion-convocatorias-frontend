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

export const putFechaConvocatoria = (id: string, fechaFin: Date) => {

    axios.put(`http://localhost:3000/convocatoria/${id}/fecha-fin`, { fechaFin })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.error(error)
    })
}

export const registrarUsuario = async (nombre: string, email: string, password: string): Promise<any> => {

    await axios.post('http://localhost:3000/usuario/registro', {
        nombre,
        email,
        password,
    })
    .then(function(response) {
        console.log(response)
    })
    .catch(function(error) {
        console.error(error)
    })
};