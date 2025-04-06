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

export const getFormatoByNombre = async (nombre: string) => {
    const response = await axios.get(`http://localhost:3000/formato/nombre/${nombre}`);
    return response.data;
}

export const postConvocatoria = (formData: Object) => {
    axios
        .post("http://localhost:3000/convocatoria", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getConvocatorias = async () => {
    const response = await axios.get("http://localhost:3000/convocatoria");
    return response.data;
};

export const patchFechaConvocatoria = async (id: string, fechaFin: Date) => {
    console.log({ fechaFin })
    await axios
        .patch(`http://localhost:3000/convocatoria/${id}/fecha-fin`, { fechaFin })
        .then(function (response) {
            console.log(response);
        })
};

export const deleteConvocatoria = async (id: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/convocatoria/${id}`);
        console.log("Convocatoria eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la convocatoria", error);
        throw error;
    }
};

export const registrarUsuario = async (
    nombre: string,
    email: string,
    password: string
): Promise<any> => {
    const response = await axios.post("http://localhost:3000/usuario", {
        nombre,
        email,
        password,
    });

    const { token } = response.data;
    if (token) {
        localStorage.setItem("authToken", token);
    }

    return response.data;
};

export const loginUsuario = async (email: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:3000/usuario/login", {
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
            `http://localhost:3000/usuario/${email}`
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

export const updateContrasenia = async (email: string): Promise<void> => {
    console.log('Algo hará')
};

export const updateCv = async (email:string, archivo: FormData) => {
    console.log(archivo)
    archivo.append("email", email)
    try {
        const response = await axios.put(
            'http://localhost:3000/usuario/cv', archivo,
            {headers: { "Content-Type": "multipart/form-data" }}
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