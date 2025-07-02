import { isValidEmail, isValidPassword } from './validation';


export const getEmailError = (email: string): string | null => {
  if (!email) {
    return "El email es requerido";
  }
  if (!isValidEmail(email)) {
    return "El email no tiene un formato válido";
  }
  return null;
};

export const getTextError = (nombre: string): string | null => {
  if (!nombre) {
    return "El campo es requerido";
  }

  if (nombre.length < 3) {
    return "El campo debe tener al menos 3 caracteres";
  }

  if (nombre.length > 40) {
    return "El campo debe tener menos de 40 caracteres";
  }

  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre)) {
    return "El campo solo puede contener letras y espacios";
  }

  return null;
};

export const getTextAreaError = (text: string): string | null => {
  if (!text) {
      return "Este campo es requerido";
  }
  if (text.length < 10) {
      return "Debe tener al menos 10 caracteres";
  }
  if (text.length > 500) {
      return "Debe tener menos de 500 caracteres";
  }
  return null;
};

export const getPasswordError = (password: string, validarPassword: boolean = true): string | null => {
  if (!password) {
    return "La contraseña es requerida";
  }
  if (validarPassword && !isValidPassword(password)) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
  return null;
};