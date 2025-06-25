import React from "react";
import "./errorMessage.scss";

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, className = "" }) => (
  <span className={`error-message ${className}`}>
    {children}
  </span>
);

export default ErrorMessage;