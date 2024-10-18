import React from 'react';
import { Button } from 'react-bootstrap';

import Sidebar from '../../components/sidebar/sidebar';
import './home.css'
import ButtonConvocatoria from '../../components/button-convocatoria/ButtonConvocatoria';





const Home = ({}) => {

    let listConvocatorias: string[] ;

    listConvocatorias = []


    return (
        <div className='container-fluid d-flex '>

            {/* row principal */}
            <div className='row row-principal'>
                
                {/* col sidebar */}
                <div className='col col-sidebar'>
                    <Sidebar/>
                </div>

                <div className='col col-home'  >
                   <h2>{listConvocatorias.length < 1 ? 'No hay convocatorias en curso' : listConvocatorias[0] } </h2> 
                   <ButtonConvocatoria/>
                </div>
                

            </div>
    
        </div>
    )
};

export default Home;