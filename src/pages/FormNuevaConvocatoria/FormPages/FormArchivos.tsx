import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { fileSchema, FileValues } from "../schemas/fileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { postConvocatoria } from "../../../api/convocatorias.api";
import { IConvocatoria } from "../FormNuevaConvocatoria";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button, FormHelperText, CardActionArea, CardActions } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Add, ArrowBack } from "@mui/icons-material";
import { formNavAnteriorBtn, btnVerdeUnahur } from "@/components/CustomButton/buttonStyles";
import { CustomButton } from "@/components/CustomButton/CustomButtons";
import styles from "../../Home/formularios.module.css";

interface FormArchivosProps {
    savedData: IConvocatoria;
    setStep: (step: number) => void;
}

const FormArchivos = ({ savedData, setStep }: FormArchivosProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FileValues>({
        resolver: zodResolver(fileSchema),
    });

    const navigate = useNavigate();
    const [fileName, setFileName] = useState<string>("");

    const onSubmit: SubmitHandler<FileValues> = async (data) => {
        const newData = { ...savedData, archivo: data.file };

        const formData = new FormData();
        formData.append("titulo", newData.titulo);
        formData.append("descripcion", newData.descripcion);
        formData.append("fechaInicio", newData.fechaInicio.toISOString());
        formData.append("fechaFin", newData.fechaFin.toISOString());
        formData.append("formato", newData.formato);
        formData.append("archivo", newData.archivo);

        const response = await postConvocatoria(formData);
        console.log(response);
    };

    const handleConvocatoriaSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(
            (data) => {
                toast.success("Convocatoria creada correctamente");
                onSubmit(data);
                navigate("/Convocatorias");
            },
            (formErrors) => {
                toast.error("Ocurrió un error al crear la convocatoria");
                console.error(formErrors);
            }
        )();
    };

    return (
        <>
        <Box
            component="form"
            onSubmit={handleConvocatoriaSubmit}
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 6,
                p: 4,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                sx={{ mb: 3, color: "#2c3e50" }}
            >
                Subir archivo de convocatoria
            </Typography>

            <Controller
                name="file"
                control={control}
                render={({ field: { onChange, ref } }) => (
                    <>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{
                                color: "#3498db",
                                borderColor: "#3498db",
                                "&:hover": {
                                    backgroundColor: "#eaf6fd",
                                    borderColor: "#3498db",
                                },
                                mb: 2,
                            }}
                            startIcon={<UploadFileIcon />}
                        >
                            Seleccionar archivo
                            <input
                                ref={ref}
                                type="file"
                                accept=".pdf,.docx"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setFileName(file.name);
                                        onChange(file);
                                    }
                                }}
                            />
                        </Button>

                        {fileName ? (
                            <Typography
                                variant="body2"
                                sx={{ color: "#34495e", mb: 1, minHeight: "24px" }}
                            >
                                Archivo seleccionado: <strong>{fileName}</strong>
                            </Typography>
                        ) : (
                            <Box sx={{ minHeight: "24px", mb: 1 }} />
                        )}


                        <Box sx={{ minHeight: "24px", mt: 1 }}>
                            {typeof errors.file?.message === "string" && (
                                <FormHelperText error>{errors.file.message}</FormHelperText>
                            )}
                        </Box>

                    </>
                )}
            />
            <Box
                display="flex"
                mt={4}
                className={styles["nav-btn-group"]}
            >

                <CustomButton
                    nombre="Anterior"
                    iconoIzquierdo={<ArrowBack />}
                    style={formNavAnteriorBtn}
                    accion={() => setStep(2)}
                />


                <CustomButton
                    nombre="Crear convocatoria"
                    style={btnVerdeUnahur}
                    type="submit"
                    iconoIzquierdo={<Add />}
                />
            </Box>
            
        </Box>
        
            </>
    );
};

export default FormArchivos;