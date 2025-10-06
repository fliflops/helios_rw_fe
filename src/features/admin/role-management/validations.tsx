import * as z from 'zod';

export const roleCreateSchema = z.object({
    role_name: z.string(),
    is_active: z.boolean(),
    is_admin: z.boolean(),
    modules: z.array(z.object({
        id: z.string().optional().nullable(),
        role_id: z.string().optional().nullable(),
        header_key: z.string(),
        module_key: z.string(),
        module_name: z.string(),
        view: z.boolean(),
        create: z.boolean(),
        edit: z.boolean(),
        export: z.boolean()
    }))
})