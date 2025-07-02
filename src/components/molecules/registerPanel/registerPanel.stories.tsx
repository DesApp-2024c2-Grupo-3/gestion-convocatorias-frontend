import React from 'react';
import RegisterPanel from '.';
import PersonIcon from '@mui/icons-material/Person2Rounded';

export default {
    title: 'Molecules/RegisterPanel',
    component: RegisterPanel,
    tags: ['autodocs'],
};

export const Default = () => <RegisterPanel
    onLogin={() => { }}
    icon={<PersonIcon />}
/>