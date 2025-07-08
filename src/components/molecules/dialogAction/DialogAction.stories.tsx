import React from "react";
import DialogAction from "./DialogAction";
import { Button } from "@/components/atoms";
import { blueButton, greenButton, redButton } from "@/components/atoms/button/button.styles";
import { PictureAsPdf, Delete, Visibility } from "@mui/icons-material";

export default {
    title: "Molecules/DialogAction",
    component: DialogAction,
};

export const Default = () => <DialogAction>
    <Button label="Ver Formato" sx={greenButton} startIcon={<Visibility />} />
    <Button label="Bases y Condiciones" sx={blueButton} startIcon={<PictureAsPdf />} />
    <Button label="Eliminar" sx={redButton} startIcon={<Delete />} />
</DialogAction> 