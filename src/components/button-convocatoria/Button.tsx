import React, { MouseEventHandler } from "react"
import { Button } from "react-bootstrap"
import './buttons.css'

interface Props {
    nombre: string;
    className: string;
    navegarHacia: MouseEventHandler
    iconoDelBoton?: React.ReactNode;
}


const ButtonConvocatoria = ({nombre, className, iconoDelBoton, navegarHacia}: Props) => {

    return <Button variant="primary" className={className} onClick={navegarHacia}>{nombre} {iconoDelBoton}</Button>
}

export default ButtonConvocatoria