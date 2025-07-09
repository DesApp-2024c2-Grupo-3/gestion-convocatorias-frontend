import React, { useState } from "react";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    informacionGeneralSchema,
    InformacionGeneralValues,
} from "../schemas/informacionGeneralSchema";
import dayjs from "dayjs";
import {
    Box,
    Grid,
    TextField,
    Typography,
    FormHelperText,
    Divider,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CustomButton } from "../../../components/CustomButton/CustomButtons";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
    formNavAnteriorBtn,
    formNavSiguienteBtn,
} from "../../../components/CustomButton/buttonStyles";
import { IConvocatoria } from "../FormNuevaConvocatoria";

import styles from "../../Home/formularios.module.css";

interface InformacionGeneralProps {
    setStep: (step: number) => void;
    savedData: IConvocatoria;
    setData: (data: IConvocatoria) => void;
}

const InformacionGeneral = ({
    setStep,
    savedData,
    setData,
}: InformacionGeneralProps) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<InformacionGeneralValues>({
        defaultValues: {
            titulo: savedData.titulo || "",
            descripcion: savedData.descripcion || "",
            fechaInicio: savedData.fechaInicio || new Date(),
            fechaFin: savedData.fechaFin || dayjs().add(1, "month").toDate(),
        },
        resolver: zodResolver(informacionGeneralSchema),
    });

    const [fechaInicioDayjs, setFechaInicioDayjs] = useState<dayjs.Dayjs>(
        dayjs(savedData.fechaInicio || new Date())
    );
    const [fechaFinDayjs, setFechaFinDayjs] = useState<dayjs.Dayjs>(
        savedData.fechaFin
            ? dayjs(savedData.fechaFin)
            : dayjs(savedData.fechaInicio || dayjs()).add(30, "day")
    );

    const onSubmit: SubmitHandler<InformacionGeneralValues> = (data) => {
        setData({ ...savedData, ...data });
        setStep(2);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} px={3} py={2}>
            <Typography variant="h5" mb={2}>
                Información General
            </Typography>

            <Grid container spacing={3}>
                {/* TÍTULO */}
                <Grid item xs={12}>
                    <Controller
                        name="titulo"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Título"
                                fullWidth
                                error={!!errors.titulo}
                                helperText={
                                    errors.titulo?.message || "Ingrese el título de la convocatoria"
                                }
                            />
                        )}
                    />
                </Grid>

                {/* DESCRIPCIÓN */}
                <Grid item xs={12}>
                    <Controller
                        name="descripcion"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Descripción"
                                fullWidth
                                multiline
                                error={!!errors.descripcion}
                                helperText={
                                    errors.descripcion?.message || "Describa brevemente la convocatoria"
                                }
                            />
                        )}
                    />
                </Grid>
            </Grid>

            {/* FECHAS */}
            <Box mt={4}>
                <Typography variant="h6" mb={1}>
                    Período de Inscripción a Convocatoria
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={3}>
                    {/* Fecha de Inicio */}
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="fechaInicio"
                            control={control}
                            render={({ field }) => (
                                <DateTimePicker
                                    {...field}
                                    label="Fecha de Inicio"
                                    value={fechaInicioDayjs}
                                    minDateTime={dayjs()}
                                    onChange={(newValue) => {
                                        if (newValue) {
                                            setFechaInicioDayjs(newValue);
                                            setFechaFinDayjs(newValue.add(1, "month")); // autocalcular
                                            setValue("fechaInicio", newValue.toDate());
                                            setValue("fechaFin", newValue.add(1, "month").toDate());
                                        }
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.fechaInicio,
                                            helperText:
                                                errors.fechaInicio?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    {/* Fecha de Fin */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '112px' }}>
                            <Controller
                                name="fechaFin"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <DateTimePicker
                                            {...field}
                                            label="Fecha de Fin"
                                            value={fechaFinDayjs}
                                            minDateTime={fechaInicioDayjs.add(1, "day")}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setFechaFinDayjs(newValue);
                                                    setValue("fechaFin", newValue.toDate());
                                                }
                                            }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    error: !!errors.fechaFin,
                                                    helperText: null,
                                                },
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                minHeight: '1.5em',
                                                mt: '4px',
                                                ml: '14px',
                                                fontSize: '0.8rem',
                                                color: !!errors.fechaFin ? 'error.main' : 'text.secondary',
                                            }}
                                        >
                                            {errors.fechaFin?.message}
                                        </Box>
                                    </>
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Botones */}
            <Box
                display="flex"
                justifyContent="space-between"
                mt={4}
                className={styles["nav-btn-group"]}
            >
                <CustomButton
                    nombre="Salir"
                    iconoIzquierdo={<ArrowBack />}
                    style={formNavAnteriorBtn}
                />
                <CustomButton
                    nombre="Siguiente"
                    type="submit"
                    iconoDerecho={<ArrowForward />}
                    style={formNavAnteriorBtn}
                />
            </Box>
        </Box>
    );
};

export default InformacionGeneral;
