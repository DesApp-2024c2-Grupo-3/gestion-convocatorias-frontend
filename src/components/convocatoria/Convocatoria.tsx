import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from '../button-convocatoria/Button'
import '/src/components/convocatoria/convocatoria.css'

interface Props {
    titulo:string;
    descripcion: string;
    fechaFin: Date;
}


const Convocatoria = ({titulo, descripcion, fechaFin}: Props): JSX.Element => {
    return (
        <Card className='card-convocatoria'>
            <Card.Body className='card-body'>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                <Card.Subtitle>
                    Inscripcion hasta: {fechaFin.toLocaleDateString()}
                </Card.Subtitle>
                <div className='btn-card-convocatoria'>
                    <Button className='btn-inscribirse btn-prueba' nombre='Ver más' />
                </div>
                
            </Card.Body>
        </Card>
    )
}

export default Convocatoria