import React, { useEffect, useState } from "react";


// / Externos
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Componentes

//
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import { ConvocatoriasRoutes } from "./routers/ConvocatoriasRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";







export default function App() {

  return (
      <Provider store={store}>
        <ConvocatoriasRoutes/>
      </Provider>
  );
    
}



