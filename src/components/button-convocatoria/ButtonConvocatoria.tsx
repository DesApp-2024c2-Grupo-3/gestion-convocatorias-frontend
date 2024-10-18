import React from "react"
import { Button } from "react-bootstrap"
import './buttonConvocatoria.css'


const ButtonConvocatoria: React.FC = () => {
    return (
        <Button variant="primary" className='btn-convocatoria'> <i className="bi bi-plus"></i>Nueva convocatoria</Button>
    )
}

export default ButtonConvocatoria