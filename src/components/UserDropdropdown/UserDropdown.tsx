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
                <Dropdown.Item onClick={navigateLogin}>Iniciar sesion</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    ); 
}

export default UserDropdown