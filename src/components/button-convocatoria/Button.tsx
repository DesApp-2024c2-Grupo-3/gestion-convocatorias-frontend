import React, { MouseEventHandler } from "react"
import { Button } from "react-bootstrap"
import './buttons.css'

interface Props {
    nombre: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    accion?: MouseEventHandler;
    iconoDelBoton?: React.ReactNode;
    onClick?: () => void;
}

const ButtonConvocatoria = ({nombre, className, type, accion, iconoDelBoton}: Props) => {
    return (
        <Button
            variant="primary"
            className={className}
            type={type}
            onClick={accion}>
            {nombre} {iconoDelBoton}
        </Button>
    )
}

export default ButtonConvocatoria;