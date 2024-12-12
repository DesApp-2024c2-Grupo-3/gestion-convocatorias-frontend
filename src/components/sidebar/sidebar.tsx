import React from "react";

// imports boostrap
import Nav from 'react-bootstrap/Nav';


// imports css
import Styles from'./sidebar.module.css'
import ButtonConvocatoria from "../button-convocatoria/Button";
import styles from "@emotion/styled";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

    const navigate = useNavigate();
    const navigateFormNuevaConvocatoria = () => {
        navigate('/Form')
    };

    const navigateHome = () => {
        navigate('/')
    };

    return  (
        <Nav defaultActiveKey="/home" className={`${Styles.sidebar}`}>
            <img src="https://i.postimg.cc/X7Qgdnc4/Unahur-logo2.png" alt="" className={Styles["img-sidebar"]} />
            <Nav.Link className={Styles['nav-link']} eventKey="link-1" onClick={navigateHome}><i className="bi bi-broadcast"></i> Convocatorias</Nav.Link>

           <ButtonConvocatoria 
                className='btn-convocatoria'
                nombre='Nueva Convocatoria'
                iconoDelBoton={<i className="bi bi-plus"></i>}
                accion={navigateFormNuevaConvocatoria}
            />

        </Nav>

    )


}


export default Sidebar