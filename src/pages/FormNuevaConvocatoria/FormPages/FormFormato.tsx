import React, { useState } from "react";
import FormCrearFormato from "./FormCrearFormato";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";

import styles from "../../Home/formularios.module.css";
import { formatSelectorBtn, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IConvocatoria } from "../FormNuevaConvocatoria";

interface FormFormatoProps {
    setStep: (step: number) => void;
    savedData: IConvocatoria
    setData: (data: IConvocatoria) => void;
}

const FormFormato = ({ setStep, savedData, setData }: FormFormatoProps) => {
    const [tipoFormulario, setTipoFormulario] = useState<JSX.Element | null>(null);
    const [formato, setFormato] = useState<string | null>(null);

    return (
        <>
            <h2>Definir Formato</h2>
            <div className={styles["btn-select-formato-group"]}>
                <CustomButton
                    nombre="Seleccionar Formato"
                    accion={() => {setTipoFormulario(<SelectorFormato />)}}
                    style={formatSelectorBtn}
                />
                <CustomButton
                    nombre="Crear Formato"
                    accion={() => {setTipoFormulario(<FormCrearFormato setFormato={setFormato} />)}}
                    style={formatSelectorBtn}
                />
            </div>
            <hr />

            {tipoFormulario}

            <div className={styles["nav-btn-group"]}>
                <CustomButton
                        nombre="Anterior"
                        iconoIzquierdo={<ArrowBack />}
                        style={formNavAnteriorBtn}
                        accion={() => setStep(1)}
                />
                <CustomButton
                    nombre="Siguiente"
                    iconoDerecho={<ArrowForward />}
                    style={formNavSiguienteBtn}
                    accion={() => {
                        if (!formato) {
                            alert("Por favor selecciona o crea un formato")
                        } else {
                            setStep(3)
                            setData({ ...savedData, formato })
                        }
                    }}
                />
            </div>
        </>
    );
};

export default FormFormato;

const SelectorFormato = () => {
    return (
        <>
            <h3>Seleccionar Formato</h3>
        </>
    );
};
