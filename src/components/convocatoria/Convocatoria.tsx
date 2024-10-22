import React from 'react';
import Card from 'react-bootstrap/Card';

interface Props {
    titulo:string;
    descripcion: string;
    fechaFin: Date;
}


const Convocatoria: React.FC<Props> = ({titulo, descripcion, fechaFin}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>
                    {descripcion}
                </Card.Text>
                <Card.Subtitle>
                    Inscripcion hasta: {fechaFin.toLocaleDateString()}
                </Card.Subtitle>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default Convocatoria