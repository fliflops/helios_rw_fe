import {z} from 'zod';

export const sortingFilterSchema = z.object({
    delivery_date: z.object({
        from: z.date().optional(),
        to: z.date().optional()
    })
    .nullable()
    .transform((value,ctx) => {
        if(!value) ctx.addIssue({code: 'custom', message: 'Delivery Date is required'});
        return value
    }),

    principal: z.object({
        label: z.string(),
        value: z.string()
    })
    .nullable()
    .transform((value,ctx) => {
        if(!value) ctx.addIssue({code: 'custom', message: 'Principal is required'});
        return value
    }),
    ship_to: z.object({
        label: z.string(),
        value: z.string()
    }).nullable().optional(),

    location: z.object({
        label: z.string(),
        value: z.string()
    })
    .nullable()
    .transform((value,ctx) => {
        if(!value) ctx.addIssue({code: 'custom', message: 'Location is required'});
        return value
    }),

    service_type: z.object({
        label: z.string(),
        value: z.string()
    })
    .nullable()
    .transform((value,ctx) => {
        if(!value) ctx.addIssue({code: 'custom', message: 'Service Type is required'});
        return value
    }),
})

export type sortingFilterType = z.infer<typeof sortingFilterSchema>