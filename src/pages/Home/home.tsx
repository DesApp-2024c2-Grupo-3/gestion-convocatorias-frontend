import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import ButtonConvocatoria from '../../components/button-convocatoria/Button';
import Convocatoria from '../../components/convocatoria/Convocatoria'
import UserDropdown from '../../components/UserDropdropdown/UserDropdown';
import styles from './home.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getConvocatorias } from "../../api/api";
import { UserContext } from '../Login/userContext';

interface Convocatoria {
    _id:string
    informacionGeneral:{
        titulo:string,
        descripcion:string,
        fechaInicio: Date,
        fechaFin: Date
    },
    formato:string[]
}

const Home = () => {
    const { usuario } = useContext(UserContext)

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    const [listConvocatorias, setListConvocatorias] = useState<Convocatoria[]>([])
    const navigate = useNavigate();

    const navigateFormNuevaConvocatoria = () => {
        navigate('/Form')
    };

    useEffect( () => {
        const getConvocatoria = async () => {

            const data = await getConvocatorias();
            if (Array.isArray(data)) {
                setListConvocatorias(data);
            }
        } ;
        getConvocatoria()
    }, [])


    const convocatorias = listConvocatorias.length ? ( 
            listConvocatorias.map((convoc, index) => (
                <Convocatoria
                idConvocatoria={convoc._id}
                key={index}
                titulo={convoc.informacionGeneral.titulo}
                descripcion={convoc.informacionGeneral.descripcion}
                fechaInicio={new Date(convoc.informacionGeneral.fechaInicio)}
                fechaFin={new Date(convoc.informacionGeneral.fechaFin)}
                formato={convoc.formato}
                /> 
            ))
    ) : (
        <>
            <div className={styles['sin-convocatoria']}>
                <h2>No hay convocatorias en curso</h2>
                    <ButtonConvocatoria 
                        className='btn-sin-convocatoria'
                        nombre='Nueva Convocatoria'
                        accion={navigateFormNuevaConvocatoria}
                        iconoDelBoton={<i className="bi bi-plus"></i>} />
            </div>
        </>    
    );

    return (
        <div className={styles['container-fluid']}>
            {/* row principal */}
            <div className={styles['row-principal']}>
                {/* col sidebar */}
                <div className={styles['col-sidebar']}>
                    <Sidebar />
                </div>

                {/* col home */}
                <div className={styles['col-home']}>
                    <div className={styles['userDrop']}>
                        <UserDropdown />
                    </div>

                    <div className={styles['convocatorias']}>
                        {convocatorias}
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );



};

export default Home