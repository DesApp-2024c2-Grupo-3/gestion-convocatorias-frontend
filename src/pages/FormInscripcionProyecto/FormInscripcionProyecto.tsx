import React, { useContext, useState} from "react";
import { useParams } from "react-router-dom";

import styles from "../Home/formularios.module.css";
import EquipoDeTrabajo from "./FormPages/EquipoDeTrabajo";
import DatosDelProyecto from "./FormPages/DatosDelProyecto/DatosDelProyecto";
import { Button } from "@mui/material";
import { UserContext } from "../Login/userContext";
import { postProyecto } from "../../api/proyectos.api";

export interface IFormularioInscripcion {
    autor: string | undefined;
    invitados: string[];
    titulo?: string;
    categoria?: string;
    objetivos?: string;
}

const FormInscripcionProyectos = () => {
    const [step, setStep] = useState(1);
    const { id, formato } = useParams();
    const { usuario } = useContext(UserContext)
    const [datosDelFormulario, setDatosDelFormulario] = useState<IFormularioInscripcion>({
        autor: usuario?.email,
        invitados: []
    })

    return (
        <>
            <div className={styles['form-container']}>

                {step === 1 && <EquipoDeTrabajo 
                    irSiguiente={setStep}
                    datosDelFormulario={datosDelFormulario}
                    setDatosDelFormulario={setDatosDelFormulario} /> }
                {step === 2 && <DatosDelProyecto
                    irSiguiente={setStep}
                    irAtras={setStep}
                    datosDelFormulario={datosDelFormulario}
                    setDatosDelFormulario={setDatosDelFormulario}
                /> }
            </div>

            {/*TEST*/}
            <Button
                variant="contained"
                onClick={() => {
                    if (id)
                        postProyecto(id, datosDelFormulario)}}
            >Enviar</Button>
            <Button
                variant="outlined"
                onClick={() => console.log(datosDelFormulario)}
            >Ver data</Button>
        </>
    )
}

export default FormInscripcionProyectos;