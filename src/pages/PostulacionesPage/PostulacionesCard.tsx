import React from "react"
import { Card, CardContent, Typography, Paper, Grid, Box, Chip, Tooltip, IconButton,
  CardActions, Divider,
} from "@mui/material"
import { CustomButton } from "../../components/CustomButton/CustomButtons"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DownloadIcon from "@mui/icons-material/Download"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import { btnAzulUnahur } from "@/components/CustomButton/buttonStyles"

interface Props {
  titulo: string
  descripcion: string
  equipo: string[]
  fechaCreacion?: string
  //estado?: "pendiente" | "aprobado" | "rechazado"
  categoria?: string
  onVerDetalles?: () => void
}

const PostulacionesCard = (props: Props) => {

    const {
        titulo,
        descripcion,
        equipo,
        fechaCreacion,
        categoria = "General",
        onVerDetalles = () => {}
    } = props
    
    const descripcionTruncada: string = descripcion.length > 150 ? descripcion.substring(0, 150) + "..." : descripcion

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                borderTop: 5,
                borderTopColor: "#56A42C",
                height: "330px", 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: 4,
                },
            }}
            elevation={2}
        >
        <CardContent sx={{ flex: 1, pb: 1 }}>
            
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" color="text.primary">
                {titulo + " "}
            </Typography>
            
            </Box>

            <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            {descripcionTruncada}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            Equipo ({equipo.length}):
            </Typography>

            <Grid container spacing={1}>
            {equipo.slice(0, 4).map((email: string, index: number) => (
                <Grid item xs={12} sm={6} key={index}>
                <Tooltip title={email} placement="top">
                    <Paper
                    sx={{
                        padding: 1,
                        borderLeft: 3,
                        borderLeftColor: "#56A42C",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                    >
                    {/* avatar con inicial */}
                    <Box
                        sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        bgcolor: "#56A42C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        flexShrink: 0,
                        }}
                    >
                        {email.charAt(0).toUpperCase()}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        }}
                    >
                        {email}
                    </Typography>
                    </Paper>
                </Tooltip>
                </Grid>
            ))}
            {equipo.length > 4 && (
                <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                    Y {equipo.length - 4} miembros más...
                </Typography>
                </Grid>
            )}
            </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
            <IconButton size="small" title="Descargar información">
            <DownloadIcon fontSize="small" />
            </IconButton>
            <CustomButton 
                nombre="Ver detalles" 
                iconoIzquierdo={<VisibilityIcon />} 
                accion={onVerDetalles} 
                style={{ ...btnAzulUnahur, margin: 0 }}
                />
        </CardActions>
        </Card>
    )
}

export default PostulacionesCard
