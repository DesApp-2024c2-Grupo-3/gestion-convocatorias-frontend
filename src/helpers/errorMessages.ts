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

export const getPasswordError = (password: string, validarPassword: boolean = true): string | null => {
    if (!password) {
      return "La contraseña es requerida";
    }
    if (validarPassword && !isValidPassword(password)) {
      return "La contraseña debe tener al menos 8 caracteres";
    }
    return null;
  };