import React, { useEffect, useState } from "react";
import FormCrearFormato from "./FormCrearFormato";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";

import styles from "../../Home/formularios.module.css";
import { btnVerdeUnahur, formatSelectorBtn, formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IConvocatoria } from "../FormNuevaConvocatoria";
import { Button, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography } from "@mui/material";
import { getFormatos } from "../../../api/formatos.api";
import { FormatoProps } from "../../Formatos/Formatos";
import FormatoDialog from "../../../components/FormatoDialog/FormatoDialog";

interface FormFormatoProps {
    setStep: (step: number) => void;
    savedData: IConvocatoria
    setData: (data: IConvocatoria) => void;
}

const FormFormato = ({ setStep, savedData, setData }: FormFormatoProps) => {
    const [tipoFormulario, setTipoFormulario] = useState<JSX.Element | null>(null);
    const [formato, setFormato] = useState<string | null>(null);
    const [nombreFormato, setNombreFormato] = useState<string|null>(null)

    return (
        <>
            <h2>Formato de convocatoria</h2>
            <div className={styles["btn-select-formato-group"]}>
                <CustomButton
                    nombre="Seleccionar Formato"
                    accion={() => {setTipoFormulario(<SelectorFormato setFormato={setFormato} setTipoFormulario={setTipoFormulario} setNombreFormato={setNombreFormato} />)}}
                    style={formatSelectorBtn}
                />
                <CustomButton
                    nombre="Crear Formato"
                    accion={() => {setTipoFormulario(<FormCrearFormato setFormato={setFormato} setTipoFormulario={setTipoFormulario} setNombreFormato={setNombreFormato}/>)}}
                    style={formatSelectorBtn}
                />
            </div>

            {nombreFormato && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Formato actual:</strong> {nombreFormato}
                </Typography>
            )}

            <hr />

            {tipoFormulario}

            <div className={styles["nav-btn-group"]}>
                <CustomButton
                        nombre="Anterior"
                        iconoIzquierdo={<ArrowBack />}
                        style={formNavAnteriorBtn}
                        accion={() => setStep(1)}
                />
                <CustomButton
                    nombre="Siguiente"
                    iconoDerecho={<ArrowForward />}
                    style={formNavSiguienteBtn}
                    accion={() => {
                        if (!formato) {
                            alert("Por favor seleccione o cree un formato")
                        } else {
                            setStep(3)
                            setData({ ...savedData, formato })
                        }
                    }}
                />
            </div>
        </>
    );
};

export default FormFormato;

interface SelectorFormatoProps {
    setFormato: (data: string) => void;
    setTipoFormulario: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
    setNombreFormato: (nombre: string) => void
}

const SelectorFormato = ({ setFormato, setTipoFormulario, setNombreFormato }: SelectorFormatoProps) => {
    const [listFormatos, setListFormatos] = useState<FormatoProps[]>([])
    const [selectedFormato, setSelectedFormato] = useState<number | null>(null);
    const [showFormatoDialog, setShowFormatoDialog] = useState(false)
    const [dataForFormatoDialog, setDataForFormatoDialog] = useState<FormatoProps>({
        _id: "",
        nombreDelFormato: "",
        campos: [],
    });

    useEffect(() => {
        const getFormatosList = async () => {

            const data = await getFormatos();
            if (Array.isArray(data)) {
                setListFormatos(data);
            }
        };
        getFormatosList()
    }, [])

    const formatos = listFormatos.length ? (
        <List
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                p: 1,
                maxHeight: '40vh',
                overflowY: 'auto'
            }}
            >
            {listFormatos.map((formato, index) => (
                <ListItem
                key={index}
                secondaryAction={
                    <Button
                    variant="contained"
                    sx={{
                        ...btnVerdeUnahur,
                        fontSize: '0.75rem',
                        padding: '4px 12px',
                        borderRadius: '6px',
                    }}
                    onClick={() => {
                        setDataForFormatoDialog(formato)
                        setShowFormatoDialog(true)
                    }}
                    >
                    Ver Formato
                    </Button>
                }
                disablePadding
                >
                <ListItemButton
                    selected={selectedFormato === index}
                    onClick={() => {
                    setSelectedFormato(index);
                    setFormato(formato._id.toString());
                    setTipoFormulario(null);
                    setNombreFormato(formato.nombreDelFormato);
                    }}
                    sx={{
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5
                    }}
                >
                    <ListItemText primary={formato.nombreDelFormato} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
    ) : (
        <>
            <div>
                <h2>No hay formatos</h2>
            </div>
        </>
    );

    return (
        <>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Seleccionar Formato
            </Typography>
            <List
                sx={{
                    width: '100%',
                }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Formatos disponibles
                    </ListSubheader>
                }
            >
                {formatos}
            </List>
            
            <FormatoDialog
                formatoData={dataForFormatoDialog}
                showDialogState={{ showFormatoDialog, setShowFormatoDialog }}
            />

        </>
    );
};
