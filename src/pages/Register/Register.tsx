import React from "react";
import { Link } from "react-router-dom";
import "./register.css";
import "../Home/home.module.css" 
import { useNavigate } from "react-router-dom";



const Register: React.FC = () => {

     const navigate = useNavigate();
     const ingresarRegister = () => {
       navigate("/Login");
     };
 
  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" placeholder="Ingresa tu usuario" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" placeholder="Ingresa tu correo" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button
          type="submit"
          className="register-btn"
          onClick={ingresarRegister}
        >
          Registrarse
        </button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
