import {z} from 'zod';

export const schema = z.object({
    titulo: z.string().min(1, "El titulo es obligatorio"),
    descripcion: z.string().min(1, "La descripcion es obligatoria"),
    fechaInicio: z.coerce.date(),
    fechaFin: z.coerce.date(),
}).refine(data => data.fechaInicio < data.fechaFin, {
    message: "La fecha de fin de la convocatoria debe ser despues a la de inicio",
    path: ['fechaFin']
})

export type FormInformacionGeneralValues = z.infer<typeof schema>;