import React, { useEffect, useState } from "react";


// / Externos
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Componentes

//
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import { ConvocatoriasRoutes } from "./routers/ConvocatoriasRoutes";







export default function App() {

  return (
      <ConvocatoriasRoutes/>
  );
    
}



