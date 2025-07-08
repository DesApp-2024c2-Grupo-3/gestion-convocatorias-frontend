import React from "react";
import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import {
  overlaySx,
  spinnerContainerSx,
  spinnerBoxSx,
  iconBoxSx,
} from "./loadingSpinner.styles";

const LoadingSpinner = () => (
  <Box sx={overlaySx}>
    <Box sx={spinnerContainerSx}>
      <Fade in timeout={800}>
        <Box sx={spinnerBoxSx}>
          <CircularProgress size={48} thickness={4} color="primary" />
          <Box sx={iconBoxSx}>
            <LoopIcon color="primary" sx={{ fontSize: 32 }} />
          </Box>
        </Box>
      </Fade>
      <Typography
        variant="subtitle1"
        color="primary.main"
        sx={{ fontWeight: 500, mt: 1, letterSpacing: 1 }}
      >
        Cargando...
      </Typography>
    </Box>
  </Box>
);

export default LoadingSpinner;