import axios from "axios";
import { getHeaders } from "./convocatorias.api";

interface SendEmailData {
    fromEmail?: string;
    toEmail: string;
    toName: string;
    subject?: string;
    type?: string;
    variables?: Record<string, any>;
}

export const enviarCorreo = async (emailData: SendEmailData): Promise<any> => {
    const response = await axios.post("http://localhost:3000/comunicacion/enviar-correo", emailData, getHeaders());
    return response.data;
};