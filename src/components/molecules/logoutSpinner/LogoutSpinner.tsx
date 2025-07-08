import React from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  overlaySx,
  spinnerContainerSx,
  spinnerBoxSx,
  iconBoxSx,
} from "./logoutSpinner.styles";

const LogoutSpinner = () => (
  <Box sx={overlaySx}>
    <Box sx={spinnerContainerSx}>
      <Fade in timeout={800}>
        <Box sx={spinnerBoxSx}>
          <CircularProgress size={48} thickness={4} color="success" />
          <Box sx={iconBoxSx}>
            <LogoutIcon color="success" sx={{ fontSize: 32 }} />
          </Box>
        </Box>
      </Fade>
      <Typography
        variant="subtitle1"
        color="success.main"
        sx={{ fontWeight: 500, mt: 1, letterSpacing: 1 }}
      >
        Cerrando sesión...
      </Typography>
    </Box>
  </Box>
);

export default LogoutSpinner;