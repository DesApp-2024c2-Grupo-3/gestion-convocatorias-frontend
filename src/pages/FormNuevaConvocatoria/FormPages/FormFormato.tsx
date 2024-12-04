import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Button from "../../../components/button-convocatoria/Button";
import "./FormFormato.css";
import { useDispatch, useSelector } from "react-redux";
import { formato, atras, reset, informacionGeneral } from "../../../features/formularioNuevaConvocatoria/formularioSlice";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { postConvocatoria } from "../../../api/api";

export type CamposValues = {
    campos: (
        | {
              nombre: string;
              tipo: "Texto";
              maxNumeroDeCaracteres: number;
          }
        | {
              nombre: string;
              tipo: "Desplegable";
              opciones: string[];
          }
    )[];
};

const FormFormato = () => {

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<CamposValues>({
        defaultValues: {
            campos: [
                { nombre: '', tipo: 'Texto', maxNumeroDeCaracteres: 0 },
            ]
        }
    });

    const { fields, prepend, append, remove } = useFieldArray({
        name: 'campos',
        control,
        rules: {
            required: "Debe haber al menos un campo"
        }
    });

    const [selectedType, setSelectedType] = useState<string[]>(fields.map(() => "Texto"));

    const removerCampo = (index: number) => {
        remove(index);
        setSelectedType(selectedType.filter((_, i) => i !== index));
    };

    const agregarCampo = () => {
        append({
            nombre: 'Nuevo Campo',
            tipo: "Texto",
            maxNumeroDeCaracteres: 0
        });
        setSelectedType([...selectedType, "Texto"]);
    };

    const agregarCampoAlInicio = () => {
        prepend({
            nombre: 'Nuevo Campo',
            tipo: "Texto",
            maxNumeroDeCaracteres: 0
        });
        setSelectedType(["Texto", ...selectedType]);
    };

    const onChangeTipo = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const nuevoTipo = e.target.value as "Texto" | "Desplegable";
        setSelectedType(selectedType.map((tipo, i) => (i === index ? nuevoTipo : tipo)));

        if (nuevoTipo === "Texto") {
            setValue(`campos.${index}.maxNumeroDeCaracteres`, 0);
            setValue(`campos.${index}.opciones`, undefined);
        } else {
            setValue(`campos.${index}.opciones`, []);
            setValue(`campos.${index}.maxNumeroDeCaracteres`, undefined);
        }
    };

    const onOptionsBlur = (e: React.FocusEvent<HTMLInputElement>, index: number) => {
        const opciones = e.target.value.split(";").map(opcion => opcion.trim()).filter(opcion => opcion);
        setValue(`campos.${index}.opciones`, opciones);
    };
   
    const dispatch = useDispatch()
    const informacionGeneralData = useSelector((state: RootState) => state.formulario.informacionGeneral)
    const formatoData = useSelector((state: RootState) => state.formulario.formato)
    
    const volver = () => {
        dispatch(atras())
    }
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<CamposValues> = (formatoData) => {
        console.log(formatoData);
        
        postConvocatoria(
            informacionGeneralData,
            formatoData
        )
        
        dispatch(formato(formatoData))
        dispatch(reset())
        navigate('/')
    };

    return (
        <div className="form-container">
            <h2>Nueva Convocatoria</h2>
            <h4>Formato</h4>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="button-group">
                    <Button
                        nombre="Agregar Campo al final"
                        className="add-button"
                        type="button"
                        accion={agregarCampo} />
                    <Button
                        nombre="Agregar Campo al inicio"
                        className="add-button"
                        type="button"
                        accion={agregarCampoAlInicio} />
                </div>

                {fields.map((field, index) => (
                    <fieldset key={field.id} className="form-fieldset">
                        <label className="form-label">
                            <span>Nombre del Campo</span>
                            <input
                                {...register(`campos.${index}.nombre`, { required: 'El nombre del campo es requerido'  })}
                                className="form-input"
                                required
                            />
                        </label>
                        <label className="form-label">
                            <span>Tipo</span>
                            <select
                                {...register(`campos.${index}.tipo`, { required: 'Debe seleccionar el Tipo del campo' })}
                                onChange={(e) => onChangeTipo(e, index)}
                                className="form-select"
                                required
                            >
                                <option></option>
                                <option value="Texto">Texto</option>
                                <option value="Desplegable">Desplegable</option>
                            </select>
                        </label>

                        {selectedType[index] === "Texto" && (
                            <label className="form-label">
                                <span>Máximo Número de Caracteres</span>
                                <input
                                    type="number"
                                    {...register(`campos.${index}.maxNumeroDeCaracteres`, {
                                        required: 'Debe indicar la cantidad maxima de caracteres del campo',
                                        min: {
                                            value: 1,
                                            message: "Debe ser mayor a 0"
                                        }
                                    })}
                                    className="form-input"
                                    min={1}
                                    required
                                />
                            </label>
                        )}

                        {selectedType[index] === "Desplegable" && (
                            <label className="form-label">
                                <span>Opciones (separadas por ;)</span>
                                <input
                                    type="text"
                                    placeholder="Ejemplo: Opción 1;Opción 2"
                                    onBlur={(e) => onOptionsBlur(e, index)}
                                    className="form-input"
                                    required
                                />
                            </label>
                        )}

                        <Button
                            nombre="Eliminar"
                            className="remove-button"
                            accion={() => removerCampo(index)} />
                    </fieldset>
                ))}
                <p className="error-message">{errors.campos?.root?.message}</p>
                <Button
                    nombre="Volver"
                    className="submit-button"
                    iconoDelBoton={<i className="bi bi-arrow-left"></i>}
                    accion={volver}
                    type="button" />
                <Button
                    nombre="Siguiente"
                    className="submit-button"
                    iconoDelBoton={<i className="bi bi-arrow-right"></i>}
                    type="submit" />
            </form>
        </div>
    );
};

export default FormFormato;
