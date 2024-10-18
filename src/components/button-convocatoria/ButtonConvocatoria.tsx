import React from "react"
import { Button } from "react-bootstrap"
import './buttonConvocatoria.css'

interface Props {
    nombre: string
}

const ButtonConvocatoria: React.FC<Props> = ({nombre}) => {
    return <Button variant="primary" className='btn-convocatoria'> <i className="bi bi-plus"></i>{nombre}</Button>
}

export default ButtonConvocatoria