import  React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProyectosPorConvocatoria } from "../../api/proyectos.api"
import { Typography, Grid, Box, Container, Breadcrumbs, Link as MuiLink, Skeleton, Paper } from "@mui/material"
import { Link } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import PostulacionesCard from "./PostulacionesCard"
import PostulacionDialog from "./PostulacionDialog"
import { CustomButton } from "../../components/CustomButton/CustomButtons"
import { getConvocatoriaById } from "@/api/convocatorias.api"

interface Proyecto {
  _id: string
  titulo: string
  descripcion: string
  equipo: string[]
  fechaCreacion?: string
  categoria?: string
}

const PostulacionesPage = () => {
  const { idConvocatoria } = useParams<{ idConvocatoria: string }>()
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [tituloConvocatoria, setTituloConvocatoria] = useState<string>("")

  // Estados para el modal de detalles
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedProyectoId, setSelectedProyectoId] = useState<string | null>(null)

  useEffect(() => {
  const fetchData = async () => {
    if (!idConvocatoria) return;
    try {
      setLoading(true)

      // 1. Obtener proyectos
      const data = await getProyectosPorConvocatoria(idConvocatoria)

      const proyectosTransformados: Proyecto[] = Array.isArray(data)
        ? data.map((proyecto: any) => {
            const titulo: string = proyecto.camposExtra?.["titulo"] || "Sin título"
            const descripcion: string =
              proyecto.camposExtra?.["descripcion"] || "Sin descripción"
            const autor: string = proyecto.autor || "Autor desconocido"
            const invitados: string[] = Array.isArray(proyecto.invitados)
              ? proyecto.invitados.map((i: any) => i.nombre || i)
              : []

            return {
              _id: proyecto._id,
              titulo,
              descripcion,
              equipo: [autor, ...invitados],
              fechaCreacion: new Date(proyecto.fechaCreacion || Date.now()).toLocaleDateString(),
            }
          })
        : []

      setProyectos(proyectosTransformados)

      // 2. Obtener título de la convocatoria
      const convocatoria = await getConvocatoriaById(idConvocatoria)
      setTituloConvocatoria(convocatoria?.titulo || "Convocatoria sin título")
    } catch (error) {
      console.error("Error al cargar los datos:", error)
      setError("Hubo un error al cargar las postulaciones.")
    } finally {
      setLoading(false)
    }
  }

  fetchData()
}, [idConvocatoria])

  const handleVerDetalles = (proyectoId: string): void => {
    setSelectedProyectoId(proyectoId)
    setModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setModalOpen(false)
    setSelectedProyectoId(null)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={200} />
        </Box>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item: number) => (
            <Grid item xs={12} md={6} key={item}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <CustomButton nombre="Reintentar" accion={() => window.location.reload()} />
        </Paper>
      </Container>
    )
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <MuiLink component={Link} to="/convocatorias" color="inherit">
              Convocatorias
            </MuiLink>
            <Typography color="text.primary">Postulaciones</Typography>
          </Breadcrumbs>
        </Box>

        {/* Título */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Postulaciones para la convocatoria: {tituloConvocatoria}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {proyectos.length} postulaciones encontradas
          </Typography>
        </Box>

        {/* Resultados */}
        {proyectos.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron postulaciones
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {proyectos.map((proyecto: Proyecto) => (
              <Grid item xs={12} md={6} key={proyecto._id}>
                <PostulacionesCard
                  titulo={proyecto.titulo}
                  descripcion={proyecto.descripcion}
                  equipo={proyecto.equipo}
                  fechaCreacion={proyecto.fechaCreacion}
                  // estado={proyecto.estado}
                  categoria={proyecto.categoria}
                  onVerDetalles={() => handleVerDetalles(proyecto._id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Modal de detalles */}
      <PostulacionDialog open={modalOpen} onClose={handleCloseModal} proyectoId={selectedProyectoId} />
    </>
  )
}

export default PostulacionesPage
