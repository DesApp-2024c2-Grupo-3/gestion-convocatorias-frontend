import React from "react";
import './link.scss';

interface LinkProps {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    className?: string;
    target?: string;
    rel?: string;
    color?: string;
}

const Link: React.FC<LinkProps> = ({
    children,
    href = "#",
    onClick,
    className = "",
    target,
    rel,
    color = "rgb(13, 110, 253)"
}) => (
    <a
        href={href}
        onClick={onClick}
        className={`link ${className}`}
        target={target}
        rel={rel}
        style={{ color: color }}
    >
        {children}
    </a>
);

export default Link;