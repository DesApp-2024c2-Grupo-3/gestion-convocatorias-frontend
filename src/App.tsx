import React, { useEffect, useState } from "react";


// / Externos
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Componentes

//
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";







export default function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
  );
    
}



