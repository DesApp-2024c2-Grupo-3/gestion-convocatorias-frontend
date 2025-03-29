import { Card, CardActionArea, CardContent } from "@mui/material";
import React, { useState } from "react";
import { FormatoProps } from "../Formatos";
import FormatoDialog from "./FormatoDialog";

const FormatoCard = ({ _id, nombreDelFormato, campos }: FormatoProps) => {

    const [showDialog, setShowDialog] = useState(false)


    return (
        <>
            <Card
                sx={{
                    borderTop: 15,
                    borderTopColor: "#56A42C",
                    width: '20rem'
                }}>
                <CardActionArea
                    onClick={() => setShowDialog(true)}
                >
                    <CardContent>
                        <h5>{nombreDelFormato}</h5>
                    </CardContent>
                </CardActionArea>
            </Card>

            <FormatoDialog
                formatoData={{_id, nombreDelFormato, campos}}
                showDialogState={{showDialog, setShowDialog}}
            />
        </>
    )
}

export default FormatoCard;