import React from "react";
import {
    SubmitHandler,
    useForm,
    Controller,
    useFieldArray,
} from "react-hook-form";
import {
    nuevoFormatoSchema,
    NuevoFormatoValues,
} from "../schemas/nuevoFormatoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    TextField,
    Typography,
    Divider,
    Stack,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import {
    btnRojo,
    btnVerdeUnahur,
    formatSelectorBtn,
} from "../../../components/CustomButton/buttonStyles";
import { postFormato } from "../../../api/formatos.api";
import toast from "react-hot-toast";

interface CrearFormatoProps {
    setFormato: (data: string) => void;
    setTipoFormulario: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setNombreFormato: (nombre: string) => void;
}

const FormCrearFormato = ({
    setFormato,
    setTipoFormulario,
    setNombreFormato,
}: CrearFormatoProps) => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<NuevoFormatoValues>({
        resolver: zodResolver(nuevoFormatoSchema),
        defaultValues: {
            nombreDelFormato: "",
            campos: [
                {
                    nombreDelCampo: "Titulo del proyecto",
                    tipo: "texto",
                    maxNumeroDeCaracteres: 100,
                },
                {
                    nombreDelCampo: "Descripcion",
                    tipo: "texto",
                    maxNumeroDeCaracteres: 300,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "campos",
        control,
    });

    const onOptionsBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const opciones = e.target.value
            .split(";")
            .map((opcion) => opcion.trim())
            .filter((opcion) => opcion);
        setValue(`campos.${index}.opciones`, opciones);
    };

    const onSubmit: SubmitHandler<NuevoFormatoValues> = async (data) => {
        try {
            const response = await postFormato(data);
            const formatoId = response;
            setFormato(formatoId);
            toast.success(
                `Formato creado correctamente. Se seleccionó el formato "${data.nombreDelFormato}" como formato actual`,
                { duration: 4000 }
            );
            setTipoFormulario(null);
            setNombreFormato(data.nombreDelFormato);
        } catch (error) {
            console.error("Error al guardar el formato:", error);
            toast.error("Ocurrió un error al crear el formato");
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Crear Formato
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                    <Controller
                        name="nombreDelFormato"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nombre del Formato"
                                variant="outlined"
                                fullWidth
                                error={!!errors.nombreDelFormato}
                                helperText={errors.nombreDelFormato?.message}
                            />
                        )}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Typography variant="h6" gutterBottom>
                    Campos del Formato
                </Typography>

                <Stack direction="row" spacing={2} mb={3}>
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
                </Stack>

                {errors.campos?.message && (
                    <Typography color="error" mb={2}>
                        {errors.campos.message}
                    </Typography>
                )}

                {fields.map((field, index) => {
                    const esFijo = index === 0 || index === 1;

                    return (
                        <Paper
                            key={field.id}
                            elevation={1}
                            sx={{
                                mb: 3,
                                p: 2,
                                backgroundColor: esFijo ? "#f8f8f8" : "white",
                            }}
                        >
                            <Typography variant="subtitle1" mb={1}>
                                Campo {index + 1}
                            </Typography>

                            <Box mb={2}>
                                <Controller
                                    name={`campos.${index}.nombreDelCampo`}
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Nombre del Campo"
                                            variant="outlined"
                                            fullWidth
                                            disabled={esFijo}
                                            error={!!errors.campos?.[index]?.nombreDelCampo}
                                            helperText={
                                                errors.campos?.[index]?.nombreDelCampo?.message
                                            }
                                        />
                                    )}
                                />
                            </Box>

                            {field.tipo === "texto" ? (
                                <Box mb={2}>
                                    <Controller
                                        name={`campos.${index}.maxNumeroDeCaracteres`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Máximo número de caracteres"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                onChange={(e) =>
                                                    field.onChange(parseInt(e.target.value) || 0)
                                                }
                                                disabled={esFijo}
                                            />
                                        )}
                                    />
                                </Box>
                            ) : (
                                <Box mb={2}>
                                    <Controller
                                        name={`campos.${index}.opciones`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Opciones"
                                                variant="outlined"
                                                fullWidth
                                                onBlur={(e) => onOptionsBlur(e, index)}
                                                disabled={esFijo}
                                            />
                                        )}
                                    />
                                </Box>
                            )}

                            {!esFijo && (
                                <CustomButton
                                    nombre="Borrar campo"
                                    accion={() => remove(index)}
                                    iconoIzquierdo={<DeleteIcon />}
                                    style={btnRojo}
                                />
                            )}
                        </Paper>
                    );
                })}

                <Box mt={4}>
                    <CustomButton
                        nombre="Guardar formato"
                        type="submit"
                        iconoIzquierdo={<SaveAsIcon />}
                        style={btnVerdeUnahur}
                    />
                </Box>
            </form>
        </Box>
    );
};

export default FormCrearFormato;
