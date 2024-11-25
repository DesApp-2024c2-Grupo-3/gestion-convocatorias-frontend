import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "../button-convocatoria/Button";
import "/src/components/convocatoria/convocatoria.css";
import ButtonConvocatoria  from "../button-convocatoria/Button";
import { putFechaConvocatoria } from "../../api/api";

interface Props {
  idConvocatoria: string;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
}

interface Usuario {
  id: number;
  titulo: string;
}

const Convocatoria = ({
  idConvocatoria,
  titulo,
  descripcion,
  fechaInicio,
  fechaFin,
}: Props): JSX.Element => {
    //Definicion de estados locales para la gestion del estado del modal y la fecha fin modificable
  const [showModal, setShowModal] = useState(false); //Muestra/oculta el modal.
  const [editableFechaFin, setEditableFechaFin] = useState(fechaFin); //Almacena la fecha fin.
  //Almacena un listado de usuarios de prueba.
  const [postulados, setPostulados] = useState<Usuario[]>([
    { id: 1, titulo: "Ej-Proyecto 1" },
    { id: 2, titulo: "Ej-Proyecto 2" },
    { id: 3, titulo: "Ej-Proyecto 3" },
  ]);

  //Abren o cierran el modal.
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //Funcion que maneja el cambio en el campo de fecha fin.
  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableFechaFin(new Date(event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    try {
      // Llama a la función del frontend para actualizar la fecha
      const response = await putFechaConvocatoria(idConvocatoria, editableFechaFin);
      console.log('Fecha actualizada correctamente:', response);
      alert('Fecha actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la fecha:', error);
      alert('Hubo un error al actualizar la fecha');
    }
  };

  return (
    <Card className="card-convocatoria">
      <Card.Body className="card-body">
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <Card.Subtitle>
          Inscripción hasta: {editableFechaFin.toLocaleDateString()}
        </Card.Subtitle>
        <div className="btn-card-convocatoria">
          <Button
            accion={handleShowModal}
            className="btn-inscribirse btn-prueba"
            nombre="Ver más"
          />
        </div>
      </Card.Body>

      {/* Modal de información de la convocatoria */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="custom-modal-header">
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="convocatoria-descripcion">{descripcion}</p>

          <div className="convocatoria-fechas">
            <p>
              Fecha inicio de la convocatoria:{fechaInicio.toLocaleString()}
              {fechaInicio?.toLocaleDateString()}
            </p>
            <form onSubmit={handleSubmit}>
            <p>
              Fecha fin de la convocatoria:{" "}
              <input
                type="datetime-local"
                value={editableFechaFin.toISOString().slice(0,16)}
                onChange={handleFechaChange}
                className="fecha-fin-input"
                min={fechaInicio.toISOString().slice(0,16)}
              />
            </p>
            <ButtonConvocatoria
              nombre="Editar"
              type="submit"
            />
            </form>
          </div>

          <h5>Cantidad de Postulaciones: {postulados.length}</h5>
          <table className="convocatoria-table">
            <thead>
              <tr>
                <th>ID-Proyecto</th>
                <th>Título</th>
              </tr>
            </thead>
            <tbody>
            
              {postulados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id.toString().slice(-6)}</td>
                  <td>{usuario.titulo}</td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className="btn-cerrar">
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Convocatoria;
