import React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInformacionGeneralValues, schema } from "../schemas/informacionGeneralSchema";
import InputForm from "../components/InputForm";

const FormInformacionGeneral  = () => {
    const {control , handleSubmit, formState: {errors}} = useForm<FormInformacionGeneralValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormInformacionGeneralValues> = (data) => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm name="titulo" control={control} label="Titulo" type="text" error={errors.titulo} />
            <InputForm name="descripcion" control={control} label="Descripcion" type="text" error={errors.descripcion} />
            <InputForm name="fechaInicio" control={control} label="fechaInicio" type="datetime-local" error={errors.fechaInicio} />
            <InputForm name="fechaFin" control={control} label="fechaFin" type="datetime-local" error={errors.fechaFin} />
            <button type="submit">Siguiente</button>
        </form>
    )
}

export default FormInformacionGeneral