import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './UserDropdown.css'
import { useNavigate } from 'react-router-dom';


const UserDropdown = () => {
    const navigate = useNavigate();
    const navigateLogin = () =>{
        navigate('/Login')
    }
   
    return (
        <Dropdown className='user-dropdown'>
            <Dropdown.Toggle variant='succes' id='dropdown-basic'>
                <i className="bi bi-person-fill"></i>
                Usuario
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item  onClick={navigateLogin}>Cerrar Sesion</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ); 
}

export default UserDropdown