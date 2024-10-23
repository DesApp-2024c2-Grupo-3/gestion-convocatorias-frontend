import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoUnahur from '../../assets/Unahur_logo2.png';  

const Logo = () => {
  return (
    <img 
      src={logoUnahur} 
      alt="Logo Universidad Nacional de Hurlingham" 
      style={{ height: '150px', marginBottom: '20px' }}
    />
  );
};

export default Logo;