import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/home";
import FormNuevaConvocatoria from "../pages/FormNuevaConvocatoria/FormNuevaConvocatoria";
import Register from "../pages/Register/Register";

export const ConvocatoriasRoutes = () => {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Form" element={<FormNuevaConvocatoria />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Router>
      </>
    );
}