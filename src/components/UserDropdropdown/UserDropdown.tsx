import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./UserDropdown.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/userContext";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useContext(UserContext);
  const navigateLogin = () => {
    navigate("/login", { replace: true });
  };
  const navigateMiPerfil = () => {
    navigate("/mi-perfil");
  };

  return (
    <Dropdown className="user-dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <i className="bi bi-person-fill"></i>
        {usuario ? usuario.nombre : "Usuario"}{" "}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {usuario ? (  
          <>
            {" "}
            
            <Dropdown.Item onClick={navigateMiPerfil}>Mi perfil</Dropdown.Item>
            <Dropdown.Item onClick={() => {
                cerrarSesion();
                navigateLogin()
              }}>
                Cerrar Sesión
            </Dropdown.Item>
          </>
        ) : (
          <Dropdown.Item onClick={navigateLogin}>Iniciar Sesión</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
