import React from 'react';
import LoginForm from './LoginForm';

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
    onForgotPassword={() => {}}
/>