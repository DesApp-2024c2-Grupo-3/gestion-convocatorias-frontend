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
import { Toaster } from "react-hot-toast";






export default function App() {
  return (
      <Provider store={store}>
        <Toaster position="top-center"/>
        <ConvocatoriasRoutes/>
      </Provider>
  );
    
}



