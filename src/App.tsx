import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/Login";
import { ConvocatoriasRoutes } from "./routers/ConvocatoriasRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./pages/Login/userContext";

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <Toaster position="top-center" />
        <ConvocatoriasRoutes />
      </UserProvider>
    </Provider>
  );
}
