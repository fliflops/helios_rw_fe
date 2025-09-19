import * as z from 'zod';

export const createPrincipalSchema = z.object({
    id: z.string().uuid().nullable().optional(),
    customer_desc: z.string(),
    customer_code: z.string(),
    customer_name: z.string(),
    customer_address: z.string().optional(),
    is_active: z.boolean(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postal_code: z.string().optional(),
})

export const updatePrincipalSchema = createPrincipalSchema.partial().extend({
    customer_code: z.string(),
    customer_name: z.string(),
}).omit({ id: true })

export type createPrincipalType = z.infer<typeof createPrincipalSchema>
export type updatePrincipalType = z.infer<typeof updatePrincipalSchema>
export type principalTable = z.infer<typeof createPrincipalSchema>