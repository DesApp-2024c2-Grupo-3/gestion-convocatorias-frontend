import axios from "axios";

export const postConvocatoria = (formData: Object) => {
    axios
        .post("http://localhost:3000/convocatoria", formData, {
            headers:{ Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data" }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getConvocatorias = async () => {
    const response = await axios.get("http://localhost:3000/convocatoria", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
};

export const patchFechaConvocatoria = async (id: string, fechaFin: Date) => {
    console.log({ fechaFin })
    await axios
        .patch(`http://localhost:3000/convocatoria/${id}/fecha-fin`, { fechaFin }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(function (response) {
            console.log(response);
        })
};

export const deleteConvocatoria = async (id: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/convocatoria/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        console.log("Convocatoria eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la convocatoria", error);
        throw error;
    }
};