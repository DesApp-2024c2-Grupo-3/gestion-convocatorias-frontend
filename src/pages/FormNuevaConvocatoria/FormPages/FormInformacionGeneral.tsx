import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InformacionGeneralValues, schema } from "../schemas/informacionGeneralSchema";
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from "../components/FormInput";
import Button from "../../../components/button-convocatoria/Button";
import { useDispatch } from "react-redux";
import { siguiente } from "../../../features/formularioNuevaConvocatoria/formularioSlice";


const FormInformacionGeneral = () => {

    const dispatch = useDispatch()

    const { control, handleSubmit, formState: {errors} } = useForm<InformacionGeneralValues>({
        defaultValues: {
            titulo: "",
            descripcion: "",
            fechaInicio: new Date('2000-01-01T00:00'),
            fechaFin: new Date('2000-01-01T00:00')
        },
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<InformacionGeneralValues> = data => {
        console.log(data);
        dispatch(siguiente({...data, fechaInicio: data.fechaInicio.toISOString(), fechaFin: data.fechaFin.toISOString() } ))
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Nueva Convocatoria</h2>

            <FormInput nombre='titulo' label="Titulo" type="text" control={control} error={errors.titulo}/>
            <FormInput nombre='descripcion' label="Descripcion" type='text' control={control} error={errors.descripcion}/>
            <FormInput nombre='fechaInicio' label="Fecha Inicio" type="datetime-local" control={control} error={errors.fechaInicio}/>
            <FormInput nombre='fechaFin' label="Fecha Fin" type="datetime-local" control={control} error={errors.fechaFin}/>
            <Button nombre="Siguiente" className='' type="submit" />
        </form>
    )
}

export default FormInformacionGeneral;