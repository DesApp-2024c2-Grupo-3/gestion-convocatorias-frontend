import React from "react";
import "./button.scss";

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    className = "btn-login", 
    type = "button",
}) => {

    return (
        <button
            type={type}
            className={className}
        >
            {children}
        </button>
    );
};

export default Button;