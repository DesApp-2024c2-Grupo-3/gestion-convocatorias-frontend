<<<<<<< HEAD
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
        <form onSubmit={handleSubmit(onSubmit)} className="form-conv">
            <h2>Nueva Convocatoria</h2>
            
            <InputForm name="titulo"  control={control} label="Titulo" type="text" error={errors.titulo} />
            <InputForm name="descripcion" control={control} label="Descripcion" type="text" error={errors.descripcion} />
            <InputForm name="fechaInicio" control={control} label="fechaInicio" type="datetime-local" error={errors.fechaInicio} />
            <InputForm name="fechaFin" control={control} label="fechaFin" type="datetime-local" error={errors.fechaFin} />
            <button type="submit" className="form-button">Siguiente</button>
=======
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InformacionGeneralValues, schema } from "../schemas/informacionGeneralSchema";
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from "../components/FormInput";
import Button from "../../../components/button-convocatoria/Button";
import { useDispatch } from "react-redux";
import { informacionGeneral, siguiente } from "../../../features/formularioNuevaConvocatoria/formularioSlice";


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
>>>>>>> dev
        </form>
    )
}

<<<<<<< HEAD
export default FormInformacionGeneral
=======
export default FormInformacionGeneral;
>>>>>>> dev
