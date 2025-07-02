import React from 'react';
import ErrorMessage from './ErrorMessage';

export default {
    title: 'Atoms/ErrorMessage',
    component: ErrorMessage,
    tags: ['autodocs'],
};

export const Default = () => (
    <ErrorMessage>
      Este es un mensaje de error.
    </ErrorMessage>
);