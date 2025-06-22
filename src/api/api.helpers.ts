// 'otrasOpciones' puede ser un objeto que opcionalmente contenga un token
export const getHeaders = (extraHeaders = {}, otrasOpciones: { token?: string | null } = {}) => {
    const token = otrasOpciones.token || sessionStorage.getItem('token');
    
    let authHeader = {};
    if (token) {
        authHeader = { Authorization: `Bearer ${token}` };
    }

    return {
        headers: {
            ...authHeader,
            ...extraHeaders,
        },
    };
};