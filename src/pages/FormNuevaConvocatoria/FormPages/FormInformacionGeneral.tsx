import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InformacionGeneralValues, schema } from "../schemas/informacionGeneralSchema";
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from "../components/FormInput";
import Button from "../../../components/button-convocatoria/Button";
import { useDispatch } from "react-redux";
import { informacionGeneral, siguiente } from "../../../features/formularioNuevaConvocatoria/formularioSlice";
import { store } from "../../../store/store";


const FormInformacionGeneral = () => {

    const dispatch = useDispatch()
    const values = store.getState().formulario.informacionGeneral
    const savedValues = {...values, fechaInicio: new Date(values.fechaInicio), fechaFin: new Date(values.fechaFin)}
    

    const { control, handleSubmit, formState: {errors} } = useForm<InformacionGeneralValues>({
        defaultValues: savedValues,
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<InformacionGeneralValues> = data => {
        console.log(data);
        dispatch(siguiente())
        dispatch(informacionGeneral({...data, fechaInicio: data.fechaInicio.toISOString(), fechaFin: data.fechaFin.toISOString() } ))
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
