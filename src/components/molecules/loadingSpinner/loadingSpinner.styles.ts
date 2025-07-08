import { SxProps, Theme } from "@mui/material";

export const overlaySx: SxProps<Theme> = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  bgcolor: "rgba(255,255,255,0.7)",
  zIndex: 2000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const spinnerContainerSx: SxProps<Theme> = {
  py: 2,
  minWidth: 180,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const spinnerBoxSx: SxProps<Theme> = {
  position: "relative",
  display: "inline-flex",
  mb: 1,
};

export const iconBoxSx: SxProps<Theme> = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};