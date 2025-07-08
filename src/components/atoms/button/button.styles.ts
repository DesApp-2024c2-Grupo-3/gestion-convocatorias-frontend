import { COLOR_PRIMARY, COLOR_PRIMARY_HOVER, COLOR_SECONDARY, COLOR_SECONDARY_HOVER, COLOR_DANGER, COLOR_DANGER_HOVER } from "@/styles/colors";

const baseButton = {
    borderRadius: "5px",
    color: "#fff",
    border: "none",
    alignItems: "center",
    width: "100%",
  };
  
  export const blueButton = {
    ...baseButton,
    backgroundColor: COLOR_PRIMARY,
    "&:hover": {
      backgroundColor: COLOR_PRIMARY_HOVER,
    },
  };
  
  export const greenButton = {
    ...baseButton,
    backgroundColor: COLOR_SECONDARY,
    "&:hover": {
      backgroundColor: COLOR_SECONDARY_HOVER,
    },
  };

  export const redButton = {
    ...baseButton,
    backgroundColor: COLOR_DANGER,
    "&:hover": {
      backgroundColor: COLOR_DANGER_HOVER,
    },
  };
  
  export const convocatoriaButton = {
    ...baseButton,
    display: "flex",
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    marginTop: "5em",
    height: "40px",
    width: "80%",
    padding: "1.5rem 0",
    "&:hover": {
      backgroundColor: COLOR_PRIMARY_HOVER,
    },
  };

  export const inscribirseButton = {
    ...baseButton,
    display: "flex",
    width: "25%",
    borderRadius: "15px",
    justifyContent: "center",
    marginTop: "1em",
    backgroundColor: COLOR_PRIMARY,
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.421)",
    "&:hover": {
      backgroundColor: COLOR_PRIMARY_HOVER,
    },
  };
  
  export const sinConvocatoriaButton = {
    ...baseButton,
    display: "flex",
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    marginTop: "5em",
    height: "40px",
    width: "50%",
    "&:hover": {
      backgroundColor: COLOR_PRIMARY_HOVER,
    },
  };