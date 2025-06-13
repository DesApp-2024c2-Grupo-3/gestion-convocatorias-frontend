import React from "react"
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Tooltip,
  IconButton,
  CardActions,
  Divider,
} from "@mui/material"
import { CustomButton } from "../../components/CustomButton/CustomButtons"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DownloadIcon from "@mui/icons-material/Download"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

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
        fechaCreacion = new Date().toLocaleDateString(),
        //estado = "pendiente",
        categoria = "General",
        onVerDetalles = () => {}
    } = props
    
    /*
    const getEstadoColor = (estado: string): "success" | "error" | "warning" => {
        switch (estado) {
        case "aprobado":
            return "success"
        case "rechazado":
            return "error"
        default:
            return "warning"
        }
    }*/

    // Truncar descripción si es muy larga
    const descripcionTruncada: string = descripcion.length > 120 ? descripcion.substring(0, 120) + "..." : descripcion

    return (
        <Card
        sx={{
            display: "flex",
            flexDirection: "column",
            borderTop: 5,
            borderTopColor: "#56A42C",
            height: "100%", // Cambio importante: altura flexible
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
            },
        }}
        elevation={2}
        >
        <CardContent sx={{ flex: 1, pb: 1 }}>
            {/* Header con título y estado
            <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
            }}
            >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 0 }}>
                {titulo}
            </Typography>
            <Chip label={estado.toUpperCase()} color={getEstadoColor(estado)} size="small" sx={{ fontWeight: 500 }} />
            </Box>
                 */}
            {/* Información adicional */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CalendarTodayIcon fontSize="small" sx={{ color: "text.secondary", mr: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
                {fechaCreacion}
            </Typography>
            <Chip label={categoria} size="small" variant="outlined" sx={{ ml: 1, fontSize: "0.7rem" }} />
            </Box>

            {/* Descripción */}
            <Typography variant="body2" paragraph sx={{ mb: 2 }}>
            {descripcionTruncada}
            </Typography>

            <Divider sx={{ my: 1.5 }} />

            {/* Sección de equipo mejorada */}
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
                    {/* Avatar con inicial */}
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

        {/* Acciones en la parte inferior */}
        <CardActions sx={{ justifyContent: "flex-end", pt: 0 }}>
            <IconButton size="small" title="Descargar información">
            <DownloadIcon fontSize="small" />
            </IconButton>
            <CustomButton nombre="Ver detalles" iconoIzquierdo={<VisibilityIcon />} accion={onVerDetalles} />
        </CardActions>
        </Card>
  )
}

export default PostulacionesCard
