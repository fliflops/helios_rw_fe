import z from "zod"

export const createLocationSchema = z.object({
    id: z.string().uuid().nullable().optional(),
    loc_name: z.string(),
    loc_code: z.string(),
    is_active: z.boolean()
})

export const updateLocationSchema = createLocationSchema.partial().omit({ id: true })

export type createLocationType = z.infer<typeof createLocationSchema>
export type updateLocationType = z.infer<typeof updateLocationSchema>
export type locationTable = z.infer<typeof createLocationSchema>