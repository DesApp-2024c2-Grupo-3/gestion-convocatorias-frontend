import React from "react";
import "./panel.scss";

interface PanelProps {
  children?: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

const Panel: React.FC<PanelProps> = ({
    children,
    className = "",
    borderRadius = "10px",
}) => (
  <div
    className={`panel-login ${className}`}
    style={{ borderRadius: borderRadius }}
  >
    {children}
  </div>
);

export default Panel;