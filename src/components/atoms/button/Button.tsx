import React, { MouseEventHandler } from "react";
import { Button as MuiButton } from "@mui/material";
import { SxProps } from "@mui/system";

export interface ButtonProps {
  label: string;
  sx?: SxProps;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  component?: React.ElementType;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  sx,
  type = "button",
  onClick,
  startIcon,
  endIcon,
  disabled = false,
  component,
  to,
  ...rest
}) => (
  <MuiButton
    variant="contained"
    sx={sx}
    type={type}
    onClick={onClick}
    startIcon={startIcon}
    endIcon={endIcon}
    disabled={disabled}
    {...(component ? { component } : {})}
    {...(to ? { to } : {})}
    {...rest}
  >
    {label}
  </MuiButton>
);

export default Button;