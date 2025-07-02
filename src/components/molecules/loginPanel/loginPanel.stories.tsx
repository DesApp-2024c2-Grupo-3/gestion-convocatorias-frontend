import React from 'react';
import LoginPanel from './LoginPanel';
import PersonIcon from '@mui/icons-material/Person2Rounded';

export default {
    title: 'Molecules/LoginPanel',
    component: LoginPanel,
    tags: ['autodocs'],
};

export const Default = () => <LoginPanel
    onRegister={() => { }}
    icon={<PersonIcon />}
/>