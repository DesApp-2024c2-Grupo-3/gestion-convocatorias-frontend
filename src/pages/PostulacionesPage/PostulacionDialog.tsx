import  React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Box, Divider, Grid, Paper, CircularProgress, Tabs,
  Tab, List, ListItem, ListItemText, ListItemIcon, } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import DescriptionIcon from "@mui/icons-material/Description"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import CategoryIcon from "@mui/icons-material/Category"
import { CustomButton } from "../../components/CustomButton/CustomButtons"
import { getProyectoPorId } from "../../api/proyectos.api"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        padding: "16px 0",
        height: "400px", 
        overflowY: "auto", // Scroll si el contenido es muy largo
      }}
    >
      {value === index && <Box sx={{ height: "100%" }}>{children}</Box>}
    </div>
  )
}

interface PostulacionDialogProps {
  open: boolean
  onClose: () => void
  proyectoId: string | null
}

interface ProyectoDetalle {
  _id: string
  titulo: string
  descripcion: string
  autor: string
  invitados: string[]
  fechaCreacion: string
  camposExtra: Record<string, any>
  estado?: string
  categoria?: string
}

const PostulacionDialog: React.FC<PostulacionDialogProps> = ({ open, onClose, proyectoId }) => {
  const [proyecto, setProyecto] = useState<ProyectoDetalle | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [tabValue, setTabValue] = useState<number>(0)

  useEffect(() => {
    const fetchProyectoDetalle = async () => {
      if (!proyectoId || !open) return

      setLoading(true)
      setError(null)

      try {
        const data = await getProyectoPorId(proyectoId)
        setProyecto(data)
      } catch (err) {
        console.error("Error al obtener detalles del proyecto:", err)
        setError("No se pudieron cargar los detalles del proyecto")
      } finally {
        setLoading(false)
      }
    }

    fetchProyectoDetalle()
  }, [proyectoId, open])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }
{/* 
  const getEstadoColor = (estado = "pendiente"): "success" | "error" | "warning" => {
    switch (estado) {
      case "aprobado":
        return "success"
      case "rechazado":
        return "error"
      default:
        return "warning"
    }
  }
*/}

  if (!open) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: "80vh", // Altura fija del modal
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#56A42C",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          flexShrink: 0, // No se encoge
        }}
      >
        <Typography variant="h6">Detalles de la Postulación</Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 0,
          flex: 1, // Toma todo el espacio disponible
          display: "flex",
          flexDirection: "column",
          overflow: "hidden", // Evita scroll en el contenedor principal
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: 1 }} p={3}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : proyecto ? (
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Encabezado con información básica - Altura fija */}
            <Box sx={{ p: 3, backgroundColor: "#f9f9f9", flexShrink: 0 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 0 }}>
                  {proyecto.titulo}
                </Typography>
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarTodayIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Fecha: {new Date(proyecto.fechaCreacion).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CategoryIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Categoría: {proyecto.categoria || "General"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Equipo: {proyecto.invitados.length + 1} miembros
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Pestañas - Altura fija */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", flexShrink: 0 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="detalles del proyecto">
                <Tab label="Información General" />
                <Tab label="Equipo" />
              </Tabs>
            </Box>

            {/* Contenido de las pestañas - Altura flexible con scroll */}
            <Box sx={{ flex: 1, p: 3, overflow: "hidden" }}>
              {/* Pestaña de Información General */}
              <TabPanel value={tabValue} index={0}>
                
                <Typography variant="h4" gutterBottom>
                  Información Adicional
                </Typography>

                {Object.entries(proyecto.camposExtra).map(([key, value]) => (
                  <Box key={key} sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                      {key}
                    </Typography> 
                    <Typography variant="body1">
                      {value || "No especificado"}
                    </Typography>
                  </Box>
                ))}
              </TabPanel>
              

              {/* Pestaña de Equipo */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  Responsable del Proyecto
                </Typography>
                <Paper
                  sx={{
                    p: 2,
                    mb: 3,
                    borderLeft: 3,
                    borderLeftColor: "#56A42C",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#56A42C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {proyecto.autor.charAt(0).toUpperCase()}
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {proyecto.autor}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Responsable Principal
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {proyecto.invitados.length > 0 && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Miembros del Equipo
                    </Typography>
                    <Grid container spacing={2}>
                      {proyecto.invitados.map((miembro, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              borderLeft: 3,
                              borderLeftColor: "#56A42C",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                bgcolor: "#56A42C",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                            </Box>
                            
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}
              </TabPanel>

              {/* Pestaña de Campos Adicionales 
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  Información Adicional
                </Typography>
                <List>
                  {Object.entries(proyecto.camposExtra)
                    .filter(([key]) => !["Titulo del proyecto", "Problemática Detectada (Diagnostico)"].includes(key))
                    .map(([key, value]) => (
                      <ListItem key={key} divider>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={key}
                          secondary={value || "No especificado"}
                          primaryTypographyProps={{ fontWeight: "medium" }}
                        />
                      </ListItem>
                    ))}
                </List>
              </TabPanel>*/}
            </Box>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
            <Typography>No se encontró información del proyecto</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, flexShrink: 0 }}>
        <CustomButton nombre="Cerrar" accion={onClose} />
      </DialogActions>
    </Dialog>
  )
}

export default PostulacionDialog
