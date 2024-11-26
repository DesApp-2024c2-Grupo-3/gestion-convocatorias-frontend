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

    const response = await axios.post('http://localhost:3000/usuario', {
        nombre,
        email,
        password,
    });

    const {token} = response.data;
    if (token) {
        localStorage.setItem('authToken', token);
    }

    return response.data;
    
};

export const loginUsuario = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:3000/usuario/login', {
            email,
            password,
        });
        console.log('Respuesta del servidor:', response.data);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al realizar login:', error);
        return null; // Retorna null si hay un error
    }
};