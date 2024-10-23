import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/home";

export const ConvocatoriasRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Login />} />
        </Routes>
      </>
    );
}