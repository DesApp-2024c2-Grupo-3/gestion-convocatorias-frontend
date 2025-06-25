import React from 'react';
import LoginForm from './index';

export default {
    title: 'Molecules/LoginForm',
    component: LoginForm,
    tags: ['autodocs'],
};

export const Default = () => <LoginForm 
    email=""
    password=""
    onEmailChange={() => {}}
    onPasswordChange={() => {}}
    onSubmit={() => {}}
    onRegister={() => {}}
/>