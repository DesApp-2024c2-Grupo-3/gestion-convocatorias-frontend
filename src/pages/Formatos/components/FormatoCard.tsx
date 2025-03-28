import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";

interface FormatoCardProps {
    idFormato: string;
    nombreDelFormato: string;
    campos: any[]
}


const FormatoCard = ({ idFormato, nombreDelFormato, campos }: FormatoCardProps) => {
    return (
        <Card
        sx={{
            borderTop: 15,
            borderTopColor: "#56A42C",
            width: {
                xs: '25rem',
                md: '500px'
            }
        }}>
            <CardActionArea>
                <CardContent>
                    <h5>{nombreDelFormato}</h5>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default FormatoCard;