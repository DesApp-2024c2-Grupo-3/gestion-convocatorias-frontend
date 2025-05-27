import React from "react";
import { IFormularioInscripcion } from "../FormInscripcionProyecto";

interface PlanDeTrabajoProps {
    datosDelFormulario: IFormularioInscripcion
}

const PlanDeTrabajo = ( {datosDelFormulario} : PlanDeTrabajoProps) => {

    console.log(datosDelFormulario)

    return <h2>parte 2</h2>
}

export default PlanDeTrabajo