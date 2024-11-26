import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import styles from './login.module.css';
import { loginUsuario } from '../../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const ingresarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciando sesión')
    
    const data = await loginUsuario(email, password);
    console.log('Respuesta del loginUsuario:', data);

    if (data && data.access_token) {
        console.log('Token válido');
        navigate('/');
    } else {
        console.log('no se recibió un token válido.');
        setError("email o contraseña incorrectos");
    }
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
        <div className={styles["login-col-izquierda"]}>
          <p>
            <i className="bi-person-circle"></i>
          </p>
          <h3>Iniciar sesión</h3>
          <p>¿No tienes cuenta?</p>
          <a onClick={Registrarse} className="">
            Regístrate
          </a>
        </div>
        <div className={styles["login-col-derecha"]}>
          <form className={styles["form-login"]} onSubmit={ingresarLogin}>
            <div className="mb-3">
              <label htmlFor="email" className={styles["form-label"]}>
                Email
              </label>
              <input
                type="email"
                className={styles["form-control"]}
                id="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value); 
                                  if (error) setError(null);}} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className={styles["form-label"]}>
                Contraseña
              </label>
              <input
                type="password"
                className={styles["form-control"]}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);}
                } 
              />
            </div>
            {error && <p className={styles["error-message"]}>{error}</p>}
            <div className="mb-5">
              <a href="#">¿Olvidaste tu contraseña? Haz clic aquí</a>
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
