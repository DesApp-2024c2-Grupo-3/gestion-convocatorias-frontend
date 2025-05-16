import React, { useEffect, useState } from 'react';
import { CampoFormato, IFormularioInscripcion } from '../../FormInscripcionProyecto';
import styles from "../../../Home/formularios.module.css";
import { formNavAnteriorBtn, formNavSiguienteBtn } from '../../../../components/CustomButton/buttonStyles';
import { CustomButton } from '../../../../components/CustomButton/CustomButtons';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getConvocatoriaById } from '../../../../api/convocatorias.api';
import { getFormatoById } from '../../../../api/formatos.api';

interface Props {
    irSiguiente: (n: number) => void;
    irAtras: (n: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: React.Dispatch<React.SetStateAction<IFormularioInscripcion>>;
    campos: CampoFormato[];
}

const DatosDelProyecto = ({
    irSiguiente,
    irAtras,
    datosDelFormulario,
    setDatosDelFormulario,
    campos
}: Props) => {
    const handleChange = (clave: string, valor: string) => {
        setDatosDelFormulario(prev => ({
            ...prev,
            [clave]: valor,
        }));
    };

    const [campo, setCampos] = useState<CampoFormato[]>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchFormatoFromConvocatoria = async () => {
            if (!id) return;

            try {
                const convocatoria = await getConvocatoriaById(id);
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


    return (
        <form className="form-card">
            <h2 className="form-title">Datos del Proyecto</h2>
            <hr />
            <div className="form-fields">
                {campos.map((campo, index) => (
                    <div key={index} className="form-group" style={{ marginBottom: '1.5rem' }}>
                        {campo.tipo === "texto" && (
                            <TextField
                                label={campo.label}
                                value={(datosDelFormulario as any)[campo.clave] || ""}
                                onChange={(e) => handleChange(campo.clave, e.target.value)}
                                fullWidth
                                variant="outlined"
                                size="small"
                            />
                        )}

                        {campo.tipo === "selector" && (
                            <FormControl fullWidth size="small">
                                <InputLabel>{campo.label}</InputLabel>
                                <Select
                                    label={campo.label}
                                    value={(datosDelFormulario as any)[campo.clave] || ""}
                                    onChange={(e) => handleChange(campo.clave, e.target.value)}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una opción</em>
                                    </MenuItem>
                                    {campo.opciones?.map((opcion, i) => (
                                        <MenuItem key={i} value={opcion}>
                                            {opcion}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles["nav-btn-group"]}>
                <Button
                    sx={{ ...formNavAnteriorBtn, color: 'white', backgroundColor: "#D94A3A" }}
                    onClick={() => irAtras(1)}
                ><ArrowBack />Volver</Button>
                <CustomButton 
                    nombre="Siguiente" 
                    type="submit" 
                    iconoDerecho={<ArrowForward />} 
                    style={formNavSiguienteBtn} 
                    accion={() => irSiguiente(3)}
                />
            </div>
        </form>
    );
};

export default DatosDelProyecto;
