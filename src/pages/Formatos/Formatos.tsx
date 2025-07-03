import React, { useEffect, useState } from 'react';
import { getFormatos } from '../../api/formatos.api';
import FormatoCard from './components/FormatoCard';
import { Box, Container, Grid, Typography } from '@mui/material';

export interface FormatoProps {
    _id: string;
    nombreDelFormato: string;
    campos: any[]
}

const Formatos = () => {
    const [listFormatos, setListFormatos] = useState<FormatoProps[]>([])

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
        listFormatos.map((formato, index) => (
            <Grid item xs={12} md={6} key={formato._id}>
            <FormatoCard
                _id={formato._id}
                key={index}
                nombreDelFormato={formato.nombreDelFormato}
                campos={formato.campos}
            />
            </Grid>
        ))
    ) : (
        <>
            <div>
                <h2>No hay formatos</h2>
            </div>
        </>
    );

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 3 }}>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4">
                        Formatos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {listFormatos.length === 1 ? "1 formato disponible" : listFormatos.length + " formatos disponibles"}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {formatos}
                </Grid>
            </Container>
        </>
    )
}

export default Formatos;