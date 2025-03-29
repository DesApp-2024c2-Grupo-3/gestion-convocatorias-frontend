import React, { useState } from "react";
import { FormatoProps } from "../Formatos";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"
import InputCampo from "./InputCampo";

interface FormatoDialogProps {
    formatoData: FormatoProps;
    showDialogState: ShowDialogStateProps;
}

interface ShowDialogStateProps {
    showDialog: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormatoDialog = ({ formatoData, showDialogState }: FormatoDialogProps) => {

    const handleClose = () => {
        showDialogState.setShowDialog(false)
    }

    const listCampos = formatoData.campos.map((campo, index) => (
            <InputCampo
                key={index}
                campoData={campo}
            />
        ))

    return (
        <Dialog
            open={showDialogState.showDialog}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#56A42C",
                    color: 'white'
                }}
            >{formatoData.nombreDelFormato}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 12,
                    color: 'white'
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent dividers>
                {listCampos}
            </DialogContent>

        </Dialog>
    )
}

export default FormatoDialog