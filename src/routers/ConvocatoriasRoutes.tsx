import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "../pages/Home/home";
import FormNuevaConvocatoria from "../pages/FormNuevaConvocatoria/FormNuevaConvocatoria";
import Register from "../pages/Register/Register";
import MiPerfil from "../pages/PerfilDeUsuario/MiPerfil";
import ConvocatoriasPage from "../pages/ConvocatoriasPage/ConvocatoriasPage";
import Formatos from "../pages/Formatos/Formatos";
import FormInscripcionProyectos from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";
import Usuarios from "../pages/Usuarios/Usuarios";
import PrivateRoute from "../components/ControlDeAcceso/PrivateRoute";
import PostulacionesPage from "../pages/PostulacionesPage/PostulacionesPage";

export const ConvocatoriasRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute rolesPermitidos={["investigador", "admin", "super_admin"]}>
            <Home />
          </PrivateRoute>
        }
      >
        <Route
          path="convocatorias"
          element={
            <PrivateRoute rolesPermitidos={["investigador", "admin"]}>
              <ConvocatoriasPage />
            </PrivateRoute>
          }
        />
        <Route
          path="convocatorias/:idConvocatoria/postulaciones"
          element={
            <PrivateRoute rolesPermitidos={["admin"]}>
              <PostulacionesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="formatos"
          element={
            <PrivateRoute rolesPermitidos={["admin"]}>
              <Formatos />
            </PrivateRoute>
          }
        />
        <Route
          path="form"
          element={
            <PrivateRoute rolesPermitidos={["admin"]}>
              <FormNuevaConvocatoria />
            </PrivateRoute>
          }
        />
        <Route path="convocatorias/:id/inscripcion/:formato" element={<FormInscripcionProyectos />} />
        <Route
          path="usuarios"
          element={
            <PrivateRoute rolesPermitidos={["super_admin"]}>
              <Usuarios />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mi-perfil" element={<MiPerfil />} />
    </Routes>
  );
};
