import React, { useEffect, useState } from "react";
import { UsuarioProps } from "../Usuarios";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton, FormGroup, FormControlLabel, Checkbox, RadioGroup, FormControl, Radio } from "@mui/material";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { updateRoles } from "../../../api/usuarios.api";
import toast from "react-hot-toast";
import { FormLabel } from "react-bootstrap";
import { btnVerdeUnahur } from "@/components/CustomButton/buttonStyles";

interface UsuarioDialogProps {
    usuarioData: UsuarioProps;
    showDialogState: ShowDialogStateProps;
    onRefresh: () => void
}

interface usuario {
    nombre: string;
    email: string
}

interface ShowDialogStateProps {
    showUsuarioDialog: boolean;
    setShowUsuarioDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsuarioDialog = ({ usuarioData, showDialogState, onRefresh }: UsuarioDialogProps) => {

    const [value, setValue] = useState<string>(usuarioData.roles[0])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

    const handleClose = () => {
        showDialogState.setShowUsuarioDialog(false)
    }

    const handleUpdate = async (usuario: usuario, rol: string) => {
        if (rol !== usuarioData.roles[0]){
            try {
                await updateRoles(usuario.email, [rol])
                onRefresh()
            } catch (error) {
                console.error(error);
            }
            toast.success(`Rol de ${usuario.nombre} actualizado correctamente`)
            handleClose()
        } else {
            toast.error("Seleccione un rol distinto al actual")
        }
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
                <div className="roles-checkbox">
                    <FormControl>
                        <FormLabel id="roles-group">Rol</FormLabel>
                        <RadioGroup
                            aria-labelledby="roles-group"
                            name="roles-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="investigador" control={<Radio />} label="Investigador" />
                            <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
                            </RadioGroup>
                    </FormControl>
                </div>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    nombre="Cambiar roles"
                    accion={() => handleUpdate(usuarioData, value)}
                    style={{ ...btnVerdeUnahur, margin:0}}
                />
            </DialogActions>
        </Dialog>
    )
}

export default UsuarioDialog