import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './login.css'



const Login = () => {
  const navigate = useNavigate();

  const ingresarLogin = () => {
    navigate('/');
  };
  
  return (
    <div className="container-fluid container-login">
      <div className="row login-row-img">
        <div className="col login-col-img">
           <Logo/>
        </div>
      </div>

      <div className="row login-row">
          {/* Columna izquierda (verde) */}
          <div className="col login-col-izquierda">
            <p><i className="bi bi-person-circle"></i></p>
            <h3>Iniciar sesión</h3>
            <p>¿No sos usuario?</p>
            <a href="#" className="">Regístrate</a>
          </div>
          {/* Columna derecha (form) */}
          <div className="col login-col-derecha">
            <form className="form-login" onSubmit={ingresarLogin}> {/* manejar el evento de envío */}
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario</label>
                <input type="text" className="form-control-login" id="usuario"/>
              </div>
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label" >Contraseña</label>
                <input type="password" className="form-control-login" id="contrasena"/>
              </div>
              <div className="mb-5">
                <a href="#" className="text-primary">¿Olvidaste tu contraseña? Click aquí</a>
              </div>
              <button type="submit" className="btn btn-login" >Ingresar</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
