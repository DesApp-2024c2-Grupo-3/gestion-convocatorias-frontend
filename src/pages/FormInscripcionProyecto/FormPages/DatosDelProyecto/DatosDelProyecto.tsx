    import React, { useState } from 'react';
    import './DatosDelProyecto.css';
    import { IFormularioInscripcion } from '../../FormInscripcionProyecto';
    import styles from "../../../Home/formularios.module.css"
    import { formNavAnteriorBtn, formNavSiguienteBtn } from '../../../../components/CustomButton/buttonStyles';
    import { CustomButton } from '../../../../components/CustomButton/CustomButtons';
    import { ArrowBack, ArrowForward } from "@mui/icons-material";
    import { Button } from '@mui/material';

    interface Props {
        irSiguiente: (step: number) => void;
        irAtras: (step: number) => void;
        datosDelFormulario: IFormularioInscripcion;
        setDatosDelFormulario: (datos: IFormularioInscripcion) => void;
    }

    const DatosDelProyecto = ({ irSiguiente, irAtras, datosDelFormulario, setDatosDelFormulario }: Props) => {
        const [titulo, setTitulo] = useState('');
        const [categoria, setCategoria] = useState('');
        const [objetivos, setObjetivos] = useState('');
        const [aceptaBases, setAceptaBases] = useState(false);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (!aceptaBases) {
                alert('Debe aceptar las bases y condiciones');
                return;
            }
        
            setDatosDelFormulario({
                ...datosDelFormulario, 
                titulo,
                categoria,
                objetivos,
            });
        
            irSiguiente(3);
        }

        return (
            <form onSubmit={handleSubmit} className={"formulario-postulacion"}>
                <h3>Formulario de postulación</h3>
                <p className="section-title">Datos del proyecto</p>
                <hr />

                <div className="field-group">
                <label>1. TÍTULO DEL PROYECTO:</label>
                <textarea value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>

                <div className="field-group">
                <label>2. CATEGORÍA:</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                    <option value="">Seleccione una categoría</option>
                    <option value="Investigación">Investigación</option>
                    <option value="Desarrollo">Desarrollo</option>
                </select>
                </div>

                <div className="field-group">
                <label>3. OBJETIVOS GENERALES:</label>
                <textarea value={objetivos} onChange={(e) => setObjetivos(e.target.value)} required />
                </div>

                <hr />

                <div className="checkbox-area">
                <label>
                    <input type="checkbox" checked={aceptaBases} onChange={() => setAceptaBases(!aceptaBases)} /> Aceptar bases y
                    condiciones
                </label>
                </div>

                <div className={styles['nav-btn-group']}>
                        <Button
                            sx={{ ...formNavAnteriorBtn, color: 'white', backgroundColor:"#D94A3A" }}
                            onClick={() => irAtras(1)}
                        ><ArrowBack />Volver</Button>
                        <CustomButton
                            nombre="Enviar solicitud"
                            type="submit"
                            iconoDerecho={<ArrowForward />}
                            style={formNavSiguienteBtn}
                        />
                    </div>
            </form>
            );
    };

    export default DatosDelProyecto;
