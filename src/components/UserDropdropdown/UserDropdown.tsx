import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './UserDropdown.css'

const UserDropdown = () => {
    return (
        <Dropdown className='user-dropdown'>
            <Dropdown.Toggle variant='succes' id='dropdown-basic'>
                <i className="bi bi-person-fill"></i>
                Usuario
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdown