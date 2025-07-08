import React from "react";
import { Box as MuiBox, DialogActions as MuiDialogActions } from "@mui/material";
import { dialogAction, dialogActionBox } from "./dialogAction.styles";

const DialogAction = ({ children }: { children: React.ReactNode }) => (
  <MuiDialogActions sx={dialogAction}>
    <MuiBox sx={dialogActionBox}>
      {children}
    </MuiBox>
  </MuiDialogActions>
);

export default DialogAction;