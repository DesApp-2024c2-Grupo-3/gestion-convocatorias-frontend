import React from "react";
import { Input, Label, ErrorMessage, Link, Button } from "@/components/atoms";
import './registerForm.scss';
import { Panel } from "@/components/atoms";
import useIsMobile from "@/hooks/useMobile";

interface RegisterFormProps {
  nombre: string;
  email: string;
  password: string;
  passwordConfirm: string;
  errors?: {
    nombre?: string;
    email?: string;
    password?: string
  };
  onNombreChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
} 

const RegisterForm: React.FC<RegisterFormProps> = ({
  nombre,
  email,
  password,
  passwordConfirm,
  errors = {},
  onNombreChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
}) => {
  const isMobile = useIsMobile();

  return (
    <Panel borderRadius={isMobile ? "0 0 10px 10px" : "0 10px 10px 0"}>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-form-inputs margin-b-40">

        <Label htmlFor="nombre" className="form-label">
            Nombre
          </Label>
          <Input
            type="text"
            id="nombre"
            value={nombre}
            onChange={onNombreChange}
          />
          {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}

          <Label htmlFor="email" className="form-label">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={onEmailChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <Label htmlFor="password" className="form-label">
            Contraseña
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />

          
        <Label htmlFor="passwordConfirm" className="form-label">
            Confirmar contraseña
          </Label>
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onPasswordConfirmChange}
          />
        </div>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <Button type="submit" className="btn-login">
          Registrarse
        </Button>
      </form>
    </Panel>
  );
};

export default RegisterForm;