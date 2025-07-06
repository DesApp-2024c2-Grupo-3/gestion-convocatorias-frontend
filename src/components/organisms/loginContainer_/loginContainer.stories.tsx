import React from 'react';
import LoginContainer from './loginContainer';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Organisms/LoginContainer',
  component: LoginContainer,
};

export const Default = () => (
    <MemoryRouter>
      <LoginContainer />
    </MemoryRouter>
  );       