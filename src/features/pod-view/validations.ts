import * as z from 'zod';


export const filterFormSchema = z.object({
    search: z.string().optional(),
    trip_number: z.string().optional(),
    location: z.object({
        label: z.string(),
        value: z.string()
    },{
        errorMap: () => ({message: 'Location filter is required'})
    }).nullable(),
    ship_point: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),
    principal: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),
    delivery_status: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),
    rud_status: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),
    pod_status: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),
    delivery_date:z.object({
        from: z.date().optional(),
        to: z.date().optional()
    }).optional()
})

export type filterFormValues = z.infer<typeof filterFormSchema>