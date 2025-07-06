import React from "react";
import { useLoginForm } from "@/hooks/userLoginForm";
import { LoginPanel, LoginForm, RegisterForm, RecoverForm, RegisterPanel } from "@/components/molecules";
import LoginTemplate from "@/components/templates/loginTemplate_";

interface LoginContainerProps {
  leftPanel?: React.ReactNode;
  rightForm?: React.ReactNode;
}

const LoginContainer = ({ leftPanel: leftPanelProp, rightForm: rightFormProp }: LoginContainerProps) => {
  const {
    formMode,
    nombre,
    email,
    password,
    passwordConfirm,
    errors,
    setNombre,
    setEmail,
    setPassword,
    setPasswordConfirm,
    showLogin,
    showRegister,
    showRecover,
    ingresarLogin,
    handleRecuperarContrasenia,
    handleRegistrarUsuario
  } = useLoginForm();

  
  const leftPanel = leftPanelProp !== undefined
    ? leftPanelProp
    : (formMode === "register"
        ? <RegisterPanel onLogin={showLogin} />
        : <LoginPanel onRegister={showRegister} />);

  const rightForm = rightFormProp !== undefined
    ? rightFormProp
    : (formMode === "login"
        ? <LoginForm
            email={email}
            password={password}
            errors={errors}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={ingresarLogin}
            onForgotPassword={showRecover}
            onRegister={showRegister}
          />
        : formMode === "recover"
        ? <RecoverForm
            email={email}
            errors={errors}
            onEmailChange={(e) => setEmail(e.target.value)}
            onSubmit={handleRecuperarContrasenia}
            onLogin={showLogin}
          />
        : <RegisterForm
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
          />);

  return (
    <LoginTemplate leftPanel={leftPanel} rightForm={rightForm} />
  );
};

export default LoginContainer;