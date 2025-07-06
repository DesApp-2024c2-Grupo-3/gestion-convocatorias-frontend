import React from 'react';
import LoginTemplate from './LoginTemplate';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
};

export const Default = () => (
    <MemoryRouter>
      <LoginTemplate
        leftPanel={<div>Panel Izquierdo</div>}
        rightForm={<div>Formulario Derecho</div>}
      />
    </MemoryRouter>
  );