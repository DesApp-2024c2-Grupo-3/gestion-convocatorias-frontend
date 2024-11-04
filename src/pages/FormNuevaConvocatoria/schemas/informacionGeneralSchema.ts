import {z} from 'zod';

export const schema = z.object({
    titulo: z.string().min(1, "El titulo es obligatorio"),
    descripcion: z.string().min(1, "La descripcion es obligatoria"),
    fechaInicio: z.coerce.date({
        required_error: "Por favor seleccione una fecha",
        invalid_type_error: "Por favor seleccione una fecha valida"
    }).min(new Date("2024-01-01"), {
        message: "Por favor seleccione una fecha valida"
    }),
    fechaFin: z.coerce.date({
        required_error: "Por favor seleccione una fecha",
        invalid_type_error: "Por favor seleccione una fecha valida"
    }),
}).refine(data => data.fechaInicio < data.fechaFin, {
    message: "La fecha de fin de la convocatoria debe ser posterior a la de inicio",
    path: ['fechaFin']
})

export type InformacionGeneralValues = z.infer<typeof schema>;