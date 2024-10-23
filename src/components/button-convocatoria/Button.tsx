import React from "react"
import { Button } from "react-bootstrap"
import './buttons.css'

interface Props {
    nombre: string;
    className: string;
    iconoDelBoton?: React.ReactNode;
}


const ButtonConvocatoria: React.FC<Props> = ({nombre, className, iconoDelBoton}) => {
    return <Button variant="primary" className={className}>{nombre} {iconoDelBoton}</Button>
}

export default ButtonConvocatoria