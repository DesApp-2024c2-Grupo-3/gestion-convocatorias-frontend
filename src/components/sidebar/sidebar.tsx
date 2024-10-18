import React from "react";

// imports boostrap
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";

// imports css
import './sidebar.css'
import ButtonConvocatoria from "../button-convocatoria/ButtonConvocatoria";


const Sidebar = () => {

    return  (

        <Nav defaultActiveKey="/home" className="flex-column sidebar" >
            <img src="https://i.postimg.cc/X7Qgdnc4/Unahur-logo2.png" alt="" className="img-sidebar" />
            <Nav.Link className='nav-link' eventKey="link-1"><i className="bi bi-broadcast"></i> Convocatorias</Nav.Link>

           <ButtonConvocatoria nombre='Nueva Convocatoria'/>

        </Nav>

    )


}


export default Sidebar