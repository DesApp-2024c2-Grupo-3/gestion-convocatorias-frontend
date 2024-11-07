import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import ButtonConvocatoria from '../../components/button-convocatoria/Button';
import Convocatoria from '../../components/convocatoria/Convocatoria'
import UserDropdown from '../../components/UserDropdropdown/UserDropdown';
import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const navigateForm = () => {
        navigate('/FormNuevaConvocatoria')
    }

    const navigate = useNavigate();
    const navigateFormNuevaConvocatoria = () => {
        navigate('/Form')
    };

    const listConvocatorias = [
        {
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
        },{
            "titulo": "Convocatoria 1",
            "descripcion": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iusto tempora ipsa deleniti quo sed dolore nostrum blanditiis aspernatur doloremque quos cupiditate omnis, unde beatae esse dolorem numquam odio quibusdam!",
            "fechaFin": "1-02-2024"
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