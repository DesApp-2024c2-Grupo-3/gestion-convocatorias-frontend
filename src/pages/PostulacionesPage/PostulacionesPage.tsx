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

  // Estados para el modal de detalles
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedProyectoId, setSelectedProyectoId] = useState<string | null>(null)

  useEffect(() => {
    const getProyectos = async (): Promise<void> => {
      if (idConvocatoria) {
        try {
          setLoading(true)
          const data = await getProyectosPorConvocatoria(idConvocatoria)

          if (Array.isArray(data)) {
            const proyectosTransformados: Proyecto[] = data.map((proyecto: any) => {
              const titulo: string = proyecto.camposExtra?.["Titulo del proyecto"] || "Sin título"
              const descripcion: string =
                proyecto.camposExtra?.["Problemática Detectada (Diagnostico)"] || "Sin descripción"
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
                // estado: "pendiente", 
              }
            })

            setProyectos(proyectosTransformados)
          } else {
            setProyectos([])
          }
        } catch (error: any) {
          console.error("Error al obtener los proyectos:", error)
          setError("Hubo un error al cargar los proyectos.")
        } finally {
          setLoading(false)
        }
      }
    }

    getProyectos()
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
            Postulaciones para la convocatoria
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
