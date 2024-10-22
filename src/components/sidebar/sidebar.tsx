import React from "react";

// imports boostrap
import Nav from 'react-bootstrap/Nav';


// imports css
import './sidebar.css'
import ButtonConvocatoria from "../button-convocatoria/Button";


const Sidebar = () => {

    return  (

        <Nav defaultActiveKey="/home" className="flex-column sidebar" >
            <img src="https://i.postimg.cc/X7Qgdnc4/Unahur-logo2.png" alt="" className="img-sidebar" />
            <Nav.Link className='nav-link' eventKey="link-1"><i className="bi bi-broadcast"></i> Convocatorias</Nav.Link>

           <ButtonConvocatoria 
                className='btn-convocatoria'
                nombre='Nueva Convocatoria'
                iconoDelBoton={<i className="bi bi-plus"></i>}
            />

        </Nav>

    )


}


export default Sidebar