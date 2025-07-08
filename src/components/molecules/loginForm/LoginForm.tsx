import React from "react";
import { Input, Label, ErrorMessage, Link, Button, Panel } from "@/components/atoms";
import { Stack, Box } from "@mui/material";
import useIsMobile from "@/hooks/useMobile";
import { blueButton } from "@/components/atoms/button/button.styles";

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
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  errors = {},
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
}) => {
  const isMobile = useIsMobile();

  return (
    <Panel borderRadius={isMobile ? "0 0 10px 10px" : "0 10px 10px 0"}>
      <Box component="form" className="login-form" onSubmit={onSubmit}>
        <Stack spacing={4}>
          <div>
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
          </div>
          <div>
            <Label htmlFor="password" className="form-label">
              Contraseña
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={onPasswordChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>
          <Button
            type="submit"
            sx={blueButton}
            label="Ingresar"
          />
          <Box textAlign="center">
            <Link onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Stack>
      </Box>
    </Panel>
  );
};

export default LoginForm;