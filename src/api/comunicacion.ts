import axios from "axios";
import { getHeaders } from "@api/convocatorias.api";
import { API_BASE_URL } from "@constants/app.config";

interface SendEmailData {
    fromEmail?: string;
    toEmail: string;
    toName: string;
    subject?: string;
    type?: string;
    variables?: Record<string, any>;
}

export const enviarCorreo = async (emailData: SendEmailData): Promise<any> => {
    const response = await axios.post(`${API_BASE_URL}/comunicacion/enviar-correo`, emailData, getHeaders());
    return response.data;
};