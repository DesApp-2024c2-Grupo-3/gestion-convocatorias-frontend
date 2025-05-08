import { Button, FormHelperText, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { equipoDeTrabajoSchema, EquipoDeTrabajoValues, getUserEmailForZod } from "../schemas/equipoDeTrabajoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../Home/formularios.module.css"
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from '@mui/material/Box';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { UserContext } from "../../Login/userContext";
import { IFormularioInscripcion } from "../FormInscripcionProyecto";

interface Props {
    irSiguiente: (step: number) => void;
    irAtras: (step: number) => void;
    datosDelFormulario: IFormularioInscripcion;
    setDatosDelFormulario: (datos: IFormularioInscripcion) => void;
}

type Presupuesto = {
    capital: Gasto[];
    corrientes: Gasto[];
}

type Gasto = {
    rubro: string,
    coste: number,
    descripcion: string
}

function Presupuesto({ irSiguiente, irAtras, datosDelFormulario, setDatosDelFormulario }: Props) {
    const { register, formState: { errors }, control, handleSubmit } = useForm<Presupuesto>({
        defaultValues: {
            capital: [{ rubro: '', coste: 0, descripcion: '' }],
            corrientes: [{ rubro: '', coste: 0, descripcion: '' }]
        }
    })

    const { fields: capitalFields, append: appendCapital, remove: removeCapital } = useFieldArray({
        name: "capital",
        control,
        rules: {
            required: "Agregue al menos un gasto de capital"
        }
    })

    const { fields: corrientesFields, append: appendCorrientes, remove: removeCorrientes } = useFieldArray({
        name: "corrientes",
        control,
        rules: {
            required: "Agregue al menos un gasto corriente"
        }
    })

    const onSubmit: SubmitHandler<Presupuesto> = (data) => {
        console.log(data)
    }

    return (
        <>
            <h2>Presupuesto</h2>
            <hr />
            <h3>Gastos de capital</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {capitalFields.map((field, index) => {
                    return (
                        <div
                            //className={`${styles['input-field']} ${styles['input-field-dinamic']}`}
                            key={field.id}
                        >
                            <Box display="flex" gap={2}>
                                <TextField
                                    {...register(`capital.${index}.rubro`)}
                                    variant="outlined"
                                    label="Rubro"
                                    size="small"
                                    placeholder="Rubro"
                                    sx={{ flex: 7 }}
                                />

                                <TextField
                                    {...register(`capital.${index}.coste`)}
                                    variant="outlined"
                                    label="Coste"
                                    size="small"
                                    placeholder="Coste"
                                    sx={{ flex: 4 }}
                                />
                            </Box>

                            <TextField
                                {...register(`capital.${index}.descripcion`)}
                                variant="outlined"
                                label="Descripcion"
                                multiline
                                rows={4}
                                fullWidth
                                size="small"
                                placeholder="Descripcion"
                                margin="normal"
                            />

                            <CustomButton
                                nombre="Borrar"
                                accion={() => removeCapital(index)}
                                iconoIzquierdo={<DeleteIcon />}
                                style={{
                                    ...btnRojo,
                                    marginBottom: '2em'
                                }}
                            />
                        </div>
                    )
                })}

                <Button
                    variant="contained"
                    onClick={() => appendCapital(
                        { rubro: '', coste: 0, descripcion: '' })
                    }
                    startIcon={<AddIcon />}
                    sx={{
                        marginTop: '2em', marginBottom: '2em', backgroundColor: "#56A42C"
                    }}
                >Nuevo gasto</Button>

                <p style={{ fontWeight: 'bold', color:'red'}}>{errors.capital?.root?.message}</p>

                <hr />
                <h3>Gastos corrientes</h3>

                {corrientesFields.map((field, index) => {
                    return (
                        <div
                            //className={`${styles['input-field']} ${styles['input-field-dinamic']}`}
                            key={field.id}
                        >
                            <Box display="flex" gap={2}>
                                <TextField
                                    {...register(`corrientes.${index}.rubro`)}
                                    variant="outlined"
                                    label="Rubro"
                                    size="small"
                                    placeholder="Rubro"
                                    sx={{ flex: 7 }}
                                //error={!!errors.invitados?.[index]?.invitado}
                                />

                                <TextField
                                    {...register(`corrientes.${index}.coste`)}
                                    variant="outlined"
                                    label="Coste"
                                    size="small"
                                    placeholder="Coste"
                                    sx={{ flex: 4 }}
                                //error={!!errors.invitados?.[index]?.invitado}
                                />
                            </Box>

                            <TextField
                                {...register(`corrientes.${index}.descripcion`)}
                                variant="outlined"
                                label="Descripcion"
                                multiline
                                rows={4}
                                fullWidth
                                size="small"
                                placeholder="Descripcion"
                                margin="normal"
                            //error={!!errors.invitados?.[index]?.invitado}
                            />

                            <CustomButton
                                nombre="Borrar"
                                accion={() => removeCorrientes(index)}
                                iconoIzquierdo={<DeleteIcon />}
                                style={{
                                    ...btnRojo,
                                    marginBottom: '2em'
                                }}
                            />
                        </div>
                    )
                })}

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => appendCorrientes(
                        { rubro: '', coste: 0, descripcion: '' })
                    }
                    sx={{
                        marginTop: '2em', marginBottom: '2em', backgroundColor: "#56A42C"
                    }}

                >Nuevo gasto</Button>

                <p style={{ fontWeight: 'bold', color:'red'}}>{errors.corrientes?.root?.message}</p>

                <div className={styles['nav-btn-group']}>
                    <Button
                        sx={{ ...formNavAnteriorBtn, color: 'white', backgroundColor: "#D94A3A" }}
                        onClick={() => irAtras(2)}
                    ><ArrowBack />Volver</Button>
                    <CustomButton
                        nombre="Enviar solicitud"
                        type="submit"
                        iconoDerecho={<ArrowForward />}
                        style={formNavSiguienteBtn}
                    />
                </div>
            </form>
        </>
    )
}

export default Presupuesto