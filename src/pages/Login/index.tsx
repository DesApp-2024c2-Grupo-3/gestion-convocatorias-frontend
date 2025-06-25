import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { loginUsuario } from "@/api/usuarios.api";
import { UserContext } from "./userContext";
import { LoginLayout } from "@/components/layouts";
import { LoginPanel, LoginForm } from "@/components/molecules";
import { getEmailError, getPasswordError } from "@/helpers/errorMessages"
import { Logo } from "@/components/atoms";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const { iniciarSesion } = useContext(UserContext);

  const validateFields = () => {
    const newErrors: typeof errors = {};

    const emailError = getEmailError(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    const passwordError = getPasswordError(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ingresarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateFields()) {
      return;
    }


    try {
      const data = await loginUsuario(email, password);

      if (data.success === false) {
        toast.error("Email o contraseña incorrectos");
        return;
      }


      if (data && data.access_token) {
        iniciarSesion({
          _id: data.usuario._id,
          nombre: data.usuario.nombre,
          email: data.usuario.email,
          password: data.usuario.password,
          roles: data.usuario.roles,
          cv: data.usuario.cv
        });

        sessionStorage.setItem("token", data.access_token);

        toast.success('Sesion iniciada correctamente');

        setTimeout(() => {
          navigate("/Convocatorias");
        }, 1500);

      } else {
        toast.error("Email o contraseña incorrectos");
        return;
      }
    } catch (error) {
      toast.error("Error al iniciar sesión:");
      console.error(error);
    }
  };

  const Registrarse = () => {
    navigate("/Register");
  };

  return (
    <div className="container-login">
      <Row>
        <Logo />
      </Row>

      <Row className="d-flex justify-content-center">
        <Col md={8} xs={12}>
          <LoginLayout
            left={<LoginPanel onRegister={Registrarse} />}
            right={<LoginForm
              email={email}
              password={password}
              errors={errors}
              onEmailChange={(e) => setEmail(e.target.value)}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={ingresarLogin}
              onRegister={Registrarse}
            />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
