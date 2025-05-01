import axios from "axios";
export const getHeaders = (extraHeaders = {}, otrasOpciones = {}) => ({
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        ...extraHeaders
    },
    ...otrasOpciones
});

export const postConvocatoria = (formData: Object) => {
    axios
        .post("http://localhost:3000/convocatoria", formData, 
            getHeaders({"Content-Type": "multipart/form-data"}))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getConvocatorias = async () => {
    const response = await axios.get("http://localhost:3000/convocatoria", getHeaders());
    return response.data;
};

export const putConvocatoria = async (id: string, edicionDeConvocatoria: FormData) => {
    const response = await axios
        .put(`http://localhost:3000/convocatoria/${id}`, edicionDeConvocatoria, 
            getHeaders({"Content-Type": "multipart/form-data"}))
        .then(function(response){
            console.log(response)
        })
}

export const deleteConvocatoria = async (id: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/convocatoria/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
        console.log("Convocatoria eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la convocatoria", error);
        throw error;
    }
};

export const getArchivoDeConvocatoria = async (id:string) => {
    const response = await axios.get(`http://localhost:3000/convocatoria/archivo/${id}`,
        getHeaders({}, {responseType: "blob"}),
    )
    
    const blob = new Blob([response.data], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
}