// src/pages/Register/Register.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { registrarUsuario } from "../../api/api";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registrarUsuario(nombre, email, password);
      if (data) {
        toast.success('Cuenta creada exitosamente');
         setTimeout(() => {
           navigate("/login");
         }, 1500);
        
      }
    } catch (err) {
      toast.error('Hubo un error al registrar el usuario. Intenta de nuevo.');
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de Usuario</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingresá tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-btn">
          Registrarse
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;