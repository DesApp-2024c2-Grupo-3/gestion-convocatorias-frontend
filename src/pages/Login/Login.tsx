import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './Logo';

const userContraStyle = {
  fontSize: '28px'
};

const inputStyle = {
  fontSize: '16px', 
  padding: '15px',  
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  border: '1px solid #ccc',  
};

const containerShadowStyle = {
  
  
  margin: '0',  
  padding: '0',  // sacar relleno
};

const columnStyle = {
  margin: '0', 
  padding: '0',  // sacar espacio entre columnas
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',  
};

const Login = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-12">
           <Logo/>
        </div>
      </div>

      <div className="row d-flex justify-content-center align-items-center">
        <div className="row w-100" style={{ maxWidth: '1100px', ...containerShadowStyle }}>
          {/* Columna izquierda (verde) */}
          <div className="col-md-6 bg-success text-white d-flex flex-column justify-content-center align-items-center p-5" style={{ ...columnStyle, minHeight: '75vh', borderRadius: '5px 0 0 5px' }}>
            <h3 style={userContraStyle}>Iniciar sesión</h3>
            <p>¿No sos usuario?</p>
            <a href="#" className="text-white">Regístrate</a>
          </div>
          {/* Columna derecha (form) */}
          <div className="col-md-6 p-4 d-flex flex-column justify-content-center" style={{ ...columnStyle, minHeight: '75vh', border: '1px solid', borderRadius: '0 5px 5px 0' }}>
            <form>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label" style={{fontSize: '28px'}}>Usuario</label>
                <input type="text" className="form-control" id="usuario" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label" style={userContraStyle}>Contraseña</label>
                <input type="password" className="form-control" id="contrasena" style={inputStyle} />
              </div>
              <div className="mb-5">
                <a href="#" className="text-primary">¿Olvidaste tu contraseña? Click aquí</a>
              </div>
              <button type="submit" className="btn btn-outline-primary w-100" style={{ fontSize: '18px', padding: '8px' }}>Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
