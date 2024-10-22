import React from 'react';

import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import ButtonConvocatoria from '../../components/button-convocatoria/Button';
import Convocatoria from '../../components/convocatoria/Convocatoria'
import UserDropdown from '../../components/UserDropdropdown/UserDropdown';


const Home = () => {

    const listConvocatorias = [
        {
            "titulo": "Convocatoria 1",
            "descripcion": "descripcion de Convocatoria 1",
            "fechaFin": "1-02-2024"
        },
        {
            "titulo": "Convocatoria 2",
            "descripcion": "descripcion de Convocatoria 2",
            "fechaFin": "2024-02-01"
        }
    ];

    const convocatorias = listConvocatorias.length ? ( 
            listConvocatorias.map((convoc, index) => (
                <Convocatoria 
                key={index}
                titulo={convoc.titulo}
                descripcion={convoc.descripcion}
                fechaFin={new Date(convoc.fechaFin)}
                /> 
            ))
    ) : (
        <>
            <h2>No hay convocatorias en curso</h2>
            <ButtonConvocatoria 
                className='btn-convocatoria'
                nombre='Nueva Convocatoria'
                iconoDelBoton={<i className="bi bi-plus"></i>} 
            />
        </>
    );

    return (
        <div className='container-fluid d-flex'>
            {/* row principal */}
            <div className='row row-principal'>
                {/* col sidebar */}
                <div className='col col-sidebar'>
                    <Sidebar />
                </div>

                {/* col home */}
                <div className='col col-home'>
                    <UserDropdown />
                    {convocatorias}
                </div>
            </div>
        </div>
    );



};

export default Home