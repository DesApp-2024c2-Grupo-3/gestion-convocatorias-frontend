import React from 'react';
import RegisterForm from './RegisterForm';

export default {
    title: 'Molecules/RegisterForm',
    component: RegisterForm,
    tags: ['autodocs'],
};

export const Default = () => <RegisterForm
    nombre=""
    email=""
    password=""
    passwordConfirm=""
    onNombreChange={() => { }}
    onEmailChange={() => { }}
    onPasswordChange={() => { }}
    onPasswordConfirmChange={() => { }}
    onSubmit={() => { }}
/>