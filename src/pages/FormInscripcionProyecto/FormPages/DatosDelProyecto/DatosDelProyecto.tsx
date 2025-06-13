import React from 'react';
import { useForm } from 'react-hook-form';
import { CampoFormato, IFormularioInscripcion } from '../../FormInscripcionProyecto';
import styles from "../../../Home/formularios.module.css";
import { formNavAnteriorBtn, formNavSiguienteBtn } from '../../../../components/CustomButton/buttonStyles';
import { CustomButton } from '../../../../components/CustomButton/CustomButtons';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    FormHelperText,
} from '@mui/material';

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

    const defaultValues = campos.reduce((acc, campo) => {
        acc[campo.clave] = datosDelFormulario.camposExtra?.[campo.clave] || '';
        return acc;
    }, {} as Record<string, string>);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Record<string, string>>({
        defaultValues
    });

    const onSubmit = (data: Record<string, string>) => {
        setDatosDelFormulario(prev => ({
            ...prev,
            camposExtra: {
                ...data
            }
        }));
        irSiguiente(3);
    };

    return (
        <form className={styles["form-card"]} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles["form-title"]}>Datos del Proyecto</h2>
            <hr />
            <div className={styles["form-fields"]}>
                {campos.map((campo, index) => (
                    <div key={index} className={styles["form-group"]} style={{ marginBottom: '1.5rem', minHeight: '4rem' }}>
                        {campo.tipo === "texto" && (
                            <TextField
                                label={campo.label}
                                {...register(campo.clave, { required: 'Este campo es obligatorio' })}
                                fullWidth
                                variant="outlined"
                                size="small"
                                error={!!errors[campo.clave]}
                                helperText={errors[campo.clave]?.message}
                            />
                        )}


                        {campo.tipo === "selector" && (
                            <FormControl
                                fullWidth
                                size="small"
                                error={!!errors[campo.clave]}
                            >
                                <InputLabel>{campo.label}</InputLabel>
                                <Select
                                    label={campo.label}
                                    defaultValue={defaultValues[campo.clave]}
                                    {...register(campo.clave, { required: 'Este campo es obligatorio' })}
                                >
                                    {campo.opciones?.map((opcion, i) => (
                                        <MenuItem key={i} value={opcion}>{opcion}</MenuItem>
                                    ))}
                                </Select>
                                {errors[campo.clave] && (
                                    <FormHelperText>{errors[campo.clave]?.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles["nav-btn-group"]}>
                <Button
                    sx={formNavAnteriorBtn}
                    onClick={() => irAtras(1)}
                    startIcon={<ArrowBack />}
                >
                    Anterior
                </Button>

                <CustomButton
                    nombre="Siguiente"
                    type="submit"
                    iconoDerecho={<ArrowForward />}
                    style={formNavSiguienteBtn}
                />
            </div>
        </form>
    );
};

export default DatosDelProyecto;
