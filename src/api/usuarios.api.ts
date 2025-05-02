import axios from "axios";
import { getHeaders } from "./convocatorias.api";

export const registrarUsuario = async (
    nombre: string,
    email: string,
    password: string
): Promise<any> => {
    const response = await axios.post("http://localhost:3000/usuario", {
        nombre,
        email,
        password,
    }, getHeaders());

    const { token } = response.data;
    if (token) {
        sessionStorage.setItem("authToken", token);
    }

    return response.data;
};

export const loginUsuario = async (email: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
            email,
            password,
        });
        console.log("Respuesta del servidor:", response.data);
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        console.error("Error al realizar login:", error);
        return null; // Retorna null si hay un error
    }
};

export const deleteUsuario = async (email: string): Promise<void> => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/usuario/${email}`,
            getHeaders()
        );
        if (response.status === 200) {
            console.log("Cuenta eliminada correctamente.");
        } else {
            console.log("No se pudo eliminar el usuario");
        }
    } catch (error) {
        console.log("La cuenta no ha podido ser eliminada por un error", error);
        throw error;
    }
};

export const updateContrasenia = async (email: string, nuevaContrasenia: string) => {
    await axios.patch(`http://localhost:3000/usuario/${email}`, {password : nuevaContrasenia}, getHeaders())
        .then(function(response) {
            console.log(response)
        })
};

export const updateCv = async (email:string, archivo: FormData) => {
    console.log(archivo)
    archivo.append("email", email)
    try {
        const response = await axios.put(
            'http://localhost:3000/usuario/cv', archivo,
            getHeaders({"Content-Type": "multipart/form-data"})
        );
        if (response.status === 200) {
            console.log("funciono!!!!!!!!!");
        } else {
            console.log("no funciono :(");
        }
    } catch (error) {
        console.log(error)
    }
}