import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import styles from './login.module.css'



const Login = () => {
  const navigate = useNavigate();

  const ingresarLogin = () => {
    navigate('/');
  };

   const Registrarse = () => {
     navigate("/Register");
   };
  
  return (
    <div className={styles["container-login"]}>
      <div className={styles["login-row-img"]}>
        <div className={styles["login-col-img"]}>
          <Logo />
        </div>
      </div>

      <div className={styles["login-row"]}>
        {/* Columna izquierda (verde) */}
        <div className={styles["login-col-izquierda"]}>
          <p>
            <i className="bi-person-circle"></i>
          </p>
          <h3>Iniciar sesión</h3>
          <p>¿No sos usuario?</p>
          <a onClick={Registrarse} className="">
            Regístrate
          </a>
        </div>
        {/* Columna derecha (form) */}
        <div className={styles["login-col-derecha"]}>
          <form className={styles["form-login"]} onSubmit={ingresarLogin}>
            {" "}
            {/* manejar el evento de envío */}
            <div className="mb-3">
              <label htmlFor="usuario" className={styles["form-label"]}>
                Usuario
              </label>
              <input
                type="text"
                className={styles["form-control"]}
                id="usuario"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contrasena" className={styles["form-label"]}>
                Contraseña
              </label>
              <input
                type="password"
                className={styles["form-control"]}
                id="contrasena"
              />
            </div>
            <div className="mb-5">
              <a href="#">¿Olvidaste tu contraseña? Click aquí</a>
            </div>
            <button type="submit" className={styles["btn-login"]}>
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
