import axios from "axios";
import { getHeaders } from "./convocatorias.api";
import { API_BASE_URL } from "@constants/app.config";

export const registrarUsuario = async (
    nombre: string,
    email: string,
    password: string
): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            nombre,
            email,
            password,
        }, getHeaders());

        const { token } = response.data;

        if (token) {
            sessionStorage.setItem("authToken", token);
        }
        return response.data;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.response.data?.message || 'Error de autenticación',
            status: error.response.status
        };
    }


};

export const loginUsuario = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
        });

        const { access_token } = response.data;

        if (access_token) {
            sessionStorage.setItem("authToken", access_token);
        }

        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log('Error del backend:', {
                status: error.response.status,
                data: error.response.data,
                message: error.response.data?.message
            });

            return {
                success: false,
                message: error.response.data?.message || 'Error de autenticación',
                status: error.response.status
            };
        }
    }
};;

export const deleteUsuario = async (email: string): Promise<void> => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/usuario/${email}`,
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
    await axios.patch(`${API_BASE_URL}/usuario/${email}`, { password: nuevaContrasenia }, getHeaders())
        .then(function (response) {
            console.log(response)
        })
};

export const updateCv = async (email: string, archivo: FormData) => {
    archivo.append("email", email)
    try {
        const response = await axios.put(
            `${API_BASE_URL}/usuario/cv`, archivo,
            getHeaders()
        );
        if (response.status === 200) {
            console.log("CV actualizado correctamente");
            sessionStorage.setItem("token", response.data.access_token)
            console.log(sessionStorage.getItem("token"))
        } else {
            console.log("Ocurrio un error al subir el CV");
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUsuarios = async () => {
    const response = await axios.get(`${API_BASE_URL}/usuario`, getHeaders());
    return response.data;
};

export const updateRoles = async (email: string, roles: string[]) => {
    const response = await axios.patch(`${API_BASE_URL}/usuario/roles/${email}`, { roles }, getHeaders())
        .then(response => {
            console.log('Rol actualizado:', response.data);
        })
        .catch(error => {
            console.error('Error al actualizar roles:', error.response?.data || error.message);
        });
}

export const downloadCv = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/usuario/cv/download/${id}`, getHeaders());
    return response.data;
};


export const recuperarContrasenia = async (email: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/auth/recuperar-contrasena`,
            { email },
            getHeaders()
        );
        return response.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response.data?.message || 'Error de autenticación',
            status: error.response.status
        };
    }
};

