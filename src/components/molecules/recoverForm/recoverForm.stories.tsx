import React from 'react';
import RecoverForm from './RecoverForm';

export default {
    title: 'Molecules/RecoverForm',
    component: RecoverForm,
    tags: ['autodocs'],
};

export const Default = () => <RecoverForm
    email=""
    onEmailChange={() => { }}
    onSubmit={() => { }}
    onLogin={() => { }}
/>