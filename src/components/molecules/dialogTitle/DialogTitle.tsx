import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dialogTitleBox, dialogTitleText, dialogTitleCloseButton } from "./dialogTitle.styles";

interface DialogTitleProps {
    title: string;
    handleClose: () => void;
}

const DialogTitle = ({ title, handleClose }: DialogTitleProps) => (
  <Box sx={dialogTitleBox}>
    <Typography variant="h6" component="div" sx={dialogTitleText}>
      {title}
    </Typography>
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={dialogTitleCloseButton}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);

export default DialogTitle;