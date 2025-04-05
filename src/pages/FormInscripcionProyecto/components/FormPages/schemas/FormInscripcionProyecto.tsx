import React from "react";
import { useParams } from "react-router-dom";

const FormInscripcionProyectos = () => {

    const { id, formato } = useParams()

    return (
        <>
            <h1>Formulario de inscripcion</h1>
        </>
    )
}

export default FormInscripcionProyectos;