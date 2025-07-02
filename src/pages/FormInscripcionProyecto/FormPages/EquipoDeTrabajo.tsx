import { Button, FormHelperText, TextField, Breadcrumbs, Typography } from "@mui/material";
import React, { useContext } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { equipoDeTrabajoSchema, EquipoDeTrabajoValues, getUserEmailForZod } from "../schemas/equipoDeTrabajoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../Home/formularios.module.css"
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "@/contexts/userContext";
import { IFormularioInscripcion } from "../FormInscripcionProyecto";
import { enviarCorreosMasivo } from "@/api/comunicacion.api";
import toast from "react-hot-toast";

interface EmailDataObject {
    fromEmail?: string;
    toEmail: string;
    toName: string;
    subject?: string;
    type?: string;
    variables?: Record<string, any>;
}
interface EquipoDeTrabajoProps {
    irSiguiente: (step: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: (datos: IFormularioInscripcion) => void;
    convocatoria: any;
}

const EquipoDeTrabajo = ({ irSiguiente, datosDelFormulario, setDatosDelFormulario, convocatoria }:
    EquipoDeTrabajoProps) => {

    const { usuario } = useContext(UserContext)
    if (usuario)
        getUserEmailForZod(usuario.email)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EquipoDeTrabajoValues>({
        resolver: zodResolver(equipoDeTrabajoSchema),
        defaultValues: {
            invitados: [
                { invitado: '' }
            ]
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: "invitados",
        control
    })


    function validarYLimpiarCorreos(listaDeCorreos: string[]) {
        if (!listaDeCorreos || listaDeCorreos.length === 0) {
            return {
                status: 'empty',
                message: 'La lista de invitados está vacía.'
            };
        }

        const correosUnicos = [...new Set(listaDeCorreos)];

        const emailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        const correosValidos = [];
        const correosInvalidos = [];

        for (const correo of correosUnicos) {
            if (emailRegex.test(correo)) {
                correosValidos.push(correo);
            } else {
                correosInvalidos.push(correo);
            }
        }

        if (correosInvalidos.length > 0) {
            return {
                status: 'error',
                message: `Se encontraron ${correosInvalidos.length} correos con formato inválido. Por favor, corrígelos.`,
            };
        }

        return {
            status: 'success',
            data: correosValidos
        };
    }


    const onSubmit: SubmitHandler<EquipoDeTrabajoValues> = async (data) => {
        const listaDeCorreos = data.invitados.map((i) => i.invitado);
        const resultadoValidacion = validarYLimpiarCorreos(listaDeCorreos);

        if (resultadoValidacion.status !== 'success') {
            toast.error(resultadoValidacion.message || 'Por favor, revisa los correos ingresados.');
            return;
        }

        const correosValidos = resultadoValidacion.data || [];
        setDatosDelFormulario({ ...datosDelFormulario, invitados: correosValidos });

        toast.loading('Enviando invitaciones...');
     
        try {
            const emailsParaEnviar: EmailDataObject[] = correosValidos.map(correo => ({
                toEmail: correo,
                toName: correo,
                type: 'invitacion_grupo_convocatoria',
                variables: {
                    nombreDelProyecto: convocatoria?.titulo,
                    descripcion: convocatoria?.descripcion,
                    fechaFin: convocatoria?.fechaFin,
                    remitenteEmail: usuario?.email,
                    remitenteNombre: usuario?.nombre,
                }
            }));

            const payload = {
                emails: emailsParaEnviar
            };

            await enviarCorreosMasivo(payload);

            toast.dismiss();
            toast.success('¡Invitaciones enviadas con éxito!');


            irSiguiente(2);

        } catch (error) {
            toast.dismiss();
            toast.error('No se pudieron enviar las invitaciones. Intenta de nuevo.');
            console.error("Error en el envío de invitaciones:", error);
        }
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Typography color="text.primary">Convocatorias</Typography>
                <Typography color="text.primary">{convocatoria?.titulo || 'Cargando...'}</Typography>
                <Typography color="primary">Equipo de Trabajo</Typography>
            </Breadcrumbs>
            <h3>Equipo de Trabajo</h3>
            <hr />
            <Box
                sx={{
                    backgroundColor: "#e3f5da",
                    borderRadius: 2,
                    border: '2px solid #56A42C',
                    margin: '1em',
                    padding: '1em'
                }}
            >
                Por favor ingrese a continuacion los mails de aquellos que desea invitar al proyecto
            </Box>
            <h4>Invitados:</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => {
                    return (
                        <div
                            className={`${styles['input-field']} ${styles['input-field-dinamic']}`}
                            key={field.id}
                        >
                            <TextField
                                {...register(`invitados.${index}.invitado`)}
                                id={`invitados.${index}.invitado`}
                                variant="outlined"
                                label="Invitado"
                                fullWidth
                                size="small"
                                placeholder="ejemplo@gmail.com"
                                error={!!errors.invitados?.[index]?.invitado}
                            />
                            <FormHelperText sx={{ marginTop: '4em' }} className={styles['mensaje-error']} error id={`invitados.${index}.invitado`}>
                                {errors.invitados?.[index]?.invitado?.message}
                            </FormHelperText>

                            <CustomButton
                                nombre="Borrar"
                                accion={() => remove(index)}
                                iconoIzquierdo={<DeleteIcon />}
                                style={{
                                    ...btnRojo,
                                    marginLeft: '1em',
                                }}
                            />
                        </div>
                    )
                })}

                <FormHelperText error className={styles['mensaje-error']}>
                    {errors.invitados?.root?.message}
                </FormHelperText>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => append({
                        invitado: ""
                    })}
                    sx={{
                        marginTop: '2em'
                    }}
                >Nuevo Invitado</Button>

                <div className={styles['nav-btn-group']}>
                    <Button
                        sx={{ ...formNavAnteriorBtn, color: 'white' }}
                        component={Link} to='/Convocatorias'
                    ><ArrowBack />Salir</Button>
                    <CustomButton
                        nombre="Siguiente"
                        type="submit"
                        iconoDerecho={<ArrowForward />}
                        style={formNavSiguienteBtn}
                    />
                </div>
            </form>
        </>
    )
}

export default EquipoDeTrabajo;
