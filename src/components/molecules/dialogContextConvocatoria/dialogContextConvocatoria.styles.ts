import { GRAY_100, GRAY_700, GRAY_800, COLOR_SECONDARY, COLOR_SECONDARY_HOVER } from "@/styles/colors";


export const dialogContent = {
    px: 3,
    py: 2,
  };
  
  export const descripcionText = {
    mb: 3,
    color: GRAY_800,
  };
  
  export const divider = {
    my: 2,
  };
  
  export const infoRow = {
    display: "flex",
    alignItems: "center",
  };
  
  export const labelText = {
    fontWeight: 600,
    color: GRAY_700,
    minWidth: "95px",
  };
  
  export const valueText = {
    color: GRAY_700,
  };
  
  export const fechaFinLabel = {
    ...labelText,
    minWidth: "75px",
  };
  
  export const invisibleBox = {
    minWidth: 200,
    height: 40,
    visibility: "hidden",
  };
  
  export const invisibleBoxSmall = {
    width: 36,
    height: 36,
    visibility: "hidden",
  };

  export const iconButtonSave = {
    backgroundColor: COLOR_SECONDARY,
    borderRadius: "8px",
    width: 36,
    height: 36,
    "&:hover": {
        backgroundColor: COLOR_SECONDARY_HOVER,
    },
    color: GRAY_100,
    fontSize: "1.1rem",
    padding: 2,
  };