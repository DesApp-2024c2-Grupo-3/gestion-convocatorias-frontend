import React, { useState } from "react";
import "./input.scss";

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
  error?: string;
  for_?: string;
  className?: string;
}


const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  id,
  placeholder,
  error,
  for_
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

  return (

    <div className="input-group">
      {label && (
        <label htmlFor={for_} className="input-label">
          {label}
        </label>
      )}
      <div className="input-wrapper">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control-login"
        />
      </div>
      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  );
};

export default Input;