import React, { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home/home";
import FormNuevaConvocatoria from "../pages/FormNuevaConvocatoria/FormNuevaConvocatoria";
import Register from "../pages/Register/Register";
import MiPerfil from "../pages/PerfilDeUsuario/MiPerfil";
import ConvocatoriasPage from "../pages/ConvocatoriasPage/ConvocatoriasPage"
import Formatos from "../pages/Formatos/Formatos";
import FormInscripcionProyectos from "../pages/FormInscripcionProyecto/FormInscripcionProyecto";
import Usuarios from "../pages/Usuarios/Usuarios"
import PrivateRoute from "../components/ControlDeAcceso/PrivateRoute";
import PostulacionesPage from "../pages/PostulacionesPage/PostulacionesPage";


export const ConvocatoriasRoutes = () => {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} >
              <Route
                  element={
                      <PrivateRoute
                          rolesPermitidos={["investigador","admin"]}
                      />
                  }
              >
                <Route path="/convocatorias" element={<ConvocatoriasPage />} />
              </Route>

              <Route
                  element={
                      <PrivateRoute
                          rolesPermitidos={["admin"]}
                      />
                  }
              >
                  <Route path="convocatorias/:idConvocatoria/postulaciones" element={<PostulacionesPage/>} />
                  <Route path="formatos" element={<Formatos />} />
                  <Route path="form" element={<FormNuevaConvocatoria />} /> 
                  <Route path="/formatos" element={<Formatos />} />
                  <Route path="/form" element={<FormNuevaConvocatoria />} />
                  <Route path="convocatorias/:id/inscripcion/:formato" element={<FormInscripcionProyectos />} />
              </Route>

              <Route
                  element={
                      <PrivateRoute
                          rolesPermitidos={["super_admin"]}
                      />
                  }
              >
                <Route path="/usuarios" element={<Usuarios />} />
              </Route>
            </ Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
          </Routes>
        </Router>
      </>
    );
}