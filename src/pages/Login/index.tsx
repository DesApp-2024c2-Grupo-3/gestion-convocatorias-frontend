import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { loginUsuario, recuperarContrasenia, registrarUsuario } from "@/api/usuarios.api";
import { UserContext } from "./userContext";
import { LoginLayout } from "@/components/layouts";
import { LoginPanel, LoginForm, RegisterForm, RecoverForm, RegisterPanel } from "@/components/molecules";
import { getEmailError, getPasswordError } from "@/helpers/errorMessages"
import { Logo } from "@/components/atoms";
import "./login.scss";

const Login = () => {

  const navigate = useNavigate();
  const { iniciarSesion } = useContext(UserContext);

  const [formMode, setFormMode] = useState<"login" | "register" | "recover">("login");

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const showLogin = () => {
    limpiarCampos();
    setFormMode("login");
  };

  const showRegister = () => {
    limpiarCampos();
    setFormMode("register");
  };

  const showRecover = () => {
    limpiarCampos();
    setFormMode("recover");
  };

  const limpiarCampos = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: typeof errors = {};

    const emailError = getEmailError(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    if (formMode === "login" || formMode === "register") {
      const passwordError = getPasswordError(password, formMode === "register");
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (formMode === "register" && password !== passwordConfirm) {
      newErrors.password = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ingresarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateFields()) return;

    try {
      const data = await loginUsuario(email, password);

      if (!data || data.success === false) {
        toast.error("Email o contraseña incorrectos");
        return;
      }

      if (data.access_token) {
        iniciarSesion({
          _id: data.usuario._id,
          nombre: data.usuario.nombre,
          email: data.usuario.email,
          password: data.usuario.password,
          roles: data.usuario.roles,
          cv: data.usuario.cv
        });

        sessionStorage.setItem("token", data.access_token);
        toast.success('Sesión iniciada correctamente');

        setTimeout(() => {
          navigate("/Convocatorias");
        }, 1500);
      } else {
        toast.error("Email o contraseña incorrectos");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión:");
      console.error(error);
    }
  };

  const handleRecuperarContrasenia = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateFields()) return;

    try {
      const data = await recuperarContrasenia(email);

      if (data && data.success) {
        toast.success("Email enviado correctamente");
        setTimeout(() => {
          showLogin();
        }, 1500);
        return;
      } else {
        if (!data?.success && data?.message) {
          toast.error(data.message);
        } else {
          toast.error("No se pudo enviar el email de recuperación");
        }
      }

    } catch (error: any) {
      toast.error("Ocurrió un error al enviar el email de recuperación");
      console.error(error);
    }
  };

  const handleRegistrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateFields()) return;


    try {
      const data = await registrarUsuario(nombre, email, password);

      if (data && data.success) {
        toast.success("Usuario registrado correctamente");
        setTimeout(() => {
          showLogin();
        }, 1500);
        return;
      }

      if (data && data.status === 400) {
        toast.error(data.message);
        return;
      } else {
        toast.error("No se pudo registrar el usuario");
        return;
      }

    } catch (error) {
      toast.error("Ocurrió un error al registrar el usuario");
      console.error(error);
    }
  };

  return (
    <div className="container-login">
      <Row>
        <Logo />
      </Row>

      <Row className="d-flex justify-content-center">
        <Col md={8} xs={12}>
          <LoginLayout
            left={
              formMode === "register" ? (
                <RegisterPanel onLogin={showLogin} />
              ) : (
                <LoginPanel onRegister={showRegister} />
              )
            }
            right={
              formMode === "login" ? (
                <LoginForm
                  email={email}
                  password={password}
                  errors={errors}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onSubmit={ingresarLogin}
                  onForgotPassword={showRecover}
                  onRegister={showRegister}
                />
              ) : formMode === "recover" ? (
                <RecoverForm
                  email={email}
                  errors={errors}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onSubmit={handleRecuperarContrasenia}
                />
              ) : (
                <RegisterForm
                  nombre={nombre}
                  email={email}
                  password={password}
                  passwordConfirm={passwordConfirm}
                  errors={errors}
                  onNombreChange={(e) => setNombre(e.target.value)}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onPasswordConfirmChange={(e) => setPasswordConfirm(e.target.value)}
                  onSubmit={handleRegistrarUsuario}
                />
              )
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
