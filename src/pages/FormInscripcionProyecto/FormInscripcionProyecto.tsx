import React from "react";
import { useParams } from "react-router-dom";

import styles from "../Home/formularios.module.css"

const FormInscripcionProyectos = () => {
    const { id, formato } = useParams()

    return (
        <>
            <h1>Formulario de inscripcion</h1>
        </>
    )
}

export default FormInscripcionProyectos;