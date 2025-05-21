import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home/formularios.module.css";
import EquipoDeTrabajo from "./FormPages/EquipoDeTrabajo";
import DatosDelProyecto from "./FormPages/DatosDelProyecto/DatosDelProyecto";
import { Button } from "@mui/material";
import { UserContext } from "../Login/userContext";
import { postProyecto } from "../../api/proyectos.api";
import Presupuesto from "./FormPages/Presupuesto";
import { getConvocatoriaById } from "../../api/convocatorias.api";
import { getFormatoById } from "../../api/formatos.api";

// Interfaces
export interface CampoFormato {
  tipo: "texto" | "selector";
  label: string;
  clave: string;
  opciones?: string[];
}

interface Gasto {
  rubro: string;
  coste: number;
  descripcion: string;
}

export interface IFormularioInscripcion {
  autor: string | undefined;
  invitados: string[];
  [key: string]: any; // Para que pueda aceptar cualquier clave dinámica
  presupuesto?: {
    gastosCapital: Gasto[];
    gastosCorrientes: Gasto[];
  };
}

const FormInscripcionProyectos = () => {
  const [step, setStep] = useState(1);

  const { id } = useParams();
  const { usuario } = useContext(UserContext);

  const [datosDelFormulario, setDatosDelFormulario] = useState<IFormularioInscripcion>({
    autor: usuario?.email,
    invitados: [],
  });

  const [convocatoria, setConvocatoria] = useState<any>(null);
  const [campos, setCampos] = useState<CampoFormato[]>([]);

  useEffect(() => {
    const fetchFormatoFromConvocatoria = async () => {
      if (!id) return;

      try {
        const convocatoria = await getConvocatoriaById(id);
        setConvocatoria(convocatoria);

        const formatoId = convocatoria.formato;

        if (formatoId) {
          const formato = await getFormatoById(formatoId);

          const camposAdaptados = formato.campos.map((campo: any) => ({
            clave: campo.nombreDelCampo,
            label: campo.nombreDelCampo,
            tipo: campo.tipo,
            opciones: campo.opciones || [],
          }));

          setCampos(camposAdaptados);
        }
      } catch (error) {
        console.error("Error al traer el formato o la convocatoria", error);
      }
    };

    fetchFormatoFromConvocatoria();
  }, [id]);

  // Mapeo de claves amigables a claves que espera el backend
  const keyMap: { [key: string]: string } = {
    "Titulo del proyecto": "titulo",
    "Categorías": "categoria",
    "Objetivo general": "objetivos",
    "Objetivo especifico": "objetivosEspecificos",
    "Problemática Detectada (Diagnostico": "problematicas",
    // Agrega las claves que necesites aquí
  };

  // Función que transforma el objeto para backend
  const transformarDatos = (formData: IFormularioInscripcion) => {
    const resultado: any = {
      autor: formData.autor,
      invitados: formData.invitados,
      presupuesto: formData.presupuesto,
    };

    if (formData && typeof formData === 'object') {
        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (keyMap[key]) {
            resultado[keyMap[key]] = value;
            }
    });
}

    return resultado;
  };

  return (
    <>
      <div className={styles["form-container"]}>
        {step === 1 && (
          <EquipoDeTrabajo
            irSiguiente={setStep}
            datosDelFormulario={datosDelFormulario}
            setDatosDelFormulario={setDatosDelFormulario}
          />
        )}

        {step === 2 && (
          <DatosDelProyecto
            irSiguiente={setStep}
            irAtras={setStep}
            datosDelFormulario={datosDelFormulario}
            setDatosDelFormulario={setDatosDelFormulario}
            campos={campos}
          />
        )}

        {step === 3 && (
          <Presupuesto
            irSiguiente={setStep}
            irAtras={setStep}
            datosDelFormulario={datosDelFormulario}
            setDatosDelFormulario={setDatosDelFormulario}
          />
        )}
      </div>

      <Button
        variant="contained"
        onClick={() => {
          if (id) {
            const datosParaEnviar = transformarDatos(datosDelFormulario);
            postProyecto(id, datosParaEnviar);
          }
        }}
      >
        Enviar
      </Button>

      <Button
        variant="outlined"
        onClick={() => console.log(datosDelFormulario)}
      >
        Ver data
      </Button>
    </>
  );
};

export default FormInscripcionProyectos;
