import React from "react";
import "./label.scss";

interface LabelProps {
    children?: React.ReactNode;
    className?: string;
    htmlFor?: string;
    text?: string;
}

const Label: React.FC<LabelProps> = ({
    className = "",
    htmlFor,
    text,
    children
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={className}
        >
            {text}
            {children}
        </label>
    );
};

export default Label;
