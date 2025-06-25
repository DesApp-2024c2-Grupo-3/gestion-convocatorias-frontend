import React from "react";
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
  }) => (
    <div className="input-group">
      {label && (
        <label htmlFor={for_} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control-login"
      />
      {error && (
        <span className="input-error">{error}</span>
      )}
    </div>
  );
  
  export default Input;