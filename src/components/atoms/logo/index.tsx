import React from 'react';
import { Link } from 'react-router-dom';
import logoUnahur from '@/assets/Unahur_logo2.png';
import './logo.scss';

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <img
        src={logoUnahur}
        alt="Universidad Nacional de Hurlingham"
      />
    </Link>
  );
};

export default Logo;