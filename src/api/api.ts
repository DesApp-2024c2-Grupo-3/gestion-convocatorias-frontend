import { updateContrasenia } from './api';
import { InformacionGeneralValues } from "../pages/FormNuevaConvocatoria/schemas/informacionGeneralSchema";
import { CamposValues } from "../pages/FormNuevaConvocatoria/FormPages/FormFormato";
import axios from "axios";
import toast from "react-hot-toast";

export const postConvocatoria = (
  informacionGeneral: InformacionGeneralValues,
  formato: CamposValues
) => {
  const data = {
    informacionGeneral,
    formato: formato.campos,
  };

  axios
    .post("http://localhost:3000/convocatoria", data)
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

export const putFechaConvocatoria = (id: string, fechaFin: Date) => {
  axios
    .put(`http://localhost:3000/convocatoria/${id}/fecha-fin`, { fechaFin })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
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
  
};


