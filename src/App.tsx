import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ConvocatoriasRoutes } from "./routers/ConvocatoriasRoutes";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/contexts/userContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/es";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <UserProvider>
        <Router>
          <Toaster position="top-center" />
          <ConvocatoriasRoutes />
        </Router>
      </UserProvider>
    </LocalizationProvider>
  );
}
