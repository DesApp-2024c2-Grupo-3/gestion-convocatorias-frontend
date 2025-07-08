import React from "react";
import DateTimePicker from "./DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default {
  title: "Atoms/DateTimePicker",
  component: DateTimePicker,
};

export const Default = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimePicker value={null} onChange={() => {}} />
  </LocalizationProvider>
);