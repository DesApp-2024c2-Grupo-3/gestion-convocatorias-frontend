import React from "react";
import { Input, Label, ErrorMessage, Link, Button } from "@/components/atoms";
import './loginForm.scss';
import { Panel } from "@/components/atoms";
import useIsMobile from "@/hooks/useMobile";

interface LoginFormProps {
  email: string;
  password: string;
  errors?: {
    email?: string;
    password?: string
  };
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onRegister: () => void;
} 

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  errors = {},
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onRegister,
}) => {
  const isMobile = useIsMobile();

  return (
    <Panel borderRadius={isMobile ? "0 0 10px 10px" : "0 10px 10px 0"}>
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-form-inputs">
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
        </div>
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

        <div className="w-100 text-center">
          <Link onClick={onRegister}>
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button type="submit" className="btn-login">
          Ingresar
        </Button>
      </form>
    </Panel>
  );
};

export default LoginForm;