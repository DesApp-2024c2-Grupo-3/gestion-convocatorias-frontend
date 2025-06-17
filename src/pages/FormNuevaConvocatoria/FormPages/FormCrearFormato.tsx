import React from "react";
import {
    SubmitHandler,
    useForm,
    Controller,
    useFieldArray
} from "react-hook-form";
import {
    nuevoFormatoSchema,
    NuevoFormatoValues,
} from "../schemas/nuevoFormatoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import styles from "../../Home/formularios.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { btnRojo, btnVerdeUnahur, formatSelectorBtn } from "../../../components/CustomButton/buttonStyles";
import { getFormatoByNombre, postFormato } from "../../../api/formatos.api";
import toast from "react-hot-toast";
import SaveAsIcon from '@mui/icons-material/SaveAs';

interface CrearFormatoProps {
    setFormato: (data: string) => void;
    setTipoFormulario: React.Dispatch<React.SetStateAction<JSX.Element | null>>
    setNombreFormato: (nombre: string) => void
}

const FormCrearFormato = ({ setFormato, setTipoFormulario, setNombreFormato }: CrearFormatoProps) => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<NuevoFormatoValues>({
        resolver: zodResolver(nuevoFormatoSchema),
        defaultValues: {
            nombreDelFormato: ""
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: "campos",
        control
    });

    const onOptionsBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const opciones = e.target.value.split(";").map(opcion => opcion.trim()).filter(opcion => opcion);
        setValue(`campos.${index}.opciones`, opciones);
    };

    const onSubmit: SubmitHandler<NuevoFormatoValues> = async (data) => {
        console.log("FORMATO",data);

        try {
            const response = await postFormato(data);
            const formatoId = response;
            console.log("Formato guardado con ID:", formatoId);
            setFormato(formatoId);
            toast.success(`Formato creado correctamente. Se seleccionó el formato "${data.nombreDelFormato}" como formato actual`, {duration: 4000})
            setTipoFormulario(null)
            setNombreFormato(data.nombreDelFormato)
            console.log(errors)
        } catch (error) {
            console.error("Error al guardar el formato:", error);
            toast.error("Ocurrió un error al crear el formato")
        }
    };

    return (
        <>
            <h3>Crear Formato</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["input-field"]}>
                    <Controller
                        name="nombreDelFormato"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="nombreDelFormato"
                                label="Nombre del Formato"
                                variant="outlined"
                                error={!!errors.nombreDelFormato}
                                helperText={errors.nombreDelFormato?.message}
                                fullWidth
                            />
                            )}
                    />
                </div>

                <p style={{color:'red'}}>{errors.campos?.message}</p>

                <div className={styles["btn-select-formato-group"]}>
                    <CustomButton
                        nombre="Nuevo Campo de Texto"
                        style={formatSelectorBtn}
                        accion={() =>
                            append({
                                nombreDelCampo: "",
                                tipo: "texto",
                                maxNumeroDeCaracteres: 10,
                            })
                        }
                    />
                    <CustomButton
                        nombre="Nuevo Desplegable"
                        style={formatSelectorBtn}
                        accion={() =>
                            append({
                                nombreDelCampo: "",
                                tipo: "selector",
                                opciones: ["Opcion 1", "Opcion 2", "Opcion 3"],
                            })
                        }
                    />
                </div>

                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <section className={"section"} key={field.id}>
                                <div className={styles["input-field"]}>
                                    <Controller
                                        name={`campos.${index}.nombreDelCampo`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id={`campos.${index}.nombreDelCampo`}
                                                label="Nombre del Campo"
                                                variant="outlined"
                                                error={!!errors.campos?.[index]?.nombreDelCampo}
                                                helperText={errors.campos?.[index]?.nombreDelCampo?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </div>

                                {field.tipo === "texto" ? (
                                    <div className={styles["input-field"]}>
                                        <Controller
                                            name={`campos.${index}.maxNumeroDeCaracteres`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id={`campos.${index}.maxNumeroDeCaracteres`}
                                                    label="Maximo numero de caracteres"
                                                    variant="outlined"
                                                    type="number"
                                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                                    //error={!!errors.campos?.[index]?.maxNumeroDeCaracteres}
                                                    //helperText={errors.campos?.[index]?.maxNumeroDeCaracteres?.message}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </div>
                                
                                
                                ) : (
                                    <div className={styles["input-field"]}>
                                        <Controller
                                            name={`campos.${index}.opciones`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    id={`campos.${index}.opciones`}
                                                    label="Opciones"
                                                    variant="outlined"
                                                    //error={!!errors.campos?.[index]?.opciones}
                                                    //helperText={errors.campos?.[index]?.opciones?.message}
                                                    fullWidth
                                                    onBlur={(e) => onOptionsBlur(e, index)}
                                                />
                                            )}
                                        />
                                    </div>
                                )}

                                <CustomButton
                                    nombre="Borrar campo"
                                    accion={() => remove(index)}
                                    iconoIzquierdo={<DeleteIcon />}
                                    style={btnRojo}
                                />
                                <hr />
                            </section>
                        </div>
                    );
                })}

                
                <CustomButton
                    nombre="Guardar formato"
                    type="submit"
                    iconoIzquierdo={<SaveAsIcon />}
                    style={btnVerdeUnahur}
                />
            </form>
        </>
    );
};

export default FormCrearFormato