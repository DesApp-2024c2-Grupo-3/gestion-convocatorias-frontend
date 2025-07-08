import React, { useState } from "react";
import { useLoginForm } from "@/hooks/userLoginForm";
import { LoginPanel, LoginForm, RegisterForm, RecoverForm, RegisterPanel } from "@/components/molecules";
import LoginTemplate from "@/components/templates/loginTemplate";
import LoadingSpinner from "@/components/molecules/loadingSpinner";


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

  const [loading, setLoading] = React.useState(false);
  
  const leftPanel = leftPanelProp !== undefined
    ? leftPanelProp
    : (formMode === "register"
        ? <RegisterPanel onLogin={showLogin} />
        : <LoginPanel onRegister={showRegister} />);

  const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      await ingresarLogin(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      await handleRegistrarUsuario(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      await handleRecuperarContrasenia(e);
    } finally {
      setLoading(false);
    }
  };

  const rightForm = rightFormProp !== undefined
    ? rightFormProp
    : (formMode === "login"
        ? <LoginForm
            email={email}
            password={password}
            errors={errors}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleLogin}
            onForgotPassword={showRecover}
            onRegister={showRegister}
          />
        : formMode === "recover"
        ? <RecoverForm
            email={email}
            errors={errors}
            onEmailChange={(e) => setEmail(e.target.value)}
            onSubmit={handleRecover}
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
            onSubmit={handleRegister}
          />);

  return (
    <>
      {loading && <LoadingSpinner />}
      <LoginTemplate leftPanel={leftPanel} rightForm={rightForm} />
    </>
  );
};

export default LoginContainer;