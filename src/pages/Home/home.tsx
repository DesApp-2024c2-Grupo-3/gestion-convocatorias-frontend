import React from 'react';

import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import ButtonConvocatoria from '../../components/button-convocatoria/ButtonConvocatoria';
import Convocatoria from '../../components/Convocatoria'


const Home = () => {

    const listConvocatorias = [
        {nombre:'Convocatoria 1'},
        {nombre:'Convocatoria 2'},
        {nombre: 'Convocatoria 3'}
    ];

    const convocatorias = listConvocatorias.length ? ( 
            listConvocatorias.map((convoc, index) => (
                <Convocatoria 
                key={index}
                nombre={convoc.nombre}
                /> 
            ))
    ) : (
        <>
            <h2>No hay convocatorias en curso</h2>
            <ButtonConvocatoria nombre='Nueva Convocatoria' />
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
                    {convocatorias}
                </div>
            </div>
        </div>
    );



};

export default Home