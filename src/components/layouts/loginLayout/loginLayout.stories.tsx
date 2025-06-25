import React from 'react';
import LoginLayout from '.';
import { LoginPanel, LoginForm } from '@/components/molecules';

export default {
    title: 'Layouts/LoginLayout',
    component: LoginLayout,
    tags: ['autodocs'],
};

export const Default = () => <LoginLayout 
    left={<LoginPanel onRegister={() => {}} icon="bi-person-circle" />}
    right={<LoginForm 
        email=""
        password=""
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onSubmit={() => {}}
        onRegister={() => {}}
    />}
/>