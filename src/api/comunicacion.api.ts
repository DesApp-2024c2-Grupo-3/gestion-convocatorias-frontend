import axios from "axios";
import { API_BASE_URL } from "@constants/app.config";
import { getHeaders } from "./api.helpers";

interface SendEmailData {
    fromEmail?: string;
    toEmail: string;
    toName: string;
    subject?: string;
    type?: string;
    variables?: Record<string, any>;
}
interface SendEmailsPayload {
    emails: SendEmailData[];
}

export const enviarCorreo = async (emailData: SendEmailData, token: string | null = null): Promise<any> => {
    const response = await axios.post(
        `${API_BASE_URL}/comunicacion/enviar-correo`,
        emailData,
        getHeaders({}, { token: token })
    );
    return response.data;
};


export const enviarCorreosMasivo = async (payload: SendEmailsPayload): Promise<any> => {
    const response = await axios.post(
        `${API_BASE_URL}/comunicacion/enviar-correo-masivo`,
        payload,
        getHeaders()
    );
    return response.data;
};