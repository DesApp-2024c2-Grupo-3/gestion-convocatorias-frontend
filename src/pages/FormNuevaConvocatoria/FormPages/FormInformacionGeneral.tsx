import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InformacionGeneralValues, schema } from "../schemas/informacionGeneralSchema";
import { zodResolver } from '@hookform/resolvers/zod';

import FormInput from "../components/FormInput";
import Button from "../../../components/button-convocatoria/Button";
import { useDispatch } from "react-redux";
import { informacionGeneral, siguiente } from "../../../features/formularioNuevaConvocatoria/formularioSlice";
import { store } from "../../../store/store";
import "./formInformacionGeneral.css"


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
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2>Nueva Convocatoria</h2>
            <h4>Informacion general</h4>
            <hr/>
            <FormInput className='input-container' nombre='titulo' label="Titulo" type="text" control={control} error={errors.titulo}/>
            <FormInput className='input-container' nombre='descripcion' label="Descripcion" type='text' control={control} error={errors.descripcion}/>
            <div className="input-fecha-container">
                <FormInput className='input-container fecha' nombre='fechaInicio' label="Fecha Inicio" type="datetime-local" control={control} error={errors.fechaInicio}/>
                <FormInput className='input-container fecha' nombre='fechaFin' label="Fecha Fin" type="datetime-local" control={control} error={errors.fechaFin}/>
            </div>
            <Button 
                nombre="Siguiente" 
                className='btn-form-nav-siguiente' 
                type="submit"
                iconoDelBoton={<i className="bi bi-arrow-right"></i>} 
                />
        </form>
    )
}

export default FormInformacionGeneral;
