import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { fileSchema, FileValues } from "../schemas/fileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { postConvocatoria } from "../../../api/convocatorias.api";
import { IConvocatoria } from "../FormNuevaConvocatoria";
import styles from "../../Home/formularios.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormArchivosProps {
    savedData: IConvocatoria;
}

const FormArchivos = ({ savedData }: FormArchivosProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FileValues>({
        resolver: zodResolver(fileSchema),
    });

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FileValues> = async (data) => {
        const newData = {...savedData, archivo: data.file}

        const formData = new FormData();
        formData.append('titulo', newData.titulo)
        formData.append('descripcion', newData.descripcion)
        formData.append('fechaInicio', newData.fechaInicio.toISOString())
        formData.append('fechaFin', newData.fechaFin.toISOString())
        formData.append('formato', newData.formato)
        formData.append('archivo', newData.archivo)
        
        const response = await postConvocatoria(formData)
        console.log(response);
    };

    function handleConvocatoriaSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(
        (data) => {
            toast.success("Convocatoria creada correctamente");
            onSubmit(data);
            navigate("/Convocatorias")
        },
        (formErrors) => {
            toast.error("Ocurrió un error al crear la convocatoria");
            console.error(formErrors);
        }
    )();
}

    return (
        <>
            <h2>Subir archivos</h2>
            <form onSubmit={handleConvocatoriaSubmit}>
                <Controller
                    name="file"
                    control={control}
                    render={({ field: { onChange, ref } }) => (
                        <input
                            ref={ref}
                            type="file"
                            accept=".pdf,.docx"
                            onChange={(e) => {
                                onChange(e.target.files?.[0]); // Guardar solo el primer archivo
                            }}
                        />
                    )}
                />
                {typeof errors.file?.message === 'string' && <p style={{ color: "red" }}>{errors.file.message}</p>}
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default FormArchivos;
