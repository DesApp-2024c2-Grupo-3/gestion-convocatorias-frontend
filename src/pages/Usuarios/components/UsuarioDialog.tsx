import React, { useState } from "react";
import { UsuarioProps } from "../Usuarios";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton } from "@mui/material";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";

interface UsuarioDialogProps {
    usuarioData: UsuarioProps;
    showDialogState: ShowDialogStateProps;
}

interface ShowDialogStateProps {
    showUsuarioDialog: boolean;
    setShowUsuarioDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsuarioDialog = ({ usuarioData, showDialogState }: UsuarioDialogProps) => {

    const handleClose = () => {
        showDialogState.setShowUsuarioDialog(false)
    }

    const roles = () => {
        console.log(usuarioData.roles)
    }

    return (
        <Dialog
            open={showDialogState.showUsuarioDialog}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#56A42C",
                    color: 'white'
                }}
            >{usuarioData.nombre}</DialogTitle>
            <DialogContent dividers>
                <p className="usuario-email">{usuarioData.email}</p>
                <div className="roles">
                    
                    <p>{usuarioData.roles}</p>

                </div>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    nombre="Ver roles"
                    accion={roles}
                />
            </DialogActions>
        </Dialog>
    )
}

export default UsuarioDialog