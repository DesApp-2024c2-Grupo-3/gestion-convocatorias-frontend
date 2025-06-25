import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './userContext';
import Login from './';

const mockUserContext = {
  iniciarSesion: () => {},
  cerrarSesion: () => {},
  usuario: null,
  isAuthenticated: false
};

const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <UserContext.Provider value={mockUserContext}>
          <Story />
        </UserContext.Provider>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};