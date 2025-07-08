import React from 'react';
import Button from '.';
import { blueButton, greenButton, redButton, convocatoriaButton, inscribirseButton } from './button.styles';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { MemoryRouter } from "react-router-dom";


export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
};

export const Default = () => (
  <Button label="Default" />
);

export const Blue = () => (
  <Button label="Iniciar sesión" sx={blueButton} />
);

export const Green = () => (
  <Button label="Confirmar" sx={greenButton} />
);

export const Red = () => (
  <Button label="Eliminar" sx={redButton} />
);

export const WithStartIcon = () => (
  <Button label="Enviar" sx={blueButton} startIcon={<SendIcon />} />
);

export const WithEndIcon = () => (
  <Button label="Eliminar" sx={redButton} endIcon={<DeleteIcon />} />
);


export const Disabled = () => (
  <Button label="Deshabilitado" sx={blueButton} disabled />
);

export const Convocatoria = () => (
  <Button label="Convocatoria" sx={convocatoriaButton} />
);

export const Inscribirse = () => (
  <Button label="Inscribirse" sx={inscribirseButton} />
);

export const AsLink = () => (
  <MemoryRouter>
    <Button
      label="Ir a Home"
      sx={blueButton}
      component={Link}
      to="/"
    />
  </MemoryRouter>
);