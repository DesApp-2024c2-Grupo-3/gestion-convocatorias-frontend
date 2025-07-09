import { Alert, Button, TextField, Breadcrumbs, Typography, FormHelperText } from "@mui/material"
import React, { forwardRef, useContext, useState } from "react"
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { ArrowBack, ArrowForward } from "@mui/icons-material"
import AddIcon from "@mui/icons-material/Add"
import { IFormularioInscripcion } from "../FormInscripcionProyecto"
import styles from "../../Home/formularios.module.css"
import { CustomButton } from "../../../components/CustomButton/CustomButtons"
import { formNavAnteriorBtn, formNavSiguienteBtn } from "../../../components/CustomButton/buttonStyles"
import { postProyecto } from "../../../api/proyectos.api"
import { useNavigate, useParams } from "react-router-dom"
import Snackbar from "@mui/material/Snackbar"
import toast from "react-hot-toast"
import { enviarCorreosMasivo } from "@/api/comunicacion.api"
import { UserContext } from "@/contexts/userContext"

const MuiAlert = forwardRef(function MuiAlert(props: any, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />
})

interface Props {
  irSiguiente: (step: number) => void
  irAtras: (step: number) => void
  datosDelFormulario: IFormularioInscripcion
  setDatosDelFormulario: (datos: IFormularioInscripcion) => void
  convocatoria: any
}

interface EmailDataObject {
    fromEmail?: string;
    toEmail: string;
    toName: string;
    subject?: string;
    type?: string;
    variables?: Record<string, any>;
}

type Presupuesto = {
  gastosCapital: Gasto[]
  gastosCorrientes: Gasto[]
}

type Gasto = {
  rubro: string
  coste: number
  descripcion: string
}

function Presupuesto({ irSiguiente, irAtras, datosDelFormulario, setDatosDelFormulario, convocatoria }: Props) {
  const { id } = useParams()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const navigate = useNavigate()
  const { usuario } = useContext(UserContext)

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Presupuesto>({
    defaultValues: {
      gastosCapital: datosDelFormulario.presupuesto?.gastosCapital.length
        ? datosDelFormulario.presupuesto.gastosCapital
        : [{ rubro: "", coste: 0, descripcion: "" }],
      gastosCorrientes: datosDelFormulario.presupuesto?.gastosCorrientes.length
        ? datosDelFormulario.presupuesto.gastosCorrientes
        : [{ rubro: "", coste: 0, descripcion: "" }],
    },
  })

  const {
    fields: capitalFields,
    append: appendCapital,
    remove: removeCapital,
  } = useFieldArray({
    name: "gastosCapital",
    control,
  })

  const {
    fields: corrientesFields,
    append: appendCorrientes,
    remove: removeCorrientes,
  } = useFieldArray({
    name: "gastosCorrientes",
    control,
  })

  const onSubmit: SubmitHandler<Presupuesto> = async (data) => {
    setDatosDelFormulario({
      ...datosDelFormulario,
      presupuesto: data,
    })



    const listaDeCorreos = datosDelFormulario.invitados;

    toast.loading('Enviando invitaciones...');

    try {
      const emailsParaEnviar: EmailDataObject[] = listaDeCorreos.map(correo => ({
        toEmail: correo,
        toName: correo,
        type: 'invitacion_grupo_convocatoria',
        variables: {
          nombreDelProyecto: convocatoria?.titulo,
          descripcion: convocatoria?.descripcion,
          fechaFin: convocatoria?.fechaFin,
          remitenteEmail: usuario?.email,
          remitenteNombre: usuario?.nombre,
        }
      }));

      const payload = {
        emails: emailsParaEnviar
      };

      await enviarCorreosMasivo(payload);

      toast.dismiss();
      toast.success('¡Invitaciones enviadas con éxito!');


      irSiguiente(2);

    } catch (error) {
      toast.dismiss();
      toast.error('No se pudieron enviar las invitaciones. Intenta de nuevo.');
      console.error("Error en el envío de invitaciones:", error);
    }

    if (id) {
      const datosParaEnviar = {
        ...datosDelFormulario,
        presupuesto: data,
      }

      try {
        await postProyecto(id, datosParaEnviar)
        setOpenSnackbar(true)
        setTimeout(() => {
          navigate("/Convocatorias", { state: { success: true } })
        }, 2000)
      } catch (error) {
        console.error("Error al enviar la solicitud:", error)
      }
    }
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Typography color="text.primary">Convocatorias</Typography>
        <Typography color="text.primary">{convocatoria?.titulo || "Cargando..."}</Typography>
        <Typography color="primary">Presupuesto</Typography>
      </Breadcrumbs>

      <h3>Presupuesto</h3>
      <hr />

      <h4>Gastos de capital</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {capitalFields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            <Box display="flex" gap={2} sx={{ mb: 1 }}>
              <Box sx={{ flex: 7 }}>
                <TextField
                  {...register(`gastosCapital.${index}.rubro`, {
                    required: "Rubro es requerido",
                  })}
                  variant="outlined"
                  label="Rubro"
                  size="small"
                  placeholder="Rubro"
                  fullWidth
                  error={!!errors.gastosCapital?.[index]?.rubro}
                // Removemos helperText del TextField
                />
                {/* Contenedor fijo para el mensaje de error */}
                <Box sx={{ height: "20px", mt: 0.5 }}>
                  <FormHelperText error={!!errors.gastosCapital?.[index]?.rubro} sx={{ margin: 0 }}>
                    {errors.gastosCapital?.[index]?.rubro?.message || " "}
                  </FormHelperText>
                </Box>
              </Box>

              <Box sx={{ flex: 4 }}>
                <TextField
                  {...register(`gastosCapital.${index}.coste`, {
                    required: "Coste es requerido",
                    valueAsNumber: true,
                    min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  })}
                  variant="outlined"
                  label="Coste"
                  size="small"
                  placeholder="Coste"
                  type="number"
                  fullWidth
                  error={!!errors.gastosCapital?.[index]?.coste}
                // Removemos helperText del TextField
                />
                {/* Contenedor fijo para el mensaje de error */}
                <Box sx={{ height: "20px", mt: 0.5 }}>
                  <FormHelperText error={!!errors.gastosCapital?.[index]?.coste} sx={{ margin: 0 }}>
                    {errors.gastosCapital?.[index]?.coste?.message || " "}
                  </FormHelperText>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", pt: 0.5 }}>
                <Button color="error" variant="outlined" onClick={() => removeCapital(index)} sx={{ minWidth: "auto" }}>
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>

            <Box>
              <TextField
                {...register(`gastosCapital.${index}.descripcion`, {
                  required: "Descripción es requerida",
                })}
                variant="outlined"
                label="Descripción"
                multiline
                rows={3}
                fullWidth
                size="small"
                placeholder="Descripción"
                error={!!errors.gastosCapital?.[index]?.descripcion}
              // Removemos helperText del TextField
              />
              {/* Contenedor fijo para el mensaje de error */}
              <Box sx={{ height: "20px", mt: 0.5 }}>
                <FormHelperText error={!!errors.gastosCapital?.[index]?.descripcion} sx={{ margin: 0 }}>
                  {errors.gastosCapital?.[index]?.descripcion?.message || " "}
                </FormHelperText>
              </Box>
            </Box>
          </Box>
        ))}

        <Button
          variant="contained"
          onClick={() => appendCapital({ rubro: "", coste: 0, descripcion: "" })}
          startIcon={<AddIcon />}
          sx={{ marginTop: "1em", marginBottom: "2em", backgroundColor: "#56A42C" }}
        >
          Nuevo gasto
        </Button>

        <hr />

        <h4>Gastos corrientes</h4>
        {corrientesFields.map((field, index) => (
          <Box key={field.id} sx={{ mb: 3 }}>
            <Box display="flex" gap={2} sx={{ mb: 1 }}>
              <Box sx={{ flex: 7 }}>
                <TextField
                  {...register(`gastosCorrientes.${index}.rubro`, {
                    required: "Rubro es requerido",
                  })}
                  variant="outlined"
                  label="Rubro"
                  size="small"
                  placeholder="Rubro"
                  fullWidth
                  error={!!errors.gastosCorrientes?.[index]?.rubro}
                // Removemos helperText del TextField
                />
                {/* Contenedor fijo para el mensaje de error */}
                <Box sx={{ height: "20px", mt: 0.5 }}>
                  <FormHelperText error={!!errors.gastosCorrientes?.[index]?.rubro} sx={{ margin: 0 }}>
                    {errors.gastosCorrientes?.[index]?.rubro?.message || " "}
                  </FormHelperText>
                </Box>
              </Box>

              <Box sx={{ flex: 4 }}>
                <TextField
                  {...register(`gastosCorrientes.${index}.coste`, {
                    required: "Coste es requerido",
                    valueAsNumber: true,
                    min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  })}
                  variant="outlined"
                  label="Coste"
                  size="small"
                  placeholder="Coste"
                  type="number"
                  fullWidth
                  error={!!errors.gastosCorrientes?.[index]?.coste}
                // Removemos helperText del TextField
                />
                {/* Contenedor fijo para el mensaje de error */}
                <Box sx={{ height: "20px", mt: 0.5 }}>
                  <FormHelperText error={!!errors.gastosCorrientes?.[index]?.coste} sx={{ margin: 0 }}>
                    {errors.gastosCorrientes?.[index]?.coste?.message || " "}
                  </FormHelperText>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", pt: 0.5 }}>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => removeCorrientes(index)}
                  sx={{ minWidth: "auto" }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>

            <Box>
              <TextField
                {...register(`gastosCorrientes.${index}.descripcion`, {
                  required: "Descripción es requerida",
                })}
                variant="outlined"
                label="Descripción"
                multiline
                rows={3}
                fullWidth
                size="small"
                placeholder="Descripción"
                error={!!errors.gastosCorrientes?.[index]?.descripcion}
              // Removemos helperText del TextField
              />
              {/* Contenedor fijo para el mensaje de error */}
              <Box sx={{ height: "20px", mt: 0.5 }}>
                <FormHelperText error={!!errors.gastosCorrientes?.[index]?.descripcion} sx={{ margin: 0 }}>
                  {errors.gastosCorrientes?.[index]?.descripcion?.message || " "}
                </FormHelperText>
              </Box>
            </Box>
          </Box>
        ))}

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => appendCorrientes({ rubro: "", coste: 0, descripcion: "" })}
          sx={{ marginTop: "1em", marginBottom: "2em", backgroundColor: "#56A42C" }}
        >
          Nuevo gasto
        </Button>

        <div className={styles["nav-btn-group"]}>
          <Button
            sx={{
              ...formNavAnteriorBtn,
              color: "white",
              backgroundColor: "#D94A3A",
            }}
            onClick={() => irAtras(2)}
          >
            <ArrowBack />
            Volver
          </Button>
          <CustomButton
            nombre="Enviar solicitud"
            type="submit"
            iconoDerecho={<ArrowForward />}
            style={formNavSiguienteBtn}
          />
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert severity="success" sx={{ width: "100%" }}>
            Postulación enviada correctamente
          </MuiAlert>
        </Snackbar>
      </form>
    </>
  )
}

export default Presupuesto
